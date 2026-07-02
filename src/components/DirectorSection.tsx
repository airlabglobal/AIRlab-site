import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { getDirector } from '@/lib/data-fetchers'

export default async function DirectorSection() {
  const director = await getDirector()

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 opacity-0 animate-slide-up">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3">
            Meet Our Lab Director
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Guiding Our Research Efforts
          </p>
        </div>
        {director ? (
          <div className="grid md:grid-cols-5 gap-12 items-center bg-card p-8 rounded-xl shadow-xl overflow-hidden">
            <div className="md:col-span-2 opacity-0 animate-slide-in-from-left">
              <Image
                src={director.imageUrl}
                alt={director.name}
                width={800}
                height={800}
                quality={100}
                priority
                className="rounded-full mx-auto md:mx-0 shadow-lg object-cover w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
              />
            </div>
            <div className="md:col-span-3 opacity-0 animate-slide-in-from-right">
              <h3 className="font-headline text-3xl lg:text-4xl font-semibold text-primary mb-3">
                {director.name}
              </h3>
              <p className="font-body text-lg text-accent font-medium mb-4">
                {director.subtitle}
              </p>
              <p className="font-body text-foreground/80 mb-6 text-base lg:text-lg">
                {director.bio}
              </p>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Link href="/team/director">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-xl shadow-xl">
            <p className="text-muted-foreground text-lg">No Director Added</p>
          </div>
        )}
      </div>
    </section>
  )
}
