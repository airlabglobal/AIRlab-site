/**
 * Component Tests for Header
 * 
 * Tests navigation, mobile menu, theme toggle, and scroll behavior
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('should render all navigation items', () => {
    render(<Header />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('should highlight active navigation item', () => {
    (usePathname as jest.Mock).mockReturnValue('/projects');
    render(<Header />);
    
    const projectsLink = screen.getByText('Projects');
    expect(projectsLink).toHaveClass('text-primary');
  });

  it('should open mobile menu on menu button click', () => {
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);
    
    // Mobile menu should be visible
    expect(screen.getAllByText('Home').length).toBeGreaterThan(1);
  });

  it('should close mobile menu when clicking a link', () => {
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);
    
    const mobileHomeLink = screen.getAllByText('Home')[1];
    fireEvent.click(mobileHomeLink);
    
    // Menu should close
    waitFor(() => {
      expect(screen.getAllByText('Home').length).toBe(1);
    });
  });

  it('should add backdrop blur on scroll', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    
    // Simulate scroll
    global.window.scrollY = 100;
    fireEvent.scroll(window);
    
    waitFor(() => {
      expect(header).toHaveClass('backdrop-blur-md');
    });
  });

  it('should render theme toggle', () => {
    render(<Header />);
    
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it('should have accessible navigation', () => {
    render(<Header />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});
