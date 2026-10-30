// Image attachments for forum posts, replies and suggestions.
// Resizes to 1600 px on the long side, encodes WebP, refuses anything still over the bucket limit,
// uploads to images/<user id>/<time>-<n>.webp and returns the public URLs.
export const MAX_FILES = 4;
export const MAX_BYTES = 2 * 1024 * 1024; // must match supabase/migrations/007_images.sql

const shrink = (file) => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => {
    const s = Math.min(1, 1600 / Math.max(img.width, img.height));
    const c = document.createElement('canvas');
    c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(img.src);
    c.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not encode image'))), 'image/webp', 0.85);
  };
  img.onerror = () => reject(new Error(`${file.name} is not an image the browser can read`));
  img.src = URL.createObjectURL(file);
});

export async function uploadImages(sb, uid, files, onStatus = () => {}) {
  const list = [...files].slice(0, MAX_FILES);
  const urls = [];
  for (const [i, f] of list.entries()) {
    if (!f.type.startsWith('image/')) throw new Error(`${f.name} is not an image`);
    onStatus(`Preparing image ${i + 1} of ${list.length}…`);
    const blob = f.type === 'image/gif' && f.size <= MAX_BYTES ? f : await shrink(f);
    if (blob.size > MAX_BYTES) throw new Error(`${f.name} is still over 2 MB after resizing; crop it and try again`);
    const path = `${uid}/${Date.now()}-${i}.${blob.type === 'image/gif' ? 'gif' : 'webp'}`;
    onStatus(`Uploading image ${i + 1} of ${list.length}…`);
    const { error } = await sb.storage.from('images').upload(path, blob, { contentType: blob.type, cacheControl: '31536000' });
    if (error) throw new Error(error.message);
    urls.push(sb.storage.from('images').getPublicUrl(path).data.publicUrl);
  }
  return urls;
}

// Shows the chosen file names under a file input and enforces the count.
export function watchPicker(input, note) {
  input.accept = 'image/*'; input.multiple = true;
  input.addEventListener('change', () => {
    const n = input.files.length;
    if (n > MAX_FILES) { input.value = ''; note.textContent = `Choose up to ${MAX_FILES} images.`; return; }
    note.textContent = n ? [...input.files].map((f) => `${f.name} (${(f.size / 1024 / 1024).toFixed(1)} MB)`).join(', ') : '';
  });
}
