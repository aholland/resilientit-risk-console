<script lang="ts">
  import RiskMatrixSquare from './RiskMatrixSquare.svelte';
  import {RiskScore} from '$lib/types/RiskScore';
  import RiskMetricSubPanel from "$lib/components/RiskMetricSubPanel.svelte";

  let {scale} = $props<{ scale: number }>();

  // Generate RiskScore objects for each cell in the n×n grid
  const grid: RiskScore[][] = [];
  for (let y = scale; y >= 1; y--) {
    const row: RiskScore[] = [];
    for (let x = 1; x <= scale; x++) {
      row.push(new RiskScore(y, x, scale));
    }
    grid.push(row);
  }
</script>

<div class="flex flex-col gap-1">
    <!-- Top row: Impact (x-axis) with RiskMetric -->
    <div class="flex">
        <div class="w-12"></div> <!-- Spacer for y-axis label -->
        {#each Array(scale).fill(0) as _, i}
            <div class="w-6 text-center">
                <RiskMetricSubPanel label="" vv={i+1} onClick={() => {
                }} onKeydown={() => {}}
                                    hoverClass=""
                                    maxDropdownWidth={null}
                                    w={3}
                                    h={3}
                />
            </div>
        {/each}
    </div>

    <!-- Grid with Likelihood (y-axis) -->
    {#each grid as row, rowIndex}
        <div class="flex">
            <!-- Y-axis label with RiskMetric -->
            <div class="w-20">
                <RiskMetricSubPanel label="" vv={scale - rowIndex} onClick={() => {
                }} onKeydown={() => {}}
                                    hoverClass=""
                                    maxDropdownWidth={null}
                                    w={3}
                                    h={6}
                />
            </div>
            <!-- Grid row -->
            {#each row as score, colIndex}
                {#if score}
                    <RiskMatrixSquare score={score}/>
                {/if}
            {/each}
        </div>
    {/each}
</div>