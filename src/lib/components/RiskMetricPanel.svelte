<!-- src/lib/components/RiskMetricPanel.svelte -->
<script lang="ts">
  import RiskMetricSubPanel from '$lib/components/RiskMetricSubPanel.svelte';
  import { mount, unmount } from 'svelte';

  let {label, v = $bindable()} = $props<{ label: string; v: number | null }>();

  let showDropdown = $state(false);
  let fieldEl: HTMLDivElement | undefined = $state(undefined);
  let dropdownEl: HTMLDivElement | undefined = $state(undefined);
  let maxWidth = $state<number | null>(null);
  let measureDiv: HTMLDivElement;

  function measureDropdownWidths(): number {
    if (!measureDiv) return 0;

    let maxWidth = 0;
    const values = [0, 1, 2, 3, 4, 5];


    values.forEach((value) => {
      const component = mount(RiskMetricSubPanel, {
        target: measureDiv,
        props: {
          label,
          vv: value,
          onClick: () => {
          },
          onKeydown: () => {
          },
          hoverClass: '',
          maxWidth: null,
          w:3,
          h:3
        }
      });

      const {width} = measureDiv.getBoundingClientRect();
      maxWidth = Math.max(maxWidth, width);

      unmount(component);
    });

    return maxWidth;
  }

  $effect(() => {
    maxWidth = measureDropdownWidths();
  });

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  function selectValue(value: number) {
    v = value;
    showDropdown = false;
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
        showDropdown = false;
      }
    }
  }

  $effect(() => {
    if (showDropdown) {
      window.addEventListener('click', handleOutsideClick);
      return () => window.removeEventListener('click', handleOutsideClick);
    }
  });
</script>

<div bind:this={fieldEl} class="relative inline-flex gap-1 items-center">
    <RiskMetricSubPanel
            {label}
            vv={v}
            onClick={toggleDropdown}
            onKeydown={handleKeydown}
            hoverClass="hover:bg-yellow-200"
            {maxWidth}
            w={3}
            h={3}
    />

    {#if showDropdown}
        <div
                class="absolute top-full left-[-9px] mt-1 z-10 border border-gray-400 bg-white rounded-sm shadow-sm flex flex-col"
                bind:this={dropdownEl}
        >
            {#each [0, 1, 2, 3, 4, 5] as num}
                <RiskMetricSubPanel
                        {label}
                        vv={num}
                        onClick={() => selectValue(num)}
                        onKeydown={handleKeydown}
                        hoverClass="hover:bg-gray-100 px-2 py-1"
                        {maxWidth}
                        w={3}
                        h={3}
                />
            {/each}
        </div>
    {/if}
</div>

<div
        bind:this={measureDiv}
        style="position: absolute; visibility: hidden; top: -9999px;"
></div>