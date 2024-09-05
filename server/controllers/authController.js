import User from "../models/UserModel.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

// register new user
export const register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    // check if the user already exists by checking with email
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });
    }

    // hash the password
    const encryptedPassword = await hashPassword(password);

    // create a new user
    const user = new User({
      name,
      email,
      password: encryptedPassword,
      role,
    });

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "registration successfull" });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(error);
  }
};

// handles the user login functionality
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "invalid email or password" });
    }

    // verifying the password after decrypting
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      res
        .status(400)
        .json({ success: false, message: "invalid email or password" });
    }

    // generate token 
    const token = generateToken(user, res);

    res.status(200).json({success: true, message: 'login successfull', token})
    
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(error);
  }
};
