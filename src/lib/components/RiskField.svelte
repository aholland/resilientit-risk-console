<script lang="ts">
  import {RiskColoursMap} from '$lib/utils/RiskColoursMap';
  import RiskMatrixPanel from './RiskMatrixPanel.svelte';
  import {RiskScore} from '$lib/types/RiskScore';
  import {mount, unmount} from "svelte";
  import RiskMetricSubPanel from "$lib/components/RiskMetricSubPanel.svelte";
  import RiskFieldSubPanel from "$lib/components/RiskFieldSubPanel.svelte";
  let maxWidth = $state<number | null>(null);

  const {score} = $props<{ score: RiskScore }>();
  let showPopup = $state(false);

  let measureDiv: HTMLDivElement;

  function measureSubPanelWidths(): number {
    if (!measureDiv) return 0;

    let maxWidth = 0;
    for (let i = 5; i <= score.scale; i++) {
      for (let j = 5; j <= score.scale; j++) {
        const rs = new RiskScore(i,j,score.scale);
        const component = mount(RiskFieldSubPanel, {
          target: measureDiv,
          props: {
            score: rs,
            maxWidth: null,
            handleMouseEnter: () => {},
            handleMouseLeave: () => {},
          }
        });
        const {width} = measureDiv.getBoundingClientRect();
        maxWidth = Math.max(maxWidth, width);
        unmount(component);
      }
    }
    return maxWidth;
  }

  function handleMouseEnter() {
    showPopup = true;
  }

  function handleMouseLeave() {
    showPopup = false;
  }

  $effect(() => {
    maxWidth = measureSubPanelWidths();
  });

</script>

<div class="relative inline-flex">
    <RiskFieldSubPanel {score} {handleMouseEnter} {handleMouseLeave} {maxWidth}/>

    {#if showPopup}
        <div
                class="absolute top-full left-0 mt-1 z-10 bg-white border border-gray-400 rounded-sm shadow-sm p-2"
        >
            <RiskMatrixPanel scale={score?.scale ?? 5}/>
        </div>
    {/if}
</div>
<div
        bind:this={measureDiv}
        style="position: absolute; visibility: hidden; top: -9999px;"
></div>