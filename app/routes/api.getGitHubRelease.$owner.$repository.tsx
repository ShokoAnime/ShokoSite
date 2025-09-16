import { LoaderFunction, json } from "@remix-run/cloudflare";

const CACHE_DURATION = 60 * 60; // 1 hour
const OWNERS = ['ShokoAnime', 'Cazzar', 'Mik1ll', 'bigretromike', 'natyusha',];

export const loader: LoaderFunction = async ({ params }) => {
    const owner = params.owner?.toLowerCase();
    const repository = params.repository?.toLowerCase();
    if (OWNERS.every(o => o.toLowerCase() !== owner)) {
      console.error("Unknown owner:", owner);
      return new Response('Not Found', {status: 404});
    }

    try {
        const githubResponse = await fetch(`https://api.github.com/repos/${owner}/${repository}/releases/latest`, {
            headers: {
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
                'User-Agent': 'request',
            }
        });
        if (!githubResponse.ok) {
          const text = await githubResponse.text();
          console.error("Bad github API response:", {
            status: githubResponse.status,
            headers: Object.fromEntries(githubResponse.headers),
            body: text
          });
          return new Response('Not Found', {status: 404});
        }

        const response = json(await githubResponse.json());
        const cacheControl = githubResponse.headers.get('Cache-Control')?.replace(/s-maxage=\d+/, `s-maxage=${CACHE_DURATION}`) ?? `s-maxage=${CACHE_DURATION}`;
        const lastModified = githubResponse.headers.get('Last-Modified');
        response.headers.set('Cache-Control', cacheControl);
        if (lastModified)
            response.headers.set('Last-Modified', lastModified);
        return response;
    } catch (error) {
        console.error("Error fetching github release: ", error);
        return new Response('Not Found', { status: 404 });
    }
}
