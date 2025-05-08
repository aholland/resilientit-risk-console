<!-- src/lib/components/RiskList.svelte -->
<script lang="ts">
  import type {Control} from '$lib/types/Control';
  import {Risk} from '$lib/types/Risk';
  import ControlPanel from './ControlPanel.svelte';
  import risksData from '$lib/data/risks.json';
  import controlsData from '$lib/data/controls.json';
  import {RiskColoursMap} from "$lib/utiils/RiskColoursMap";

  // Create controls map
  const controlsMap: Map<string, Control> = new Map(controlsData.map(c => [c.id, c]));
  // Convert JSON to Risk instances
  const risks: Risk[] = risksData.map(data => new Risk(data, controlsMap));
</script>

<div class="p-4">
    <h1 class="text-2xl font-bold text-resilient-blue mb-4" style="color: var(--text-primary);">Risk Register</h1>
    <ul>
        {#each risks as risk}
            {#snippet RiskItem(risk: Risk)}
                <li
                        class="relative p-3 rounded-sm mb-2 shadow-sm list-none"
                        class:bg-red-100={risk.scoreIsHigh()}
                        class:bg-yellow-100={risk.scoreIsMid()}
                        class:bg-green-100={risk.scoreIsLow()}
                        style="background-color: var(--item-bg);"
                >
                    <div class="flex flex-col gap-1">
                        <div class="flex gap-1">
                            <span class="font-light" style="color: var(--text-primary);">
                                Risk&nbsp;type&nbsp;{risk.id}&nbsp;|
                            </span>
                            <span class="font-medium" style="color: var(--text-primary);">
                                {risk.title}
                            </span>
                            <div class="ml-auto flex gap-1 items-center">
                                <span class="font-light text-xs" style="color: var(--text-primary);">Current:</span>
                                <span class="w-3 h-3 inline-block" style="background: {RiskColoursMap.getAxisColour(risk.impact ?? null)};"></span>
                                <span class="font-light text-xs" style="color: var(--text-primary);">impact {risk.impact ?? 'N/A'}</span>
                                <span class="font-light text-xs" style="color: var(--text-primary);">|</span>
                                <span class="w-3 h-3 inline-block" style="background: {RiskColoursMap.getAxisColour(risk.likelihood ?? null)};"></span>
                                <span class="font-light text-xs" style="color: var(--text-primary);">likelihood {risk.likelihood ?? 'N/A'}</span>
                                <span class="font-light text-xs" style="color: var(--text-primary);">|</span>
                                <span class="w-3 h-3 inline-block" style="background: {RiskColoursMap.getColour(risk)};"></span>
                                <span class="font-light text-xs" style="color: var(--text-primary);">score {risk.score() ?? 'N/A'}</span>
                            </div>                        </div>
                        <span
                                class="font-light text-xs border-t border-b border-t-gray-400 border-b-gray-400 p-1"
                                style="color: var(--text-primary);"
                        >{risk.description}</span>
                        <div class="flex gap-4 text-sm" style="color: var(--text-secondary);">
                            <span>Score: {risk.score() ?? 'N/A'}</span>
                            <span>Status: {risk.status ?? 'Not Implemented'}</span>
                        </div>
                        <div class="text-sm" style="color: var(--text-secondary);">
                            Controls:
                            <ul class="list-disc list-inside ml-2">
                                {#each risk.controls as control}
                                    <ControlPanel {control}/>
                                {/each}
                            </ul>
                        </div>
                    </div>
                </li>
            {/snippet}
            {@render RiskItem(risk)}
        {/each}
    </ul>
</div>

<style>
</style>