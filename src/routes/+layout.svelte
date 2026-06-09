<script>
	import '../app.css';
	import { scheme, COLORS, FILELIST } from '$lib/js/constants';
	import { applyTheme } from '$lib/js/utils/SVG';

	let { children, data } = $props();

	// Set filesystem data synchronously before any child renders.
	// data is already resolved by SvelteKit's load() before this runs.
	FILELIST.set(data.filesystem);

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.style.backgroundColor = COLORS[$scheme].background;
			document.body.style.color = COLORS[$scheme].foreground;
			applyTheme(COLORS[$scheme]);
		}
	});
</script>

<svelte:head>
	<!-- Add your real favicon here later: <link rel="icon" href="/favicon.png" /> -->
</svelte:head>

{@render children?.()}