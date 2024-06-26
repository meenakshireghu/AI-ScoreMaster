import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path'; // Import the path module
import Valuator from '../models/valuator.js';

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Generate unique filenames
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 8 * 1024 * 1024 } // Limit file size to 8MB
}); 

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);

    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

    }
  } catch (error) {
    next(error)
  }
}

export const signOut = async (req , res, next ) => {
   try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out');
   } catch(error){
    next(error);
   }
}

export const createValuator = async (req, res, next) => {
  try {
    const { title } = req.body;

    // Access uploaded files through req.files (assuming fields named 'questionPaper' and 'answerKey')
    const questionPaperFile = req.files.questionPaper[0];
    const answerKeyFile = req.files.answerKey[0];

    if (!questionPaperFile || !answerKeyFile) {
      return res.status(400).json({ message: 'Question paper and answer key are required!' });
    }

    // Construct absolute file paths (assuming uploads directory is at the root)
    const uploadsPath = path.join(__dirname, '..', 'uploads'); // Adjust if uploads directory is elsewhere
    const questionPaperUrl = path.join(uploadsPath, questionPaperFile.filename);
    const answerKeyUrl = path.join(uploadsPath, answerKeyFile.filename);

    const newValuator = new Valuator({ title, questionPaperUrl, answerKeyUrl });
    await newValuator.save();

    res.status(201).json({ message: 'Valuator created successfully!', valuator: newValuator });
  } catch (err) {
    next(err);
  }
};

