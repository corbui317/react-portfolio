import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('projects data contract', () => {
  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('each project has required fields and HTTPS url', () => {
    for (const project of projects) {
      expect(project.title.trim().length).toBeGreaterThan(0);
      expect(project.description.trim().length).toBeGreaterThan(0);
      expect(project.outcome.trim().length).toBeGreaterThan(0);
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.url.startsWith('https://')).toBe(true);
    }
  });
});
