<script lang="ts">
  import '../app.css';
  import {page} from '$app/state';
  import {writable} from 'svelte/store';
  import {onMount} from 'svelte';
  import '$lib/styles/themes.css';
  import ManageMatrixBanner from "$lib/components/ManageMatrixBanner.svelte";


  // Props for child content
  let {children} = $props();

  // Mock user role (replace with Azure AD role check)
  const userRole = writable('admin'); // Assume 'admin' or 'client' from Azure AD

  // Base navigation links
  const baseNavLinks = [
    {name: 'Risk Register', path: '/risk/register'},
    {name: 'Control Register', path: '/controls/register'}
  ];

  // Derived navigation links based on user role
  const navLinks = $derived([
    ...baseNavLinks,
    $userRole === 'admin' ? {name: 'Owner Management', path: '/owner-management'} : null
  ].filter((link) => link !== null));

  onMount(() => {
    // Fetch user role from Azure AD (mocked here)
    // Replace with actual Azure AD role retrieval logic
    userRole.set('admin'); // Example: Fetch from auth context
  });
</script>
<div class="m-5 rounded-lg flex flex-col min-h-[calc(100vh-2.5rem)]">
    <ManageMatrixBanner/>

    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <aside class="text-white py-6">
            <nav>
                <ul class="space-y-2">
                    {#each navLinks as link}
                        <li>
                            <a
                                    href={link.path}
                                    class="block p-2 pl-4 pr-4 {page.url.pathname === link.path
								? 'bg-[#26325e] '
								: 'hover:bg-[#344B84]'}" style="border-radius: 4px"
                            >
                                {link.name}
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


