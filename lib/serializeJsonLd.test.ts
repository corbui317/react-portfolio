import { describe, expect, it } from 'vitest';
import { serializeJsonLd } from './serializeJsonLd';

describe('serializeJsonLd', () => {
  it('escapes < in serialized output', () => {
    const result = serializeJsonLd({
      '@type': 'Person',
      name: '</script><script>alert(1)</script>',
    });

    expect(result).not.toMatch(/</);

    const parsed = JSON.parse(result);
    expect(parsed.name).toBe('</script><script>alert(1)</script>');
  });

  it('round-trips valid schema objects', () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Test User',
    };

    expect(JSON.parse(serializeJsonLd(schema))).toEqual(schema);
  });
});
