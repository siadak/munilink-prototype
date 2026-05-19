import { useEffect, useState } from "react";
import clsx from "clsx";

const FALLBACK_IMAGES: Record<string, string> = {
  bike: "https://images.unsplash.com/photo-1541625602330-2271a2d9c3e0?w=900&auto=format&fit=crop&q=80",
};

export function BenefitCover({
  src,
  alt,
  className = "",
  aspect = "list",
  fallbackKey,
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: "list" | "hero";
  fallbackKey?: keyof typeof FALLBACK_IMAGES;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const fallback = fallbackKey ? FALLBACK_IMAGES[fallbackKey] : undefined;

  return (
    <div className={clsx("overflow-hidden bg-[#e8e9ef]", aspect === "hero" ? "rounded-2xl" : "rounded-t-2xl", className)}>
      <img
        src={imgSrc}
        alt={alt}
        className={clsx("w-full object-cover", aspect === "hero" ? "h-48" : "h-40")}
        loading="lazy"
        decoding="async"
        onError={() => {
          if (fallback && imgSrc !== fallback) setImgSrc(fallback);
        }}
      />
    </div>
  );
}
