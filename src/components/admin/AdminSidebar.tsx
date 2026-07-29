"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Bot,
  FileText,
  Users,
  Newspaper,
  Clock,
  UserCog,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3, exact: true },
  { href: '/admin/projects', label: 'Projects', icon: Bot },
  { href: '/admin/research', label: 'Research', icon: FileText },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/news', label: 'News & Events', icon: Newspaper },
  { href: '/admin/history', label: 'History', icon: Clock },
  { href: '/admin/director', label: 'Director', icon: UserCog },
];

interface AdminSidebarProps {
  onNavigate?: () => void;
  onLogout: () => void;
}

export default function AdminSidebar({ onNavigate, onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex items-center gap-2 px-6 h-20 border-b border-border shrink-0">
        <Image src="/images/main_logo.png" alt="AIRLAB Logo" width={32} height={32} />
        <div>
          <p className="font-headline text-base font-bold leading-tight text-foreground">AIRLAB</p>
          <p className="text-xs text-muted-foreground leading-tight">Admin Console</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {adminNavItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3 space-y-1 shrink-0">
        <Link
          href="/"
          target="_blank"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          View Public Site
        </Link>
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2.5 h-auto text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Logout
        </Button>
      </div>
    </div>
  );
}
