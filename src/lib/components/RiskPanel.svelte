<script lang="ts">
  import type {Risk} from '$lib/types/Risk';
  import type {Owner} from '$lib/types/Owner';
  import ControlPanel from './ControlPanel.svelte';
  import {RiskColoursMap} from '$lib/utils/RiskColoursMap';
  import SveltyPicker, {formatDate, parseDate} from 'svelty-picker';
  import {en} from 'svelty-picker/i18n';
  import RiskMetricPanel from "$lib/components/RiskMetricPanel.svelte";
  import { writable } from 'svelte/store';
  import RiskField from "$lib/components/RiskField.svelte";
  import {riskManagementOptions} from "$lib/types/RiskManagementOption";

  let {risk, detailed, ownersMap} = $props<{
    risk: Risk;
    detailed: boolean;
    ownersMap: Map<string, Owner>;
  }>();
  const riskStore = writable<Risk>(risk);

  const parse = function (v: string): Date | null {
    return v ? parseDate(v, 'dd/mm/yyyy', en, 'standard') : null;
  }

  let dateAdded: Date | null = $state((() => parse(risk.dateAdded))());
  let dateLastReviewed: Date | null = $state((() => parse(risk.lastReviewed))());
</script>

<li
        class="relative p-3 rounded-sm mb-2 shadow-sm list-none"
        style="background-color: var(--item-bg);"
>
    <div class="flex flex-col gap-1" style="background: var(--item-bg);">
        <div class="flex flex-col gap-1">
            <div class="flex gap-1 w-full">
                <span style="color: var(--text-primary);">{risk.id} |</span>
                <span class="font-medium" style="color: var(--text-primary);">{risk.title}</span>
            </div>
            <div class="flex gap-1 items-center flex-nowrap min-w-fit" style="justify-content: flex-start;">
                <span class="text-left text-xs">Status: {risk.status ?? 'Not Implemented'}</span>
                <span class="w-3 h-3 inline-block" style="background: {RiskColoursMap.getStatusColour(risk)};"></span>
                <div class="flex-1"></div>
                <div class="flex gap-1 items-center flex-nowrap">
                    <span class="text-xs" style="color: var(--text-primary);">Current Risk:</span>
                    {#snippet vbar()}
                        <span class="text-xs" style="color: var(--text-primary);">|</span>
                    {/snippet}
                    <RiskMetricPanel label="Impact" bind:v={$riskStore.score.impact} />
                    {@render vbar()}
                    <RiskMetricPanel label="Likelihood" bind:v={$riskStore.score.likelihood} />
                    {@render vbar()}
                    <RiskField bind:score={$riskStore.score}/>
                </div>
            </div>
        </div>
        <span
                class="font-light text-xs border-t border-t-gray-400 p-1"
                style="color: var(--text-primary);"
        >{risk.description}</span>
        <hr class="border-gray-400"/>
        <div class="flex items-center gap-1">
            <span class="text-xs" style="color: var(--text-primary);">Date added</span>
            <SveltyPicker
                    mode="date"
                    format="yyyy-mm-dd"
                    displayFormat="dd/mm/yyyy"
                    bind:value={
                    () => {
                      return dateAdded ? formatDate(dateAdded, 'yyyy-mm-dd', en, 'standard') : '';
                    },
                      parse
                  }
                    manualInput={true}

            />
            <span class="text-xs font-light" style="color: var(--text-muted);">|</span>
            <span class="text-xs" style="color: var(--text-primary);">Risk Domain</span>
            <select title="Select the risk category"
                    class="text-xs border border-gray-400 rounded-sm px-2 py-1"
                    style="background-color: var(--item-bg); color: var(--text-primary);"
            >
                <option value="1" title="Financial">Financial</option>
                <option value="2" title="Operational (including Information Security Risks)">Operational (incl. ISR)
                </option>
                <option value="3" title="Brand/Reputational">Brand/Reputational</option>
                <option value="4" title="Health and Safety">Health and Safety</option>
                <option value="5" title="Regulatory/Legal">Regulatory/Legal</option>
            </select>
            <span class="text-xs font-light" style="color: var(--text-muted);">|</span>
            <span class="text-xs" style="color: var(--text-primary);">Owner</span>
            <select title="Select the owner"
                    class="text-xs border border-gray-400 rounded-sm px-2 py-1"
                    style="background-color: var(--item-bg); color: var(--text-primary);"
                    bind:value={$riskStore.owner}
            >
                {#each [...ownersMap] as [id, owner]}
                    <option value={owner}>{owner.name}</option>
                {/each}
            </select>
            <span class="text-xs font-light" style="color: gray">|</span>
            <span class="text-xs" style="color: var(--text-primary);">Treatment</span>
            <select title="Select the risk management option"
                    class="text-xs border border-gray-400 rounded-sm px-2 py-1"
                    style="background-color: var(--item-bg); color: var(--text-primary);"
                    bind:value={$riskStore.treatment}
            >
                {#each riskManagementOptions as treatment}
                    <option value={treatment}>{treatment}</option>
                {/each}
            </select>
        </div>
        <div class="flex items-center gap-1">
            <span class="text-xs" style="color: var(--text-primary);">Control Process</span>
            <input
                    type="text"
                    class="text-xs border border-gray-400 rounded-sm px-2 py-1"
                    style="background-color: var(--item-bg); color: var(--text-primary); width: 48ch;"
                    bind:value={$riskStore.checkProcess}
            />
        </div>
        <div class="flex flex-col gap-1">
            <span class="text-xs" style="color: var(--text-primary);">Control Detail/Rigor and Review Notes</span>
            <textarea
                    class="text-xs border border-gray-400 rounded-sm px-2 py-1"
                    style="background-color: var(--item-bg); color: var(--text-primary); width: 80ch; height: 4em; resize: vertical;"
                    bind:value={$riskStore.notes}
            ></textarea>
        </div>
        <div class="flex flex-row gap-1">
                <span class="text-xs" style="color: var(--text-primary);">Residual Risk Accepted</span>
                <input
                        type="checkbox"
                        class="text-xs border border-gray-400 rounded-sm"
                        style="background-color: var(--item-bg); color: var(--text-primary);"
                />
            <span class="text-xs font-light" style="color: gray">|</span>
            <span class="text-xs" style="color: var(--text-primary);">Date last reviewed</span>
            <SveltyPicker
                    mode="date"
                    format="yyyy-mm-dd"
                    displayFormat="dd/mm/yyyy"
                    bind:value={
                    () => {
                      return dateLastReviewed ? formatDate(dateAdded, 'yyyy-mm-dd', en, 'standard') : '';
                    },
                      parse
                  }
                    manualInput={true}

            />
            <span class="text-xs font-light" style="color: gray">|</span>
        </div>
        {#if detailed}
            <hr class="border-gray-400"/>
            <div class="font-bold text-xs" style="color: var(--text-primary);">
                Currently implemented controls:
                <ul class="list-disc list-inside ml-2 font-light">
                    {#each risk.controls as control}
                        <ControlPanel {control}/>
                    {/each}
                </ul>
            </div>
            <div class="font-bold text-xs" style="color: var(--text-primary);">
                Future implemented controls:
                <ul class="list-disc list-inside ml-2 font-light">
                    {#each risk.controls as control}
                        <ControlPanel {control}/>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
</li>

<style>
</style>