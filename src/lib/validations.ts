import { z } from 'zod';

// Project validation schema
export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  abstract: z.string().optional(),
  imageUrl: z.string().url('Must be a valid URL').or(z.literal('')),
  imageHint: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(['Completed', 'Ongoing', 'Research Phase']).or(z.string()),
  link: z.string().default(''),
  paperUrl: z.string().optional(),
});

// News validation schema
export const newsSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  content: z.string().optional(),
  type: z.enum(['News', 'Event']).optional(),
  date: z.string(),
  link: z.string().default(''),
  imageUrl: z.string().optional(),
  author: z.string().optional(),
});

// Research validation schema
export const researchSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters').max(300),
  authors: z.string().min(2, 'Authors field is required'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  abstract: z.string().optional(),
  fileUrl: z.string(),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

// Team member validation schema
export const teamMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(2, 'Role is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  imageHint: z.string().optional(),
  bio: z.string(),
  social: z.object({
    linkedin: z.string().url('Must be a valid LinkedIn URL'),
    twitter: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
    email: z.string().email().optional().or(z.literal('')),
  }),
});

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// History validation schema
export const historySchema = z.object({
  id: z.string().optional(),
  year: z.string().min(1, 'Year is required'),
  event: z.string().min(1, 'Event title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().optional(),
  link: z.string().url().optional().or(z.literal('')),
  order: z.number().optional()
});
