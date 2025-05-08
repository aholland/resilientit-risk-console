<script lang="ts">
  import '../lib/styles/themes.css';
  import RiskList from "$lib/components/RiskList.svelte";

</script>
<style>
    :global(html), :global(body) {
        background-color: var(--background);
        margin: 0;
        padding: 0;
        height: 100%;
    }
</style>

<div class="max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-lg flex flex-col min-h-[calc(100vh-2.5rem)] mb-10" style="background-color: var(--container-bg);">
    <img src="/Resilient-Logo.jpg" alt="Solving the problems that matter most ™" class="mb-4 mx-auto rounded-lg" style="max-width: 600px; max-height: 145px;" />
    <RiskList/>
</div>