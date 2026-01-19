'use client'

import Image from 'next/image'

export default function DrChikaYinkaBanjoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* IMAGE SECTION */}
        <div className="relative w-full md:w-1/2 aspect-square rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-lg motion-safe:animate-slide-up">
          <Image
            src="/images/image12.jpg"
            alt="Dr. Chika Yinka-Banjo"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        {/* TEXT SECTION */}
        <div className="w-full md:w-1/2 space-y-4 motion-safe:animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">Dr. Chika Yinka-Banjo</h1>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            Dr. Chika Yinka-Banjo is a pioneering figure in robotics and artificial intelligence in Nigeria.
            With a passion for advancing technological education and empowering the next generation of innovators,
            she has led numerous research projects that focus on intelligent systems, human-robot interaction, and AI for social good.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            As a Senior Lecturer at the University of Lagos, she mentors students, conducts cutting-edge research, 
            and collaborates with global institutions. Her dedication to bridging the gender gap in STEM has inspired 
            countless young women across Africa to pursue careers in technology and robotics.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            Dr. Banjo also contributes to various innovation hubs and policy advisory boards, working tirelessly 
            to ensure AI is used ethically and inclusively. Her vision is a Nigeria where technological advancement 
            uplifts communities and transforms education, agriculture, and healthcare.
          </p>
        </div>
      </div>
    </div>
  );
}
