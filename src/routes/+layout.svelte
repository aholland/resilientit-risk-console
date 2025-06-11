<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import '$lib/styles/themes.css';
  import ManageMatrixBanner from "$lib/components/ManageMatrixBanner.svelte";
  import themeStore, { SvelteTheme, setTheme } from 'svelte-themes';

  // Props for child content
  let { children } = $props();

  // Mock user role (replace with Azure AD role check)
  const userRole = writable('admin'); // Assume 'admin' or 'client' from Azure AD

  // Sidebar collapse state
  let isSidebarCollapsed = $state(false);

  // Base navigation links
  const baseNavLinks = [
    { name: 'Risk Register', path: '/risk/register' },
    { name: 'Control Register', path: '/controls/register' }
  ];

  // Derived navigation links based on user role
  const navLinks = $derived([
    ...baseNavLinks,
    $userRole === 'admin' ? { name: 'Owner Management', path: '/owner-management' } : null
  ].filter((link) => link !== null));

  onMount(() => {
    // Fetch user role from Azure AD (mocked here)
    // Replace with actual Azure AD role retrieval logic
    userRole.set('admin'); // Example: Fetch from auth context
  });

  // Toggle sidebar collapse state
  function toggleSidebar() {
    isSidebarCollapsed = !isSidebarCollapsed;
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = $themeStore?.theme || 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }
</script>

<SvelteTheme />

<div class="m-5 rounded-lg flex flex-col min-h-[calc(100vh-2.5rem)]">
    <ManageMatrixBanner />

    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <aside class="{isSidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 text-white py-6">
            <div class="flex items-center justify-between px-4 mb-4">
                {#if !isSidebarCollapsed}
                    <span class="text-lg font-semibold">Menu</span>
                {/if}
                <div class="flex items-center gap-2">
                    <!-- Theme toggle button -->
                    <button onclick={toggleTheme} class="p-2 hover:bg-[#344B84] rounded" title="Toggle theme">
                        {#if $themeStore?.theme === 'dark'}
                            <!-- Sun icon for light mode -->
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        {:else}
                            <!-- Moon icon for dark mode -->
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        {/if}
                    </button>
                    <!-- Sidebar toggle button -->
                    <button onclick={toggleSidebar} class="p-2 hover:bg-[#344B84] rounded">
                        {#if isSidebarCollapsed}
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    {:else}
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    {/if}
                    </button>
                </div>
            </div>
            <nav>
                <ul class="space-y-2">
                    {#each navLinks as link}
                        <li>
                            <a
                                    href={link.path}
                                    class="block p-2 {isSidebarCollapsed ? 'text-center' : 'pl-4 pr-4'} {page.url.pathname === link.path
                  ? 'bg-[#26325e]'
                  : 'hover:bg-[#344B84]'}"
                                    style="border-radius: 4px"
                            >
                                {#if isSidebarCollapsed}
                                    <!-- Icon placeholders (replace with actual icons as needed) -->
                                    <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                {:else}
                                    {link.name}
                                {/if}
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </aside>

        <!-- Main content -->
        <main class="flex-1 pt-[1px]">
            {@render children()}
        </main>
    </div>
</div>

<style>
    :global(html), :global(body) {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    :global(root) {
        color-scheme: light dark;
    }
</style>