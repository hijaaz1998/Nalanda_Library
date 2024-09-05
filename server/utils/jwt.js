import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (user, res) => {
  try {
   const token =  jwt.sign(
      { userId: user._id, role: user.role },
      process.env.TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('token', token, {
      httpOnly: true,  
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    return token;

  } catch (error) {
   console.log(error)
  }
};

