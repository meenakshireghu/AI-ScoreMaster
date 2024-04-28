import multer from 'multer';
import Valuation from '../models/valuation.js'; 

// Configure Multer storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Create Multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 8 * 1024 * 1024 } // Limit to 8MB per file
}).array('answerSheets', 10); // Allow uploading up to 10 files with field name 'answerSheets'

export const uploadAnswerSheets = async (req, res, next) => {
  try {
    // Retrieve valuatorId from request parameters
    const { valuatorId } = req.params;

    // Use Multer middleware to handle file uploads
    upload(req, res, async (err) => {
      // Check for Multer errors
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'File upload error!', error: err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Server error!', error: err.message });
      }

      // Check if files were uploaded
      if (!req.files.answerSheets || req.files.answerSheets.length === 0) {
        return res.status(400).json({ message: 'No files were uploaded!' });
      }

      // Array to store uploaded file URLs and additional information
      const uploadedFiles = [];

      // Process each uploaded file
      for (const file of req.files.answerSheets) {
        // Construct URL for the uploaded file
        const fileUrl = `http://localhost:3000/uploads/${file.filename}`;
        
        // Add additional information about the file (e.g., filename, size)
        const fileInfo = {
          filename: file.originalname,
          size: file.size,
          url: fileUrl
        };

        uploadedFiles.push(fileInfo);

        // Placeholder for actual processing logic (e.g., saving to database)
        
        const newValuation = new Valuation({
           valuatorId: valuatorId,
           data: req.body, // Assuming additional data is sent in the request body
           answerSheet: fileUrl // Store the file URL in the database
         });
         await newValuation.save();
      }

      // Placeholder for response
      // You can customize the response based on your requirements
      res.status(200).json({ message: 'Files uploaded successfully!', uploadedFiles: uploadedFiles });
    });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ message: 'Server error!', error: error.message });
  }
};
