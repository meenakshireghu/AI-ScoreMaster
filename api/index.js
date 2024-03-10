import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import { errorHandler } from './utils/error.js';
import cors from 'cors'; // Import the cors package

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.listen(3000, () => {
  console.log('Server is running on port 3000!!');
});

app.use(express.json());

// Add the cors middleware to the Express app
app.use(cors());

//creation of middleware

app.use((err, req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.error(`Error in API route: ${req.path} - ${req.method}`);
    console.error(err.stack);
  }

  // The existing error handling middleware
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: message || 'Internal Server Error',
    error: errorHandler(err),
  });
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);