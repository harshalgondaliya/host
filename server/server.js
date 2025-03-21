import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

// Disable SSL Verification (Temporarily) if SSL certificate is not available
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Update CORS to include both development and production URLs
const allowedOrigins = [
  'http://localhost:5173',
  'https://authen-client.vercel.app',  // Add the deployed client URL here
  process.env.CLIENT_URL, // Optional: Use environment variable if set
];

app.use(cors({  
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

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
