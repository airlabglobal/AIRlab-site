"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, Search, Clock, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
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

interface HistoryItem {
  id?: string;
  year: string;
  event: string;
  description: string;
  image?: string;
  link?: string;
}

function HistoryTableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-96" />
          <div className="flex space-x-2 ml-auto">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminHistoryPage() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<HistoryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHistoryItems();
  }, []);

  const fetchHistoryItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/history');
      if (response.ok) {
        const result = await response.json();
        setHistoryItems(result.data || []);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch history items",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch history items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: HistoryItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      const response = await fetch('/api/admin/history', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingItem),
      });

      if (response.ok) {
        await fetchHistoryItems();
        setIsDialogOpen(false);
        setEditingItem(null);
        toast({
          title: "Success",
          description: "History item updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update history item",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to update history item",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this history item?')) return;

    try {
      const response = await fetch(`/api/admin/history?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchHistoryItems();
        toast({
          title: "Success",
          description: "History item deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete history item",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete history item",
        variant: "destructive",
      });
    }
  };

  const filteredItems = historyItems.filter(item =>
    item.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="font-headline text-3xl font-semibold flex items-center">
              <Clock className="mr-3 h-8 w-8 text-primary" /> Manage History
            </h2>
            <p className="text-muted-foreground font-body">Add, edit, or remove AIRLAB history items.</p>
          </div>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/admin-air-airlabalaba/history/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Add History Item
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">History Items</CardTitle>
          <CardDescription className="font-body">
            All AIRLAB history milestones and events.
            <div className="mt-4 flex items-center gap-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search history..." 
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <HistoryTableSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      {searchTerm ? 'No history items found matching your search.' : 'No history items available.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                  <TableRow key={item.id || `${item.year}-${item.event}`}>
                    <TableCell className="font-medium">{item.year}</TableCell>
                    <TableCell className="font-medium">{item.event}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate">{item.description}</p>
                    </TableCell>
                    <TableCell>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Link
                        </a>
                      ) : (
                        <span className="text-muted-foreground">No link</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(item.id || `${item.year}-${item.event}`)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
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
            <DialogTitle>Edit History Item</DialogTitle>
            <DialogDescription>
              Make changes to the history item details below.
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <Input
                  id="year"
                  value={editingItem.year}
                  onChange={(e) => setEditingItem({...editingItem, year: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event" className="text-right">
                  Event
                </Label>
                <Input
                  id="event"
                  value={editingItem.event}
                  onChange={(e) => setEditingItem({...editingItem, event: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                  className="col-span-3"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link" className="text-right">
                  Link
                </Label>
                <Input
                  id="link"
                  value={editingItem.link || ''}
                  onChange={(e) => setEditingItem({...editingItem, link: e.target.value})}
                  className="col-span-3"
                  placeholder="https://example.com"
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