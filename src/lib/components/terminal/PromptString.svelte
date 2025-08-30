<script>
    import {COLORS, scheme, username, pwd, history, past_commands} from '$lib/js/constants.js';
    import {handler} from '$lib/js/parser/terminal.js';
</script>

<span class="prompt-string" contenteditable="false">
  <span style="color:{COLORS[$scheme].green}">{$username}@morisjohnson.in</span>
  <span style="color:{COLORS[$scheme].brightBlue}">:{$pwd}</span>
  <span style="color:{COLORS[$scheme].brightBlack}">$</span>
  <!-- <span bind:this={area} contenteditable="{editable ? "true" : undefined}" class="command">&nbsp;</span> -->
   <span use:handler class="command">&nbsp;</span>
</span>

