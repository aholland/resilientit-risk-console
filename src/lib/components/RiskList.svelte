<!-- src/lib/components/RiskList.svelte -->
<script lang="ts">
  import {Control} from '$lib/types/Control';
  import {Risk} from '$lib/types/Risk';
  import RiskPanel from '$lib/components/RiskPanel.svelte';
  import risksData from '$lib/data/risks.json';
  import controlsData from '$lib/data/controls.json';
  import policyData from "$lib/data/policy.json";
  import type {Policy} from "$lib/types/Policy";


  const policyMap: Map<string, Policy> = new Map(
    (policyData as Policy[]).map(policy => [policy.id, policy])
  );
  // Create controls map
  const controlsMap: Map<string, Control> = new Map(controlsData.map(c => {
    const control = new Control(c,policyMap);
    return [c.id, control]
  }));
  // Convert JSON to Risk instances
  const risks: Risk[] = risksData.map(data => new Risk(data, controlsMap));
</script>

<div class="">
    <h1 class="text-2xl font-bold text-resilient-blue mb-4" style="color: var(--text-on-blue);">Risk Register</h1>
    <ul>
        {#each risks as risk}
            <RiskPanel {risk} detailed={false} />
        {/each}
    </ul>
</div>

<style>
</style>