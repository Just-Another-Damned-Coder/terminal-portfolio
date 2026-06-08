<script>
	import '../app.css';
	import { scheme, COLORS } from '$lib/js/constants';
	import { applyTheme } from '$lib/js/utils/SVG';

	let { children } = $props();

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