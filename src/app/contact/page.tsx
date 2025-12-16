"use client";

import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { LoadingButton } from '@/components/ui/LoadingStates';
import SectionErrorBoundary from '@/components/error/SectionErrorBoundary';
import { errorMonitor } from '@/lib/errorMonitoring';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, just log the form data and show success
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      errorMonitor.logError(
        error instanceof Error ? error : new Error('Form submission failed'),
        undefined,
        { context: 'contact-form', formData }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <Section title="Contact Us" subtitle="Get in Touch with AIRLAB">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          We welcome inquiries from prospective students, researchers, industry partners, and anyone interested 
          in our work. Reach out to us to explore collaboration opportunities or learn more about AIRLAB.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-headline text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-muted-foreground">
                      Department of Computer Science<br />
                      University of Lagos<br />
                      Akoka, Lagos State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      <a href="mailto:airlab@unilag.edu.ng" className="hover:text-primary transition-colors">
                        airlab@unilag.edu.ng
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-muted-foreground">+234 (0) 1 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Office Hours</h4>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">For Students</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Interested in joining our research programs?
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="mailto:admissions@airlab.unilag.edu.ng">
                      Student Inquiries
                    </a>
                  </Button>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">For Researchers</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Looking to collaborate on research projects?
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="mailto:research@airlab.unilag.edu.ng">
                      Research Collaboration
                    </a>
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">For Industry Partners</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Interested in industry partnerships?
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="mailto:partnerships@airlab.unilag.edu.ng">
                      Industry Partnerships
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <SectionErrorBoundary 
            sectionName="Contact Form"
            onError={(error, errorInfo) => {
              errorMonitor.logError(error, errorInfo, { 
                context: 'contact-page',
                section: 'contact-form'
              });
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-green-800 text-sm">
                        Thank you for your message! We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800 text-sm">
                        Sorry, there was an error sending your message. Please try again.
                      </p>
                    </div>
                  )}

                  <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </LoadingButton>
                </form>
              </CardContent>
            </Card>
          </SectionErrorBoundary>
        </div>
      </Section>
    </PageWrapper>
  );
}