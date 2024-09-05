import User from "../models/UserModel.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

// Register new user
export const register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });
    }

    const encryptedPassword = await hashPassword(password);

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
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)

    const user = await User.findOne({ email });

    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      res
        .status(400)
        .json({ success: false, message: "invalid email or password" });
    }

    const token = generateToken(user, res);

    res.status(200).json({success: true, message: 'login successfull', token})
    
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {

    res.cookie("token", "", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 0,
    });

    res.status(200).json({success: true, message: 'logout successfull'})

  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(error);
  }
}