<script>
    import {COLORS, scheme, username, pwd} from '$lib/js/constants.js';
    import {handler} from '$lib/js/parser/terminal.js';
    import { onMount } from 'svelte';
    export let editable;
</script>

<span class="prompt-string">
  <span contenteditable="false" style="color:{COLORS[$scheme].green}">{$username}@morisjohnson.in</span>
  <span contenteditable="false" style="color:{COLORS[$scheme].brightBlue}">:{$pwd}</span>
  <span contenteditable="false" style="color:{COLORS[$scheme].brightBlack}">$</span>
  <!-- <span bind:this={area} contenteditable="{editable ? "true" : undefined}" class="command">&nbsp;</span> -->
   <span use:handler={{ active: editable !== 'true' }} class="command">&nbsp;</span>
</span>

