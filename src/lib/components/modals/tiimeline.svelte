<script lang="ts">
  import { Separator, Tooltip } from "bits-ui";
  import { CheckCircle, CircleDot, Circle } from "@lucide/svelte";

  // Timeline Data
  export let events = [
    { date: "2019 - 2021", title: "Tech Startup Inc", desc: "Junior Frontend Developer. Built responsive React UIs and migrated legacy codebases.", status: "complete" },
    { date: "2021 - 2023", title: "Global Solutions", desc: "Software Engineer. Designed scalable APIs and launched a new customer portal.", status: "complete" },
    { date: "2023 - 2025", title: "Innovate AI", desc: "Full Stack Developer. Architected AI-driven features and real-time dashboards.", status: "complete" },
    { date: "2025 - Present", title: "Future Corp", desc: "Senior Software Engineer. Leading the frontend systems scaling architecture.", status: "current" },
  ];
</script>

<Tooltip.Provider>
  <div class="timeline-container">
    <div class="timeline-track">
      <div class="line-wrapper">
        <Separator.Root class="timeline-line" />
      </div>

      {#each events as event}
        <div class="timeline-item">
          <span class="event-date">{event.date}</span>

          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger class="node-trigger">
              {#if event.status === 'complete'}
                <CheckCircle class="icon complete" size={24} />
              {:else if event.status === 'current'}
                <CircleDot class="icon current" size={24} />
              {:else}
                <Circle class="icon upcoming" size={24} />
              {/if}
            </Tooltip.Trigger>

            <Tooltip.Content side="top" class="tooltip-box" sideOffset={8}>
              <Tooltip.Arrow class="tooltip-arrow" />
              <strong>{event.title}</strong>
              <p>{event.desc}</p>
            </Tooltip.Content>
          </Tooltip.Root>

          <span class="event-title">{event.title}</span>
        </div>
      {/each}
    </div>
  </div>
</Tooltip.Provider>

<style>
  /* Container & Layout */
  .timeline-container {
    width: 100%;
    padding: 60px 0;
    display: flex;
    justify-content: center;
    overflow-x: auto; /* Scrollable on mobile */
  }

  .timeline-track {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;
    min-width: 600px; /* Prevents squishing */
  }

  /* The Line */
  .line-wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    z-index: 1;
    padding: 0 10px;
  }

  /* Styling Bits UI Separator via standard CSS, hooked to theme variables */
  :global([data-separator-root].timeline-line) {
    height: 2px;
    background-color: var(--selection-background, #e2e8f0);
    width: 100%;
  }

  /* Timeline Items */
  .timeline-item {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--background); /* Hides the line behind the node */
    padding: 0 5px;
  }

  :global(.node-trigger) {
    background: var(--background);
    border: none;
    cursor: pointer;
    padding: 4px;
    transition: transform 0.2s ease;
  }

  :global(.node-trigger:hover) {
    transform: scale(1.2);
  }

  /* Typography */
  .event-date {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--bright-black, #64748b);
    margin-bottom: 12px;
  }

  .event-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--foreground, #1e293b);
    margin-top: 12px;
  }

  /* Icon Colors adapted to your terminal theme variables */
  :global(.icon.complete) { color: var(--green, #10b981); }
  :global(.icon.current) { color: var(--blue, #3b82f6); stroke-width: 3px; }
  :global(.icon.upcoming) { color: var(--bright-black, #cbd5e1); }

  /* Tooltip Styling */
  :global([data-tooltip-content].tooltip-box) {
    background: var(--foreground);
    color: var(--background);
    padding: 12px;
    border-radius: 8px;
    font-size: 0.8rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    max-width: 200px;
    animation: fadeIn 0.2s ease-out;
  }

  :global([data-tooltip-arrow].tooltip-arrow) {
    fill: var(--foreground);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
</style>
