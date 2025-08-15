import { LoaderFunction, json } from "@remix-run/cloudflare";
import { GitHubRelease } from "../types/githubRelease";

interface CacheEntry {
    release: GitHubRelease;
    timestamp: number;
}

const releaseCache: { [k: string]: CacheEntry } = {};

const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 Hours

export const loader: LoaderFunction = async ({ params }) => {
    const repository: string = `${params.owner}/${params.repository}`;
    const now = Date.now();
    const key = repository.toLowerCase();
    const cachedEntry = releaseCache[key];

    if (cachedEntry && now - cachedEntry.timestamp < CACHE_DURATION_MS)
        return cachedEntry.release;

    const url = `https://api.github.com/repos/${key}/releases/latest`;
    const reqOpts = {
        headers: {
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        }
    };
    try {
        const response = await fetch(url, reqOpts);
        if (!response.ok)
            return new Response('Not Found', { status: 404 });

        const release: GitHubRelease = await response.json();
        releaseCache[key] = { release: release, timestamp: now };
        return json(release);
    } catch (error) {
        console.error("Error fetching github release: ", error);
        return new Response('Not Found', { status: 404 });
    }
}
