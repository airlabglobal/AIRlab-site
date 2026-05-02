'use client';
import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Layers, FileText, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const projects = initialProjects;
  const hasProjects = projects.length > 0;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <PageWrapper>
      <Section title="Our Projects" subtitle="Innovations in Action">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          Discover the diverse range of projects undertaken at AIRLAB. Our work spans various applications
          of Artificial Intelligence and Robotics, addressing critical challenges in healthcare, agriculture, urban development, and more.
        </p>
        {hasProjects ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint={project.imageHint}
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={project.status === "Completed" ? "default" : "secondary"} className={project.status === "Completed" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="font-headline text-xl mb-2 group-hover:text-primary transition-colors">{project.title}</CardTitle>
                  <CardDescription className="font-body text-sm text-foreground/75 mb-4 line-clamp-3">{project.description}</CardDescription>
                  {project.tags && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="text-accent p-0 hover:text-primary" onClick={() => setSelectedProject(project)}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-headline">{project.title}</DialogTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-2">Description</h3>
                          <p className="text-foreground/80">{project.description}</p>
                        </div>

                        {project.abstract && (
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Abstract</h3>
                            <p className="text-foreground/80 whitespace-pre-line">{project.abstract}</p>
                          </div>
                        )}

                        {project.tags && project.tags.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map(tag => (
                                <Badge key={tag} variant="outline">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-4 pt-4">
                          {project.link && (
                            <Button asChild variant="default">
                              <Link
                                href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Project <ExternalLink className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                          {project.paperUrl && (
                            <Button asChild variant="outline">
                              <Link
                                href={project.paperUrl.startsWith('http') ? project.paperUrl : `https://${project.paperUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                Read Paper
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Layers className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-headline font-semibold mb-4">No Projects Yet</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
              We're working on exciting new projects. Check back soon to see our latest innovations in AI and Robotics!
            </p>
            <Button asChild variant="outline">
              <Link href="/about">
                Learn More About AIRLAB <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </Section>
    </PageWrapper>
  );
}
