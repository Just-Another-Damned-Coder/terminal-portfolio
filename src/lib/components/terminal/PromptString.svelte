<script lang='ts'>
    import {COLORS, scheme} from '$lib/js/constants';
    import {handler} from '$lib/js/parser/terminal';
    export let editable;
    export let latest_username;
    export let latest_pwd;

</script>

<span class="prompt-string" spellcheck="false">
  <span contenteditable="false" style="color:{COLORS[$scheme].green}">{latest_username}@morisjohnson.in</span>
  <span contenteditable="false" style="color:{COLORS[$scheme].brightBlue}">:{latest_pwd}</span>
  <span contenteditable="false" style="color:{COLORS[$scheme].brightBlack}">$</span><span use:handler={{ active: editable !== 'true' }} class="command">&nbsp;</span>
</span>

