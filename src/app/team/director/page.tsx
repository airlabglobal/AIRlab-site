import SafeImage from '@/components/ui/SafeImage'
import { BackButton } from '@/components/ui/back-button'
import { getDirector } from '@/lib/data-fetchers'

export default async function DirectorPage() {
  const director = await getDirector()

  if (!director) {
    return (
      <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-headline font-bold text-primary mb-4">Director information coming soon.</h1>
          <BackButton fallbackUrl="/team" />
        </div>
      </div>
    )
  }

  const paragraphs = director.about ? director.about.split('\n\n').filter(Boolean) : []

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <BackButton fallbackUrl="/" />
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          <div className="relative w-64 sm:w-72 md:w-80 aspect-square rounded-2xl md:rounded-tl-3xl md:rounded-br-3xl overflow-hidden shadow-xl border-4 border-primary/10 shrink-0 mx-auto md:mx-0 motion-safe:animate-slide-up">
            <SafeImage
              src={director.imageUrl}
              alt={director.name}
              fill
              quality={100}
              sizes="(max-width: 768px) 288px, 320px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1 space-y-4 motion-safe:animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">{director.name}</h1>
            <p className="text-lg font-semibold text-accent">{director.subtitle}</p>
            <p className="text-base text-muted-foreground">{director.affiliation}</p>
            <hr className="border-border" />
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
