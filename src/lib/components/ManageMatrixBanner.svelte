<script lang="ts">
  import ManageMatrixLogo from './ManageMatrixLogo.svelte';
  
  let { onLogoClick } = $props<{ onLogoClick?: () => void }>();
</script>

<ManageMatrixLogo {onLogoClick}>
    <div class="logo-text">
      Manage<span class="matrix-text">Matrix</span>
    </div>
</ManageMatrixLogo>
<style>
    .logo-text {
        font-family: 'Segoe UI', Arial, sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: var(--banner-manage);
        letter-spacing: 1px;
        margin-top: 16px;
        text-align: center;
        line-height: 37px;
    }

    .matrix-text {
        color: var(--banner-matrix);
    }
</style>