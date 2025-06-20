import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  asymmetric?: boolean; // Prop to enable asymmetric layout if needed at section level
}

export default function Section({ id, className, children, title, subtitle, titleClassName, asymmetric = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-12 md:py-16 lg:py-20', // Generous spacing
        className
      )}
    >
      {(title || subtitle) && (
        <div className={cn(
          "mb-8 md:mb-12 text-center",
          asymmetric ? "md:text-left" : "" // Example of asymmetry control
        )}>
          {subtitle && <p className="text-base md:text-lg text-accent font-medium mb-2 font-body">{subtitle}</p>}
          {title && <h2 className={cn("font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground", titleClassName)}>{title}</h2>}
        </div>
      )}
      <div className={cn(asymmetric ? "md:flex md:space-x-8" : "")}>
        {children}
      </div>
    </section>
  );
}
