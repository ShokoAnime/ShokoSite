/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare module '*.mdx' {
  let MDXComponent: (props: any) => React.JSX.Element;
  export const frontmatter: any;
  export default MDXComponent;
}
