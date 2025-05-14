<script lang="ts">
    import {RiskColoursMap} from "$lib/utils/RiskColoursMap.js";
    import {RiskScore} from "$lib/types/RiskScore.js";

    const { score, handleMouseEnter, handleMouseLeave, maxWidth } = $props<{ score: RiskScore, handleMouseEnter: () => void, handleMouseLeave: () => void, maxWidth: number | null }>();
</script>
<span
          class="inline-flex w-full justify-between gap-1 items-center hover:bg-yellow-200"
          role="button"
          tabindex="0"
          onmouseenter={handleMouseEnter}
          onmouseleave={handleMouseLeave}
          style="min-width: {maxWidth ? `${maxWidth}px` : 'auto'}"
  >
    <span
            class="text-xs"
            style="color: var(--text-primary);"
    >
      Score {score.value()}
    </span>
    <span class="w-3 h-3 inline-block" style="background: {RiskColoursMap.getScoreColour(score)};"></span>
  </span>
