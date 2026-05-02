"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { BackButton } from '@/components/ui/back-button';
import { FileText, Upload } from 'lucide-react';

interface NewResearchPaper {
  title: string;
  authors: string;
  year: number;
  fileUrl: string;
  imageUrl: string;
  description: string;
  abstract: string;
}

export default function NewResearchPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState<NewResearchPaper>({
    title: '',
    authors: '',
    year: new Date().getFullYear(),
    fileUrl: '',
    imageUrl: '',
    description: '',
    abstract: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paper),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Research paper added successfully",
        });
        router.push('/admin/research');
      } else {
        toast({
          title: "Error",
          description: "Failed to add research paper",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to add research paper",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton fallbackUrl="/admin/research" />
        <div>
          <h2 className="font-headline text-3xl font-semibold flex items-center">
            <FileText className="mr-3 h-8 w-8 text-primary" /> Add New Research Paper
          </h2>
          <p className="text-muted-foreground font-body">Upload a new research publication to the system.</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Research Paper Details</CardTitle>
          <CardDescription className="font-body">
            Fill in the information for the new research paper.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={paper.title}
                  onChange={(e) => setPaper({...paper, title: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="authors" className="text-right">
                  Authors *
                </Label>
                <Input
                  id="authors"
                  value={paper.authors}
                  onChange={(e) => setPaper({...paper, authors: e.target.value})}
                  className="col-span-3"
                  placeholder="e.g., John Doe, Jane Smith"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year *
                </Label>
                <Input
                  id="year"
                  type="number"
                  value={paper.year.toString()}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPaper({...paper, year: value === '' ? new Date().getFullYear() : parseInt(value) || new Date().getFullYear()});
                  }}
                  className="col-span-3"
                  min="1900"
                  max={new Date().getFullYear() + 5}
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={paper.description}
                  onChange={(e) => setPaper({...paper, description: e.target.value})}
                  className="col-span-3"
                  placeholder="Brief description of the research paper..."
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="abstract" className="text-right">
                  Abstract
                </Label>
                <Textarea
                  id="abstract"
                  value={paper.abstract}
                  onChange={(e) => setPaper({...paper, abstract: e.target.value})}
                  className="col-span-3"
                  rows={6}
                  placeholder="Full abstract of the research paper (optional)..."
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={paper.imageUrl}
                  onChange={(e) => setPaper({...paper, imageUrl: e.target.value})}
                  className="col-span-3"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fileUrl" className="text-right">
                  File URL *
                </Label>
                <Input
                  id="fileUrl"
                  value={paper.fileUrl}
                  onChange={(e) => setPaper({...paper, fileUrl: e.target.value})}
                  className="col-span-3"
                  placeholder="https://example.com/paper.pdf"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Add Research Paper
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}