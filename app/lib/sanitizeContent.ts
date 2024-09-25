export const sanitizeContent = (content: string) => {
  const contentStr = String(content);
  return contentStr
    .replace(/import\s+.*\s+from\s+['"][^'"]+['"];?/g, '') // Remove import statements (generic pattern for imports)
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1') // Remove Markdown links, keep the link text
    .replace(/[-*]\s+/g, '') // Remove Markdown list markers (e.g., -, *, +)
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // Remove Markdown bold/italics, keep the word
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .replace(/<[^>]*>|&[^;]+;/g, '') // Remove HTML tags and encoded entities
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim() // Trim leading and trailing spaces
    .split(' ') // Split into words
    .slice(0, 100) // Take the first 100 words
    .join(' '); // Join the words back into a string
};
