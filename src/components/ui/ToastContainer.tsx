import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { ToastItem } from '../../types';

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50 flex flex-col gap-2.5 w-full max-w-sm pointer-events-none"
    >
      {toasts.map((toast) => {
        const icon =
          toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-[#96E9C6] shrink-0" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-[#6C22A6] dark:text-[#c084fc] shrink-0" />
          );

        const borderClass =
          toast.type === 'success'
            ? 'border-emerald-500/40 dark:border-[#96E9C6]/40'
            : toast.type === 'error'
              ? 'border-red-500/40'
              : 'border-[#6C22A6]/40';

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 rounded-xl bg-[var(--bg-primary)] dark:bg-[var(--bg-secondary)] border ${borderClass} p-4 shadow-xl`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Descartar notificación"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
