<!-- src/lib/components/ManageMatrixLogo.svelte -->
<script lang="ts">
  import type {Snippet} from "svelte";

  let {width = 72, height = 72, children, onLogoClick } = $props<{ width?: number; height?: number, children: Snippet, onLogoClick?: () => void }>();

  const padding = 24;
  const borderRadius = 8;
</script>

<div
        class="w-full flex flex-col items-center"
        style="background-color: var(--item-bg); padding: {padding}px; border-radius: {borderRadius}px; box-shadow: 0 4px 24px rgba(0,0,0,0.066);"
>
    <div class="flex justify-center w-full">
        {#if onLogoClick}
            <button
                type="button"
                onclick={onLogoClick}
                class="cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0"
                aria-label="Toggle theme"
            >
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <!-- Matrix grid background -->
                    <rect x="6" y="6" width="60" height="60" rx="13" fill="#e5e9f7"/>
                    <!-- Matrix nodes -->
                    <circle cx="22" cy="22" r="5" fill="#4262aa"/>
                    <circle cx="36" cy="22" r="5" fill="#9fb6f2"/>
                    <circle cx="50" cy="22" r="5" fill="#4262aa"/>
                    <circle cx="22" cy="36" r="5" fill="#9fb6f2"/>
                    <circle cx="36" cy="36" r="5" fill="#26325e"/>
                    <circle cx="50" cy="36" r="5" fill="#9fb6f2"/>
                    <circle cx="22" cy="50" r="5" fill="#4262aa"/>
                    <circle cx="36" cy="50" r="5" fill="#9fb6f2"/>
                    <circle cx="50" cy="50" r="5" fill="#4262aa"/>
                    <!-- Highlighted central connection -->
                    <rect x="34" y="16" width="4" height="40" rx="2" fill="#26325e" opacity="0.12"/>
                    <rect x="16" y="34" width="40" height="4" rx="2" fill="#26325e" opacity="0.12"/>
                </svg>
            </button>
        {:else}
            <svg
                width={width}
                height={height}
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="ManageMatrix Logo"
            >
                <!-- Matrix grid background -->
                <rect x="6" y="6" width="60" height="60" rx="13" fill="#e5e9f7"/>
                <!-- Matrix nodes -->
                <circle cx="22" cy="22" r="5" fill="#4262aa"/>
                <circle cx="36" cy="22" r="5" fill="#9fb6f2"/>
                <circle cx="50" cy="22" r="5" fill="#4262aa"/>
                <circle cx="22" cy="36" r="5" fill="#9fb6f2"/>
                <circle cx="36" cy="36" r="5" fill="#26325e"/>
                <circle cx="50" cy="36" r="5" fill="#9fb6f2"/>
                <circle cx="22" cy="50" r="5" fill="#4262aa"/>
                <circle cx="36" cy="50" r="5" fill="#9fb6f2"/>
                <circle cx="50" cy="50" r="5" fill="#4262aa"/>
                <!-- Highlighted central connection -->
                <rect x="34" y="16" width="4" height="40" rx="2" fill="#26325e" opacity="0.12"/>
                <rect x="16" y="34" width="40" height="4" rx="2" fill="#26325e" opacity="0.12"/>
            </svg>
        {/if}
    </div>
    {@render children?.()}
</div>