<script>
	import { version, COLORS, scheme, name} from '$lib/js/constants.js';
</script>


<div class="title">
    <div class="side"></div>
    <div class="main" style="color:{COLORS[$scheme].yellow};">
        <h1 class="name" >{name}</h1>
        <h6 class="version">{version}</h6>
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
    font-family: '1982', sans-serif;
    margin-top: 1vh;
    font-size: var(--title-size);
}
.version {
    font-family: 'SilkScreen', sans-serif;
    align-self: flex-end;
    font-size: var(--version-text);
}
</style>