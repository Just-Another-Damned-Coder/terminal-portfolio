<!-- src/lib/components/Blog.svelte -->
<script lang="ts">
    export let title: string = "Untitled";
    export let author: string = "Unknown";
    export let date: string = "";
    export let contentHtml: string = "";
    export let rawText: string = "";

    // Calculate word count and read time
    $: wordCount = rawText.trim().split(/\s+/).length;
    $: readTime = Math.ceil(wordCount / 150); // Avg reading speed is ~150 wpm
</script>

<article class="blog-container">
    <header class="blog-header">
        <h1>{title}</h1>
        <div class="metadata">
            <span>[ Author: {author} ]</span>
            {#if date}<span>[ Date: {date} ]</span>{/if}
            <span>[ {wordCount} words | {readTime} min read ]</span>
        </div>
    </header>

    <!-- Render the main parsed markdown content here -->
    <div class="markdown-body">
        {@html contentHtml}
    </div>
</article>

<style>
    .blog-container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .blog-header {
        border-bottom: 1px solid rgba(156, 163, 175, 0.6);
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
    }

    .blog-header h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #4ade80;
        margin: 0;
    }

    .metadata {
        color: #9ca3af;
        font-size: 0.9rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 0.5rem;
    }

    .markdown-body {
        line-height: 1.75;
    }
</style>