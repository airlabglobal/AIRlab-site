import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <Image
        src="/images/Airlab_Logo-removebg-preview.png"
        alt="Airlab Logo"
        width={40}
        height={40}
        className="transition-transform group-hover:rotate-[15deg] group-hover:scale-110"
      />
      <span className="font-headline text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
        AIRLab
      </span>
    </Link>
  );
}
