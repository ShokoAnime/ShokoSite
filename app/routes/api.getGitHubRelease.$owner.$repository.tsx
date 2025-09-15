import { LoaderFunction, json } from "@remix-run/cloudflare";

const CACHE_DURATION = 60 * 60; // 1 hour

export const loader: LoaderFunction = async ({ params }) => {
    const repository: string = `${params.owner}/${params.repository}`.toLowerCase();
    try {
        const githubResponse = await fetch(`https://api.github.com/repos/${repository}/releases/latest`, {
            headers: {
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
            }
        });
        if (!githubResponse.ok)
            return new Response('Not Found', { status: 404 });

        const response = json(await githubResponse.json());
        const cacheControl = githubResponse.headers.get('Cache-Control')?.replace(/s\-maxage=\d+/, `s-maxage=${CACHE_DURATION}`) ?? `s-maxage=${CACHE_DURATION}`;
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
