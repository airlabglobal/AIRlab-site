import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted/50 text-muted-foreground py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
            <Twitter className="h-6 w-6" />
          </Link>
          <Link href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors">
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link href="#" aria-label="GitHub" className="hover:text-primary transition-colors">
            <Github className="h-6 w-6" />
          </Link>
        </div>
        <p className="text-sm">
          &copy; {currentYear} Airlab. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Airlab - Artificial Intelligence & Robotics Laboratory, University of Lagos.
        </p>
      </div>
    </footer>
  );
}
