'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Bot, FileText, Users, Newspaper, PlusCircle, BarChart3, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { safeFetch } from '@/lib/fetch-utils';

interface Stats {
  projects: number;
  research: number;
  team: number;
  news: number;
  history: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    research: 0,
    team: 0,
    news: 0,
    history: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsData, researchData, teamData, newsData, historyData] = await Promise.all([
        safeFetch('/api/admin/projects'),
        safeFetch('/api/admin/research'),
        safeFetch('/api/admin/team?category=all'),
        safeFetch('/api/admin/news'),
        safeFetch('/api/admin/history'),
      ]);

      // Calculate team count from all categories
      let teamCount = 0;
      if (teamData.data) {
        if (Array.isArray(teamData.data)) {
          teamCount = teamData.data.length;
        } else {
          // If it's an object with categories
          teamCount = (teamData.data.leading?.length || 0) + 
                     (teamData.data.pioneer?.length || 0) + 
                     (teamData.data.volunteers?.length || 0);
        }
      }

      setStats({
        projects: projectsData.data?.length || 0,
        research: researchData.data?.length || 0,
        team: teamCount,
        news: newsData.data?.length || 0,
        history: historyData.data?.length || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const summaryStats = [
    { title: "Total Projects", value: stats.projects, icon: Bot, color: "text-primary", link: "/admin/projects" },
    { title: "Research Papers", value: stats.research, icon: FileText, color: "text-accent", link: "/admin/research" },
    { title: "Team Members", value: stats.team, icon: Users, color: "text-green-500", link: "/admin/team" },
    { title: "News & Events", value: stats.news, icon: Newspaper, color: "text-orange-500", link: "/admin/news" },
    { title: "History Items", value: stats.history, icon: Clock, color: "text-purple-500", link: "/admin/history" },
  ];

  const quickActions = [
    { label: "Add New Project", icon: PlusCircle, link: "/admin/projects/new" },
    { label: "Upload Research Paper", icon: PlusCircle, link: "/admin/research/new" },
    { label: "Add Team Member", icon: PlusCircle, link: "/admin/team/new" },
    { label: "Create News/Event", icon: PlusCircle, link: "/admin/news/new" },
    { label: "Add History Item", icon: PlusCircle, link: "/admin/history/new" },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-headline text-3xl font-semibold mb-6">Overview</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {summaryStats.map((stat) => (
            <Card key={stat.title} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-body">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-10 w-16" />
                ) : (
                  <>
                    <div className="text-3xl font-bold font-headline mb-2">{stat.value}</div>
                    <Button asChild variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
                      <Link href={stat.link}>
                        View all →
                      </Link>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {quickActions.map((action) => (
            <Button key={action.label} asChild variant="outline" size="lg" className="justify-start text-left h-auto py-4 shadow hover:shadow-md transition-shadow">
              <Link href={action.link}>
                <action.icon className="h-6 w-6 mr-3 text-primary" />
                <div>
                  <span className="block font-semibold font-body">{action.label}</span>
                  <span className="block text-xs text-muted-foreground">Click to manage</span>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-accent" /> Content Summary
            </CardTitle>
            <CardDescription className="font-body">Overview of your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-body">Projects</span>
                <span className="text-2xl font-bold font-headline text-primary">{stats.projects}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-body">Research Papers</span>
                <span className="text-2xl font-bold font-headline text-accent">{stats.research}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-body">Team Members</span>
                <span className="text-2xl font-bold font-headline text-green-500">{stats.team}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-body">News & Events</span>
                <span className="text-2xl font-bold font-headline text-orange-500">{stats.news}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-body">History Items</span>
                <span className="text-2xl font-bold font-headline text-purple-500">{stats.history}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Getting Started</CardTitle>
            <CardDescription className="font-body">Manage your AIRLAB content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-body font-semibold mb-1">Add Content</p>
                <p className="text-xs text-muted-foreground">Use the quick actions above to add projects, research, team members, news, and history items.</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-body font-semibold mb-1">Edit Content</p>
                <p className="text-xs text-muted-foreground">Click "View all" on any stat card to manage existing content.</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-body font-semibold mb-1">Live Updates</p>
                <p className="text-xs text-muted-foreground">All changes are immediately visible on your public website.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
