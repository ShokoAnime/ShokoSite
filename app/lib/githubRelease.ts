import type { DownloadMeta } from '~/types/content';
import type { GitHubRelease } from '~/types/githubRelease';

/**
 * Replaces a download's version and date with the latest GitHub release's,
 * when it declares a `githubRepository`. Leaves them as written if GitHub
 * can't be reached. Mutates `meta`.
 */
export async function applyLatestRelease(meta: DownloadMeta, baseUrl: string): Promise<void> {
  if (!meta.githubRepository) return;

  const response = await fetch(`${baseUrl}/api/getGitHubRelease/${meta.githubRepository}`);
  if (!response.ok) return;

  const release: GitHubRelease = await response.json();
  meta.version = release.tag_name.startsWith('v') ? release.tag_name.slice(1) : release.tag_name;
  meta.date = new Date(release.published_at || release.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
