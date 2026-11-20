import React from 'react';

export type ButtonVariant = 'primary' | 'lime' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-[#6C22A6] text-[#ffffff] hover:bg-[var(--accent-violet-hover)] active:bg-[#521882] border border-transparent shadow-xs',
  lime:
    'bg-[#96E9C6] text-[#0a0a0a] hover:bg-[var(--accent-lime-hover)] active:bg-[#6bd8ac] border border-[#6bd8ac]/60 dark:border-transparent shadow-xs',
  secondary:
    'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#6C22A6] hover:bg-[var(--bg-tertiary)]',
  ghost:
    'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] border border-transparent',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-[40px] px-4 py-2 text-xs',
  md: 'min-h-[44px] px-5 py-2.5 text-sm',
  lg: 'min-h-[48px] px-6 py-3 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap shrink-0 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C22A6] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] disabled:opacity-45 disabled:pointer-events-none ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
