<script lang="ts">
  import { RiskColoursMap } from '$lib/utils/RiskColoursMap';

  let {
    label,
    vv
  } = $props<{
    label: string;
    vv: number;
  }>();
</script>

<div
        class="flex flex-col items-center gap-1"
        role="button"
        tabindex="0"
>
  <span class="text-xs whitespace-nowrap" style="color: var(--text-muted);">
    {vv !== null ? vv : 'N/A'}
  </span>
  <span class="w-3 h-3 block" style="background: {RiskColoursMap.getAxisColour(vv)};"></span>
  <span class="text-xs whitespace-nowrap" style="color: var(--text-primary);">
    {label}
  </span>
</div>