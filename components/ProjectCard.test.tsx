import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Project } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

const baseProject: Project = {
  title: 'Test Project',
  url: 'https://example.com',
  description: 'A test project description.',
  outcome: 'Delivered successfully.',
  tags: ['React', 'TypeScript'],
};

describe('ProjectCard', () => {
  it('renders HTTPS project as external link', () => {
    render(<ProjectCard project={baseProject} />);

    const link = screen.getByRole('link', {
      name: /Test Project — opens in a new tab/i,
    });
    expect(link).toHaveAttribute('href', expect.stringMatching(/^https:\/\/example\.com\/?$/));
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('A test project description.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders invalid url as non-link article', () => {
    const project: Project = {
      ...baseProject,
      url: 'http://insecure.example.com',
    };

    render(<ProjectCard project={project} />);

    expect(screen.queryByRole('link', { name: /opens in a new tab/i })).not.toBeInTheDocument();
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  describe('preview resolution', () => {
    it('uses safe root-relative preview paths', () => {
      const project: Project = {
        ...baseProject,
        preview: '/logo512.png',
      };

      render(<ProjectCard project={project} />);

      expect(screen.getByAltText('Test Project project preview')).toHaveAttribute(
        'src',
        '/logo512.png',
      );
    });

    it('uses explicit HTTPS preview URLs', () => {
      const project: Project = {
        ...baseProject,
        preview: 'https://cdn.example.com/x.png',
      };

      render(<ProjectCard project={project} />);

      expect(screen.getByAltText('Test Project project preview')).toHaveAttribute(
        'src',
        expect.stringContaining('cdn.example.com'),
      );
    });

    it('generates mshot when preview is missing', () => {
      render(<ProjectCard project={baseProject} />);

      expect(screen.getByAltText('Test Project project preview')).toHaveAttribute(
        'src',
        expect.stringContaining('s.wordpress.com/mshots'),
      );
    });

    it('falls back to favicon when preview and url are invalid', () => {
      const project: Project = {
        ...baseProject,
        url: 'not-a-url',
      };

      render(<ProjectCard project={project} />);

      expect(screen.getByAltText('Test Project project preview')).toHaveAttribute(
        'src',
        expect.stringContaining('logo_favicon.svg'),
      );
    });

    it('rejects HTTP preview and falls through to mshot', () => {
      const project: Project = {
        ...baseProject,
        preview: 'http://insecure.example.com/x.png',
      };

      render(<ProjectCard project={project} />);

      const src = screen.getByAltText('Test Project project preview').getAttribute('src');
      expect(src).toContain('s.wordpress.com/mshots');
      expect(src).not.toContain('insecure');
    });
  });
});
