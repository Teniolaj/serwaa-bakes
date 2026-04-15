/** Resolve a file from `public/` for use in <img src>, favicon href, etc. */
export function publicAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = base.endsWith("/") ? base : `${base}/`;
  return `${normalized}${path.replace(/^\//, "")}`;
}
