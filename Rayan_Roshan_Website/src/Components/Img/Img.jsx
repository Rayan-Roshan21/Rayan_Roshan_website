import React from 'react';
import dimensions from '@/assets/dimensions.json';

/* ============================================================
   Img
   ------------------------------------------------------------
   Serves WebP with an original-format fallback, and always emits
   intrinsic width/height so the browser reserves the box before
   the bytes arrive. Images that resize the page as they load are
   the most common source of the jitter that reads as carelessness.

   Assets are resolved by stem ("profile-image") rather than by
   import, so the WebP and its fallback stay paired automatically
   and pages do not carry two imports per picture.
   ============================================================ */

const webpUrls = import.meta.glob('../../assets/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

const fallbackUrls = import.meta.glob('../../assets/*.{jpg,JPG,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const stem = (filePath) => filePath.split('/').pop().replace(/\.[^.]+$/, '');

const registry = {};

for (const [filePath, url] of Object.entries(fallbackUrls)) {
  const name = stem(filePath);
  const fileName = filePath.split('/').pop();
  registry[name] = { ...registry[name], src: url, dims: dimensions[fileName] };
}

for (const [filePath, url] of Object.entries(webpUrls)) {
  const name = stem(filePath);
  registry[name] = { ...registry[name], webp: url };
}

export default function Img({ name, alt, className, loading = 'lazy', fetchPriority, sizes, ...rest }) {
  const entry = registry[name];

  if (!entry) {
    if (import.meta.env.DEV) console.warn(`<Img> — unknown asset "${name}"`);
    return null;
  }

  const { src, webp, dims } = entry;

  return (
    <picture>
      {webp && <source srcSet={webp} type="image/webp" sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        className={className}
        width={dims?.width}
        height={dims?.height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        sizes={sizes}
        {...rest}
      />
    </picture>
  );
}
