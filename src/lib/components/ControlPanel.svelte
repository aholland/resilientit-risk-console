<!-- src/lib/components/Control.svelte -->
<script lang="ts">
  import type { Control } from '$lib/types/Control';

  const { control } = $props<{ control: Control}>();
</script>

<li>{control.id}: {control.name} (status: {control.status})</li>