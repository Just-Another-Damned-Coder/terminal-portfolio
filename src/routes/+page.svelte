<script>
    import {Navbar, LatestPosts} from "$lib/components";

    export let data;
</script>

<div class="home">
    <Navbar />

    <main>
        <section class="hero">
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

<style>
    .home {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    main {
        flex: 1;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
        box-sizing: border-box;
    }
    .hero {
        margin-bottom: 3rem;
    }
    .hero-subtitle {
        font-size: var(--font-size);
        color: var(--foreground);
        line-height: 1.6;
        max-width: 600px;
    }
    .hero-subtitle a {
        color: var(--cyan);
        text-decoration: underline;
        text-underline-offset: 2px;
    }
    .hero-subtitle a:hover {
        color: var(--blue);
    }
    .latest-section {
        width: 100%;
    }
    @media (max-width: 599px) {
        main { padding: 1rem; }
        .hero { margin-bottom: 2rem; }
        .hero-subtitle { max-width: 100%; }
    }
    @media (min-width: 600px) and (max-width: 899px) {
        main { padding: 1.5rem; }
    }
</style>