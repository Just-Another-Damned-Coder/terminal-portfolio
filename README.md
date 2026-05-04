# terminal-portfolio
A terminal-inspired portfolio and blog built with SvelteKit. The project combines a retro command-line UI with Markdown and `.svx` blog support, interactive modal panels, and customizable theme data.

Visit the live site at [morisjohnson.in](https://morisjohnson.in/).

![](docs/website.gif)

## Version
- **Current release:** `v1.3.0`

## What’s new in this version
- Added full Markdown blog support with frontmatter metadata, word count, and estimated read time.
- Added `.svx` support for interactive, component-driven blog content.
- Added new terminal UI components including command history, expandable output panels, and improved prompt styling.
- Reworked docs and modal components for a cleaner content experience.

## Features
- **Terminal aesthetic**: A terminal-themed portfolio interface with retro visuals and a customizable console feel.
- **Blog engine**: Supports Markdown and `.svx` blog posts with syntax-highlighted code blocks and parsed frontmatter.
- **Custom terminal commands**: Extend commands through `src/lib/data/commands.json` and the parser in `src/lib/js/parser/terminal.ts`.
- **Custom theme support**: Add or edit terminal color schemes in `src/lib/data/color_schemes.json`.
- **Static site generation**: Built with SvelteKit and `@sveltejs/adapter-static` for easy deployment.
- **Responsive design**: Optimized for desktop and mobile viewing.
- **Content pages**: Includes `about`, `contact`, and help content powered by `.svx` pages.

## Blog authoring
- Place blog posts in `static/blogs/`.
- Supported formats: `.md` and `.svx`.
- Include frontmatter metadata like `title`, `author`, and `date`.
- A sample post is available at `static/blogs/sample.md`.

## Customization
- Add or edit terminal color themes in `src/lib/data/color_schemes.json`.
- Manage terminal commands in `src/lib/data/commands.json`.
- Adjust parser behavior in `src/lib/js/parser/terminal.ts`.
- Customize blog rendering in `src/lib/components/blog/Blog.svelte`.

## 🚀 Development
Run the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

Preview the built site:

```bash
npm run preview
```

## Contributing
Feedback and contributions are welcome. Submit pull requests or suggest improvements for the UI, blog support, or terminal command system.