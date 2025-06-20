"use client";

import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    // Placeholder for form submission logic
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    reset();
  };

  return (
    <PageWrapper>
      <Section title="Get In Touch" subtitle="Contact Airlab">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-headline text-2xl font-semibold text-primary mb-4">Contact Details</h3>
              <p className="font-body text-foreground/80 mb-6">
                We are always excited to hear from prospective students, researchers, industry partners, and the general public.
                Feel free to reach out to us through any of the channels below.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-foreground/70 font-body">AI & Robotics Labs, Central Research Laboratory, University of Lagos, Akoka, Yaba, Lagos.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a href="mailto:info@airlab.unilag.edu.ng" className="text-foreground/70 hover:text-primary font-body transition-colors">airol@unilag.edu.ng</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-foreground/70 font-body">+(234) 803 342 4289</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-headline text-2xl font-semibold text-primary mb-4">Find Us</h3>
              <Card className="overflow-hidden shadow-lg">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.032421815625!2d3.395965274805819!3d6.517580193474897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8db55890da71%3A0x9a1a2cd46c904a86!2sD.K.%20Olukoya%20Central%20Research%20%26%20Reference%20Laboratories!5e0!3m2!1sen!2sng!4v1749596127289!5m2!1sen!2sng"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Airlab Location"
                className="w-full h-full object-cover"
                data-ai-hint="university map"
              />
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="shadow-xl p-6 md:p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="font-headline text-2xl text-center md:text-left">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <form
                  action="https://formsubmit.co/Lawalgiyath200716@gmail.com"
                  method="POST"
                  className="space-y-6"
                >
                  <input type="hidden" name="_captcha" value="false" />
                  
                  <div>
                    <Label htmlFor="name" className="font-headline">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" className="mt-1" required />
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-headline">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" className="mt-1" required />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="font-headline">Subject</Label>
                    <Input id="subject" name="subject" placeholder="Inquiry about research collaboration" className="mt-1" required />
                  </div>

                  <div>
                    <Label htmlFor="message" className="font-headline">Message</Label>
                    <Textarea id="message" name="message" rows={5} placeholder="Your message here..." className="mt-1" required />
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>

              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
}
