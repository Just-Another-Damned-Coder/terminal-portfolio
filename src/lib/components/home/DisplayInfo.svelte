<script>
    import { onMount, tick, onDestroy  } from 'svelte';
    import { tableHeightStore, COLORS, scheme } from '$lib/js/constants.js';
    import {getUserDetails, formatUptime, getDateTime} from '$lib/js/displayinfo.js';
    let  uptime, timer, now;
    let start = Date.now()
    let details = getUserDetails();

    function updateDetails() {
        now = getDateTime();
        details[3] = { label: 'Uptime', value: uptime };
        details[9] = { label: 'Time', value: now[0] };
        details[8] = { label: 'Date', value: now[1] };
    }

    onMount (async () => {
                await tick();
                const tickTimer = () => {
                const ms = Date.now() - start;
                uptime = formatUptime(ms);
                updateDetails();
            };
            tickTimer();
            timer = setInterval(tickTimer, 1000);
        }
    )

</script>

<table class = "displayInfo" >
    <thead></thead>
    <tbody>
    {#each details as {label, value}}
    <tr>
        <td class="metric">
        <span class="label" style="color:{COLORS[$scheme].yellow}">{label}:</span>
        <span class="value" style="color:{COLORS[$scheme].brightGreen}">{value}</span>
        </td>
    </tr>
    {/each}
    </tbody>
</table>


<style>
    .label {
        color: aliceblue;
        margin-bottom: 0;
    }
    .value {
        color: aliceblue;
        margin-bottom: 0;
    }
    .metric {
        font-size: 1vw;
    }
</style>