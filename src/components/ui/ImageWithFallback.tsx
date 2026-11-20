import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackTitle?: string;
  className?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackTitle,
  className = '',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#6C22A6]/20 via-[var(--bg-secondary)] to-[#96E9C6]/25 p-4 text-center ${className}`}
      >
        <BookOpen className="w-7 h-7 text-[var(--accent-highlight-text)]" strokeWidth={1.6} />
        {fallbackTitle && (
          <span className="text-xs font-medium text-[var(--text-primary)] line-clamp-2">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
