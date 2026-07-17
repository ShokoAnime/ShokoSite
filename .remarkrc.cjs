// .remarkrc.cjs
// eslint-plugin-mdx doesn't parse YAML frontmatter (---) by default — without
// telling it about remark-frontmatter, it treats frontmatter as regular MDX
// prose, and chokes with "Could not parse expression with acorn" the moment
// a frontmatter value contains a `{` (e.g. `download: { title: ..., href: ... }`).
//
// Note: eslint-plugin-mdx@2 doesn't load .mjs remark configs via cosmiconfig,
// so this file must stay .cjs even though package.json has "type": "module" —
// Node always treats .cjs as CommonJS regardless of that setting.
module.exports = {
  plugins: [
    'remark-frontmatter',
    'remark-gfm',
  ],
};
