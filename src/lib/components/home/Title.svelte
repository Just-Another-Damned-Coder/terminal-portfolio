<script>
	import { version } from '$lib/js/constants.js';


</script>


<div class="title">
        <h1 class="name">Moris Johnson</h1>
        <h6 class="version">{version}</h6>
</div>


<style>
.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.name {
    font-family: '1982', sans-serif;
    position: relative;
    display: inline-block;
}
.version {
    font-family: 'SilkScreen', sans-serif;
    align-self: first baseline;
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>