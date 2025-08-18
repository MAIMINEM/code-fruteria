// Utility to generate a unique key (string)
// Uses current timestamp and a random number for uniqueness

export function generateUniqueKey(prefix = "key"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
