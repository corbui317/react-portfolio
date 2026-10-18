import { describe, expect, it } from 'vitest';
import { credentials, degrees } from './education';
import { roles } from './experience';
import { homelabNodes } from './homelab';
import { aboutStats, heroStats } from './stats';

describe('resume data contract', () => {
  it('each role has dates, highlights, and tech', () => {
    expect(roles.length).toBeGreaterThan(0);
    for (const role of roles) {
      expect(role.company.trim().length).toBeGreaterThan(0);
      expect(role.title.trim().length).toBeGreaterThan(0);
      expect(role.start.trim().length).toBeGreaterThan(0);
      expect(role.end.trim().length).toBeGreaterThan(0);
      expect(role.highlights.length).toBeGreaterThan(0);
      expect(role.tech.length).toBeGreaterThan(0);
    }
  });

  it('role start dates are unique (used for element ids)', () => {
    const starts = roles.map((role) => role.start);
    expect(new Set(starts).size).toBe(starts.length);
  });

  it('education entries are complete', () => {
    expect(degrees.length).toBeGreaterThan(0);
    for (const degree of degrees) {
      expect(degree.school.trim().length).toBeGreaterThan(0);
      expect(degree.degree.trim().length).toBeGreaterThan(0);
    }
    for (const credential of credentials) {
      expect(credential.name.trim().length).toBeGreaterThan(0);
      expect(credential.issuer.trim().length).toBeGreaterThan(0);
    }
  });

  it('homelab node ids are unique', () => {
    const ids = homelabNodes.map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('stats have values and labels', () => {
    for (const stat of [...heroStats, ...aboutStats]) {
      expect(stat.value.trim().length).toBeGreaterThan(0);
      expect(stat.label.trim().length).toBeGreaterThan(0);
    }
  });
});
