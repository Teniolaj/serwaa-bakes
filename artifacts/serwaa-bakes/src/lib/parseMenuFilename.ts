/**
 * Filenames: `name-of-item-price.ext` or `name-variant-price.ext` or `name-min-max.ext` for ranges.
 * Price is derived from the last numeric segment(s) with heuristics for variant + price vs range.
 */

export type ParsedMenuFilename = {
  /** Display title (title case words) */
  name: string;
  /** Single price or range label */
  priceLabel: string;
  /** Primary numeric for sorting (min of range) */
  sortValue: number;
  /** Stable id for keys */
  slug: string;
  /** Modal grouping: same family shows together */
  groupId: string;
};

function titleCaseWords(s: string): string {
  return s
    .split(/\s+/)
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
}

/**
 * Strip extension and parse basename (no folder).
 */
export function parseMenuFilename(basename: string): ParsedMenuFilename {
  const base = basename.replace(/\.[^.]+$/, "");
  const parts = base.split("-").filter(Boolean);
  if (parts.length === 0) {
    return {
      name: base,
      priceLabel: "—",
      sortValue: 0,
      slug: base,
      groupId: base,
    };
  }

  const last = parts[parts.length - 1];
  const secondLast = parts.length >= 2 ? parts[parts.length - 2] : "";

  const lastNum = /^\d+$/.test(last) ? parseInt(last, 10) : NaN;
  const secondNum = /^\d+$/.test(secondLast) ? parseInt(secondLast, 10) : NaN;

  let nameParts: string[] = [];
  let priceLabel = "—";
  let sortValue = 0;

  if (!Number.isNaN(lastNum)) {
    // Ends with a number
    if (!Number.isNaN(secondNum)) {
      // ...-A-B at end
      if (secondNum < 35 && lastNum >= 40) {
        // variant (e.g. 2) + price (300) or small pack + price (50)
        nameParts = parts.slice(0, -2);
        priceLabel = String(lastNum);
        sortValue = lastNum;
      } else if (secondNum >= 40 && lastNum >= 40 && secondNum < lastNum) {
        // price range e.g. 180-250
        nameParts = parts.slice(0, -2);
        priceLabel = `${secondNum} – ${lastNum}`;
        sortValue = secondNum;
      } else {
        // default: last segment is price only (second number part of name — rare)
        nameParts = parts.slice(0, -1);
        priceLabel = String(lastNum);
        sortValue = lastNum;
      }
    } else {
      nameParts = parts.slice(0, -1);
      priceLabel = String(lastNum);
      sortValue = lastNum;
    }
  } else {
    nameParts = parts;
  }

  const name = titleCaseWords(nameParts.join(" ").replace(/-/g, " "));
  const slug = base.toLowerCase();

  const groupParts = computeGroupParts(parts);
  const groupId = groupParts.join("-");

  return {
    name,
    priceLabel,
    sortValue,
    slug,
    groupId: groupId || slug,
  };
}

function computeGroupParts(parts: string[]): string[] {
  if (parts.length === 0) return parts;
  const last = parts[parts.length - 1];
  const secondLast = parts.length >= 2 ? parts[parts.length - 2] : "";

  if (!/^\d+$/.test(last)) return parts;

  if (/^\d+$/.test(secondLast)) {
    const a = parseInt(secondLast, 10);
    const b = parseInt(last, 10);
    if (a < 35 && b >= 40) {
      return parts.slice(0, -2);
    }
    if (a >= 40 && b >= 40 && a < b) {
      return parts.slice(0, -2);
    }
  }
  return parts.slice(0, -1);
}
