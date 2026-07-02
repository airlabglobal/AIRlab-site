"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { BackButton } from '@/components/ui/back-button';
import { UserCog, Save } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface DirectorForm {
  name: string;
  subtitle: string;
  affiliation: string;
  imageUrl: string;
  bio: string;
  about: string;
}

const defaultForm: DirectorForm = {
  name: '',
  subtitle: '',
  affiliation: '',
  imageUrl: '',
  bio: '',
  about: '',
};

export default function AdminDirectorPage() {
  const [form, setForm] = useState<DirectorForm>(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDirector();
  }, []);

  const fetchDirector = async () => {
    try {
      const response = await fetch('/api/admin/director');
      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          setForm(result.data);
        }
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch director data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/director', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Director profile updated successfully",
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.details?.[0]?.message || errorData.error || "Failed to update",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
        </div>
        <Card>
          <CardContent className="p-8 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton fallbackUrl="/admin" />
        <div>
          <h2 className="font-headline text-3xl font-semibold flex items-center">
            <UserCog className="mr-3 h-8 w-8 text-primary" /> Edit Director Profile
          </h2>
          <p className="text-muted-foreground font-body">
            Manage the lab director's information displayed on the homepage and team profile page.
          </p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Director Details</CardTitle>
          <CardDescription className="font-body">
            Update the lab director's name, titles, bio, and photo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right font-headline">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="col-span-3"
                  placeholder="Prof. Chika Yinka-Banjo"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subtitle" className="text-right font-headline">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="col-span-3"
                  placeholder="Director, AI & Robotics Lab | Acting HOD, Computer Science"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="affiliation" className="text-right font-headline">Affiliation</Label>
                <Input
                  id="affiliation"
                  value={form.affiliation}
                  onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
                  className="col-span-3"
                  placeholder="University of Lagos"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right font-headline">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="col-span-3"
                  placeholder="/images/image12.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="font-headline">Homepage Bio</Label>
              <p className="text-sm text-muted-foreground font-body">
                Shorter bio shown on the homepage.
              </p>
              <Textarea
                id="bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="min-h-[120px]"
                placeholder="Brief biography for the homepage..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about" className="font-headline">Detail Page Bio</Label>
              <p className="text-sm text-muted-foreground font-body">
                Full biography shown on the /team/director page. Use double newlines to separate paragraphs.
              </p>
              <Textarea
                id="about"
                value={form.about}
                onChange={(e) => setForm({ ...form, about: e.target.value })}
                className="min-h-[200px]"
                placeholder="Full biography for the director profile page..."
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
