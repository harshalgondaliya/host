import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const verifyToken = async (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;
  
  // If no token is found, check for authorization header
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : null;
    
  // Use token from cookies or header
  const accessToken = token || headerToken;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please login."
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    
    // Verify user exists
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }
    
    // Set user data in request object
    req.userId = decoded.id;
    req.userEmail = user.email;
    
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Authentication token expired. Please login again."
      });
    }
    
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token."
    });
  }
}; 