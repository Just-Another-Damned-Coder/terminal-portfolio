<script>
	import '../../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<!-- Add your real favicon here later: <link rel="icon" href="/favicon.png" /> -->
</svelte:head>



{@render children?.()}
