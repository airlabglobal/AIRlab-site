'use client'  // src/app/admin/research/page.tsx

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, Search, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';

interface ResearchPaper {
  _id: string;
  title: string;
  authors: string;
  year: number;
  fileUrl: string;
  imageUrl: string;
}

export default function AdminResearchPage() {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch research papers from the backend
    const fetchResearch = async () => {
      try {
        const response = await axios.get('/api/research');
        setPapers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching research papers:', error);
        setLoading(false);
      }
    };
    fetchResearch();
  }, []);

  // Function to delete a paper
  const deleteResearch = async (id: string) => {
    try {
      await axios.delete(`/api/research/${id}`);
      setPapers((prevPapers) => prevPapers.filter((paper) => paper._id !== id));
    } catch (error) {
      console.error('Error deleting research paper:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline text-3xl font-semibold flex items-center">
            <FileText className="mr-3 h-8 w-8 text-primary" /> Manage Research Papers
          </h2>
          <p className="text-muted-foreground font-body">Upload, edit, or remove research publications.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/admin/research/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Upload New Paper
          </Link>
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Publication List</CardTitle>
          <CardDescription className="font-body">
            A list of all publications.
            <div className="mt-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search papers..." className="max-w-sm" />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Authors</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {papers.map((paper) => (
                <TableRow key={paper._id}>
                  <TableCell className="font-medium">{paper._id}</TableCell>
                  <TableCell>{paper.title}</TableCell>
                  <TableCell>{paper.authors}</TableCell>
                  <TableCell>{paper.year}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" aria-label="Edit Paper">
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Delete Paper"
                      onClick={() => deleteResearch(paper._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
