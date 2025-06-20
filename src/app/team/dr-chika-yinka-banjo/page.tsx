'use client'

import Image from 'next/image'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export default function DrChikaYinkaBanjoPage() {
  useEffect(() => {
    // Ensure AOS only runs on the client-side
    if (typeof window !== "undefined") {
      AOS.init({
        once: true,
        duration: 800,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* IMAGE SECTION */}
        <div className="relative w-full md:w-1/2 aspect-square rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-lg" data-aos="fade-up">
          <Image
            src="/images/image12.jpg" // Make sure this image exists in public/images/
            alt="Dr. Chika Yinka-Banjo"
            fill
            className="object-cover"
          />
        </div>

        {/* TEXT SECTION */}
        <div className="w-full md:w-1/2 space-y-4">
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
