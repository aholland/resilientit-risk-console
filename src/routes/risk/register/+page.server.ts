import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
  // This ensures server-side auth check even for client-side navigation
  if (!locals.user) {
    throw redirect(302, '/login')
  }

  return {
    user: locals.user
  }
}