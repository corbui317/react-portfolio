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
});
