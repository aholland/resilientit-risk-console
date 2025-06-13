<script lang="ts">
  import { enhance } from '$app/forms'
  
  let isLoading = false
</script>

<svelte:head>
  <title>Login - ResilientIT</title>
</svelte:head>

<div class="flex items-center justify-center py-12">
  <div class="max-w-md w-full space-y-8 py-20">
    <form method="POST" action="?/login" use:enhance={() => {
      isLoading = true
      return async ({ update }) => {
        await update()
        isLoading = false
      }
    }}>
      <div>
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          class="w-full px-3 py-2 border rounded-md"
          style="background-color: var(--item-bg); color: var(--text-primary); border-color: var(--border);"
        />
      </div>

      <div class="mt-4">
        <button
          type="submit"
          disabled={isLoading}
          class="w-full py-2 px-4 text-white rounded-md"
          style="background-color: var(--button-bg); transition: background-color 0.2s;"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  </div>
</div>