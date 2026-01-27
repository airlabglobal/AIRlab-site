"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, Search, Newspaper } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { BackButton } from '@/components/ui/back-button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  type: 'News' | 'Event';
  date: string;
  imageUrl?: string;
  author?: string;
}

function NewsTableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-24" />
          <div className="flex space-x-2 ml-auto">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminNewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/admin/news');
      if (response.ok) {
        const data = await response.json();
        setNewsItems(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch news items",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch news items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      const response = await fetch('/api/admin/news', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingItem),
      });

      if (response.ok) {
        await fetchNews();
        setIsDialogOpen(false);
        setEditingItem(null);
        toast({
          title: "Success",
          description: "News item updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update news item",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update news item",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;

    try {
      const response = await fetch(`/api/admin/news?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchNews();
        toast({
          title: "Success",
          description: "News item deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete news item",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete news item",
        variant: "destructive",
      });
    }
  };

  const filteredItems = newsItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h2 className="font-headline text-3xl font-semibold flex items-center">
              <Newspaper className="mr-3 h-8 w-8 text-primary" /> Manage News & Events
            </h2>
            <p className="text-muted-foreground font-body">Create, edit, or remove news articles and event listings.</p>
          </div>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/admin-air-airlabalaba/news/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Item
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">News & Events List</CardTitle>
          <CardDescription className="font-body">
            All news articles and events.
            <div className="mt-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search news/events..." 
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <NewsTableSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      {searchTerm ? 'No items found matching your search.' : 'No news items available.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell className="max-w-xs truncate">{item.title}</TableCell>
                    <TableCell>
                      <Badge variant={item.type === 'Event' ? 'secondary' : 'outline'}
                             className={item.type === 'Event' ? 'bg-purple-500 text-white' : 'border-blue-500 text-blue-500'}>
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        aria-label="Edit Item"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        aria-label="Delete Item"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit News Item</DialogTitle>
            <DialogDescription>
              Make changes to the news item details below.
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={editingItem.content}
                  onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select 
                  value={editingItem.type} 
                  onValueChange={(value: 'News' | 'Event') => setEditingItem({...editingItem, type: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="News">News</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={editingItem.date}
                  onChange={(e) => setEditingItem({...editingItem, date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={editingItem.imageUrl || ''}
                  onChange={(e) => setEditingItem({...editingItem, imageUrl: e.target.value})}
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
