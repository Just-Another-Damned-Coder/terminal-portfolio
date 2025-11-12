<script lang="ts">
    import * as Modal from '$lib/components/ui/modal';
    import {Button} from '$lib/components/ui/button';

    const paragraphs = [
        "This is a random paragraph about Svelte modals.",
        "Another random bit of text, just for demonstration.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Here goes yet another paragraph. You can randomize as needed."
    ];

    function getRandomParagraphs(count = 3) {
        // Fisher–Yates shuffle for random unique selection
        const shuffled = [...paragraphs].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
</script>

<Modal.Root>
    <Modal.Trigger>Open Fullscreen Modal</Modal.Trigger>
    <Modal.Content class="fullscreen-modal">
        <Modal.Header>
            <Modal.Title>Random Paragraphs</Modal.Title>
            <Modal.Description>
                This modal fills the whole screen and shows random paragraphs.
            </Modal.Description>
        </Modal.Header>
        <div class="random-paragraphs">
            {#each getRandomParagraphs() as para}
                <p>{para}</p>
            {/each}
        </div>
        <Modal.Footer>
            <Button on:click={Modal.close}>Close</Button>
        </Modal.Footer>
    </Modal.Content>
</Modal.Root>



<style>
.fullscreen-modal {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    inset: 0;        /* Make sure it's top:0; right:0; bottom:0; left:0 */
    position: fixed; /* Ensure it sits over everything */
    border-radius: 0 !important;
    padding: 2rem;   /* Tweak padding as needed */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--modal-bg, #fff);
    z-index: 9999;   /* Make sure it appears on top */
}
</style>