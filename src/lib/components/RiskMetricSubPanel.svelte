<script lang="ts">
  import { RiskColoursMap } from '$lib/utils/RiskColoursMap';

  let {
    label,
    vv,
    onClick,
    onKeydown,
    hoverClass,
    maxWidth: maxWidth
  } = $props<{
    label: string;
    vv: number;
    onClick: () => void;
    onKeydown: (event: KeyboardEvent, action: () => void) => void;
    hoverClass: string;
    maxWidth?: number;
  }>();
</script>

<span
        class="inline-flex w-full justify-between gap-1 items-center flex-nowrap cursor-pointer {hoverClass}"
        role="button"
        tabindex="0"
        onclick={onClick}
        onkeydown={(event) => onKeydown(event, onClick)}
        style="width: {maxWidth ? `${maxWidth}px` : 'auto'}"
>
  <span class="text-xs whitespace-nowrap" style="color: var(--text-primary);">
    {label} {vv !== null ? vv : 'N/A'}
  </span>
  <span class={`w-3 h-3 inline-block`} style="background: {RiskColoursMap.getAxisColour(vv)};"></span>
</span>