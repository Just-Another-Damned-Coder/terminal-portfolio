<script>
	import { name, version, github, COLORS, scheme } from '$lib/js/constants';

	const themeKeys = Object.keys(COLORS);

	let themeOpen = false;
	let mobileNavOpen = false;
</script>

<nav>
	<!-- Mobile header: brand + hamburger -->
	<div class="nav-header">
		<a href="/" class="brand">
			<span class="name">{name}</span>
			<span class="version">{version}</span>
		</a>
		<button class="hamburger" on:click={() => (mobileNavOpen = !mobileNavOpen)} aria-label="Toggle navigation">
			<span class:open={mobileNavOpen}></span>
			<span class:open={mobileNavOpen}></span>
			<span class:open={mobileNavOpen}></span>
		</button>
	</div>
	<!-- Nav links: vertical on mobile, row on desktop -->
	<ul class:show={mobileNavOpen}>
		<li class="brand-li">
			<a href="/" class="brand">
				<span class="name">{name}</span>
				<span class="version">{version}</span>
			</a>
		</li>
		<li class="spacer"></li>
		<li>
			<a href="/terminal" on:click={() => (mobileNavOpen = false)}>[Terminal]</a>
		</li>
		<li>
			<a href="/about" on:click={() => (mobileNavOpen = false)}>About</a>
		</li>
		<li>
			<a href="/contact" on:click={() => (mobileNavOpen = false)}>Contact</a>
		</li>
		<li>
			<a href={github} on:click={() => (mobileNavOpen = false)}>Github</a>
		</li>
		<li>
			<a href="/blogs" on:click={() => (mobileNavOpen = false)}>Blogs</a>
		</li>
		<li class="theme-wrapper">
			<button
				class="theme-btn"
				style="background-color: {COLORS[$scheme].cyan}; color: {COLORS[$scheme].background};"
				on:click={() => (themeOpen = !themeOpen)}
			>
				Theme &#x25BE;
			</button>
			{#if themeOpen}
				<div class="theme-dropdown" role="menu" tabindex="-1" style="background: {COLORS[$scheme].background}; border-color: {COLORS[$scheme].brightBlack};"  on:mouseleave={() => (themeOpen = false)}>
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
		</li>
	</ul>
</nav>

<style>
	
</style>