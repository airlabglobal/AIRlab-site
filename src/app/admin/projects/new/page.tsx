"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { BackButton } from '@/components/ui/back-button';
import { Badge } from '@/components/ui/badge';
import { Bot, Plus, X } from 'lucide-react';

interface NewProject {
  title: string;
  description: string;
  abstract: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  status: string;
  link: string;
  paperUrl: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [project, setProject] = useState<NewProject>({
    title: '',
    description: '',
    abstract: '',
    imageUrl: '',
    imageHint: '',
    tags: [],
    status: 'Ongoing',
    link: '',
    paperUrl: '',
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
        router.push('/admin/projects');
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "Failed to add project",
          variant: "destructive",
        });
        console.error('Validation errors:', errorData.details);
      }
    } catch {
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
        <BackButton fallbackUrl="/admin" />
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
                <Label htmlFor="abstract" className="text-right">
                  Abstract
                </Label>
                <Textarea
                  id="abstract"
                  value={project.abstract}
                  onChange={(e) => setProject({...project, abstract: e.target.value})}
                  className="col-span-3"
                  rows={6}
                  placeholder="Detailed abstract or summary of the project (optional)..."
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status *
                </Label>
                <Select 
                  value={project.status} 
                  onValueChange={(value) => setProject({...project, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Research Phase">Research Phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="tags" className="text-right pt-3">
                  Tags
                </Label>
                <div className="col-span-3 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1 text-sm py-1 px-3 bg-accent/10 text-accent hover:bg-accent/20">
                        {tag}
                        <button
                          type="button"
                          onClick={() => {
                            setProject({
                              ...project,
                              tags: project.tags.filter((_, i) => i !== index)
                            });
                          }}
                          className="text-accent/70 hover:text-accent rounded-full p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag} tag</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Input
                    id="tags"
                    value={tagInput}
                    disabled={project.tags.length >= 5}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.includes(',')) {
                        const newTags = value.split(',')
                          .map(t => t.trim())
                          .filter(t => t !== '' && !project.tags.includes(t));
                        if (newTags.length > 0) {
                          const availableSlots = 5 - project.tags.length;
                          const tagsToAdd = newTags.slice(0, availableSlots);
                          setProject({
                            ...project,
                            tags: [...project.tags, ...tagsToAdd]
                          });
                        }
                        setTagInput('');
                      } else {
                        setTagInput(value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const trimmed = tagInput.trim();
                        if (trimmed && !project.tags.includes(trimmed) && project.tags.length < 5) {
                          setProject({
                            ...project,
                            tags: [...project.tags, trimmed]
                          });
                        }
                        setTagInput('');
                      } else if (e.key === 'Backspace' && tagInput === '' && project.tags.length > 0) {
                        setProject({
                          ...project,
                          tags: project.tags.slice(0, -1)
                        });
                      }
                    }}
                    placeholder={project.tags.length >= 5 ? "Maximum 5 tags reached" : "Type a tag and press comma or enter..."}
                  />
                </div>
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
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paperUrl" className="text-right">
                  Paper URL
                </Label>
                <Input
                  id="paperUrl"
                  value={project.paperUrl}
                  onChange={(e) => setProject({...project, paperUrl: e.target.value})}
                  className="col-span-3"
                  placeholder="https://example.com/research-paper.pdf (optional)"
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