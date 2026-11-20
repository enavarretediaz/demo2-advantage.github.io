import React from 'react';

interface LinearProgressProps {
  value: number;
  label?: string;
  accent?: 'violet' | 'lime';
  showPercent?: boolean;
}

export function LinearProgress({
  value,
  label,
  accent = 'lime',
  showPercent = true,
}: LinearProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const barColor = accent === 'lime' ? 'bg-[#34c78d] dark:bg-[#96E9C6]' : 'bg-[#6C22A6]';

  return (
    <div className="w-full space-y-1.5">
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="text-[var(--text-secondary)] truncate">{label}</span>}
          {showPercent && (
            <span className="font-mono tabular-nums text-[var(--text-primary)] font-medium">
              {clamped}% completado
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]"
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${barColor}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label: string;
  sublabel: string;
}

export function CircularProgress({
  value,
  size = 88,
  strokeWidth = 7,
  color = '#6C22A6',
  label,
  sublabel,
}: CircularProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div
        className="relative inline-flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="var(--border-subtle)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <span className="absolute font-mono text-sm font-semibold tabular-nums text-[var(--text-primary)]">
          {clamped}%
        </span>
      </div>
      <div className="space-y-0.5">
        <div className="text-sm font-semibold text-[var(--text-primary)]">{label}</div>
        <div className="text-xs text-[var(--text-secondary)] tabular-nums">{sublabel}</div>
      </div>
    </div>
  );
}
