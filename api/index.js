import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import { errorHandler } from './utils/error.js';
import cors from 'cors'; // Import the cors package
import helmet from 'helmet';

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

// Add the helmet middleware
app.use(helmet());

// Add the Cross-Origin-Opener-Policy header with the recommended value
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      // ... other CSP directives (if you have any)
      'frame-ancestors': ["'self'"], // This sets the COP to 'same-origin'
    },
  })
);


app.use(express.json());

// Add the cors middleware to the Express app
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Middleware for error handling
app.use((err, req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.error(`Error in API route: ${req.path} - ${req.method}`);
    console.error(err.stack);

    // Calculate the status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Send the error response to the client
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message: message || 'Internal Server Error',
      error: errorHandler(err),
    });
  }

  next();
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000!!');
});
