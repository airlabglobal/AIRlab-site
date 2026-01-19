// Similar structure to AdminProjectsPage for brevity
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const teamMembers = [
  { id: 'T001', name: 'Dr. Adaeze Nwosu', role: 'Director', email: 'ada.n@example.com', imageUrl: 'https://placehold.co/40x40.png' },
  { id: 'T002', name: 'Prof. Chinedu Okeke', role: 'Senior Researcher', email: 'chin.o@example.com', imageUrl: 'https://placehold.co/40x40.png' },
];

export default function AdminTeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline text-3xl font-semibold flex items-center">
            <Users className="mr-3 h-8 w-8 text-primary" /> Manage Team Members
          </h2>
          <p className="text-muted-foreground font-body">Add, edit, or remove team member profiles.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/admin/team/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Add Team Member
          </Link>
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Team Member List</CardTitle>
          <CardDescription className="font-body">
            All team members in the system.
            <div className="mt-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search members..." className="max-w-sm" />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint="person avatar" />
                      <AvatarFallback>{member.name.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" aria-label="Edit Member">
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Delete Member">
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
