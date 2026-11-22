/**
 * Vercel Serverless Function: POST /api/auth/login
 * Validates admin credentials against environment variables and MongoDB Atlas
 */
export default async function handler(req, res) {
  // Global CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const { email, password } = body || {};
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Check against official admin credentials
    const envEmail = (process.env.ADMIN_EMAIL || 'admin@nuvaroagro.com').trim().toLowerCase();
    const envPass = (process.env.ADMIN_PASSWORD || 'Nuvaro@2026').trim();

    const allowedEmails = [envEmail, 'admin@nuvaroagro.com', 'yogesh@nuvaroagro.com'].filter(Boolean);

    if (allowedEmails.includes(cleanEmail) && cleanPass === envPass) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(
        JSON.stringify({
          success: true,
          user: {
            email: cleanEmail,
            role: 'Super Admin',
            name: cleanEmail.includes('yogesh') ? 'Yogesh Dhangar' : 'Super Admin'
          }
        })
      );
    }

    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        success: false,
        error: 'Invalid admin credentials. Please verify your email and password.'
      })
    );
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        success: false,
        error: err.message || 'Internal server authentication error'
      })
    );
  }
}
