<script lang='ts'>
    import {COLORS, scheme, pwd, username} from '$lib/js/constants';
    import {handler} from '$lib/js/parser/terminal';
    export let editable;
</script>

<span class="prompt-string" spellcheck="false">
  <span contenteditable="false" style="color:{COLORS[$scheme].green}">{$username}@morisjohnson.in</span>
  <span contenteditable="false" style="color:{COLORS[$scheme].brightBlue}">:{$pwd}</span>
  <span contenteditable="false" style="color:{COLORS[$scheme].brightBlack}">$</span>
  <span use:handler={{ active: editable !== 'true' }} class="command">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
</span>

