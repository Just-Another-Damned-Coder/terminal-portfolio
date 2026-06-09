<script>
    import { Search, House, Palette } from '@lucide/svelte';
    import { COLORS, scheme } from '$lib/js/constants';
    import { Skeleton } from '$lib/components';

    let { data } = $props();

    let posts = $derived(data?.posts || []);
    let query = $state("");
    let themeOpen = $state(false);
    let themeKeys = $derived(Object.keys(COLORS));

    let filteredPosts = $derived(query.trim() === ""
        ? posts
        : posts.filter(p => {
            const q = query.toLowerCase();
            return p.title.toLowerCase().includes(q)
                || p.description.toLowerCase().includes(q)
                || p.tags?.some(t => t.toLowerCase().includes(q));
        }));

    function formatDate(dateStr) {
        if (!dateStr) return "";
        return dateStr.split("T")[0];
    }
</script>

<div class="blog-listing">
    <div class="top-bar">
        <a href="/" class="home-btn" aria-label="Home">
            <House size={22} />
        </a>
        <div class="theme-wrapper">
            <div class="theme-inner">
                <button
                    class="theme-btn"
                    style="color: {COLORS[$scheme].foreground};"
                    onclick={() => (themeOpen = !themeOpen)}
                >
                    <Palette size={16} />
                </button>
                {#if themeOpen}
                    <div class="theme-dropdown" role="menu" tabindex="-1" style="background: {COLORS[$scheme].background}; border-color: {COLORS[$scheme].brightBlack};" onmouseleave={() => (themeOpen = false)}>
                        {#each themeKeys as key}
                            <button
                                class="theme-option"
                                class:active={$scheme === key}
                                style="color: {COLORS[$scheme].foreground};"
                                onclick={() => {
                                    scheme.set(key);
                                    themeOpen = false;
                                }}
                            >
                                <span class="swatch" style="background: {COLORS[key].cyan};"></span>
                                {COLORS[key].name}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <main>
        <h1 class="page-title">Blog</h1>

        <div class="search-wrapper">
            <Search size={18} class="search-icon" />
            <input
                type="text"
                class="search-bar"
                placeholder="Search posts..."
                bind:value={query}
            />
        </div>

        {#if posts.length === 0 && !query}
            <!-- Skeleton placeholders while posts load -->
            <div class="posts-list" aria-label="Loading posts...">
                <Skeleton variant="post-card" count={5} />
            </div>
        {:else if filteredPosts.length === 0}
            <p class="empty">No posts found.</p>
        {:else}
            <div class="posts-list">
                {#each filteredPosts as post}
                    <article class="post">
                        <h2>
                            <a href={`/blogs/${post.slug}`}>{post.title}</a>
                        </h2>
                        <p>{post.description}</p>
                        <div class="meta">
                            <span class="date">{formatDate(post.date)}</span>
                            <div class="tags">
                                {#each post.tags as tag}
                                    <span class="tag">{tag}</span>
                                {/each}
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        {/if}
    </main>
</div>

<style>
    .blog-listing { min-height: 100vh; display: flex; flex-direction: column; }
    .top-bar { height: 60px; position: relative; width: 100%; box-sizing: border-box; }
    .home-btn { position: absolute; left: 1.5rem; top: 50%; transform: translateY(-50%); display: flex; align-items: center; justify-content: center; color: var(--foreground); text-decoration: none; width: 36px; height: 36px; padding: 0; margin: 0; border: 1px solid var(--selection-background); border-radius: 6px; transition: border-color 0.2s; box-sizing: border-box; }
    .home-btn:hover { border-color: var(--blue); color: var(--blue); }
    .theme-wrapper { position: absolute; right: 1.5rem; top: 50%; transform: translateY(-50%); display: flex; align-items: center; height: 36px; margin: 0; padding: 0; z-index: 50; }
    .theme-inner { position: relative; display: flex; align-items: center; height: 100%; }
    .theme-btn { border: 1px solid var(--selection-background); border-radius: 6px; width: 36px; height: 36px; padding: 0; margin: 0; cursor: pointer; display: flex; align-items: center; justify-content: center; background: transparent; box-sizing: border-box; color: inherit; }
    .theme-btn:hover { border-color: var(--foreground); }
    .theme-dropdown { position: absolute; right: 0; top: calc(100% + 6px); border: 1px solid; border-radius: 6px; padding: 0.4rem 0; z-index: 100; min-width: 160px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
    .theme-option { display: flex; align-items: center; gap: 0.5rem; width: 100%; padding: 0.4rem 0.75rem; border: none; background: transparent; font-family: monospace; font-size: 0.75rem; cursor: pointer; text-align: left; color: inherit; }
    .theme-option:hover { background: color-mix(in srgb, var(--foreground) 10%, transparent); }
    .theme-option.active { background: color-mix(in srgb, var(--foreground) 15%, transparent); }
    .swatch { display: inline-block; width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    main { flex: 1; width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem 2rem; box-sizing: border-box; }
    .page-title { font-family: 'Press Start 2P', sans-serif; font-size: var(--title-size); color: var(--yellow); margin: 0 0 1.5rem 0; text-align: center; }
    .search-wrapper { display: flex; justify-content: center; align-items: center; margin-bottom: 2rem; position: relative; }
    :global(.search-icon) { position: absolute; left: calc(50% - 250px + 0.75rem); color: var(--bright-black); pointer-events: none; }
    .search-bar { width: 100%; max-width: 500px; padding: 0.65rem 1rem 0.65rem 2.5rem; border: 1px solid var(--selection-background); border-radius: 6px; background: color-mix(in srgb, var(--background) 80%, var(--bright-black) 20%); color: var(--foreground); font-family: monospace; font-size: 1rem; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
    .search-bar:focus { border-color: var(--blue); }
    .search-bar::placeholder { color: var(--bright-black); }
    .empty { color: var(--bright-black); font-size: 0.9rem; text-align: center; }
    .posts-list { display: flex; flex-direction: column; gap: 1.5rem; }
    .post { border: 1px solid var(--selection-background); padding: 1.25rem; border-radius: 6px; transition: border-color 0.2s; }
    .post:hover { border-color: var(--blue); }
    .post h2 { margin: 0 0 0.5rem 0; }
    .post h2 a { color: var(--blue); text-decoration: none; font-size: 1.1rem; }
    .post h2 a:hover { color: var(--bright-blue); text-decoration: underline; }
    .post p { color: var(--foreground); font-size: 0.9rem; line-height: 1.5; margin: 0 0 0.75rem 0; }
    .meta { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
    .date { color: var(--bright-black); font-size: 0.9rem; }
    .tags { display: flex; gap: 0.4rem; flex-wrap: wrap; }
    .tag { background: color-mix(in srgb, var(--background) 70%, var(--bright-black) 30%); color: var(--cyan); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.85rem; border: 1px solid var(--selection-background); }
    @media (max-width: 599px) {
        main { padding: 0 1rem 2rem; }
        .home-btn { left: 1rem; }
        .theme-wrapper { right: 1rem; }
        .page-title { font-size: calc(var(--title-size) * 0.9); margin-bottom: 1rem; }
        .post { padding: 0.9rem; }
        .search-bar { max-width: 100%; }
        :global(.search-icon) { left: 0.75rem; }
        .post h2 a { font-size: 1rem; }
        .post p { font-size: 0.8rem; margin-bottom: 0.5rem; }
        .date { font-size: 0.75rem; }
        .tag { font-size: 0.7rem; padding: 0.15rem 0.4rem; }
    }
    @media (min-width: 600px) and (max-width: 899px) {
        main { padding: 0 1.5rem 2rem; }
        .page-title { font-size: calc(var(--title-size) * 0.8); }
    }
</style>