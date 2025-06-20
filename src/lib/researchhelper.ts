// src/models/Research.ts
import mongoose from 'mongoose';

const ResearchSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileUrl: String,
  imageUrl: String,
}, { timestamps: true });

export default mongoose.models.Research || mongoose.model('Research', ResearchSchema);
