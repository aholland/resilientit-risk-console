import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData()
    const email = data.get('email')

    if (!email || typeof email !== 'string') {
      return { error: 'Email is required' }
    }

    // Create session
    const session = {
      email,
      loginTime: new Date().toISOString()
    }

    // Set session cookie
    cookies.set('session', JSON.stringify(session), {
      path: '/',
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    throw redirect(302, '/')
  }
}