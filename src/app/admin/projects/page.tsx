import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, Search, Bot } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Placeholder data
const projects = [
  { id: 'P001', title: 'AI-Powered Traffic Management', status: 'Ongoing', lastUpdated: '2024-07-20' },
  { id: 'P002', title: 'Robotic Assistant for Elderly Care', status: 'Completed', lastUpdated: '2024-05-15' },
  { id: 'P003', title: 'Precision Agriculture Drone', status: 'Ongoing', lastUpdated: '2024-07-25' },
];

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline text-3xl font-semibold flex items-center">
            <Bot className="mr-3 h-8 w-8 text-primary" /> Manage Projects
          </h2>
          <p className="text-muted-foreground font-body">Add, edit, or remove lab projects.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/admin/projects/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Project
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Project List</CardTitle>
          <CardDescription className="font-body">
            A list of all projects currently in the system.
            <div className="mt-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search projects..." className="max-w-sm" />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.id}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>
                    <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}
                           className={project.status === 'Completed' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-black'}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.lastUpdated}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" aria-label="Edit Project">
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Delete Project">
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
