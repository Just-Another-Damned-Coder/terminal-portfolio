<script lang="ts">
  import { page } from '$app/stores';
  import { COLORS, scheme } from '$lib/js/constants';
  import { House } from '@lucide/svelte';
</script>

<div class="column" style="height: 100vh; justify-content: center; align-items: center; background-color: {COLORS[$scheme].background};">
    <div class="row prompt-output" style="font-size: 1.5rem; text-align: center; margin-bottom: 2rem;">
        <span style="color:{COLORS[$scheme].red}; margin-right: 1rem;">ERR {$page.status}:</span>
        <span style="color:{COLORS[$scheme].foreground};">{$page.error?.message ?? 'Internal Server Error'}</span>
    </div>

    <div class="row prompt-output" style="font-size: 1rem;">
        <span style="color:{COLORS[$scheme].yellow}; margin-right: 1rem;">Hint:</span>
        <a href="/" style="color: {COLORS[$scheme].blue}; text-decoration: underline; display: inline-flex; align-items: center; gap: 0.5rem;">
            Return to Home
            <House size={16} />
        </a>
    </div>
</div>

<style>
    a:hover {
        opacity: 0.8;
    }
</style>
