import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Bot, FileText, Users, Newspaper, PlusCircle, Activity, BarChart3 } from 'lucide-react';

const summaryStats = [
  { title: "Total Projects", value: "4", icon: Bot, color: "text-primary", link: "/admin-air-airlabalaba/projects" },
  { title: "Research Papers", value: "6", icon: FileText, color: "text-accent", link: "/admin-air-airlabalaba/research" },
  { title: "Team Members", value: "13", icon: Users, color: "text-green-500", link: "/admin-air-airlabalaba/team" },
  { title: "News & Events", value: "3", icon: Newspaper, color: "text-orange-500", link: "/admin-air-airlabalaba/news" },
];

const quickActions = [
  { label: "Add New Project", icon: PlusCircle, link: "/admin-air-airlabalaba/projects/new" },
  { label: "Upload Research Paper", icon: PlusCircle, link: "/admin-air-airlabalaba/research/new" },
  { label: "Add Team Member", icon: PlusCircle, link: "/admin-air-airlabalaba/team/new" },
  { label: "Create News/Event", icon: PlusCircle, link: "/admin-air-airlabalaba/news/new" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-headline text-3xl font-semibold mb-6">Overview</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((stat) => (
            <Card key={stat.title} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-body">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-headline">{stat.value}</div>
                <Link href={stat.link} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  View all
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              <Activity className="mr-2 h-5 w-5 text-primary" /> Recent Activity
            </CardTitle>
            <CardDescription className="font-body">Latest updates and changes in the CMS.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Research paper 'Deep Learning for Medical Image Analysis' updated.",
                "New team member 'Jude Tochy' added to the roster.",
                "Project 'AI-Powered Traffic Management System' status changed to Ongoing."
              ].map((item, idx) => (
                 <li key={idx} className="text-sm font-body text-foreground/80 border-l-2 border-primary pl-3 py-1">{item}</li>
              ))}
            </ul>
             <Button variant="link" asChild className="mt-4 p-0 text-primary">
                <Link href="#">View all activity</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-accent" /> Content Statistics
            </CardTitle>
            <CardDescription className="font-body">Visual representation of content (Placeholder).</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground font-body text-sm">Chart placeholder</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
