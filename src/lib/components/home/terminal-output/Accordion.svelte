<script lang="ts">
  import { Accordion, Separator } from "bits-ui";
  import { ChevronDown } from "@lucide/svelte";

  const items = [
    {
      value: "1",
      title: "What is the meaning of life?",
      content:
        "To become a better person, to help others, and to leave the world a better place than you found it."
    },
    {
      value: "2",
      title: "How do I become a better person?",
      content:
        "Read books, listen to podcasts, and surround yourself with people who inspire you."
    },
    {
      value: "3",
      title: "What is the best way to help others?",
      content: "Give them your time, attention, and love."
    }
  ];
</script>

<Accordion.Root class="accordion-root" type="multiple">
  {#each items as item (item.value)}
    <Accordion.Item value={item.value} class="accordion-item">
      <Accordion.Header>
        <Accordion.Trigger class="accordion-trigger">
          <span class="accordion-title">
            {item.title}
          </span>
          <span class="accordion-icon">
            <ChevronDown size={18} />
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content class="accordion-content">
        <div class="accordion-body">
          {item.content}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>

<style>
  .accordion-root {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    color: var(--foreground);
    border: 1px solid var(--selection-background);
    border-radius: 6px;
    overflow: hidden;
  }

  :global(.accordion-item) {
    border-bottom: 1px solid var(--selection-background);
  }

  :global(.accordion-item:last-child) {
    border-bottom: none;
  }

  :global(.accordion-trigger) {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--bright-white, var(--foreground));
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  :global(.accordion-trigger:hover) {
    background: color-mix(in srgb, var(--background) 90%, var(--foreground) 10%);
  }

  .accordion-title {
    text-align: left;
    flex: 1;
  }

  .accordion-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s cubic-bezier(0.87, 0, 0.13, 1);
  }

  /* Rotate icon when accordion is open */
  :global([data-state="open"] > .accordion-icon) {
    transform: rotate(180deg);
  }

  :global(.accordion-content) {
    overflow: hidden;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--foreground);
    background: color-mix(in srgb, var(--background) 95%, var(--selection-background) 5%);
  }

  :global(.accordion-content[data-state="open"]) {
    animation: slideDown 0.2s cubic-bezier(0.87, 0, 0.13, 1);
  }

  :global(.accordion-content[data-state="closed"]) {
    animation: slideUp 0.2s cubic-bezier(0.87, 0, 0.13, 1);
  }

  .accordion-body {
    padding: 1rem 1.25rem;
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--bits-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--bits-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
</style>