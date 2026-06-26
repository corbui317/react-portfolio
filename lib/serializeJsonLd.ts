/**
 * Serialize structured data for safe injection into a JSON-LD script tag.
 * Escapes `<` so user-controlled values cannot break out of the script context.
 */
export function serializeJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
