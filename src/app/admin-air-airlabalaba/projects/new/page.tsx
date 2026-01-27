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
import { Bot, Plus } from 'lucide-react';

interface NewProject {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  status: string;
  link: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<NewProject>({
    title: '',
    description: '',
    imageUrl: '',
    imageHint: '',
    tags: [],
    status: 'Ongoing',
    link: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Project added successfully",
        });
        router.push('/admin-air-airlabalaba/projects');
      } else {
        toast({
          title: "Error",
          description: "Failed to add project",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton fallbackUrl="/admin-air-airlabalaba/projects" />
        <div>
          <h2 className="font-headline text-3xl font-semibold flex items-center">
            <Bot className="mr-3 h-8 w-8 text-primary" /> Add New Project
          </h2>
          <p className="text-muted-foreground font-body">Create a new project entry in the system.</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Project Details</CardTitle>
          <CardDescription className="font-body">
            Fill in the information for the new project.
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
                  value={project.title}
                  onChange={(e) => setProject({...project, title: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={project.description}
                  onChange={(e) => setProject({...project, description: e.target.value})}
                  className="col-span-3"
                  placeholder="Describe the project objectives and scope..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status *
                </Label>
                <Input
                  id="status"
                  value={project.status}
                  onChange={(e) => setProject({...project, status: e.target.value})}
                  className="col-span-3"
                  placeholder="e.g., Ongoing, Completed, Planning"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">
                  Tags
                </Label>
                <Input
                  id="tags"
                  value={project.tags.join(', ')}
                  onChange={(e) => setProject({...project, tags: e.target.value.split(', ').filter(tag => tag.trim())})}
                  className="col-span-3"
                  placeholder="AI, Machine Learning, Research (separate with commas)"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={project.imageUrl}
                  onChange={(e) => setProject({...project, imageUrl: e.target.value})}
                  className="col-span-3"
                  placeholder="https://example.com/project-image.jpg"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageHint" className="text-right">
                  Image Alt Text
                </Label>
                <Input
                  id="imageHint"
                  value={project.imageHint}
                  onChange={(e) => setProject({...project, imageHint: e.target.value})}
                  className="col-span-3"
                  placeholder="Brief description of the image for accessibility"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link" className="text-right">
                  Project Link
                </Label>
                <Input
                  id="link"
                  value={project.link}
                  onChange={(e) => setProject({...project, link: e.target.value})}
                  className="col-span-3"
                  placeholder="https://github.com/project-repo or project page URL"
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
                    <Plus className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
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