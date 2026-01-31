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
import { Users, UserPlus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NewTeamMember {
  name: string;
  role: string;
  email: string;
  imageUrl: string;
  bio: string;
  linkedin: string;
  twitter: string;
}

export default function NewTeamMemberPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>('leading');
  const [member, setMember] = useState<NewTeamMember>({
    name: '',
    role: '',
    email: '',
    imageUrl: '',
    bio: '',
    linkedin: '',
    twitter: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...member, category }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Team member added successfully",
        });
        router.push('/admin-air-airlabalaba/team');
      } else {
        toast({
          title: "Error",
          description: "Failed to add team member",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add team member",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton fallbackUrl="/admin-air-airlabalaba/team" />
        <div>
          <h2 className="font-headline text-3xl font-semibold flex items-center">
            <Users className="mr-3 h-8 w-8 text-primary" /> Add New Team Member
          </h2>
          <p className="text-muted-foreground font-body">Add a new member to the team roster.</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Team Member Details</CardTitle>
          <CardDescription className="font-body">
            Fill in the information for the new team member.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category *
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select team category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leading">Leading Team</SelectItem>
                    <SelectItem value="pioneer">Pioneer Team</SelectItem>
                    <SelectItem value="volunteers">Volunteers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name *
                </Label>
                <Input
                  id="name"
                  value={member.name}
                  onChange={(e) => setMember({...member, name: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role *
                </Label>
                <Input
                  id="role"
                  value={member.role}
                  onChange={(e) => setMember({...member, role: e.target.value})}
                  className="col-span-3"
                  placeholder="e.g., Research Director, PhD Student"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={member.email}
                  onChange={(e) => setMember({...member, email: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={member.bio}
                  onChange={(e) => setMember({...member, bio: e.target.value})}
                  className="col-span-3"
                  placeholder="Brief biography and research interests..."
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={member.imageUrl}
                  onChange={(e) => setMember({...member, imageUrl: e.target.value})}
                  className="col-span-3"
                  placeholder="https://example.com/profile-photo.jpg"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="linkedin" className="text-right">
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={member.linkedin}
                  onChange={(e) => setMember({...member, linkedin: e.target.value})}
                  className="col-span-3"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="twitter" className="text-right">
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  value={member.twitter}
                  onChange={(e) => setMember({...member, twitter: e.target.value})}
                  className="col-span-3"
                  placeholder="https://twitter.com/username"
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
                    <UserPlus className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Team Member
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