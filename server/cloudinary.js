/**
 * Cloudinary Integration for Nuvaro Agro Global
 * Handles product image uploads to Cloudinary CDN with automatic fallback to local storage
 */

import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = process.env.VERCEL
  ? path.join('/tmp', 'nuvaro_uploads')
  : path.join(__dirname, '..', 'public', 'images', 'uploads');

try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('[CLOUDINARY] Could not create local uploads folder:', err.message);
}

// Check if Cloudinary credentials are provided in environment
const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
  console.log(`[CLOUDINARY] Configured successfully for cloud: ${process.env.CLOUDINARY_CLOUD_NAME}`);
} else {
  console.log(`[CLOUDINARY] No credentials in .env, using local file storage (/public/images/uploads/)`);
}

/**
 * Upload an image (base64 or dataURL) to Cloudinary CDN
 * Falls back to local disk storage if Cloudinary is not configured or fails
 */
export async function uploadImage(imageSource, options = {}) {
  const folder = options.folder || process.env.CLOUDINARY_FOLDER || 'nuvaro_agro/products';

  // 1. If Cloudinary is configured, upload to Cloudinary CDN
  if (isCloudinaryConfigured) {
    try {
      console.log(`[CLOUDINARY] Uploading image to folder: ${folder}...`);
      const result = await cloudinary.uploader.upload(imageSource, {
        folder,
        resource_type: 'image',
        transformation: [
          { quality: 'auto:best', fetch_format: 'auto' }
        ]
      });

      console.log(`[CLOUDINARY] Upload successful -> ${result.secure_url}`);
      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        provider: 'cloudinary',
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes
      };
    } catch (err) {
      console.error('[CLOUDINARY] Upload failed, falling back to local storage:', err.message);
    }
  }

  // 2. Fallback to Local Disk Storage
  try {
    const raw = imageSource;
    const match = raw.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    let ext = 'jpg';
    let buffer;

    if (match) {
      ext = match[1] === 'jpeg' ? 'jpg' : match[1];
      buffer = Buffer.from(match[2], 'base64');
    } else {
      buffer = Buffer.from(raw, 'base64');
    }

    const filename = `product_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/images/uploads/${filename}`;
    console.log(`[LOCAL STORAGE] Image saved to ${publicUrl}`);
    return {
      success: true,
      url: publicUrl,
      filename,
      provider: 'local',
      bytes: buffer.length
    };
  } catch (err) {
    console.error('[LOCAL STORAGE] Image write error:', err);
    throw err;
  }
}

export { isCloudinaryConfigured };
