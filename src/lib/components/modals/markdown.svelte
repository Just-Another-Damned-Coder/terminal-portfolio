<!-- src/lib/components/RenderMarkdown.svelte -->
<script lang="ts">
  import { marked } from 'marked';

  export let content = '';
  $: html = marked.parse(content ?? '');
</script>

<div class="prose">{@html html}</div>
