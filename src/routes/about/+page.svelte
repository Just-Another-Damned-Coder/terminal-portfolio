<script>
    import { onMount } from "svelte";
    import { Navbar } from "$lib/components";

    const svxModules = import.meta.glob('/src/lib/docs/**/*.svx');

    let MdComponent = $state(null);
    let errorMsg = $state(null);

    onMount(async () => {
        const docPath = '/src/lib/docs/about.svx';
        if (svxModules[docPath]) {
            try {
                const module = await svxModules[docPath]();
                MdComponent = module.default;
            } catch {
                errorMsg = "Error 500: Interactive component failed to mount.";
            }
        } else {
            errorMsg = "Error 404: Component not found.";
        }
    });
</script>

<div class="page">
    <Navbar />
    <main>
        <a href="/" class="back-link">&larr; Back to Home</a>
        {#if errorMsg}
            <p class="error">{errorMsg}</p>
        {:else if MdComponent}
            <div id="markdown-content" class="markdown-body">
                <MdComponent />
            </div>
        {:else}
            <p class="loading">Loading...</p>
        {/if}
    </main>
</div>

<style>
    .page { min-height: 100vh; display: flex; flex-direction: column; }
    main { flex: 1; width: 100%; max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; box-sizing: border-box; }
    .back-link { display: inline-block; color: var(--cyan); text-decoration: none; font-size: 0.9rem; margin-bottom: 1.5rem; }
    .back-link:hover { color: var(--blue); text-decoration: underline; }
    .error { color: var(--red); }
    .loading { color: var(--bright-black); }
    @media (max-width: 599px) {
        main { padding: 1rem; }
    }
    @media (min-width: 600px) and (max-width: 899px) {
        main { padding: 1.5rem; }
    }
</style>