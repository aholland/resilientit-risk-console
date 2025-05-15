<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import '$lib/styles/themes.css';
  import ManageMatrixBanner from "$lib/components/ManageMatrixBanner.svelte";

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
</script>

<div class="m-5 rounded-lg flex flex-col min-h-[calc(100vh-2.5rem)]">
    <ManageMatrixBanner />

    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <aside class="{isSidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 text-white py-6">
            <div class="flex items-center justify-between px-4 mb-4">
                {#if !isSidebarCollapsed}
                    <span class="text-lg font-semibold">Menu</span>
                {/if}
                <button on:click={toggleSidebar} class="p-2 hover:bg-[#344B84] rounded">
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
</style>