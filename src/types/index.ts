// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  abstract?: string;
  imageUrl: string;
  imageHint?: string;
  tags: string[];
  status: 'Completed' | 'Ongoing' | 'Research Phase';
  link: string;
  paperUrl?: string;
}

// News Types
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  link: string;
}

// Research Types
export interface ResearchPaper {
  _id: string;
  title: string;
  authors: string;
  year: number;
  description: string;
  abstract?: string;
  fileUrl: string;
  imageUrl?: string;
}

// Team Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  imageHint?: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
}

// History Types
export interface HistoryItem {
  year: string;
  event: string;
  description: string;
  image?: string;
  link?: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Admin Auth Types
export interface AdminAuthState {
  isAuthenticated: boolean;
  token?: string;
}
