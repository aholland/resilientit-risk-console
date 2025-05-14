<script lang="ts">
  import { RiskColoursMap } from '$lib/utils/RiskColoursMap';
  import { RiskScore } from '$lib/types/RiskScore';

  let { score } = $props<{ score: RiskScore }>();

  // Get the background color
  const bgColor = RiskColoursMap.getScoreColour(score);

  const fontColor = RiskColoursMap.getContrastColorBW(bgColor);
</script>

<span
        class="w-6 h-6 flex items-center justify-center text-xs border border-gray-300 cursor-pointer"
        style="background: {bgColor}; color: {fontColor};"
        title={`Likelihood: ${score.likelihood}, Impact: ${score.impact}, Score: ${score.value()}`}
>
  {score.value()}
</span>