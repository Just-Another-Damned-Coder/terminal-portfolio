<script>
    import {Navbar, LatestPosts} from "$lib/components";

    export let data;
</script>

<div class="home">
    <Navbar />

    <main>
        <section class="hero">
            <h1 class="hero-title">Welcome</h1>
            <p class="hero-subtitle">
                A terminal-inspired portfolio and blog. Explore projects, read posts, or switch to the
                <a href="/terminal">full terminal experience</a>.
            </p>
        </section>

        <section class="latest-section">
            <LatestPosts {data} />
        </section>
    </main>
</div>
