# terminal-portfolio
A terminal-inspired portfolio and blog built with SvelteKit. The project combines a retro command-line UI with Markdown and `.svx` blog support, interactive modal panels, customizable themes, and a virtual filesystem.

Visit the live site at [morisjohnson.in](https://morisjohnson.in/).

![](docs/website.gif)

## Version
- **Current release:** `v1.3.2`

## What's new in this version
- Added `vim` command to the terminal, providing a simple text editor interface for file editing.
- Resolved an issue where the `clear` command would fail to properly clear the terminal output in some instances.
- Fixed a state management bug related to the `clear` command that caused the subsequent command prompt to become uneditable.
- Refactored the terminal command handling logic to improve performance, maintainability, and error handling.


## Features

### Terminal Interface
- **Interactive command-line**: Fully functional terminal with editable prompt and command history.
- **Virtual filesystem**: Navigate using `cd` and `ls` commands with a configurable directory structure.
- **Command history**: Type `history` to view past commands with timestamps. Use ArrowUp and ArrowDown keys to navigate through command history.
- **Dynamic prompt**: Shows current username and working directory.
- **Error handling**: Unix-style error codes and messages for invalid commands.

### Built-in Commands
| Command | Description |
|---------|-------------|
| `help` | Show all available commands with descriptions |
| `ls` | List files and directories in the current path |
| `cd <path>` | Change directory (supports `..` for parent) |
| `whoami` | Display current username |
| `username <name>` | Change your username |
| `clear` | Clear the terminal output |
| `history` | Show command history with timestamps |
| `rm` | Easter egg |
| `vim` | View files in a modal interface|
| `pwd` | Show current working directory |
| `echo` | Echo input text back to the terminal |
| `date` | Display current date and time |  

### Blog Engine
- **Markdown support**: Write blog posts in `.md` format with frontmatter metadata.
- **Interactive SVX**: Create component-driven posts using `.svx` files with Svelte integration.
- **Syntax highlighting**: Code blocks are highlighted using Shiki (Material theme).
- **Metadata parsing**: Automatic extraction of title, author, date, tags, and custom frontmatter.
- **Reading stats**: Word count and estimated read time calculated automatically.
- **Sample post**: Included at `static/blogs/sample.md`.

### Theme System
- **7 built-in color schemes**: Argonaut, Overnight Slumber, Django, Vesper, Tinacious, Neon, Sea.
- **Live switching**: Change themes instantly via the theme selector on the homepage.
- **Customizable**: Add new schemes by editing `src/lib/data/color_schemes.json`.
- **Terminal-inspired colors**: All schemes sourced from [windowsterminalthemes.dev](https://windowsterminalthemes.dev/).

### Content Pages
- **About page**: Interactive `.svx` component with timeline-based resume.
- **Contact page**: `.svx` page with contact links and social information.
- **Help system**: Built-in `help` command displays available terminal commands.

### Technical Stack
- **Framework**: SvelteKit v2 with Svelte 5.
- **Static generation**: `@sveltejs/adapter-static` for easy deployment.
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming.
- **Markdown**: `marked` with `marked-shiki` for syntax highlighting.
- **Frontmatter**: `gray-matter` for parsing metadata.
- **UI components**: Bits UI for accessible dialog/accordion patterns.
- **Icons**: Lucide Svelte.

## Project Structure

```
terminal-portfolio/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── blog/           # Blog rendering components
│   │   │   ├── home/           # Homepage components (Avatar, Title, etc.)
│   │   │   ├── modals/         # Modal dialog components
│   │   │   ├── terminal/       # Terminal UI components
│   │   │   └── ui/             # Reusable UI primitives (Bits UI)
│   │   ├── data/
│   │   │   ├── color_schemes.json   # Terminal color themes
│   │   │   ├── commands.json         # Command definitions
│   │   │   ├── filesystem.json       # Virtual filesystem structure
│   │   │   └── help.json             # Help text for commands
│   │   ├── docs/
│   │   │   ├── about.svx      # About page content
│   │   │   └── contact.svx    # Contact page content
│   │   ├── js/
│   │   │   ├── constants.ts   # Application state and stores
│   │   │   ├── displayinfo.ts # System info utilities
│   │   │   ├── markdown.ts    # Markdown parsing & highlighting
│   │   │   └── parser/        # Command parser logic
│   │   └── utils/             # Utility functions
│   ├── routes/
│   │   ├── +page.svelte       # Homepage
│   │   └── +layout.svelte     # Root layout
│   └── css/
│       ├── global.css         # Global styles and CSS variables
│       ├── home.css           # Homepage-specific styles
│       ├── markdown.css       # Markdown content styling
│       ├── modal.css          # Modal styles
│       └── terminal.css       # Terminal component styles
├── static/
│   ├── blogs/                  # Blog posts directory
│   │   └── sample.md          # Example blog post
│   └── images/                # Static assets
├── docs/
│   └── website.gif            # Homepage animation
├── package.json
├── svelte.config.ts
├── vite.config.js
└── README.md
```

## Blog Authoring

### Creating a Blog Post

1. Create a new file in `static/blogs/` with either `.md` or `.svx` extension.

2. Add frontmatter metadata at the top of the file:

```yaml
---
title: "Your Post Title"
date: 2025-10-05
author: "Your Name"
tags: [tag1, tag2]
draft: false
description: "Brief description"
slug: your-post-slug
layout: post
toc: false
---
```

3. Write your content in Markdown (for `.md`) or use Svelte components (for `.svx`).

4. The blog post will be accessible via the terminal's `ls` command in the `~/home/blogs/` directory.

### Markdown Features
- Standard Markdown syntax (headings, lists, code blocks, links, images).
- Fenced code blocks with syntax highlighting for: JavaScript, TypeScript, Python, Bash, JSON, HTML, CSS.
- Tables, blockquotes, task lists, and inline formatting.
- Word count and read time calculated automatically.

### SVX Features
- Write Svelte components directly in your blog posts.
- Use reactive statements, props, and any Svelte functionality.
- Frontmatter metadata still supported.
- Ideal for interactive demos, custom layouts, or embedded applications.

## Customization

### Adding Terminal Commands

Edit `src/lib/data/commands.json`:

```json
{
  "yourcommand": {
    "returns": "text|component|empty",
    "componentName": "ComponentName",
    "argRegex": "yourcommand\\s+(.*)",
    "defaultArg": "default",
    "updateStore": "storeName",
    "storeValue": true,
    "readStore": "storeName",
    "textContent": "Output text",
    "parameters": { "key": "value" },
    "messageTemplate": "Message with {arg}"
  }
}
```

- `returns`: Determines output type (`text` for plain text, `component` for Svelte component, `empty` for no output).
- `componentName`: The Svelte component to render (must be imported in `Terminal.svelte`).
- `argRegex`: Regex pattern to extract arguments from the command.
- `updateStore`: Store to update when command runs.
- `parameters`: Props passed to the component.

### Adding Color Themes

Edit `src/lib/data/color_schemes.json` and follow the existing structure. Each theme needs:
- 16 ANSI colors (black, red, green, yellow, blue, purple, cyan, white + bright variants).
- `background`, `foreground`, `selectionBackground`, `cursorColor`.

Themes are automatically loaded and appear in the theme selector.

### Modifying the Filesystem

Edit `src/lib/data/filesystem.json` to change what `ls` and `cd` display:

```json
{
  "~/home": {
    "about.md": {
      "type": "modal",
      "doc": "about",
      "docPath": "/src/lib/docs/about.svx"
    },
    "blogs/": {
      "type": "directory"
    }
  },
  "~/home/blogs": {
    "my-post.md": {
      "type": "modal",
      "doc": "blogs/my-post.md"
    },
    "..": {
      "type": "directory",
      "target": "~/home"
    }
  }
}
```

- `type: "directory"` - Shows as a folder in `ls`.
- `type: "modal"` - Clickable entry that opens a modal with content.
- `type: "link"` - External hyperlink.
- `..` entries define parent directory navigation.

### Parser Configuration

The command parser lives in `src/lib/js/parser/`. Key files:
- `parser.ts` - Main parser logic, command validation, `cd`/`ls` implementation.
- `terminal.ts` - Terminal event handling and command history management.

## Development

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server at `http://localhost:5173` |
| `npm run build` | Generate static site in `build/` |
| `npm run preview` | Serve the built site locally |
| `npm run check` | Run Svelte type checking |
| `npm run lint` | Lint code with ESLint and Prettier |
| `npm run format` | Format all files with Prettier |

### Deployment

The project outputs a fully static site. Deploy the `build/` directory to any static hosting service:

- **Netlify**, **Vercel**, **Cloudflare Pages** - Connect your repo, set build command `npm run build`, output directory `build`.
- **GitHub Pages** - Push `build/` to `gh-pages` branch.
- **Self-hosted** - Serve `build/` with any web server (nginx, Apache, Caddy).

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge) - latest 2 versions.
- No IE11 support (uses modern ES2020+ features).

## Contributing

Feedback and contributions are welcome. Submit pull requests or suggest improvements for:
- UI/UX enhancements
- New terminal commands or filesystem features
- Blog support and Markdown rendering
- Theme additions or refinements
- Accessibility improvements

## License
MIT - see [LICENSE](LICENSE) for details.
