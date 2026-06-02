<!-- src/lib/components/Blog.svelte -->
<script lang="ts">
    export let title: string = "Untitled";
    export let author: string = "Unknown";
    export let date: string = "";
    export let contentHtml: string = "";
    export let rawText: string = "";

    $: wordCount = rawText.trim().split(/\s+/).length;
    $: readTime = Math.ceil(wordCount / 150);
    $: formattedDate = date ? new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : "";
</script>

<article class="blog-container">
    <header class="blog-header">
        <h1 class="name">{title}</h1>
        <div class="metadata">
            <span>[ Author: {author} ]</span>
            {#if date}<span>[ Date: {formattedDate} ]</span>{/if}
            <span>[ {wordCount} words | {readTime} min read ]</span>
        </div>
    </header>

    <div class="markdown-body markdown-content">
        {@html contentHtml}
    </div>
</article>

<style>

    :global(.markdown-body h1),
    :global(.markdown-body h2),
    :global(.markdown-body h3),
    :global(.markdown-body hr) {
        border-bottom: none !important;
        padding-bottom: 0 !important;
        margin-bottom: 0.5rem;
    }

    :global(.markdown-body hr) {
        display: none !important;
    }

    .blog-container {
        width: 100%;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .blog-header {
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
    }

    .metadata {
        color: var(--white);
        font-size: var(--font-size);
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        margin-top: 1rem;
        word-break: break-word;
        overflow-wrap: break-word;
    }
    .name {
        font-family: 'Press Start 2P', sans-serif;
        margin-top: 5vh;
        color: var(--yellow) !important;
        font-size: calc(var(--title-size) * 0.8);
    }

</style>