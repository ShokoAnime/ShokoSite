export type GitHubRelease = {
    url: string;
    html_url: string;
    id: number;
    tag_name: string;
    created_at: string;
    published_at: string | null;
    draft: boolean;
    prerelease: boolean;
    name: string | null;
    body?: string | null;
    [k: string]: unknown;
}
