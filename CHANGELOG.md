# Changelog

## [1.3.2] - 2026-06-10

### Added
- Added `vim` command to terminal for editing files in a simple text editor interface.

### Fixed
- Fixed an issue where the `clear` command would not properly clear the terminal output in some cases.
- `clear` command  made the next prompt not editable due to a state management issue, which has been resolved.

## Changed
- Refactored terminal command handling to improve performance and maintainability, including better error handling as well.

## [1.3.1] - 2026-06-06

### Added
- New terminal commands: `pwd`, `echo`, and `date` for enhanced interactivity.
- Added `ArrowDown` and `ArrowUp` key support for navigating through command history in the terminal.

### Fixed
- Resolved isssue where `whoami` command would not display anything in the terminal output.


## [1.3.0] - 2026-05-04

### Added
- Full Markdown blog support with parsed frontmatter metadata.
- `.svx` blog rendering, enabling interactive Svelte-enhanced posts.
- New blog components: `src/lib/components/blog/Blog.svelte` and `src/lib/components/blog/BlogTitle.svelte`.
- Sample blog post at `static/blogs/sample.md`.
- New terminal UI components: expandable history panels, accordion output, and updated command prompt styling.
- Modal component redesign and improved content layouts.
- New `about` and `contact` pages using `.svx` content.
- Extended terminal command data and filesystem configuration to power the portfolio interface.

### Changed
- Updated site styling and responsive layout across global CSS and new modal/markdown styles.
- Refactored parser and terminal logic in `src/lib/js/parser/`.
- Migrated theme data into `src/lib/data/`.
- Updated project configuration to use SvelteKit v2 and modern tooling.

### Notes
- The project remains a static SvelteKit site and can be built with `npm run build`.
