"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Bot, FileText, Users, Newspaper, CalendarDays, ChevronLeft, ChevronRight, Settings, Lock, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/layout/Logo';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState, useEffect } from 'react';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: Bot },
  { href: '/admin/research', label: 'Research Papers', icon: FileText },
  { href: '/admin/team', label: 'Team Members', icon: Users },
  { href: '/admin/news', label: 'News & Events', icon: Newspaper },
  // { href: '/admin/settings', label: 'Settings', icon: Settings }, // Example for future
];

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Check local storage for sidebar state or default to false
    const storedSidebarState = localStorage.getItem('adminSidebarCollapsed');
    if (storedSidebarState) {
      setIsSidebarCollapsed(JSON.parse(storedSidebarState));
    }
    
    // Check if user is already authenticated
    const authStatus = sessionStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('adminSidebarCollapsed', JSON.stringify(newState));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Show password wall if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-headline">Admin Access</CardTitle>
            <CardDescription className="font-body">
              Enter the password to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-center"
                  autoFocus
                />
                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Unlock Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-muted/40">
        <aside className={cn(
          "flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}>
          <div className={cn(
            "flex h-20 items-center border-b px-6 shrink-0",
            isSidebarCollapsed ? "justify-center" : "justify-between"
          )}>
            {!isSidebarCollapsed && <Logo />}
            {isSidebarCollapsed && <Bot className="h-8 w-8 text-primary" />}
          </div>
          <nav className="flex-grow px-4 py-6 space-y-2 overflow-y-auto">
            {adminNavItems.map((item) => (
              <Tooltip key={item.label} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10',
                      pathname === item.href && 'bg-primary/10 text-primary font-semibold',
                      isSidebarCollapsed && "justify-center"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                </TooltipTrigger>
                {isSidebarCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t">
            <Button variant="ghost" size={isSidebarCollapsed ? "icon" : "default"} onClick={toggleSidebar} className="w-full justify-center">
              {isSidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              {!isSidebarCollapsed && <span className="ml-2">Collapse</span>}
              <span className="sr-only">{isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
            </Button>
          </div>
        </aside>
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-20 items-center justify-between gap-4 border-b bg-background px-6 sticky top-0 z-30">
            <h1 className="font-headline text-xl font-semibold">Admin Dashboard</h1>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
