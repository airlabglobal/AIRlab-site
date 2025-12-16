import { createValidator, validators } from './dataValidation';

// Project Schema
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  tags: string[];
  status: 'Ongoing' | 'Completed' | 'Research Phase';
  link: string;
}

export const projectValidator = createValidator<Project>({
  id: validators.combine(
    validators.required('id'),
    validators.string('id')
  ),
  title: validators.combine(
    validators.required('title'),
    validators.string('title')
  ),
  description: validators.combine(
    validators.required('description'),
    validators.string('description')
  ),
  imageUrl: validators.combine(
    validators.required('imageUrl'),
    validators.string('imageUrl'),
    validators.url('imageUrl')
  ),
  imageHint: validators.string('imageHint'),
  tags: validators.combine(
    validators.required('tags'),
    validators.array('tags')
  ),
  status: validators.combine(
    validators.required('status'),
    validators.oneOf('status', ['Ongoing', 'Completed', 'Research Phase'])
  ),
  link: validators.combine(
    validators.required('link'),
    validators.string('link')
  )
});

// Team Member Schema
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  imageHint?: string;
  bio: string;
  social: {
    linkedin?: string;
    email?: string;
  };
}

export const teamMemberValidator = createValidator<TeamMember>({
  id: validators.combine(
    validators.required('id'),
    validators.string('id')
  ),
  name: validators.combine(
    validators.required('name'),
    validators.string('name')
  ),
  role: validators.combine(
    validators.required('role'),
    validators.string('role')
  ),
  imageUrl: validators.combine(
    validators.required('imageUrl'),
    validators.string('imageUrl'),
    validators.url('imageUrl')
  ),
  imageHint: validators.string('imageHint'),
  bio: validators.combine(
    validators.required('bio'),
    validators.string('bio')
  ),
  social: (value: any) => {
    if (!value || typeof value !== 'object') {
      return {
        field: 'social',
        message: 'social must be an object',
        code: 'INVALID_TYPE'
      };
    }
    
    if (value.linkedin && typeof value.linkedin !== 'string') {
      return {
        field: 'social.linkedin',
        message: 'social.linkedin must be a string',
        code: 'INVALID_TYPE'
      };
    }
    
    if (value.email && typeof value.email !== 'string') {
      return {
        field: 'social.email',
        message: 'social.email must be a string',
        code: 'INVALID_TYPE'
      };
    }
    
    return null;
  }
});

// News Item Schema
export interface NewsItem {
  title: string;
  date: string;
  link: string;
}

export const newsItemValidator = createValidator<NewsItem>({
  title: validators.combine(
    validators.required('title'),
    validators.string('title')
  ),
  date: validators.combine(
    validators.required('date'),
    validators.string('date')
  ),
  link: validators.combine(
    validators.required('link'),
    validators.string('link')
  )
});

// Research Paper Schema
export interface ResearchPaper {
  _id: string;
  title: string;
  authors: string;
  year: number;
  description: string;
  fileUrl: string;
  imageUrl: string;
}

export const researchPaperValidator = createValidator<ResearchPaper>({
  _id: validators.combine(
    validators.required('_id'),
    validators.string('_id')
  ),
  title: validators.combine(
    validators.required('title'),
    validators.string('title')
  ),
  authors: validators.combine(
    validators.required('authors'),
    validators.string('authors')
  ),
  year: validators.combine(
    validators.required('year'),
    validators.number('year')
  ),
  description: validators.combine(
    validators.required('description'),
    validators.string('description')
  ),
  fileUrl: validators.combine(
    validators.required('fileUrl'),
    validators.string('fileUrl')
  ),
  imageUrl: validators.combine(
    validators.required('imageUrl'),
    validators.string('imageUrl'),
    validators.url('imageUrl')
  )
});

// Array validators for collections
export const projectsValidator = createValidator<Project[]>({
  root: (value: any) => {
    if (!Array.isArray(value)) {
      return {
        field: 'root',
        message: 'Projects data must be an array',
        code: 'INVALID_TYPE'
      };
    }
    
    for (let i = 0; i < value.length; i++) {
      const errors = projectValidator.getErrors(value[i]);
      if (errors.length > 0) {
        return {
          field: `projects[${i}]`,
          message: `Invalid project at index ${i}: ${errors[0].message}`,
          code: 'INVALID_ITEM'
        };
      }
    }
    
    return null;
  }
});

export const teamMembersValidator = createValidator<TeamMember[]>({
  root: (value: any) => {
    if (!Array.isArray(value)) {
      return {
        field: 'root',
        message: 'Team data must be an array',
        code: 'INVALID_TYPE'
      };
    }
    
    for (let i = 0; i < value.length; i++) {
      const errors = teamMemberValidator.getErrors(value[i]);
      if (errors.length > 0) {
        return {
          field: `team[${i}]`,
          message: `Invalid team member at index ${i}: ${errors[0].message}`,
          code: 'INVALID_ITEM'
        };
      }
    }
    
    return null;
  }
});

export const newsItemsValidator = createValidator<NewsItem[]>({
  root: (value: any) => {
    if (!Array.isArray(value)) {
      return {
        field: 'root',
        message: 'News data must be an array',
        code: 'INVALID_TYPE'
      };
    }
    
    for (let i = 0; i < value.length; i++) {
      const errors = newsItemValidator.getErrors(value[i]);
      if (errors.length > 0) {
        return {
          field: `news[${i}]`,
          message: `Invalid news item at index ${i}: ${errors[0].message}`,
          code: 'INVALID_ITEM'
        };
      }
    }
    
    return null;
  }
});

export const researchPapersValidator = createValidator<ResearchPaper[]>({
  root: (value: any) => {
    if (!Array.isArray(value)) {
      return {
        field: 'root',
        message: 'Research data must be an array',
        code: 'INVALID_TYPE'
      };
    }
    
    for (let i = 0; i < value.length; i++) {
      const errors = researchPaperValidator.getErrors(value[i]);
      if (errors.length > 0) {
        return {
          field: `research[${i}]`,
          message: `Invalid research paper at index ${i}: ${errors[0].message}`,
          code: 'INVALID_ITEM'
        };
      }
    }
    
    return null;
  }
});