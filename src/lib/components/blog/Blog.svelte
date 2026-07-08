<!-- src/lib/components/Blog.svelte -->
<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import { renderMermaidDiagrams } from "$lib/js/mermaid";

    export let title: string = "Untitled";
    export let author: string = "Unknown";
    export let date: string = "";
    export let contentHtml: string = "";
    export let rawText: string = "";
    let markdownBody: HTMLElement;

    async function renderDiagrams() {
        if (!markdownBody) return;
        await renderMermaidDiagrams(markdownBody);
    }

    onMount(renderDiagrams);
    afterUpdate(renderDiagrams);

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
            <span class="desktop-only">[ Author: {author} ]</span>
            <span class="mobile-only">{author}</span>
            {#if date}
                <span class="desktop-only">[ Date: {formattedDate} ]</span>
                <span class="mobile-only">| {formattedDate}</span>
            {/if}
            <span class="desktop-only">[ {wordCount} words | {readTime} min read ]</span>
            <span class="mobile-only">| {readTime} min read</span>
        </div>
    </header>

    <div class="markdown-body markdown-content" bind:this={markdownBody}>
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

    :global(.markdown-body .math),
    :global(.markdown-body .math-display),
    :global(.markdown-body .katex-display),
    :global(.markdown-body pre),
    :global(.markdown-body table) {
        max-width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
    }

    :global(.markdown-body .mermaid-diagram) {
        display: flex;
        justify-content: center;
        max-width: 100%;
        margin: 1.5rem 0;
        overflow-x: auto;
    }

    :global(.markdown-body .mermaid-diagram svg) {
        max-width: 100%;
        height: auto;
    }

    :global(.markdown-body .mermaid-error) {
        display: block;
        color: var(--red);
        font-family: monospace;
    }

    .mobile-only { display: none; }
    .desktop-only { display: inline; }

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

    @media (max-width: 599px) {
        .mobile-only { display: inline; }
        .desktop-only { display: none; }
        .metadata {
            font-size: calc(var(--font-size) * 0.7);
            gap: 0.4rem;
            margin-top: 0.5rem;
            opacity: 0.8;
            flex-wrap: nowrap;
            white-space: nowrap;
        }
        .name {
            margin-top: 0;
        }
    }

</style>
