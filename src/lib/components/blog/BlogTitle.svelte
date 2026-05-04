<script lang="ts">
	export let title: string = "Modal Title";
    import { COLORS, scheme} from '$lib/js/constants.js';
</script>


<div class="title">
    <div class="side"></div>
    <div class="main" style="color:{COLORS[$scheme].yellow};">
        <h1 class="name" >{title}</h1>
    </div>
    <div class="side"></div>
</div>


<style>
.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.side {
    flex: 2;
}
.main{
    flex: 6;
    display: flex;
    flex-direction: column;
}
.name {
    font-family: 'Bitcount Single', sans-serif;
    margin-top: 5vh;
    font-size: var(--title-size);
}
</style>