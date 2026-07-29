// Single source of truth for basePath is next.config.mjs; it's mirrored
// here via `env.NEXT_PUBLIC_BASE_PATH`. Next.js only auto-prefixes assets
// referenced through next/image, next/link and next/script — anything
// else (raw <img>/<image> src, iframe src, manual preloads) needs this
// prefix added by hand.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
