/**
 * Validates that a string is a well-formed, absolute URL
 * (must include a protocol such as http:// or https://).
 *
 * Mirrors the backend's @IsUrl validation so users get instant
 * feedback before a request is ever sent.
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isValidUrl(value) {
  if (!value || typeof value !== 'string') {
    return false;
  }

  const trimmed = value.trim();

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Returns a human-readable validation message for a URL input,
 * or an empty string if the input is valid.
 *
 * @param {string} value
 * @returns {string}
 */
export function getUrlValidationError(value) {
  if (!value || !value.trim()) {
    return 'Please enter a URL.';
  }

  if (!isValidUrl(value)) {
    return 'Please enter a valid URL (including http:// or https://).';
  }

  return '';
}
