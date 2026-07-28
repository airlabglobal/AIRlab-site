import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { SocialLinks } from "@/data/socials";
import { Mail, MapPin, PhoneCall } from "lucide-react";

const exploreLinks = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/news", label: "News & Events" },
];

const involvedLinks = [
  { href: "/contact", label: "Prospective Students" },
  { href: "/research", label: "Research Collaboration" },
  { href: "/contact", label: "Industry Partnerships" },
  { href: "/contact", label: "Community Outreach" },
];

const socialIcons = [
  { href: SocialLinks.x, label: "X (Twitter)", Icon: FaXTwitter },
  { href: SocialLinks.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { href: SocialLinks.github, label: "GitHub", Icon: FaGithub, external: true },
  { href: SocialLinks.instagram, label: "Instagram", Icon: FaInstagram },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center space-x-2 group w-fit">
              <Image
                src="/images/main_logo.png"
                alt="AIRLAB Logo"
                width={36}
                height={36}
              />
              <span className="font-headline text-xl font-bold text-foreground">
                AIRLAB
              </span>
            </Link>
            <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed">
              The Artificial Intelligence &amp; Robotics Laboratory at the
              University of Lagos — advancing research and nurturing the next
              generation of innovators, from curious young minds to graduate
              researchers.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              {socialIcons.map(({ href, label, Icon, external }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-headline text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-headline text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Get Involved
            </h3>
            <ul className="space-y-3">
              {involvedLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-headline text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>Central Research Laboratory, University of Lagos, Akoka, Yaba, Lagos.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <Link href={SocialLinks.email} className="hover:text-primary transition-colors">
                  airol@unilag.edu.ng
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="h-4 w-4 shrink-0 text-primary" />
                <Link href={SocialLinks.phone} className="hover:text-primary transition-colors">
                  +234 809 058 2025
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>&copy; {currentYear} AIRLAB, University of Lagos. All rights reserved.</p>
          <Link href="/admin" className="hover:text-primary transition-colors">
            Staff Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
