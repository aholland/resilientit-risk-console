<script lang="ts">
  import { RiskColoursMap } from '$lib/utils/RiskColoursMap';

  let {
    label,
    vv,
    maxWidth: maxWidth
  } = $props<{
    label: string;
    vv: number;
    maxWidth: number | null
  }>();
</script>

<span
        class="inline-flex w-full justify-between gap-1 items-center flex-nowrap cursor-pointer"
        role="button"
        tabindex="0"
        style="width: {maxWidth ? `${maxWidth}px` : 'auto'}"
>
  <span class={`w-3 h-3 inline-block`} style="background: {RiskColoursMap.getAxisColour(vv)};"></span>
  <span class="text-xs whitespace-nowrap" style="color: var(--text-muted);">
    {label} {vv !== null ? vv : 'N/A'}
  </span>
</span>