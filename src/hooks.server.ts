import { redirect } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // Skip auth check for login page
  if (event.url.pathname === '/login') {
    return resolve(event)
  }

  // Check for session cookie
  const sessionCookie = event.cookies.get('session')
  
  if (!sessionCookie) {
    throw redirect(302, '/login')
  }

  // Simple session validation (in production, verify against database/JWT)
  try {
    const session = JSON.parse(sessionCookie)
    if (!session.email || !session.loginTime) {
      throw redirect(302, '/login')
    }
    
    // Session expires after 24 hours
    const loginTime = new Date(session.loginTime)
    const now = new Date()
    const hoursSinceLogin = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)
    
    if (hoursSinceLogin > 24) {
      event.cookies.delete('session', { path: '/' })
      throw redirect(302, '/login')
    }

    // Add user to locals for use in pages
    event.locals.user = session
  } catch (error) {
    event.cookies.delete('session', { path: '/' })
    throw redirect(302, '/login')
  }

  return resolve(event)
}