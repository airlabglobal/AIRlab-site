import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb'; // Ensure MongoDB connection helper is correct
import Research from '@/lib/researchhelper'; // Adjust this path according to your model file
import multer from 'multer';
const nextConnect = require('next-connect'); // Corrected import for next-connect

// Set up file storage and file filter
const upload = multer({
  dest: './public/uploads', // Save files to the public/uploads folder
  fileFilter: (req, file, cb) => {
    // Only allow PDF and image files
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept the file
    } else {
        const error = new Error('Only PDFs and images are allowed.');
      cb(null, false); // Reject the file
    }
  }
});

// Set up Next.js API handler with multer
const handler = nextConnect()
  .use(upload.fields([{ name: 'file' }, { name: 'image' }])) // Accepting file and image fields in the request
  .post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
    try {
      const { title, description } = req.body;
      const file = req.files['file']![0]; // Access the uploaded file
      const image = req.files['image']![0]; // Access the uploaded image

      // Connect to MongoDB
      const client = await connectToDatabase;

      // Create a new research document
      const research = new Research({
        title,
        description,
        fileUrl: `/uploads/${file.filename}`, // Store file URL for uploaded research paper
        imageUrl: `/uploads/${image.filename}`, // Store image URL
      });

      // Save the document in MongoDB
      await research.save();

      // Respond with success
      res.status(200).json({ message: 'Research uploaded successfully' });
    } catch (error) {
      console.error('Error saving research to MongoDB:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

export default handler;

// Extend NextApiRequest to include 'files' for multer
interface NextApiRequestWithFiles extends NextApiRequest {
  files: {
    [fieldname: string]: Express.Multer.File[]; // File field array
  };
}
