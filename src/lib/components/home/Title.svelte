<script>
	import { version, COLORS, scheme} from '$lib/js/constants.js';
</script>


<div class="title">
    <div class="side"></div>
    <div class="main" style="color:{COLORS[$scheme].yellow};">
        <h1 class="name" >Moris Johnson</h1>
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
    font-size: 2vw;
}
.version {
    font-family: 'SilkScreen', sans-serif;
    align-self: flex-end;
    font-size: 0.6vw;
}
/* Mobile Screen CSS */
@media (max-width: 599px) {
    .name {
        font-size: 6vw;
    }
    .version {
        font-size: 2vw;
    }
}
/* Tab Screen CSS */
@media (min-width: 600px) and (max-width: 899px) {
    .name {
        font-size: 6vw;
    }
    .version {
        font-size: 2vw;
    }
}
</style>