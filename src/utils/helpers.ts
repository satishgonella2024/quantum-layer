/**
 * Utility helper functions
 */

/**
 * Format a timestamp into a human-readable string
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

/**
 * Format token cost information into a human-readable string
 */
export function formatTokenCost(promptTokens: number, completionTokens: number, cost: number): string {
  return `Tokens: ${promptTokens} prompt + ${completionTokens} completion = ${promptTokens + completionTokens} total ($${cost.toFixed(6)})`;
}

/**
 * Format a duration in milliseconds into a human-readable string
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(2)}s`;
  } else {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(2);
    return `${minutes}m ${seconds}s`;
  }
}

/**
 * Truncate a string to a maximum length, adding an ellipsis if truncated
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength - 3) + '...';
}

/**
 * Deep merge two objects
 */
export function deepMerge<T>(target: T, source: any): T {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

/**
 * Check if a value is an object
 */
function isObject(item: any): boolean {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Generate a unique ID
 */
export function generateId(prefix: string = ''): string {
  return `${prefix}${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Safely parse JSON
 */
export function safeJsonParse(str: string, fallback: any = null): any {
  try {
    return JSON.parse(str);
  } catch (error) {
    return fallback;
  }
}
