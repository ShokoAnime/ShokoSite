import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// Fix for __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mdxFolder = path.join(__dirname, '../app/blog/posts/');
const outputFile = path.join(__dirname, '../app/data/blog-data.ts');

const getFiles = (dir) => {
  return fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getFiles(name)] : [...files, name];
  }, []);
};

const mdxFiles = getFiles(mdxFolder).filter(file => file.endsWith('.mdx'));

const convertMarkdown = (text) => {
  // Remove the name value from the excerpt
  text = text.replace(/^#.*$/m, '');

  // Remove # symbols that are by themselves
  text = text.replace(/(?<!\S)#(?!\S)/g, '');

  // Convert bold
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert italic
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Convert links
  text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Replace line breaks with a single space
  text = text.replace(/\s*\r?\n\s*/g, ' ');

  // Trim leading and trailing spaces
  text = text.trim();

  return text;
};

const blogPosts = mdxFiles.map(file => {
  const content = fs.readFileSync(file, 'utf8');
  const { data: frontmatter, content: mdxContent } = matter(content);

  const paragraphs = mdxContent.split('\n\n');
  const firstTwoParagraphs = paragraphs.slice(0, 2).join('\n\n');

  // Convert specific markdown elements to HTML and remove line breaks
  const excerptHtml = convertMarkdown(firstTwoParagraphs);

  return {
    name: frontmatter.name,
    date: frontmatter.date,
    image: frontmatter.image,
    tags: frontmatter.tags,
    excerpt: excerptHtml,
    path: path.basename(file),
  };
});

// Count the occurrences of each tag
const tagCounts = {};
blogPosts.forEach(post => {
  post.tags.forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
});

// Create the tags array with unique tags and their counts
const blogTags = Object.entries(tagCounts).map(([name, count]) => ({ name, count }));

const outputContent = `interface Post {
  name: string;
  date: string;
  image: string;
  tags: string[];
  excerpt: string;
  path: string;
}

interface Tag {
  name: string;
  count: number;
}

export const BlogPosts: Post[] = ${
  JSON.stringify(blogPosts, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/'/g, '\\\'')
    .replace(/"excerpt": '(.*?)'/g, '"excerpt": "$1"')
    .replace(/'/g, '"')
};

export const BlogTags: Tag[] = ${
  JSON.stringify(blogTags, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/'/g, '"')
};
`;

fs.writeFileSync(outputFile, outputContent);
console.log(`TypeScript data has been written to ${outputFile}`);
