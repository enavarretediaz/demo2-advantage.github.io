import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  GraduationCap,
  Star,
  Users,
  Video,
} from 'lucide-react';
import { Course, EnrolledCourse } from '../types';
import { TEACHERS } from '../data/mockData';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { LinearProgress } from './ui/ProgressBar';

interface CourseDetailViewProps {
  course: Course;
  enrollment?: EnrolledCourse;
  onBack: () => void;
  onEnroll: (course: Course) => void;
  onToggleModule: (courseId: string, moduleId: string) => void;
  onGoToLiveClass: () => void;
}

type DetailTab = 'descripcion' | 'temario' | 'profesor' | 'opiniones';

export function CourseDetailView({
  course,
  enrollment,
  onBack,
  onEnroll,
  onToggleModule,
  onGoToLiveClass,
}: CourseDetailViewProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('temario');
  const [openFaqId, setOpenFaqId] = useState<string | null>(course.faqs[0]?.id ?? null);
  const teacher = TEACHERS[course.teacherId];

  const completedSet = new Set(enrollment?.completedModuleIds ?? []);

  return (
    <div className="space-y-8 pb-24 lg:pb-10">
      {/* Header Hero with measured scrim & breadcrumb */}
      <div className="relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <div className="relative h-64 sm:h-72 w-full">
          <ImageWithFallback
            src={course.image}
            alt={course.title}
            fallbackTitle={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/75 to-[#0a0a0a]/30" />

          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs text-white/90">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 hover:text-[#96E9C6] transition-colors font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Inicio</span>
              </button>
              <span aria-hidden="true">/</span>
              <span>Cursos</span>
              <span aria-hidden="true">/</span>
              <span className="text-[#96E9C6] truncate">{course.title}</span>
            </div>

            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-semibold text-[#96E9C6]">{course.kicker}</p>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {course.title}
              </h1>
              <p className="text-sm sm:text-base text-white/85 max-w-2xl">{course.description}</p>
            </div>
          </div>
        </div>

        {/* Course Key Specs Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)] border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <div className="p-4">
            <div className="text-[11px] text-[var(--text-secondary)]">Profesor nativo</div>
            <div className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">
              {teacher.name}
            </div>
          </div>
          <div className="p-4">
            <div className="text-[11px] text-[var(--text-secondary)]">Duración</div>
            <div className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">
              {course.duration}
            </div>
          </div>
          <div className="p-4">
            <div className="text-[11px] text-[var(--text-secondary)]">Nivel</div>
            <div className="font-mono text-sm font-semibold tabular-nums text-[var(--text-primary)] mt-0.5">
              {course.levelRange}
            </div>
          </div>
          <div className="p-4">
            <div className="text-[11px] text-[var(--text-secondary)]">Formato</div>
            <div className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">
              {course.format}
            </div>
          </div>
          <div className="p-4 col-span-2 sm:col-span-1">
            <div className="text-[11px] text-[var(--text-secondary)]">Tarifa</div>
            <div className="font-mono text-sm font-bold tabular-nums text-[var(--accent-highlight-text)] mt-0.5">
              {course.priceLabel}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content + Sticky Action Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Secciones del curso"
            className="flex items-center gap-1 overflow-x-auto border-b border-[var(--border-subtle)]"
          >
            {(
              [
                { id: 'descripcion', label: 'Descripción' },
                { id: 'temario', label: 'Temario' },
                { id: 'profesor', label: 'Profesor' },
                { id: 'opiniones', label: 'Opiniones' },
              ] as { id: DetailTab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#6C22A6] dark:border-[#96E9C6] text-[var(--text-primary)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'descripcion' && (
            <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Enfoque metodológico Advantage
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {course.longDescription}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-subtle)]">
                <div className="space-y-1">
                  <Users className="w-4 h-4 text-[var(--accent-highlight-text)]" />
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {course.groupSize}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    Participación oral garantizada
                  </div>
                </div>
                <div className="space-y-1">
                  <Clock className="w-4 h-4 text-[var(--accent-highlight-text)]" />
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {course.scheduleSummary}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    Horarios compatibles con trabajo
                  </div>
                </div>
                <div className="space-y-1">
                  <GraduationCap className="w-4 h-4 text-[var(--accent-highlight-text)]" />
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {course.examPrep ?? 'Certificado propio'}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    Preparación oficial incluida
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'temario' && (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                  Plan de estudios por módulos
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {enrollment
                    ? 'Haz clic en cada módulo para marcar o desmarcar tu avance.'
                    : 'Inscríbete para desbloquear el seguimiento interactivo y materiales.'}
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)]">
                {course.modules.map((mod) => {
                  const isDone = enrollment ? completedSet.has(mod.id) : mod.completed;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      disabled={!enrollment}
                      onClick={() => enrollment && onToggleModule(course.id, mod.id)}
                      className={`w-full text-left p-5 flex items-start justify-between gap-4 transition-colors ${
                        enrollment ? 'hover:bg-[var(--bg-tertiary)]' : 'opacity-90 cursor-default'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-[#96E9C6] shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-[var(--text-secondary)] shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-1 min-w-0">
                          <div className="text-sm font-semibold text-[var(--text-primary)]">
                            {mod.title}
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                            {mod.summary}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-[var(--text-secondary)] whitespace-nowrap shrink-0">
                        {mod.duration}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'profesor' && (
            <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Avatar initials={teacher.initials} name={teacher.name} size="lg" tone="violet" />
                <div className="space-y-1">
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {teacher.name}
                  </h2>
                  <p className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                    {teacher.credentials}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                    <span>{teacher.nationality}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{teacher.experienceYears} años de experiencia</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 text-[var(--text-primary)] font-semibold tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-current text-[var(--accent-highlight-text)]" />
                      {teacher.rating}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{teacher.bio}</p>
            </div>
          )}

          {activeTab === 'opiniones' && (
            <div className="space-y-4">
              {course.testimonials.map((t) => (
                <article
                  key={t.id}
                  className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)]">
                        {t.studentName}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">{t.role}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[var(--accent-highlight-text)] tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{t.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">«{t.quote}»</p>
                  <div className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                    {t.outcome}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* FAQ Section */}
          <div className="space-y-4 pt-2">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
              Preguntas frecuentes del curso
            </h2>
            <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)]">
              {course.faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
                    >
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[var(--text-secondary)] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[var(--accent-highlight-text)]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticky Sidebar CTA Card */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-5">
          {enrollment ? (
            <>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                  Curso activo
                </span>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  {enrollment.cohortName}
                </h3>
              </div>
              <LinearProgress value={enrollment.progress} accent="lime" />
              <div className="text-xs text-[var(--text-secondary)]">
                Próxima sesión:{' '}
                <span className="text-[var(--text-primary)] font-medium">
                  {enrollment.nextClassLabel}
                </span>
              </div>
              <div className="space-y-2.5 pt-2">
                <Button variant="lime" fullWidth onClick={onGoToLiveClass}>
                  <Video className="w-4 h-4" />
                  <span>Ir a clase en vivo</span>
                </Button>
                <Button variant="secondary" fullWidth onClick={() => setActiveTab('temario')}>
                  Continuar curso
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <div className="text-xs text-[var(--text-secondary)]">Inversión mensual</div>
                <div className="font-mono text-2xl font-bold tabular-nums text-[var(--text-primary)]">
                  {course.priceLabel}
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  Sin matrícula · Incluye material digital y simulacros oficiales.
                </p>
              </div>
              <div className="space-y-2 text-xs text-[var(--text-secondary)] py-3 border-y border-[var(--border-subtle)]">
                <div>Horario: {course.scheduleSummary}</div>
                <div>Tamaño: {course.groupSize}</div>
                <div>Sede: Gandía Centro u Online</div>
              </div>
              <Button variant="lime" size="lg" fullWidth onClick={() => onEnroll(course)}>
                Inscribirme ahora
              </Button>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
