import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
  showLabel?: boolean;
}

export function ThemeToggle({ theme, onToggle, showLabel = false }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={!isDark}
      aria-label={isDark ? 'Cambiar a tema blanco' : 'Cambiar a tema oscuro'}
      title={isDark ? 'Cambiar a tema blanco' : 'Cambiar a tema oscuro'}
      className="inline-flex items-center justify-center gap-2 min-h-[40px] px-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[#6C22A6] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C22A6] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] shrink-0 whitespace-nowrap"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#96E9C6] shrink-0" />
      ) : (
        <Moon className="w-4 h-4 text-[#6C22A6] shrink-0" />
      )}
      {showLabel && (
        <span className="text-xs font-semibold">
          {isDark ? 'Tema claro' : 'Tema oscuro'}
        </span>
      )}
    </button>
  );
}
