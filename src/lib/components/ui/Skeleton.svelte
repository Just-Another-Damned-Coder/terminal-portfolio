<!-- src/lib/components/ui/Skeleton.svelte -->
<!--
  Skeleton loader that closely mirrors the real component layouts.

  Variants:
  - "post-card"   → matches .post article in blogs/+page.svelte
  - "blog-modal"  → matches Blog.svelte inside the vim modal (title + metadata + body paragraphs)
  - "text-line"   → single inline shimmer line (use `width` prop to vary)

  Props:
  - variant: 'post-card' | 'blog-modal' | 'text-line'  (default: 'text-line')
  - width:   CSS width string, used by text-line          (default: '100%')
  - count:   how many skeletons to render                 (default: 1)
-->
<script lang="ts">
    let { variant = 'text-line', width = '100%', count = 1 }: {
        variant?: 'post-card' | 'blog-modal' | 'text-line';
        width?: string;
        count?: number;
    } = $props();
</script>

{#each Array(count) as _, i}

    {#if variant === 'post-card'}
        <!--
          Mirrors:
            <article class="post">
              <h2><a>title</a></h2>
              <p>description...</p>
              <div class="meta">
                <span class="date">…</span>
                <div class="tags"><span class="tag">…</span>…</div>
              </div>
            </article>
        -->
        <article class="sk-post" aria-hidden="true">
            <!-- h2 title — matches font-size: 1.1rem, color: var(--blue) -->
            <div class="sk-bar sk-post-title" style="width: 52%;"></div>

            <!-- p description — matches font-size: 0.9rem, two lines -->
            <div class="sk-bar sk-post-desc" style="width: 100%; margin-top: 0.6rem;"></div>
            <div class="sk-bar sk-post-desc" style="width: 72%; margin-top: 0.35rem;"></div>

            <!-- meta row -->
            <div class="sk-meta">
                <!-- date span -->
                <div class="sk-bar sk-date"></div>
                <!-- tag pills — matches padding: 0.2rem 0.6rem, border-radius: 4px -->
                <div class="sk-tags">
                    <div class="sk-bar sk-tag"></div>
                    <div class="sk-bar sk-tag" style="width: 56px;"></div>
                    <div class="sk-bar sk-tag" style="width: 44px;"></div>
                </div>
            </div>
        </article>

    {:else if variant === 'blog-modal'}
        <!--
          Mirrors Blog.svelte inside the modal:
            <h1 class="name">title</h1>           ← Press Start 2P, --yellow, calc(--title-size * 0.8)
            <div class="metadata">                 ← [ Author: x ] [ Date: x ] [ n words | n min ]
              <span>…</span><span>…</span>…
            </div>
            <div class="markdown-body">
              <p>…</p><p>…</p><h2>…</h2><p>…</p>
            </div>
        -->
        <div class="sk-blog" aria-hidden="true">
            <!-- .name — large pixelated title, matches margin-top: 5vh -->
            <div class="sk-bar sk-blog-title" style="width: 65%;"></div>

            <!-- .metadata row — three bracket-wrapped spans in a flex gap-1.5rem row -->
            <div class="sk-metadata-row">
                <div class="sk-bar sk-meta-chunk" style="width: 120px;"></div>
                <div class="sk-bar sk-meta-chunk" style="width: 140px;"></div>
                <div class="sk-bar sk-meta-chunk" style="width: 110px;"></div>
            </div>

            <!-- Divider line — matches the dashed border-bottom on dialog-header -->
            <div class="sk-divider"></div>

            <!-- markdown-body paragraphs -->
            <div class="sk-body">
                <!-- Paragraph 1 -->
                <div class="sk-bar" style="width: 100%;"></div>
                <div class="sk-bar" style="width: 94%; margin-top: 0.4rem;"></div>
                <div class="sk-bar" style="width: 88%; margin-top: 0.4rem;"></div>
                <div class="sk-bar" style="width: 60%; margin-top: 0.4rem;"></div>

                <!-- h2 heading — slightly taller, shorter width -->
                <div class="sk-bar sk-h2" style="width: 38%; margin-top: 1.5rem;"></div>

                <!-- Paragraph 2 -->
                <div class="sk-bar" style="width: 100%; margin-top: 0.75rem;"></div>
                <div class="sk-bar" style="width: 97%; margin-top: 0.4rem;"></div>
                <div class="sk-bar" style="width: 75%; margin-top: 0.4rem;"></div>

                <!-- Inline code block placeholder -->
                <div class="sk-bar sk-code-block" style="margin-top: 1rem;"></div>

                <!-- Paragraph 3 -->
                <div class="sk-bar" style="width: 100%; margin-top: 0.75rem;"></div>
                <div class="sk-bar" style="width: 82%; margin-top: 0.4rem;"></div>
            </div>
        </div>

    {:else}
        <!-- text-line (default) -->
        <div
            class="sk-bar"
            style="width: {width}; {i > 0 ? 'margin-top: 0.45rem;' : ''}"
            aria-hidden="true"
        ></div>
    {/if}

{/each}

<style>
/* ─── Shared shimmer base ────────────────────────────────────────── */
.sk-bar {
    border-radius: 4px;
    background: color-mix(in srgb, var(--background) 55%, var(--bright-black) 45%);
    animation: sk-pulse 1.5s ease-in-out infinite;
}

@keyframes sk-pulse {
    0%, 100% { opacity: 0.38; }
    50%       { opacity: 0.72; }
}

/* ─── Post-card variant ──────────────────────────────────────────── */
/* Mirrors: border: 1px solid var(--selection-background); padding: 1.25rem; border-radius: 6px */
.sk-post {
    border: 1px solid var(--selection-background);
    padding: 1.25rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    list-style: none;
}

/* h2 a — font-size: 1.1rem → height ≈ 1.1rem × line-height(1.4) ≈ 1.1rem */
.sk-post-title {
    height: 1.1rem;
    /* tinted blue to hint at the actual link colour */
    background: color-mix(in srgb, var(--blue) 18%, var(--bright-black) 82%);
}

/* p description — font-size: 0.9rem */
.sk-post-desc {
    height: 0.9rem;
}

/* .meta { display:flex; align-items:center; gap:1rem; flex-wrap:wrap } */
.sk-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 0.85rem;
}

/* .date { font-size: 0.9rem } */
.sk-date {
    height: 0.8rem;
    width: 80px;
    flex-shrink: 0;
}

/* .tags { display:flex; gap:0.4rem } */
.sk-tags {
    display: flex;
    gap: 0.4rem;
}

/* .tag { padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.85rem; border: 1px solid … } */
.sk-tag {
    height: 1.4rem;
    width: 48px;
    border-radius: 4px;
    /* tinted cyan to mirror the actual tag colour */
    background: color-mix(in srgb, var(--cyan) 14%, var(--bright-black) 86%);
    animation: sk-pulse 1.5s ease-in-out infinite;
}

/* ─── Blog-modal variant ─────────────────────────────────────────── */
.sk-blog {
    width: 100%;
    padding: 0 1rem;
}

/* .name: font-family Press Start 2P → taller block; margin-top: 5vh; color: --yellow */
.sk-blog-title {
    height: calc(var(--title-size) * 0.65);
    margin-top: 5vh;
    border-radius: 4px;
    /* tinted yellow to mirror the pixelated heading colour */
    background: color-mix(in srgb, var(--yellow) 20%, var(--bright-black) 80%);
    animation: sk-pulse 1.5s ease-in-out infinite;
}

/* .metadata { display:flex; flex-wrap:wrap; gap:1.5rem; margin-top:1rem } */
.sk-metadata-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 1rem;
    align-items: center;
}

.sk-meta-chunk {
    height: 0.85rem;
}

/* Hairline separator (dialog-header border-bottom) */
.sk-divider {
    width: 100%;
    height: 1px;
    background: var(--selection-background);
    margin: 1.5rem 0 1.25rem;
    opacity: 0.6;
}

/* Markdown body area */
.sk-body {
    display: flex;
    flex-direction: column;
}

.sk-body .sk-bar {
    height: var(--font-size, 1rem);
}

/* h2 in markdown — slightly taller */
.sk-h2 {
    height: calc(var(--title-size, 1.5rem) * 0.38) !important;
    background: color-mix(in srgb, var(--blue) 18%, var(--bright-black) 82%) !important;
    animation: sk-pulse 1.5s ease-in-out infinite !important;
}

/* code block — mirrors pre: background: #0f1115, border, padding */
.sk-code-block {
    height: 5rem;
    border-radius: 4px;
    border: 1px solid var(--selection-background);
    background: color-mix(in srgb, #0f1115 80%, var(--bright-black) 20%) !important;
    animation: sk-pulse 1.5s ease-in-out infinite !important;
}

/* ─── Mobile tweaks ──────────────────────────────────────────────── */
@media (max-width: 599px) {
    .sk-post {
        padding: 0.9rem;
    }
    .sk-post-title {
        height: 1rem;
    }
    .sk-post-desc {
        height: 0.8rem;
    }
    .sk-date {
        font-size: 0.75rem;
    }
    .sk-tag {
        height: 1.2rem;
        width: 38px;
    }
    .sk-metadata-row {
        gap: 0.4rem;
        flex-wrap: nowrap;
    }
    .sk-meta-chunk {
        width: 80px;
    }
}
</style>
