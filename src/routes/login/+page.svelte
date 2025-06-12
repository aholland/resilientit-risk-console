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
          class="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      <div class="mt-4">
        <button
          type="submit"
          disabled={isLoading}
          class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  </div>
</div>