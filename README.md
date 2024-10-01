# Shoko Website

This repository contains the source code for the [Shoko Website](https://shokoanime.com), which provides news and
information about the Shoko suite of programs and plugins.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Adding New Content](#adding-new-content)
  - [Blog Posts](#blog-posts)
  - [Downloads](#downloads)
  - [Shoko Website](#shoko-website)
- [Getting Assistance](#getting-assistance)
- [Built With](#built-with)
- [Contact](#contact)

## Overview

The Shoko Website serves as a central hub for information about the Shoko suite of programs and plugins. It provides
news, updates, and resources for users and developers interested in Shoko-related projects.

## Installation

To set up the development environment for the Shoko Website:

```bash
# Clone the repository
git clone https://github.com/ShokoAnime/shoko-website.git

# Navigate to the project directory
cd shoko-website

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

## Usage

After starting the development server, you can access the website locally at http://localhost:3000. Make changes to the
code and see them reflected in real-time.

To build the website for production:

```bash
pnpm build
```

## Adding New Content

We welcome contributions from anyone working on a project that utilizes Shoko. Here's how you can add new content to the
Shoko Website:

# Blog Posts

Blog posts are written in MDX format (Markdown with JSX) and are located in the app/content/posts directory. To add a
new blog post:

- Create a new .mdx file in the app/content/posts directory
- Use existing blog posts as a reference for structure and formatting
- Write your content using Markdown syntax
- Add yourself to the ``contributors.ts`` file in the ``/app/data`` directory
- Submit a pull request with your new blog post

Please note: We typically do not allow project announcement-like posts and usually require, at the very minimum, an
MVP (Minimum Viable Product) of the project. 

If you unsure if your project qualifies for a blog post, please reach out to **EC** on **Discord**.

# Downloads

Information about downloadable programs and plugins is stored in a JSON file in the app/content/downloads directory. To
add a new program or plugin:

- Navigate to the app/content/downloads directory
- Select the folder that corresponds to the type of content you are adding.
- Copy an existing .mdx file and rename it to match your new content.
- Update the file with the relevant information.
- Add yourself to the ``contributors.ts`` file in the ``/app/data`` directory
- Submit a pull request with your new content.

# Shoko Website
We welcome contributions to improve the Shoko Website! Here's how you can contribute:

- Fork the repository
- Create your branch
- Make your changes
- Ensure your code follows our styling guidelines (See Below)
- Add yourself to the ``contributors.ts`` file in the ``/app/data`` directory
- Submit a pull request with your new content.

Note: We use dPrint and ESLint to ensure consistency and quality in our codebase. Please make sure you have these
plugins installed and enabled in your IDE.

## Getting Assistance
If you need help or have any questions, feel free to reach out. Simply message EC on Discord for assistance.

## Built With

- [Remix](https://remix.run)
- [React](https://react.dev)
- [Tailwind](https://tailwindcss.com)

## Contact

Best way to get in touch with someone on the team is via our Discord server.

Shoko Team - [Discord Server](https://discord.gg/vpeHDsg)
