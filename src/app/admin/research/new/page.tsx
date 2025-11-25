'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResearchUploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !file || !image) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    
    // Simulate successful upload
    console.log('Research paper submitted:', { title, description, file: file.name, image: image.name });
    alert(`Research paper "${title}" has been prepared for upload. Note: Backend functionality is not implemented - this is a demo only.`);
    
    // Reset form
    setTitle('');
    setDescription('');
    setFile(null);
    setImage(null);
    
    // Redirect after a short delay
    setTimeout(() => {
      router.push('/admin/research');
    }, 1500);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-card shadow-lg rounded-2xl p-8 border">
        <h1 className="text-3xl font-headline font-bold mb-2">Upload New Research</h1>
        <p className="text-muted-foreground font-body mb-6">Add a new research paper to the AIRLab collection</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter research paper title"
              className="w-full border rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Provide a brief description of the research"
              className="w-full border rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Research File (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="w-full border rounded-lg shadow-sm px-4 py-2 bg-background file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            {file && <p className="text-sm text-muted-foreground mt-1">Selected: {file.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cover Image (JPG, PNG)</label>
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              onChange={handleImageChange}
              required
              className="w-full border rounded-lg shadow-sm px-4 py-2 bg-background file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            {image && <p className="text-sm text-muted-foreground mt-1">Selected: {image.name}</p>}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push('/admin/research')}
              className="flex-1 bg-muted text-foreground py-3 px-4 rounded-lg hover:bg-muted/80 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              Upload Research
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// This code defines a React component for uploading research papers in a Next.js application.
// It includes a form for entering the title, description, and uploading a PDF file and an image.