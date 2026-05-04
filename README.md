# terminal-portfolio
A static website meant as a portfolio and blog, built with SvelteKit. Visit the live site at [morisjonhson.in](https://morisjohnson.in/) .

![](docs/website.gif)

## Customization

The portfolio includes multiple terminal color schemes defined in `src/lib/color_schemes.json`. You can easily add new themes or modify existing ones The current themes are taken from [windowsterminalthemes.dev](https://windowsterminalthemes.dev/). Pick something that you like and add it in the JSON.

## Features
- **Terminal Aesthetic**: The entire site is designed to look like a terminal, with customizable color schemes and a retro vibe.
- **Generalized Command parser**: The terminal interface can be easily extended with new commands. You can configure them in `src/lib/data/commands.json` and add the corresponding logic in `src/lib/js/terminal.ts`.
- **Markdown Blog**: Write blog posts in Markdown format. The site will parse the Markdown files, extract frontmatter for metadata, and render the content with syntax highlighting for code blocks.
- **.svx Support**: You can also write blog posts in .svx format, allowing you to include Svelte components directly in your posts for enhanced interactivity.
- **Syntax Highlighting**: Code blocks in your blog posts are rendered with syntax highlighting for better readability.
- **Static Site Generation**: Built with SvelteKit and @sveltejs/adapter-static for easy deployment to any static hosting service.
- **Responsive Design**: The site is fully responsive and looks great on both desktop and mobile devices.

## 🚀 Deployment

The project is configured for static site generation using @sveltejs/adapter-static. Build and deploy:

```bash
npm run build
```
The built files will be in the build/ directory, ready for deployment to any static hosting service.

## Contributing

I'm a beginner in web-development so any feedbacks and contributions are welcome. Feel free to submit pull requests.