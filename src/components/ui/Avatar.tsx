import React from 'react';

interface AvatarProps {
  initials: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  tone?: 'violet' | 'lime' | 'neutral';
}

const SIZE_MAP = {
  xs: 'w-7 h-7 text-[11px]',
  sm: 'w-9 h-9 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-base',
};

const TONE_MAP = {
  violet:
    'bg-[#6C22A6]/12 dark:bg-[#6C22A6]/25 text-[#6C22A6] dark:text-[#d8b4fe] border-[#6C22A6]/35 dark:border-[#6C22A6]/50',
  lime:
    'bg-[#96E9C6]/35 dark:bg-[#96E9C6]/15 text-[#0a0a0a] dark:text-[#96E9C6] border-[#6bd8ac] dark:border-[#96E9C6]/40',
  neutral:
    'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border-[var(--border-subtle)]',
};

export function Avatar({ initials, name, size = 'sm', tone = 'violet' }: AvatarProps) {
  return (
    <div
      aria-label={name}
      title={name}
      className={`inline-flex items-center justify-center rounded-full border font-display font-semibold tracking-tight shrink-0 select-none ${SIZE_MAP[size]} ${TONE_MAP[tone]}`}
    >
      {initials}
    </div>
  );
}
