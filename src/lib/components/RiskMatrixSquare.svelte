<script lang="ts">
  import {RiskColoursMap} from '$lib/utils/RiskColoursMap';
  import {RiskScore} from '$lib/types/RiskScore';

  let {score, selectedScore = $bindable()} = $props<{
    score: RiskScore;
    selectedScore: RiskScore;
  }>();

  // Get the background color
  const bgColor = RiskColoursMap.getScoreColour(score);
  const fontColor = RiskColoursMap.getContrastColorBW(bgColor);

  const sameLikelihood = $derived(score.likelihood === selectedScore.likelihood);
  const sameImpact = $derived(score.impact === selectedScore.impact);
  const fullMatch = $derived(sameLikelihood && sameImpact);
  const partialMatch = $derived(!fullMatch && (sameLikelihood || sameImpact));
  const noMatch = $derived(!sameImpact && !sameLikelihood);

  // Dynamic blur for frosted effect
  const blur = $derived(
    noMatch ? '0.75px' : partialMatch ? '0.75px' : '0px'
  );
  // Dynamic whiteness for frosted glass
  const whiteness = $derived(
    partialMatch ? 0.1 : 0.3
  );
</script>

<span
        class="w-[26px] h-[26px] flex items-center justify-center text-xs border border-white relative"
        role="button"
        tabindex="0"
        style="background: {bgColor}; color: {fontColor};"
        onmouseover={() => { selectedScore = score; }}
        onfocus={() => { selectedScore = score; }}
>
  {score.value()}
    <!-- Frosted glass panel in front -->
    {#if !fullMatch}
      <div
              class="frosted-glass"
              style="backdrop-filter: blur(0.5px); background-color: rgba(255, 255, 255, 0.25);"
      ></div>
    {/if}
</span>

<style>
    .frosted-glass {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Matches MVP's shadow-lg */
        z-index: 10; /* Ensures it’s in front of the span’s content */
    }
</style>