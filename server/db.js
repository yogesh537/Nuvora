/**
 * Database Layer for Nuvaro Agro Global
 * Supports:
 *  1. MongoDB Cloud / Local (via MONGODB_URI & MONGODB_DB_NAME)
 *  2. High-performance JSON storage fallback if MongoDB is not connected
 */

import { MongoClient } from 'mongodb';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// On serverless environments like Vercel, the filesystem is read-only except /tmp
const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'nuvaro_data')
  : path.join(__dirname, 'data');

const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const QUOTES_FILE = path.join(DATA_DIR, 'quotes.json');

// Ensure data folder exists safely without throwing on read-only environments
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('[DATABASE] Could not create local data directory:', err.message);
}

// Helper: JSON file reader/writer
function readJson(filePath, defaultVal = []) {
  try {
    if (!fs.existsSync(filePath)) return defaultVal;
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return defaultVal;
  }
}

function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
    return false;
  }
}

let client = null;
let db = null;
let isConnected = false;
let connectionError = null;

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.MONGODB_DB_NAME || 'nuvaro_agro';

export async function initDb() {
  if (!MONGODB_URI) {
    console.log('[DATABASE] No MONGODB_URI defined in .env. Using fast local JSON database engine.');
    return false;
  }

  try {
    console.log(`[DATABASE] Connecting to MongoDB (${DB_NAME})...`);
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });

    await client.connect();
    db = client.db(DB_NAME);
    isConnected = true;
    connectionError = null;
    console.log(`[DATABASE] MongoDB connected successfully to database: ${DB_NAME}`);

    // Seed collections if empty
    await seedMongoIfEmpty();
    return true;
  } catch (err) {
    isConnected = false;
    connectionError = err.message;
    console.warn(`[DATABASE] MongoDB connection failed (${err.message}). Seamlessly using local JSON database fallback.`);
    return false;
  }
}

async function seedMongoIfEmpty() {
  if (!isConnected || !db) return;

  try {
    // 1. Seed Products if empty
    const productCount = await db.collection('products').countDocuments();
    if (productCount === 0) {
      const localProducts = readJson(PRODUCTS_FILE, []);
      if (localProducts.length > 0) {
        // Strip any local _id if present
        const toInsert = localProducts.map(({ _id, ...p }) => p);
        await db.collection('products').insertMany(toInsert);
        console.log(`[DATABASE] Seeded ${toInsert.length} products to MongoDB.`);
      }
    }

    // 2. Seed Leads if empty
    const leadCount = await db.collection('leads').countDocuments();
    if (leadCount === 0) {
      const localLeads = readJson(LEADS_FILE, []);
      if (localLeads.length > 0) {
        const toInsert = localLeads.map(({ _id, ...l }) => l);
        await db.collection('leads').insertMany(toInsert);
        console.log(`[DATABASE] Seeded ${toInsert.length} leads to MongoDB.`);
      }
    }

    // 3. Seed Quotes if empty
    const quoteCount = await db.collection('quotes').countDocuments();
    if (quoteCount === 0) {
      const localQuotes = readJson(QUOTES_FILE, []);
      if (localQuotes.length > 0) {
        const toInsert = localQuotes.map(({ _id, ...q }) => q);
        await db.collection('quotes').insertMany(toInsert);
        console.log(`[DATABASE] Seeded ${toInsert.length} quotes to MongoDB.`);
      }
    }

    // 4. Sync Admin credentials from .env to MongoDB 'admins' collection
    const envAdminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const envAdminPass = (process.env.ADMIN_PASSWORD || '').trim();
    if (envAdminEmail && envAdminPass) {
      await db.collection('admins').updateOne(
        { email: envAdminEmail },
        {
          $set: {
            email: envAdminEmail,
            password: envAdminPass,
            role: 'Super Admin',
            name: 'Super Admin',
            updatedAt: new Date().toISOString()
          },
          $setOnInsert: {
            createdAt: new Date().toISOString()
          }
        },
        { upsert: true }
      );
      console.log(`[DATABASE] Admin credentials synced to MongoDB collection 'admins' (${envAdminEmail})`);
    }
  } catch (err) {
    console.error('[DATABASE] Seeding error:', err.message);
  }
}

// ----------------------------------------------------
// PRODUCTS CRUD (MongoDB / JSON Dual Support)
// ----------------------------------------------------
export async function getProducts() {
  if (isConnected && db) {
    try {
      const products = await db.collection('products').find({}).toArray();
      // Map MongoDB _id to string or retain custom id
      return products.map(({ _id, ...rest }) => ({ ...rest, _id: _id.toString() }));
    } catch (err) {
      console.warn('[DATABASE] MongoDB getProducts failed, using JSON backup:', err.message);
    }
  }
  return readJson(PRODUCTS_FILE, []);
}

export async function addProduct(productData) {
  // Sync to local JSON backup
  const localProducts = readJson(PRODUCTS_FILE, []);
  localProducts.unshift(productData);
  writeJson(PRODUCTS_FILE, localProducts);

  if (isConnected && db) {
    try {
      const { _id, ...dataToInsert } = productData;
      const result = await db.collection('products').insertOne(dataToInsert);
      console.log(`[DATABASE] Product saved to MongoDB with id: ${productData.id} (mongo_id: ${result.insertedId})`);
      return { ...productData, _id: result.insertedId.toString() };
    } catch (err) {
      console.error('[DATABASE] Failed to insert product to MongoDB:', err.message);
    }
  }
  return productData;
}

export async function updateProduct(id, updates) {
  // Local JSON update
  const localProducts = readJson(PRODUCTS_FILE, []);
  const idx = localProducts.findIndex(p => p.id === id);
  let updatedProduct = null;
  if (idx !== -1) {
    localProducts[idx] = { ...localProducts[idx], ...updates, id };
    writeJson(PRODUCTS_FILE, localProducts);
    updatedProduct = localProducts[idx];
  }

  if (isConnected && db) {
    try {
      const { _id, ...cleanUpdates } = updates;
      await db.collection('products').updateOne({ id }, { $set: cleanUpdates });
      console.log(`[DATABASE] Updated product in MongoDB: ${id}`);
    } catch (err) {
      console.error('[DATABASE] MongoDB updateProduct error:', err.message);
    }
  }

  return updatedProduct || { id, ...updates };
}

export async function deleteProduct(id) {
  // Local JSON delete
  let localProducts = readJson(PRODUCTS_FILE, []);
  localProducts = localProducts.filter(p => p.id !== id);
  writeJson(PRODUCTS_FILE, localProducts);

  if (isConnected && db) {
    try {
      await db.collection('products').deleteOne({ id });
      console.log(`[DATABASE] Deleted product from MongoDB: ${id}`);
    } catch (err) {
      console.error('[DATABASE] MongoDB deleteProduct error:', err.message);
    }
  }
  return id;
}

// ----------------------------------------------------
// LEADS & INQUIRIES CRUD (MongoDB / JSON Dual Support)
// ----------------------------------------------------
export async function getLeads() {
  if (isConnected && db) {
    try {
      const leads = await db.collection('leads').find({}).sort({ createdAt: -1 }).toArray();
      return leads.map(({ _id, ...rest }) => ({ ...rest, _id: _id.toString() }));
    } catch (err) {
      console.warn('[DATABASE] MongoDB getLeads failed, using JSON backup:', err.message);
    }
  }
  return readJson(LEADS_FILE, []);
}

export async function addLead(leadData) {
  const localLeads = readJson(LEADS_FILE, []);
  localLeads.unshift(leadData);
  writeJson(LEADS_FILE, localLeads);

  if (isConnected && db) {
    try {
      const { _id, ...toInsert } = leadData;
      const res = await db.collection('leads').insertOne(toInsert);
      console.log(`[DATABASE] Lead saved to MongoDB: ${leadData.id}`);
      return { ...leadData, _id: res.insertedId.toString() };
    } catch (err) {
      console.error('[DATABASE] MongoDB addLead error:', err.message);
    }
  }
  return leadData;
}

export async function updateLead(id, updates) {
  const localLeads = readJson(LEADS_FILE, []);
  const idx = localLeads.findIndex(l => l.id === id);
  let updatedLead = null;
  if (idx !== -1) {
    localLeads[idx] = { ...localLeads[idx], ...updates, id };
    writeJson(LEADS_FILE, localLeads);
    updatedLead = localLeads[idx];
  }

  if (isConnected && db) {
    try {
      const { _id, ...cleanUpdates } = updates;
      await db.collection('leads').updateOne({ id }, { $set: cleanUpdates });
      console.log(`[DATABASE] Updated lead in MongoDB: ${id}`);
    } catch (err) {
      console.error('[DATABASE] MongoDB updateLead error:', err.message);
    }
  }
  return updatedLead || { id, ...updates };
}

export async function deleteLead(id) {
  let localLeads = readJson(LEADS_FILE, []);
  localLeads = localLeads.filter(l => l.id !== id);
  writeJson(LEADS_FILE, localLeads);

  if (isConnected && db) {
    try {
      await db.collection('leads').deleteOne({ id });
      console.log(`[DATABASE] Deleted lead from MongoDB: ${id}`);
    } catch (err) {
      console.error('[DATABASE] MongoDB deleteLead error:', err.message);
    }
  }
  return id;
}

// ----------------------------------------------------
// QUOTES & PROFORMA INVOICES CRUD (MongoDB / JSON Support)
// ----------------------------------------------------
export async function getQuotes() {
  if (isConnected && db) {
    try {
      const quotes = await db.collection('quotes').find({}).sort({ createdAt: -1 }).toArray();
      return quotes.map(({ _id, ...rest }) => ({ ...rest, _id: _id.toString() }));
    } catch (err) {
      console.warn('[DATABASE] MongoDB getQuotes failed, using JSON backup:', err.message);
    }
  }
  return readJson(QUOTES_FILE, []);
}

export async function addQuote(quoteData) {
  const localQuotes = readJson(QUOTES_FILE, []);
  localQuotes.unshift(quoteData);
  writeJson(QUOTES_FILE, localQuotes);

  if (isConnected && db) {
    try {
      const { _id, ...toInsert } = quoteData;
      const res = await db.collection('quotes').insertOne(toInsert);
      console.log(`[DATABASE] Quote saved to MongoDB: ${quoteData.quoteNumber}`);
      return { ...quoteData, _id: res.insertedId.toString() };
    } catch (err) {
      console.error('[DATABASE] MongoDB addQuote error:', err.message);
    }
  }
  return quoteData;
}

export async function deleteQuote(id) {
  let localQuotes = readJson(QUOTES_FILE, []);
  localQuotes = localQuotes.filter(q => q.id !== id && q.quoteNumber !== id);
  writeJson(QUOTES_FILE, localQuotes);

  if (isConnected && db) {
    try {
      await db.collection('quotes').deleteOne({
        $or: [{ id }, { quoteNumber: id }]
      });
      console.log(`[DATABASE] Deleted quote from MongoDB: ${id}`);
    } catch (err) {
      console.error('[DATABASE] MongoDB deleteQuote error:', err.message);
    }
  }
  return id;
}

// ----------------------------------------------------
// STATS & CONNECTION STATUS
// ----------------------------------------------------
export async function getStats() {
  const [products, leads, quotes] = await Promise.all([
    getProducts(),
    getLeads(),
    getQuotes()
  ]);

  return {
    totalLeads: leads.length,
    newLeads: leads.filter(l => l.status === 'New').length,
    quotedLeads: leads.filter(l => l.status === 'Quoted').length,
    wonLeads: leads.filter(l => l.status === 'Won').length,
    totalProducts: products.length,
    featuredProducts: products.filter(p => p.featured).length,
    totalQuotes: quotes.length,
    databaseEngine: isConnected ? 'MongoDB Cloud' : 'Local JSON Database',
    databaseConnected: isConnected,
    serverTime: new Date().toISOString()
  };
}

// ----------------------------------------------------
// AUTHENTICATION & ADMIN CREDENTIALS (.env & MongoDB)
// ----------------------------------------------------
export async function authenticateAdmin(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  const envEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const envPass = (process.env.ADMIN_PASSWORD || '').trim();

  // 1. Check against active .env credentials or official company admin emails
  const allowedAdminEmails = [envEmail, 'admin@nuvaroagro.com', 'yogesh@nuvaroagro.com'].filter(Boolean);
  if (allowedAdminEmails.includes(cleanEmail) && cleanPass === (envPass || 'Nuvaro@2026')) {
    return { success: true, email: cleanEmail, role: 'Super Admin', name: 'Super Admin' };
  }

  // 2. Check against MongoDB 'admins' collection
  if (isConnected && db) {
    try {
      const adminDoc = await db.collection('admins').findOne({ email: cleanEmail });
      if (adminDoc && adminDoc.password === cleanPass) {
        return {
          success: true,
          email: cleanEmail,
          role: adminDoc.role || 'Super Admin',
          name: adminDoc.name || 'Admin Desk'
        };
      }
    } catch (err) {
      console.warn('[DATABASE] MongoDB admin lookup failed:', err.message);
    }
  }

  // 3. Fallback if password is not configured in .env yet
  if (!envPass) {
    if (cleanEmail === (envEmail || 'admin@nuvaroagro.com') && (cleanPass === 'Nuvaro@2026' || cleanPass === 'admin')) {
      return { success: true, email: cleanEmail, role: 'Super Admin', name: 'Super Admin' };
    }
  }

  return { success: false, error: 'Invalid admin credentials' };
}

export function getConnectionStatus() {
  return {
    connected: isConnected,
    engine: isConnected ? 'MongoDB' : 'Local File JSON',
    dbName: isConnected ? DB_NAME : 'local',
    error: connectionError
  };
}
