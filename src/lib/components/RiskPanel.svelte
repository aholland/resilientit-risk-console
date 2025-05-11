<script lang="ts">
  import type {Risk} from '$lib/types/Risk';
  import ControlPanel from './ControlPanel.svelte';
  import {RiskColoursMap} from '$lib/utiils/RiskColoursMap';
  import SveltyPicker, {formatDate, parseDate} from 'svelty-picker';
  import {en} from 'svelty-picker/i18n';

  let {risk, detailed} = $props<{ risk: Risk; detailed: boolean }>();

  const parse = function (v: string): Date | null {
    return v ? parseDate(v, 'dd/mm/yyyy', en, 'standard') : null;
  }

  let date: Date | null = $state((() => parse(risk.dateAdded))());
</script>

<li
        class="relative p-3 rounded-sm mb-2 shadow-sm list-none"
        class:bg-red-100={risk.scoreIsHigh()}
        class:bg-yellow-100={risk.scoreIsMid()}
        class:bg-green-100={risk.scoreIsLow()}
        style="background-color: var(--item-bg);"
>
    <div class="flex flex-col gap-1" style="background: #FFFFFF">
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
                    <span class="w-3 h-3 inline-block"
                          style="background: {RiskColoursMap.getAxisColour(risk.impact ?? null)};"></span>
                    <span class="text-xs" style="color: var(--text-primary);">Impact {risk.impact ?? 'N/A'}</span>
                    <span class="text-xs" style="color: var(--text-primary);">|</span>
                    <span class="w-3 h-3 inline-block"
                          style="background: {RiskColoursMap.getAxisColour(risk.likelihood ?? null)};"></span>
                    <span class="text-xs"
                          style="color: var(--text-primary);">Likelihood {risk.likelihood ?? 'N/A'}</span>
                    <span class="text-xs" style="color: var(--text-primary);">|</span>
                    <span class="w-3 h-3 inline-block" style="background: {RiskColoursMap.getColour(risk)};"></span>
                    <span class="text-xs" style="color: var(--text-primary);">Score {risk.score() ?? 'N/A'}</span>
                </div>
            </div>
        </div>
        <span
                class="font-light text-xs border-t border-t-gray-400 p-1"
                style="color: var(--text-primary);"
        >{risk.description}</span>
        <hr class="border-gray-400"/>
        {#snippet actionRow({ clearBtnClasses, onClear, todayBtnClasses, onToday, i18n })}
            <div class="sdt-btn-row">
        <span>ASDF
          <button type="button" class={todayBtnClasses} on:click={onToday}>
            {i18n.todayBtn}
          </button>
          <button type="button" class={clearBtnClasses} on:click={onClear}>
            {i18n.clearBtn}
          </button>
        </span>
            </div>
        {/snippet}
        <div class="flex items-center gap-1">
            <span class="text-xs" style="color: var(--text-primary);">Date added</span>
            <SveltyPicker
                    mode="date"
                    format="yyyy-mm-dd"
                    displayFormat="dd/mm/yyyy"
                    bind:value={
                    () => {
                      return date ? formatDate(date, 'yyyy-mm-dd', en, 'standard') : null;
                    },
                      parse
                  }
                    manualInput={true}

            />
            <span class="text-xs font-light" style="color: gray">|</span>
            <span class="text-xs" style="color: var(--text-primary);">Category</span>
            <select
                    class="text-xs border border-gray-400 rounded-sm bg-white px-2 py-1"
                    style="color: var(--text-primary);"
            >
                <option value="Financial">Financial</option>
                <option value="Operational (including Information Security Risks)">Operational (including Information Security Risks)</option>
                <option value="Brand/Reputational">Brand/Reputational</option>
                <option value="Health and Safety">Health and Safety</option>
                <option value="Regulatory/Legal">Regulatory/Legal</option>
            </select>
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