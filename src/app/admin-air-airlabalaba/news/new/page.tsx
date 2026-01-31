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
import { Newspaper, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NewNewsItem {
  title: string;
  content: string;
  type: 'News' | 'Event';
  date: string;
  imageUrl: string;
  author: string;
}

export default function NewNewsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [newsItem, setNewsItem] = useState<NewNewsItem>({
    title: '',
    content: '',
    type: 'News',
    date: new Date().toISOString().split('T')[0],
    imageUrl: '',
    author: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsItem),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "News item created successfully",
        });
        router.push('/admin-air-airlabalaba/news');
      } else {
        toast({
          title: "Error",
          description: "Failed to create news item",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create news item",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton fallbackUrl="/admin-air-airlabalaba/news" />
        <div>
          <h2 className="font-headline text-3xl font-semibold flex items-center">
            <Newspaper className="mr-3 h-8 w-8 text-primary" /> Create News Item
          </h2>
          <p className="text-muted-foreground font-body">Add a new news article or event to the system.</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">News Item Details</CardTitle>
          <CardDescription className="font-body">
            Fill in the information for the new news item or event.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type *
                </Label>
                <Select 
                  value={newsItem.type} 
                  onValueChange={(value: 'News' | 'Event') => setNewsItem({...newsItem, type: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="News">News</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={newsItem.title}
                  onChange={(e) => setNewsItem({...newsItem, title: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content *
                </Label>
                <Textarea
                  id="content"
                  value={newsItem.content}
                  onChange={(e) => setNewsItem({...newsItem, content: e.target.value})}
                  className="col-span-3"
                  placeholder="Write the full content of the news article or event description..."
                  rows={6}
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newsItem.date}
                  onChange={(e) => setNewsItem({...newsItem, date: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  Author
                </Label>
                <Input
                  id="author"
                  value={newsItem.author}
                  onChange={(e) => setNewsItem({...newsItem, author: e.target.value})}
                  className="col-span-3"
                  placeholder="Author name"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={newsItem.imageUrl}
                  onChange={(e) => setNewsItem({...newsItem, imageUrl: e.target.value})}
                  className="col-span-3"
                  placeholder="https://example.com/news-image.jpg"
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
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create {newsItem.type}
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