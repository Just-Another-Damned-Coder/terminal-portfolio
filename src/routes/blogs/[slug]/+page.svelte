<script>
    import { House } from '@lucide/svelte';
    import { Blog } from "$lib/components";

    let { data } = $props();

    let blogProps = $derived({
        title: data.post.title,
        author: data.post.author,
        date: data.post.date || "",
        rawText: data.post.rawText,
        contentHtml: data.post.contentHtml
    });
</script>

<div class="blog-page">
    <div class="top-bar">
        <a href="/blogs" class="back-link">&larr; Back to Blogs</a>
        <a href="/" class="home-btn" aria-label="Home">
            <House size={22} />
        </a>
    </div>

    <main>
        <Blog {...blogProps} />
    </main>
</div>

<style>
    .blog-page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .top-bar { 
        display: flex; 
        align-items: center; 
        justify-content: space-between; 
        padding: 1rem 1.5rem; 
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
    }
    .home-btn { display: flex; align-items: center; justify-content: center; color: var(--foreground); text-decoration: none; padding: 0.4rem; border: 1px solid var(--selection-background); border-radius: 6px; transition: border-color 0.2s; }
    .home-btn:hover { border-color: var(--blue); color: var(--blue); }
    main {
        flex: 1;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem 2rem;
        box-sizing: border-box;
    }
    .back-link {
        display: inline-block;
        color: var(--cyan);
        text-decoration: none;
        font-size: 0.9rem;
    }
    .back-link:hover {
        color: var(--blue);
        text-decoration: underline;
    }
    @media (max-width: 599px) {
        main { padding: 0 1rem 2rem; }
        .top-bar { padding: 1rem; }
    }
    @media (min-width: 600px) and (max-width: 899px) {
        main { padding: 0 1.5rem 2rem; }
        .top-bar { padding: 1rem 1.5rem; }
    }
</style>