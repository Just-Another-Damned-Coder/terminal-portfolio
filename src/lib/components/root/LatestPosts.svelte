<script>
    export let data;

    $: posts = data?.posts || [];

    function formatDate(dateStr) {
        if (!dateStr) return "";
        return dateStr.split("T")[0];
    }
</script>

<section class="latest-posts-container">
    <h2 class="section-title">Latest Posts</h2>

    <div class="posts-grid">
        {#each posts.slice(0, 5) as post}
            <article class="post">
                <h3>
                    <a href={`/blogs/${post.slug}`}>{post.title}</a>
                </h3>

                <p>{post.description}</p>
                <small class="date">{formatDate(post.date)}</small>

                <div class="tags">
                    {#each post.tags as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                </div>
            </article>
        {/each}
    </div>
</section>