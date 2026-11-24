/**
 * Nuvaro Agro Global - Backend API Server
 * Features:
 *  1. MongoDB Cloud / Local database with fast local JSON fallback
 *  2. Cloudinary CDN image uploads for product additions with local fallback
 *  3. Full CRUD for Leads, Products, Quotations, and Authentication
 */

import 'dotenv/config';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as db from './db.js';
import { uploadImage, isCloudinaryConfigured } from './cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

// Initialize database on request
let dbInitialized = false;
async function ensureDb() {
  if (!dbInitialized) {
    dbInitialized = true;
    await db.initDb();
  }
}

// Helper: Send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Helper: Parse request body (JSON or text, supports Vercel pre-parsed bodies)
function parseBody(req) {
  if (req.body && typeof req.body === 'object') {
    return Promise.resolve(req.body);
  }
  if (typeof req.body === 'string') {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch {
      return Promise.resolve({ raw: req.body });
    }
  }
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 25 * 1024 * 1024) { // 25MB limit for images
        reject(new Error('Body too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({ raw: body });
      }
    });
    req.on('error', reject);
  });
}

// API Request Handler (used both standalone and as Vite middleware)
export async function handleApiRequest(req, res) {
  await ensureDb();

  // Global CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return true;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Only handle /api paths
  if (!pathname.startsWith('/api')) {
    return false;
  }

  try {
    // ----------------------------------------------------
    // Health Check & System Status
    // ----------------------------------------------------
    if (pathname === '/api/health' && method === 'GET') {
      const connStatus = db.getConnectionStatus();
      sendJson(res, 200, {
        status: 'ok',
        server: 'Nuvaro Agro API',
        database: connStatus,
        cloudinary: {
          configured: isCloudinaryConfigured,
          cloudName: process.env.CLOUDINARY_CLOUD_NAME || null
        },
        timestamp: new Date().toISOString()
      });
      return true;
    }

    // ----------------------------------------------------
    // AUTH API (Admin Login - Dynamically via .env & MongoDB)
    // ----------------------------------------------------
    if (pathname === '/api/auth/login' && method === 'POST') {
      const { email, password } = await parseBody(req);
      const authResult = await db.authenticateAdmin(email, password);

      if (authResult.success) {
        console.log(`[AUTH SUCCESS] Admin authenticated: ${authResult.email}`);
        sendJson(res, 200, {
          success: true,
          user: {
            email: authResult.email,
            role: authResult.role || 'Super Admin',
            name: authResult.name || 'Admin Desk'
          }
        });
        return true;
      } else {
        console.warn(`[AUTH FAILED] Failed login attempt for ${(email || '').trim()}`);
        sendJson(res, 401, { success: false, error: authResult.error || 'Invalid admin credentials' });
        return true;
      }
    }

    // ----------------------------------------------------
    // 1. LEADS & BULK ORDERS API (MongoDB / Dynamic)
    // ----------------------------------------------------
    if (pathname === '/api/leads' && method === 'GET') {
      const leads = await db.getLeads();
      sendJson(res, 200, leads);
      return true;
    }

    if (pathname === '/api/leads' && method === 'POST') {
      const data = await parseBody(req);
      const isSample = data.type === 'Sample Request';
      const prefix = isSample ? 'NVS' : 'NVQ';
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newLead = {
        id: data.id || `${prefix}-2026-${randomNum}`,
        createdAt: data.createdAt || new Date().toISOString(),
        status: data.status || 'New',
        notes: data.notes || 'Inquiry submitted from official portal.',
        fullName: data.fullName || 'Anonymous Buyer',
        company: data.company || 'Not Specified',
        email: data.email || '',
        phone: data.phone || '',
        country: data.country || 'Global',
        product: data.product || 'Dehydrated Powder',
        powderForm: data.powderForm || '80-100 Mesh',
        quantity: data.quantity || 'Commercial Volume (MT)',
        packaging: data.packaging || '25kg HDPE Drum',
        targetDate: data.targetDate || 'Immediate',
        intendedUse: data.intendedUse || 'Commercial Food Processing',
        type: data.type || 'Commercial Quote',
        ...data
      };

      const savedLead = await db.addLead(newLead);
      sendJson(res, 201, { success: true, lead: savedLead });
      return true;
    }

    if (pathname.startsWith('/api/leads/') && method === 'PATCH') {
      const id = pathname.replace('/api/leads/', '');
      const updates = await parseBody(req);
      const updated = await db.updateLead(id, updates);
      sendJson(res, 200, { success: true, lead: updated });
      return true;
    }

    if (pathname.startsWith('/api/leads/') && method === 'DELETE') {
      const id = pathname.replace('/api/leads/', '');
      await db.deleteLead(id);
      sendJson(res, 200, { success: true, deleted: id });
      return true;
    }

    // ----------------------------------------------------
    // 2. PRODUCTS MANAGEMENT API (MongoDB / Dynamic)
    // ----------------------------------------------------
    if (pathname === '/api/products' && method === 'GET') {
      const products = await db.getProducts();
      sendJson(res, 200, products);
      return true;
    }

    if (pathname === '/api/products' && method === 'POST') {
      const data = await parseBody(req);
      if (!data.name) {
        sendJson(res, 400, { success: false, error: 'Product name is required' });
        return true;
      }

      const existingProducts = await db.getProducts();
      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || `product-${Date.now()}`;

      let finalId = slug;
      let counter = 1;
      while (existingProducts.some(p => p.id === finalId)) {
        finalId = `${slug}-${counter++}`;
      }

      const newProduct = {
        id: finalId,
        name: data.name,
        botanicalName: data.botanicalName || '',
        category: data.category || 'Spice Powders',
        forms: data.forms && data.forms.length ? data.forms : ['Fine Powder (80-100 Mesh)'],
        meshSize: data.meshSize || '80-100 Mesh',
        purity: data.purity || '100% Pure, Zero Artificial Additives',
        colorProfile: data.colorProfile || 'Natural',
        description: data.description || 'Premium export-grade dehydrated powder processed under certified food-safety conditions.',
        applications: data.applications && data.applications.length ? data.applications : [
          'Industrial food processing & seasoning mixes',
          'Bakery, beverages, and functional culinary formulations'
        ],
        image: data.image || '/images/powders/onion-powder.jpg',
        imageAlt: data.imageAlt || `${data.name} pure dehydrated powder`,
        featured: data.featured || false,
        createdAt: new Date().toISOString()
      };

      const savedProduct = await db.addProduct(newProduct);
      sendJson(res, 201, { success: true, product: savedProduct });
      return true;
    }

    if (pathname.startsWith('/api/products/') && method === 'PUT') {
      const id = pathname.replace('/api/products/', '');
      const updates = await parseBody(req);
      const updated = await db.updateProduct(id, updates);
      sendJson(res, 200, { success: true, product: updated });
      return true;
    }

    if (pathname.startsWith('/api/products/') && method === 'DELETE') {
      const id = pathname.replace('/api/products/', '');
      await db.deleteProduct(id);
      sendJson(res, 200, { success: true, deleted: id });
      return true;
    }

    // ----------------------------------------------------
    // 3. IMAGE UPLOAD API (Cloudinary CDN / Local Fallback)
    // ----------------------------------------------------
    if (pathname === '/api/upload' && method === 'POST') {
      const data = await parseBody(req);
      const rawImage = data.base64 || data.dataUrl || data.image;

      if (!rawImage) {
        sendJson(res, 400, { success: false, error: 'No image data provided' });
        return true;
      }

      const uploadResult = await uploadImage(rawImage, {
        folder: data.folder || 'nuvaro_agro/products'
      });

      sendJson(res, 201, uploadResult);
      return true;
    }

    // ----------------------------------------------------
    // 4. QUOTES & PROFORMA INVOICES API (MongoDB / Dynamic)
    // ----------------------------------------------------
    if (pathname === '/api/quotes' && method === 'GET') {
      const quotes = await db.getQuotes();
      sendJson(res, 200, quotes);
      return true;
    }

    if (pathname === '/api/quotes' && method === 'POST') {
      const data = await parseBody(req);
      const newQuote = {
        id: data.id || `NV-QT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        quoteNumber: data.quoteNumber || `NV-QT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        quoteDate: data.quoteDate || new Date().toISOString().split('T')[0],
        validUntil: data.validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        buyerName: data.buyerName || '',
        buyerCompany: data.buyerCompany || '',
        buyerEmail: data.buyerEmail || '',
        buyerCountry: data.buyerCountry || '',
        incoterm: data.incoterm || 'CIF Port',
        currency: data.currency || 'USD',
        paymentTerms: data.paymentTerms || '30% Advance T/T, 70% against B/L',
        lineItems: Array.isArray(data.lineItems) ? data.lineItems : [],
        notes: data.notes || '',
        subtotal: data.subtotal || 0,
        status: data.status || 'Draft',
        createdAt: new Date().toISOString()
      };

      const savedQuote = await db.addQuote(newQuote);
      sendJson(res, 201, { success: true, quote: savedQuote });
      return true;
    }

    if (pathname.startsWith('/api/quotes/') && method === 'DELETE') {
      const id = pathname.replace('/api/quotes/', '');
      await db.deleteQuote(id);
      sendJson(res, 200, { success: true, deleted: id });
      return true;
    }

    // ----------------------------------------------------
    // 5. CONTACT INQUIRIES API
    // ----------------------------------------------------
    if (pathname === '/api/contact' && method === 'POST') {
      const data = await parseBody(req);
      const newLead = {
        id: `NVC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        fullName: data.name || data.fullName || 'Anonymous Contact',
        company: data.company || 'Website Direct',
        email: data.email || '',
        phone: data.phone || '',
        country: data.country || 'Global',
        product: data.subject || data.product || 'General Inquiry',
        quantity: 'N/A',
        type: 'Contact Form',
        status: 'New',
        notes: data.message || data.notes || 'Inquiry submitted from Contact Us form.'
      };
      const savedLead = await db.addLead(newLead);
      sendJson(res, 201, { success: true, inquiry: savedLead });
      return true;
    }

    // ----------------------------------------------------
    // 6. LIVE AGGREGATED METRICS & STATS
    // ----------------------------------------------------
    if (pathname === '/api/stats' && method === 'GET') {
      const stats = await db.getStats();
      sendJson(res, 200, stats);
      return true;
    }

    // 404 for unknown /api route
    sendJson(res, 404, { error: 'Endpoint not found', path: pathname });
    return true;

  } catch (err) {
    console.error('Server error:', err);
    sendJson(res, 500, { error: 'Internal server error', details: err.message });
    return true;
  }
}

// Standalone Server instance
const server = http.createServer((req, res) => {
  handleApiRequest(req, res);
});

// Auto-start only when run directly as standalone script: `node server/index.js`
const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isDirectRun) {
  server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(` Nuvaro Agro Global - Backend Server Active`);
    console.log(` URL: http://localhost:${PORT}`);
    console.log(` Database: ${db.getConnectionStatus().engine}`);
    console.log(` Cloudinary: ${isCloudinaryConfigured ? 'Enabled' : 'Local Fallback'}`);
    console.log(` Health: http://localhost:${PORT}/api/health`);
    console.log(` Leads API: http://localhost:${PORT}/api/leads`);
    console.log(` Products API: http://localhost:${PORT}/api/products`);
    console.log(` Uploads API: http://localhost:${PORT}/api/upload`);
    console.log(`======================================================\n`);
  });
}
