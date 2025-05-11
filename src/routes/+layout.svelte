<script lang="ts">
  import '../app.css';
  import {page} from '$app/state';
  import {writable} from 'svelte/store';
  import {onMount} from 'svelte';
  import '$lib/styles/themes.css';


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
<div class="max-w-4xl mx-auto rounded-lg shadow-lg flex flex-col min-h-[calc(100vh-2.5rem)] pt-5"
     style="background-color: var(--container-bg);">
    <img src="/Resilient-Logo.jpg" alt="Solving the problems that matter most ™" class="mb-4 mx-auto rounded-lg"
         style="max-width: 600px; max-height: 145px;"/>

    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <aside class="w-64 text-white p-4">
            <nav>
                <ul class="space-y-2">
                    {#each navLinks as link}
                        <li>
                            <a
                                    href={link.path}
                                    class="block p-2 rounded hover:bg-gray-700 {page.url.pathname === link.path
								? 'bg-gray-700'
								: ''}"
                            >
                                {link.name}
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </aside>

        <!-- Main content -->
        <main class="flex-1 bg-gray-100">
            {@render children()}
        </main>
    </div>
</div>
<style>
    :global(html), :global(body) {
        background-color: var(--background);
        margin: 0;
        padding: 0;
        height: 100%;
    }
</style>


