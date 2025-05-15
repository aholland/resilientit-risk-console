<script lang="ts">
  import { RiskColoursMap } from '$lib/utils/RiskColoursMap';
  import { RiskScore } from '$lib/types/RiskScore';

  let { score, selectedScore = $bindable() } = $props<{
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

  const blur = $derived(
    noMatch ? '1.5px' : partialMatch ? '0.75px' : '0px'
  );
  const brightness = $derived(
    noMatch ? '40%' : partialMatch ? '70%' : '100%'
  );
</script>

<span
  class="w-[26px] h-[26px] flex items-center justify-center text-xs border border-white relative"
  style="background: {bgColor}; color: {fontColor}; filter: blur({blur}) brightness({brightness});"
        onmouseover={()=>{selectedScore = score;}}
>
  {score.value()}
</span>