/**
 * Vercel Serverless Function Entrypoint
 * Routes all /api/* requests to the Nuvaro Agro backend handler
 */
import { handleApiRequest } from '../server/index.js';

export default async function handler(req, res) {
  try {
    const handled = await handleApiRequest(req, res);
    if (!handled && !res.writableEnded) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'API endpoint not found' }));
    }
  } catch (err) {
    console.error('[VERCEL API ERROR]:', err);
    if (!res.writableEnded) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
    }
  }
}
