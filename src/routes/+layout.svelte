<script>
	import '../app.css';
	import favicon from '$lib/assets/images/favicon.svg';
	

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>



{@render children?.()}
