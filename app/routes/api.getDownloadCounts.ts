import { LoaderFunction, json } from '@remix-run/node';
import path from 'path';
import fs from 'fs/promises';

const BASE_DIR = path.join(process.cwd(), 'app', 'content', 'downloads');

async function countFilesInSubdirectories(baseDir: string): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};

  try {
    const subdirs = await fs.readdir(baseDir, { withFileTypes: true });

    for (const dirent of subdirs) {
      if (dirent.isDirectory()) {
        const subdir = path.join(baseDir, dirent.name);
        const files = await fs.readdir(subdir);
        counts[dirent.name] = files.length;
      }
    }
  } catch (error) {
    console.error('Error reading directories:', error);
  }

  return counts;
}

export const loader: LoaderFunction = async ({ request }) => {
  if (request.method !== 'GET') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const fileCounts = await countFilesInSubdirectories(BASE_DIR);

    const result = {
      shokoServer: 1,
      mediaPlayerPlugins: fileCounts['media-player-plugins'] || 0,
      themes: fileCounts['webui-themes'] || 0,
      renamer: fileCounts['renamer-plugins'] || 0,
      legacy: fileCounts['legacy-apps'] || 0,
    };

    return json(result);
  } catch (error) {
    console.error('Error processing file counts:', error);
    return json({ error: 'Error processing file counts' }, { status: 500 });
  }
};
