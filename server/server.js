import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import notificationRouter from './routes/notificationRoutes.js';

// Disable SSL Verification (Temporarily) if SSL certificate is not available
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Check the environment we're running in
const isProduction = process.env.NODE_ENV === 'production';
console.log(`Server running in ${isProduction ? 'production' : 'development'} mode`);

// Update CORS to include both development and production URLs
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://toomorebeverages.vercel.app',
  'https://authen-client.vercel.app',
  process.env.CLIENT_URL,
  /\.vercel\.app$/      // Allow all vercel.app subdomains
];

app.use(cors({  
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed origin or the onrender.com pattern
    const originIsAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return origin === allowedOrigin;
    });
    
    if (!originIsAllowed) {
      console.log(`Origin ${origin} not allowed by CORS`);
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Configure cookie parser middleware
app.use(cookieParser());

// Configure express to parse JSON and URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add headers middleware for CORS and cookies
app.use((req, res, next) => {
  // Check the origin
  const origin = req.headers.origin;
  if (origin && allowedOrigins.some(allowedOrigin => {
    if (allowedOrigin instanceof RegExp) {
      return allowedOrigin.test(origin);
    }
    return origin === allowedOrigin;
  })) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  // Required headers for credentials
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Other headers
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.cookies && req.cookies.token) {
    console.log('Token found in cookies');
  } else {
    console.log('No token in cookies');
  }
  next();
});

app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/notifications', notificationRouter);

// Start the server with error handling for port conflicts
app.listen(port, () => console.log(`Server Started on PORT ${port}`))
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const newPort = parseInt(port) + 1;
      console.log(`Port ${port} is in use, trying port ${newPort}`);
      app.listen(newPort, () => console.log(`Server Started on PORT ${newPort}`));
    } else {
      console.error('Error starting server:', err);
    }
  });
