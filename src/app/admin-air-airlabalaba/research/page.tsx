'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, Search, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ResearchPaper {
  _id: string;
  title: string;
  authors: string;
  year: number;
  fileUrl: string;
  imageUrl: string;
  description?: string;
}

export default function AdminResearchPage() {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingPaper, setEditingPaper] = useState<ResearchPaper | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const response = await fetch('/api/admin/research');
      if (response.ok) {
        const data = await response.json();
        setPapers(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch research papers",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch research papers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (paper: ResearchPaper) => {
    setEditingPaper(paper);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingPaper) return;

    try {
      const response = await fetch('/api/admin/research', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPaper),
      });

      if (response.ok) {
        await fetchResearch();
        setIsDialogOpen(false);
        setEditingPaper(null);
        toast({
          title: "Success",
          description: "Research paper updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update research paper",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update research paper",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this research paper?')) return;

    try {
      const response = await fetch(`/api/admin/research?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchResearch();
        toast({
          title: "Success",
          description: "Research paper deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete research paper",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete research paper",
        variant: "destructive",
      });
    }
  };

  const filteredPapers = papers.filter(paper =>
    paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.authors.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

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
          <Link href="/admin-air-airlabalaba/research/new">
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
              <Input 
                placeholder="Search papers..." 
                className="max-w-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
              {filteredPapers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    {searchQuery ? 'No papers found matching your search.' : 'No research papers available.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredPapers.map((paper) => (
                <TableRow key={paper._id}>
                  <TableCell className="font-medium">{paper._id}</TableCell>
                  <TableCell className="max-w-xs truncate">{paper.title}</TableCell>
                  <TableCell>{paper.authors}</TableCell>
                  <TableCell>{paper.year}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      aria-label="Edit Paper"
                      onClick={() => handleEdit(paper)}
                    >
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Delete Paper"
                      onClick={() => handleDelete(paper._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Research Paper</DialogTitle>
            <DialogDescription>
              Make changes to the research paper details below.
            </DialogDescription>
          </DialogHeader>
          {editingPaper && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={editingPaper.title}
                  onChange={(e) => setEditingPaper({...editingPaper, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="authors" className="text-right">
                  Authors
                </Label>
                <Input
                  id="authors"
                  value={editingPaper.authors}
                  onChange={(e) => setEditingPaper({...editingPaper, authors: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <Input
                  id="year"
                  type="number"
                  value={editingPaper.year}
                  onChange={(e) => setEditingPaper({...editingPaper, year: parseInt(e.target.value)})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={editingPaper.description || ''}
                  onChange={(e) => setEditingPaper({...editingPaper, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={editingPaper.imageUrl}
                  onChange={(e) => setEditingPaper({...editingPaper, imageUrl: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fileUrl" className="text-right">
                  File URL
                </Label>
                <Input
                  id="fileUrl"
                  value={editingPaper.fileUrl}
                  onChange={(e) => setEditingPaper({...editingPaper, fileUrl: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleSave}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
