<script>
    import {COLORS, scheme} from '$lib/js/constants.js';
</script>

<div class="terminal">
  <span style="color:{COLORS[$scheme].green}">visitor@morisjohnson.in</span>
  <span style="color:{COLORS[$scheme].brightBlue}">:~</span>
  <span style="color:{COLORS[$scheme].brightBlack}">$</span>
  <span style="color:{COLORS[$scheme].white};background:{COLORS[$scheme].brightRed};"> FAILED <br> </span>
  <span style="color:{COLORS[$scheme].green}">visitor@morisjohnson.in</span>
  <span style="color:{COLORS[$scheme].brightBlue}">:~</span>
  <span style="color:{COLORS[$scheme].brightBlack}">$</span>
  <span style="color:{COLORS[$scheme].white};"> Installing the terminal right now, check back again later. </span>
</div>

<style>
  .terminal {
    margin-top: 1%;
    margin-right: 2%;
    margin-left: 2%;
    font-size: calc(1vw);
  }

/* Mobile Screen CSS */
@media (max-width: 599px) {
    .terminal {
      font-size: 2vw;
    }
}
/* Tab Screen CSS */
@media (min-width: 600px) and (max-width: 899px) {
    .terminal {
        font-size: 2vw;
    }
}
</style>