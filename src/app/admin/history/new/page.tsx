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
import { Clock, Plus } from 'lucide-react';

interface NewHistoryItem {
  year: string;
  event: string;
  description: string;
  image?: string;
  link?: string;
}

export default function NewHistoryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [historyItem, setHistoryItem] = useState<NewHistoryItem>({
    year: new Date().getFullYear().toString(),
    event: '',
    description: '',
    image: '',
    link: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(historyItem),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "History item added successfully",
        });
        router.push('/admin/history');
      } else {
        toast({
          title: "Error",
          description: "Failed to add history item",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to add history item",
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
            <Clock className="mr-3 h-8 w-8 text-primary" /> Add New History Item
          </h2>
          <p className="text-muted-foreground font-body">Add a new milestone to AIRLAB&apos;s history.</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">History Item Details</CardTitle>
          <CardDescription className="font-body">
            Fill in the information for the new history milestone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year *
                </Label>
                <Input
                  id="year"
                  value={historyItem.year}
                  onChange={(e) => setHistoryItem({ ...historyItem, year: e.target.value })}
                  className="col-span-3"
                  placeholder="2024 or Present"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event" className="text-right">
                  Event Title *
                </Label>
                <Input
                  id="event"
                  value={historyItem.event}
                  onChange={(e) => setHistoryItem({ ...historyItem, event: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., Foundation of AIRLAB"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={historyItem.description}
                  onChange={(e) => setHistoryItem({ ...historyItem, description: e.target.value })}
                  className="col-span-3"
                  rows={4}
                  placeholder="Detailed description of the event..."
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link" className="text-right">
                  Link URL
                </Label>
                <Input
                  id="link"
                  value={historyItem.link || ''}
                  onChange={(e) => setHistoryItem({ ...historyItem, link: e.target.value })}
                  className="col-span-3"
                  placeholder="https://example.com/more-info (optional)"
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
                    Add History Item
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
