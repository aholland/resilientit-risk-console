<script lang="ts">
  import { enhance } from '$app/forms'
  
  let isLoading = false
</script>

<svelte:head>
  <title>Login - ResilientIT</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <div class="mx-auto h-16 w-16 flex items-center justify-center">
        <img src="/Resilient-R-512x512.jpg" alt="ResilientIT Logo" class="h-16 w-16 rounded-lg" />
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Sign in to ResilientIT
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Access your risk management dashboard
      </p>
    </div>
    
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
          class="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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