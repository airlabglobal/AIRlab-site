// Similar structure to AdminProjectsPage for brevity
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, Search, Newspaper } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const newsItems = [
  { id: 'N001', title: 'AIROL Hosts Workshop on AI Ethics', type: 'Event', date: '2024-08-15' },
  { id: 'N002', title: 'New Grant Awarded for Robotics Research', type: 'News', date: '2024-07-10' },
];

export default function AdminNewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline text-3xl font-semibold flex items-center">
            <Newspaper className="mr-3 h-8 w-8 text-primary" /> Manage News & Events
          </h2>
          <p className="text-muted-foreground font-body">Create, edit, or remove news articles and event listings.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/admin/news/new">
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
              <Input placeholder="Search news/events..." className="max-w-sm" />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              {newsItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                     <Badge variant={item.type === 'Event' ? 'secondary' : 'outline'}
                            className={item.type === 'Event' ? 'bg-purple-500 text-white' : 'border-blue-500 text-blue-500'}>
                        {item.type}
                     </Badge>
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" aria-label="Edit Item">
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Delete Item">
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
