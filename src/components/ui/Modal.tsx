import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const WIDTH_MAP = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-3xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidth = 'md',
  children,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full ${WIDTH_MAP[maxWidth]} rounded-2xl bg-[var(--bg-primary)] dark:bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col`}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[var(--border-subtle)]">
          <div className="space-y-1">
            <h2 id="modal-title" className="font-display text-lg font-bold text-[var(--text-primary)]">
              {title}
            </h2>
            {subtitle && <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors shrink-0"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
