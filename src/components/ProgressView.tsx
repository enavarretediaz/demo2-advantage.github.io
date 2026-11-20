import React from 'react';
import { Award, CheckCircle2, Flame, Trophy } from 'lucide-react';
import { CohortMember, GradedSubmission, User } from '../types';
import { LANGUAGE_PROGRESS } from '../data/mockData';
import { Avatar } from './ui/Avatar';
import { CircularProgress } from './ui/ProgressBar';

interface ProgressViewProps {
  user: User;
  submissions: GradedSubmission[];
  ranking: CohortMember[];
}

const ACHIEVEMENTS = [
  {
    id: 'ach-1',
    title: 'Racha constante',
    detail: '12 días seguidos practicando vocabulario y listening',
    unlocked: true,
  },
  {
    id: 'ach-2',
    title: 'Speaking activo B1',
    detail: 'Participación destacada en 5 talleres en vivo',
    unlocked: true,
  },
  {
    id: 'ach-3',
    title: 'Cambridge Ready',
    detail: 'Supera el 85% en el simulacro oficial completo',
    unlocked: false,
  },
];

export function ProgressView({ user, submissions, ranking }: ProgressViewProps) {
  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Mi progreso</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Evolución por idioma, calificaciones de tus profesores nativos y clasificación de la
          cohorte.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#6C22A6]/15 dark:bg-[#6C22A6]/25 border border-[#6C22A6]/40 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-[var(--accent-highlight-text)]" />
          </div>
          <div>
            <div className="text-xs text-[var(--text-secondary)]">Puntos totales</div>
            <div className="font-mono text-2xl font-bold tabular-nums text-[var(--text-primary)]">
              {user.points.toLocaleString('es-ES')}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#96E9C6]/25 dark:bg-[#96E9C6]/15 border border-[#6bd8ac]/60 dark:border-[#96E9C6]/40 flex items-center justify-center">
            <Flame className="w-5 h-5 text-emerald-700 dark:text-[#96E9C6]" />
          </div>
          <div>
            <div className="text-xs text-[var(--text-secondary)]">Racha semanal</div>
            <div className="font-mono text-2xl font-bold tabular-nums text-[var(--text-primary)]">
              {user.streakDays} días
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center">
            <Award className="w-5 h-5 text-[var(--accent-highlight-text)]" />
          </div>
          <div>
            <div className="text-xs text-[var(--text-secondary)]">Nota media en entregas</div>
            <div className="font-mono text-2xl font-bold tabular-nums text-[var(--text-primary)]">
              9.17 / 10
            </div>
          </div>
        </div>
      </div>

      {/* Circular progress + Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-6">
          <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
            Avance por idioma
          </h2>
          <div className="grid grid-cols-3 gap-4 py-4">
            {LANGUAGE_PROGRESS.map((item) => (
              <CircularProgress
                key={item.language}
                value={item.percentage}
                color={item.color}
                label={item.language}
                sublabel={item.level}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
            Insignias académicas
          </h2>
          <div className="divide-y divide-[var(--border-subtle)]">
            {ACHIEVEMENTS.map((ach) => (
              <div key={ach.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3">
                <CheckCircle2
                  className={`w-5 h-5 shrink-0 mt-0.5 ${
                    ach.unlocked
                      ? 'text-emerald-600 dark:text-[#96E9C6]'
                      : 'text-[var(--border-subtle)]'
                  }`}
                />
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {ach.title}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-0.5">{ach.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submissions & Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
            Historial de entregas corregidas
          </h2>
          <div className="divide-y divide-[var(--border-subtle)]">
            {submissions.map((sub) => (
              <div key={sub.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                      {sub.title}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      {sub.courseTitle} · Corregido por {sub.teacherName} · {sub.submittedAt}
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold tabular-nums text-[var(--accent-highlight-text)] shrink-0">
                    {sub.score}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {sub.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
            Ranking de la cohorte
          </h2>
          <div className="divide-y divide-[var(--border-subtle)]">
            {ranking.map((member, idx) => (
              <div
                key={member.id}
                className={`py-3 flex items-center justify-between gap-3 ${
                  member.isCurrentUser
                    ? 'text-[var(--accent-highlight-text)]'
                    : 'text-[var(--text-primary)]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs tabular-nums w-5 text-[var(--text-secondary)]">
                    0{idx + 1}
                  </span>
                  <Avatar
                    initials={member.initials}
                    name={member.name}
                    size="xs"
                    tone={member.isCurrentUser ? 'lime' : 'neutral'}
                  />
                  <span className="text-sm font-semibold truncate">
                    {member.name} {member.isCurrentUser ? '(Tú)' : ''}
                  </span>
                </div>
                <span className="font-mono text-xs font-semibold tabular-nums">
                  {member.points.toLocaleString('es-ES')} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
