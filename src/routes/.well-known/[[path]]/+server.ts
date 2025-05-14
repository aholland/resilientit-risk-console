import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  // Return empty response or explicit 404
  return json({}, { status: 404 });
};