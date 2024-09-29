import { LoaderFunction, json } from '@remix-run/cloudflare';
import { getContentItems } from '~/lib/contentLoader';

async function countFilesInSubdirectories(): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  const types = [
    'shoko-server',
    'media-player-plugins',
    'webui-themes',
    'renamer-plugins',
    'legacy-apps',
  ];

  for (const type of types) {
    try {
      const items = await getContentItems(type);
      counts[type] = items.length;
    } catch (error) {
      console.error(`Error counting files for ${type}:`, error);
      counts[type] = 0;
    }
  }

  return counts;
}

export const loader: LoaderFunction = async ({ request }) => {
  if (request.method !== 'GET') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const fileCounts = await countFilesInSubdirectories();

    const result = {
      shokoServer: fileCounts['shoko-server'] || 1, // Assuming there's always at least one Shoko Server file
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
