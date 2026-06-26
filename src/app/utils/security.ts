// Security utility — handles rate limit and auth errors gracefully in the UI

export function getErrorMessage(status: number, fallback = "Something went wrong."): string {
  switch (status) {
    case 429: return "You're sending requests too quickly. Please wait a moment and try again.";
    case 403: return "Access denied.";
    case 413: return "Your message is too long. Please shorten it and try again.";
    case 504: return "The request timed out. Please try again.";
    case 500: return "A server error occurred. Please try again shortly.";
    default: return fallback;
  }
}

export function sanitiseInput(input: string, maxLength = 5000): string {
  return input
    .trim()
    .substring(0, maxLength)
    // Remove null bytes
    .replace(/\x00/g, "")
    // Normalise line endings
    .replace(/\r\n/g, "\n");
}
