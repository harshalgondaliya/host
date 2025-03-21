import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const userAuth = async (req, res, next) => {
  const token = req.cookies.token;
  console.log('Checking authentication... Cookies:', req.cookies);

  if (!token) {
    console.log('No token found in cookies');
    return res.json({success:false, message: "User Not authenticated. Please login again."});
  }

  try {
    console.log('Verifying token...');
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', tokenDecode);
    
    if(!tokenDecode.id) {
      console.log('No user ID in token');
      return res.json({success:false, message: "Invalid authentication token."});
    }
    
    // Verify user exists in database
    console.log('Finding user with ID:', tokenDecode.id);
    const user = await userModel.findById(tokenDecode.id);
    if(!user) {
      console.log('User not found in database');
      return res.json({success:false, message: "User not found."});
    }
    
    console.log('User authenticated successfully:', user.email);
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.error('Authentication error:', error.name, error.message);
    if (error.name === 'TokenExpiredError') {
      return res.json({success:false, message: "Authentication token expired. Please login again."});
    }
    return res.json({success:false, message: "Authentication failed. Please login again."});
  }
};

export default userAuth;