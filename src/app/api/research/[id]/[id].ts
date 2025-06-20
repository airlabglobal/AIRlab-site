// pages/api/research/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb'; // MongoDB connection helper
import Research from '@/lib/researchhelper'; // Research model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Get the paper ID from the URL parameter

  if (req.method === 'DELETE') {
    try {
      await connectToDatabase; // Ensure the connection to MongoDB is successful

      // Delete the research paper by its ID
      const result = await Research.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).json({ message: 'Research paper not found' });
      }

      res.status(200).json({ message: 'Research paper deleted successfully' });
    } catch (error) {
      console.error('Error deleting research paper:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' }); // Only allow DELETE requests
  }
}
