import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { SocialLinks } from "@/data/socials";
import { Mail, PhoneCall } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted/50 text-muted-foreground py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link
            href={SocialLinks.x}
            aria-label="Twitter"
            className="hover:text-primary transition-colors"
          >
            <FaXTwitter className="h-6 w-6" />
          </Link>
          <Link
            href={SocialLinks.linkedin}
            aria-label="LinkedIn"
            className="hover:text-primary transition-colors"
          >
            <FaLinkedin className="h-6 w-6" />
          </Link>
          <Link
            href={SocialLinks.github}
            aria-label="GitHub"
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            <FaGithub className="h-6 w-6" />
          </Link>
          <Link
            href={SocialLinks.instagram}
            aria-label="Instagram"
            className="hover:text-primary transition-colors"
          >
            <FaInstagram className="h-6 w-6" />
          </Link>
          <Link
            href={SocialLinks.email}
            aria-label="Email"
            className="hover:text-primary transition-colors"
          >
            <Mail className="h-6 w-6" />
          </Link>
          <Link
            href={SocialLinks.phone}
            aria-label="Phone"
            className="hover:text-primary transition-colors"
          >
            <PhoneCall className="h-6 w-6" />
          </Link>
        </div>
        <p className="text-sm">
          &copy; {currentYear} AIRLAB. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          AI & Robotics Labs, Central Research Laboratory, University of Lagos,
          Akoka, Yaba, Lagos.
        </p>
      </div>
    </footer>
  );
}
