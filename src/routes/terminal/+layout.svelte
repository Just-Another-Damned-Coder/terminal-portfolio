<script>
	import '../../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/images/sample.svg" />
</svelte:head>



{@render children?.()}
