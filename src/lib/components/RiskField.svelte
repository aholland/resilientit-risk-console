<script lang="ts">
  import RiskMatrixPanel from './RiskMatrixPanel.svelte';
  import {RiskScore} from '$lib/types/RiskScore';
  import {mount, unmount} from "svelte";
  import RiskFieldSubPanel from "$lib/components/RiskFieldSubPanel.svelte";
  let maxWidth = $state<number | undefined>(undefined);

  let {score = $bindable()} = $props<{ score: RiskScore }>();
  let fieldEl: HTMLDivElement | undefined = $state(undefined);
  let dropdownEl: HTMLDivElement | undefined = $state(undefined);
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
            maxWidth: undefined,
            onClick: () => {},
            onKeydown: () => {},
          }
        });
        const {width} = measureDiv.getBoundingClientRect();
        maxWidth = Math.max(maxWidth, width);
        unmount(component);
      }
    }
    return maxWidth;
  }

  function toggleDropdown() {
    showPopup = !showPopup;
  }

  function handleKeydown(event: KeyboardEvent, action: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }

  function handleOutsideClick(event: MouseEvent) {
    if (event?.target instanceof Node) {
      const targetNode: Node = event.target;
      if (!fieldEl?.contains(targetNode) && !dropdownEl?.contains(targetNode)) {
        showPopup = false;
      }
    }
  }

  $effect(() => {
    if (showPopup) {
      window.addEventListener('click', handleOutsideClick);
      return () => window.removeEventListener('click', handleOutsideClick);
    }
  });
  $effect(() => {
    maxWidth = measureSubPanelWidths();
  });

</script>

<div bind:this={fieldEl} class="relative inline-flex gap-1 items-center cursor-pointer">
    <RiskFieldSubPanel bind:score={score} {maxWidth}
                       onClick={toggleDropdown}
                       onKeydown={handleKeydown}
    />

    {#if showPopup}
        <div bind:this={dropdownEl}
                class="absolute bottom-full left-[-98px] mt-1 z-10 border border-gray-400 rounded-sm shadow-sm p-2 cursor-default"
                style="background-color: var(--item-bg);"
        >
            <RiskMatrixPanel bind:score={score} close={() => {showPopup = false;}}/>
        </div>
    {/if}
</div>
<div
        bind:this={measureDiv}
        style="position: absolute; visibility: hidden; top: -9999px;"
></div>