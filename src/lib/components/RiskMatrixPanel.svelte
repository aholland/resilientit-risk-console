<script lang="ts">
  import RiskMatrixSquare from './RiskMatrixSquare.svelte';
  import {RiskScore} from '$lib/types/RiskScore';
  import RiskMetricAxisLabelX from '$lib/components/RiskMetricAxisLabelX.svelte';
  import RiskMetricAxisLabelY from '$lib/components/RiskMetricAxisLabelY.svelte';

  let {score = $bindable(), close} = $props<{ score: RiskScore, close: () => void }>();
  let localScore = $state(new RiskScore(score.likelihood, score.impact, score.scale));

  const scale = score.scale;
  // Generate RiskScore objects for each cell in the n×n grid
  const grid: RiskScore[][] = [];
  for (let y = scale; y >= 1; y--) {
    const row: RiskScore[] = [];
    for (let x = 1; x <= scale; x++) {
      row.push(new RiskScore(y, x, scale));
    }
    grid.push(row);
  }

  // Grid dimensions
  const cellSize = 26; // w-6 h-6 = 24px per square
  const spacerWidth = 5; // From <span style="width: 5px">
  const xAxisWidth = -2; // From <div class="w-[30px]">
  const yAxisWidth = 29; // From <div class="w-[30px]">
  const gridWidth = (scale * cellSize) + 31;
  const gridHeight = (scale * cellSize) + 31;

  // Line positions based on selected score (1-based index)
  const lineX1 = $derived((yAxisWidth + (localScore.impact - 1) * cellSize) - 2); // Left edge of selected column
  const lineX2 = $derived((yAxisWidth + (localScore.impact) * cellSize)); // Right edge
  const lineY1 = $derived((xAxisWidth + (scale - localScore.likelihood) * cellSize)-1); // Top edge of selected row
  const lineY2 = $derived((xAxisWidth + ((scale - localScore.likelihood + 1) * cellSize))+1); // Bottom edge

  // Keyboard handler for both divs
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === 'Space') {
      event.preventDefault();
      if (event.currentTarget === event.target) {
        if (event.currentTarget.id === 'outer-div') {
          close();
        } else if (event.currentTarget.id === 'grid-div') {
          score = localScore;
          close();
        }
      }
    }
  }
</script>

<div
  id="outer-div"
  class="flex flex-row items-start"
  role="button"
  tabindex="0"
  onclick={() => close()}
  onkeydown={handleKeyDown}
>
    <div style="width: 30px; height: 1px;">
        <div class="absolute rotate-270 font-stretch-200% tracking-widest" style="top: 70px; left: -35px;">likelihood
        </div>
    </div>
    <div class="flex flex-col relative">
        <!-- Grid with lines -->
        <div class="relative">
            <div class="flex flex-row">
                <div>
                    {#each grid as row, rowIndex}
                        <div class="flex">
                            <!-- Y-axis label -->
                            <RiskMetricAxisLabelY label="" vv={scale - rowIndex} maxWidth={25}/>
                            <span class="w-[5px] h-[26px]"></span>
                        </div>
                    {/each}
                </div>
        <div
          id="grid-div"
          role="button"
          tabindex="0"
          onclick={() => {
                        score = localScore;
                        close();
                    }}
                     onmouseleave={()=>{
                         localScore = score;
                     }}
          onkeydown={handleKeyDown}
                    >
                    {#each grid as row, rowIndex}
                        <div class="flex">
                            <!-- Grid row -->
                            {#each row as squareScore}
                                <RiskMatrixSquare score={squareScore} bind:selectedScore={localScore}/>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
            <!-- X-axis labels -->
            <div class="flex">
                <div class="w-[30px]"></div>
                {#each Array(scale).fill(0) as _, i}
                    <div class="w-[26px] text-center">
                        <RiskMetricAxisLabelX label="" vv={i+1}/>
                    </div>
                {/each}
            </div>
            <div class="flex text-sm justify-center font-stretch-200% tracking-widest">
                impact
            </div>

            {#if !localScore.isIncomplete()}
                <!-- Vertical line 1 (left of selected column) -->
                <div
                        class="absolute top-[1px] w-[4px] bg-blue-400 z-0 opacity-60 pointer-events-none"
                        style="left: {lineX1}px; height: {gridHeight}px;"
                ></div>
                <!-- Vertical line 2 (right of selected column) -->
                <div
                        class="absolute top-[1px] w-[4px] bg-blue-400 z-0 opacity-60 pointer-events-none"
                        style="left: {lineX2}px; height: {gridHeight}px;"
                ></div>
                <!-- Horizontal line 1 (top of selected row) -->
                <div
                        class="absolute left-[0px] h-[4px] bg-blue-400 z-0 opacity-60 pointer-events-none"
                        style="top: {lineY1}px; width: {gridWidth-2}px;"
                ></div>
                <!-- Horizontal line 2 (bottom of selected row) -->
                <div
                        class="absolute left-[0px] h-[4px] bg-blue-400 z-0 opacity-60 pointer-events-none"
                        style="top: {lineY2}px; width: {gridWidth-2}px;"
                ></div>
            {/if}
        </div>
    </div>
</div>