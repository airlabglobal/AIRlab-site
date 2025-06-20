"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Bot, FileText, Users, Newspaper, CalendarDays, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/layout/Logo';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import React, { useState, useEffect } from 'react';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: Bot },
  { href: '/admin/research', label: 'Research Papers', icon: FileText },
  { href: '/admin/team', label: 'Team Members', icon: Users },
  { href: '/admin/news', label: 'News & Events', icon: Newspaper },
  // { href: '/admin/settings', label: 'Settings', icon: Settings }, // Example for future
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  useEffect(() => {
    // Check local storage for sidebar state or default to false
    const storedSidebarState = localStorage.getItem('adminSidebarCollapsed');
    if (storedSidebarState) {
      setIsSidebarCollapsed(JSON.parse(storedSidebarState));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('adminSidebarCollapsed', JSON.stringify(newState));
  };

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
          <header className="flex h-20 items-center gap-4 border-b bg-background px-6 sticky top-0 z-30">
            {/* Can add breadcrumbs or user menu here */}
            <h1 className="font-headline text-xl font-semibold">Admin Dashboard</h1>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
