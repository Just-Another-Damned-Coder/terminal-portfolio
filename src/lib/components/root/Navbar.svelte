<script>
	import { name, version, github, COLORS, scheme } from '$lib/js/constants';
	import { Palette, SquareTerminal } from '@lucide/svelte';

	const themeKeys = Object.keys(COLORS);

	let themeOpen = false;
</script>

<nav>
	<div class="terminal-wrapper">
		<a href="/terminal" class="terminal-btn" aria-label="Terminal">
			<SquareTerminal size={28} />
		</a>
	</div>
	<div class="theme-wrapper">
		<div class="theme-inner">
			<button
				class="theme-btn"
				style="color: {COLORS[$scheme].foreground};"
				on:click={() => (themeOpen = !themeOpen)}
			>
				<Palette size={16} />
			</button>
			{#if themeOpen}
				<div class="theme-dropdown" role="menu" tabindex="-1" style="background: {COLORS[$scheme].background}; border-color: {COLORS[$scheme].brightBlack};" on:mouseleave={() => (themeOpen = false)}>
					{#each themeKeys as key}
						<button
							class="theme-option"
							class:active={$scheme === key}
							style="color: {COLORS[$scheme].foreground};"
							on:click={() => {
								scheme.set(key);
								themeOpen = false;
							}}
						>
							<span class="swatch" style="background: {COLORS[key].cyan};"></span>
							{COLORS[key].name}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div class="top-row">
		<a href="/" class="brand">
			{name}
			<span class="version">{version}</span>
		</a>
	</div>
	<ul class="links">
		<li><a href="/about">About</a></li>
		<li><a href="/contact">Contact</a></li>
		<li><a href={github}>Github</a></li>
		<li><a href="/blogs">Blogs</a></li>
		<li><a href="/blogs">Projects</a></li>
	</ul>
</nav>