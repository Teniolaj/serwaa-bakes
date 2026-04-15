import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { publicAssetUrl } from "@/lib/publicAssetUrl";

/** Square mark: `public/SERWAA-BAKES-LOGO.png`. SVG fallback if PNG fails to load. */
const PNG_NAME = "SERWAA-BAKES-LOGO.png";
const SVG_FALLBACK = "serwaa-bakes-mark-fallback.svg";

type BrandLogoProps = {
  className?: string;
  /** Same asset as default, slightly smaller (e.g. sheet header). */
  compact?: boolean;
  /** Use when the brand name is visible next to the mark (avoids duplicate alt text). */
  decorative?: boolean;
};

export function BrandLogo({ className, compact, decorative }: BrandLogoProps) {
  const pngSrc = useMemo(() => publicAssetUrl(PNG_NAME), []);
  const svgSrc = useMemo(() => publicAssetUrl(SVG_FALLBACK), []);
  const [src, setSrc] = useState(pngSrc);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0 overflow-hidden rounded-md",
        compact ? "size-9 sm:size-10" : "size-10 sm:size-11",
        className
      )}
    >
      <img
        src={src}
        alt={decorative ? "" : "Serwaa Bakes"}
        width={512}
        height={512}
        {...(decorative ? { "aria-hidden": true } : {})}
        onError={() =>
          setSrc((current) => (current === pngSrc ? svgSrc : current))
        }
        className="h-full w-full object-contain object-center"
        loading="eager"
        decoding="async"
      />
    </span>
  );
}
