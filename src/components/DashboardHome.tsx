import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Copy,
  Flame,
  MapPin,
  MessageSquare,
  Trophy,
  Video,
} from 'lucide-react';
import {
  AcademyEvent,
  AgeFilter,
  Announcement,
  AppScreen,
  CohortMember,
  CommunityMessage,
  Course,
  EnrolledCourse,
  FormatFilter,
  GradedSubmission,
  LanguageFilter,
  LevelFilter,
  LiveClassSession,
  User,
} from '../types';
import { LANGUAGE_PROGRESS, TEACHERS } from '../data/mockData';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { CircularProgress, LinearProgress } from './ui/ProgressBar';

interface DashboardHomeProps {
  user: User;
  searchQuery: string;
  courses: Course[];
  enrolledCourses: EnrolledCourse[];
  liveClasses: LiveClassSession[];
  submissions: GradedSubmission[];
  ranking: CohortMember[];
  messages: CommunityMessage[];
  announcements: Announcement[];
  events: AcademyEvent[];
  onOpenCourse: (courseId: string) => void;
  onEnrollCourse: (course: Course) => void;
  onJoinLiveClass: (session: LiveClassSession) => void;
  onNavigate: (screen: AppScreen) => void;
  onCopyLink: (url: string) => void;
  onRsvpEvent: (eventId: string) => void;
}

export function DashboardHome({
  user,
  searchQuery,
  courses,
  enrolledCourses,
  liveClasses,
  submissions,
  ranking,
  messages,
  announcements,
  events,
  onOpenCourse,
  onEnrollCourse,
  onJoinLiveClass,
  onNavigate,
  onCopyLink,
  onRsvpEvent,
}: DashboardHomeProps) {
  const [langFilter, setLangFilter] = useState<LanguageFilter>('Todos');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('Todos');
  const [formatFilter, setFormatFilter] = useState<FormatFilter>('Todos');
  const [ageFilter, setAgeFilter] = useState<AgeFilter>('Todos');

  const enrolledDetails = useMemo(() => {
    return enrolledCourses
      .map((enrollment) => {
        const course = courses.find((c) => c.id === enrollment.courseId);
        if (!course) return null;
        const teacher = TEACHERS[course.teacherId];
        return { enrollment, course, teacher };
      })
      .filter(Boolean) as {
      enrollment: EnrolledCourse;
      course: Course;
      teacher: (typeof TEACHERS)[string];
    }[];
  }, [enrolledCourses, courses]);

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return courses.filter((course) => {
      if (langFilter !== 'Todos' && course.language !== langFilter) return false;
      if (levelFilter !== 'Todos' && course.levelCategory !== levelFilter) return false;
      if (formatFilter !== 'Todos') {
        if (formatFilter === 'Presencial' && !course.format.includes('Presencial')) return false;
        if (formatFilter === 'Online' && !course.format.includes('Online')) return false;
      }
      if (ageFilter !== 'Todos' && course.ageGroup !== ageFilter) return false;

      if (q) {
        const teacherName = TEACHERS[course.teacherId]?.name.toLowerCase() ?? '';
        const haystack =
          `${course.title} ${course.description} ${course.language} ${course.kicker} ${teacherName}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [courses, langFilter, levelFilter, formatFilter, ageFilter, searchQuery]);

  const enrolledIds = useMemo(
    () => new Set(enrolledCourses.map((e) => e.courseId)),
    [enrolledCourses]
  );

  const resetFilters = () => {
    setLangFilter('Todos');
    setLevelFilter('Todos');
    setFormatFilter('Todos');
    setAgeFilter('Todos');
  };

  return (
    <div className="space-y-10">
      {/* Section 1: Mis cursos activos */}
      <section aria-labelledby="section-active-courses" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2
              id="section-active-courses"
              className="font-display text-xl font-bold text-[var(--text-primary)]"
            >
              Mis cursos activos
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Retoma tu itinerario desde el último módulo completado.
            </p>
          </div>
          {enrolledDetails.length > 0 && (
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-highlight-text)] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Ver todos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {enrolledDetails.length === 0 ? (
          <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#6C22A6]/15 dark:bg-[#6C22A6]/25 border border-[#6C22A6]/35 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-[var(--accent-highlight-text)]" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                  Aún no tienes cursos activos
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                  Explora nuestro catálogo de inglés, alemán, francés y Advantage Kids para empezar.
                </p>
              </div>
            </div>
            <Button
              variant="lime"
              onClick={() => {
                document
                  .getElementById('section-catalog')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explorar cursos
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {enrolledDetails.map(({ enrollment, course, teacher }) => (
              <article
                key={course.id}
                className="group rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[#6C22A6] transition-all duration-200 overflow-hidden flex flex-col sm:flex-row"
              >
                <div className="sm:w-48 h-44 sm:h-auto shrink-0 overflow-hidden bg-[var(--bg-tertiary)]">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    fallbackTitle={course.shortTitle}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between gap-4 min-w-0">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                        {enrollment.cohortName}
                      </p>
                      <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mt-0.5">
                        {course.shortTitle}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Avatar
                        initials={teacher.initials}
                        name={teacher.name}
                        size="xs"
                        tone="neutral"
                      />
                      <span className="text-xs text-[var(--text-secondary)] truncate">
                        {teacher.name} · {teacher.credentials.split('·')[0].trim()}
                      </span>
                    </div>

                    <LinearProgress value={enrollment.progress} accent="lime" />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                      <Clock className="w-3.5 h-3.5 text-[var(--accent-highlight-text)] shrink-0" />
                      <span className="truncate">{enrollment.nextClassLabel}</span>
                    </div>
                    <Button variant="primary" size="sm" onClick={() => onOpenCourse(course.id)}>
                      Continuar
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Section 2: Cursos disponibles */}
      <section id="section-catalog" aria-labelledby="catalog-heading" className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2
              id="catalog-heading"
              className="font-display text-xl font-bold text-[var(--text-primary)]"
            >
              Cursos disponibles en Gandía y Online
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Grupos reducidos con profesores nativos certificados TEFL.
            </p>
          </div>
          {(langFilter !== 'Todos' ||
            levelFilter !== 'Todos' ||
            formatFilter !== 'Todos' ||
            ageFilter !== 'Todos') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold text-[var(--accent-highlight-text)] hover:underline self-start md:self-auto"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
          <div className="flex items-center gap-1 bg-[var(--bg-primary)] p-1 rounded-xl border border-[var(--border-subtle)]">
            {(['Todos', 'Inglés', 'Alemán', 'Francés'] as LanguageFilter[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLangFilter(lang)}
                className={`min-h-[34px] px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  langFilter === lang
                    ? 'bg-[#6C22A6] text-[#ffffff]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <select
            aria-label="Filtrar por nivel"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as LevelFilter)}
            className="h-10 px-3 rounded-xl bg-[var(--bg-primary)] text-xs font-medium text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
          >
            <option value="Todos">Nivel: Todos</option>
            <option value="A1-C2">Nivel: A1 – C2</option>
            <option value="Especializado">Nivel: Especializado</option>
          </select>

          <select
            aria-label="Filtrar por formato"
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value as FormatFilter)}
            className="h-10 px-3 rounded-xl bg-[var(--bg-primary)] text-xs font-medium text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
          >
            <option value="Todos">Formato: Todos</option>
            <option value="Presencial">Presencial (Gandía)</option>
            <option value="Online">Online en vivo</option>
          </select>

          <select
            aria-label="Filtrar por edad"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value as AgeFilter)}
            className="h-10 px-3 rounded-xl bg-[var(--bg-primary)] text-xs font-medium text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
          >
            <option value="Todos">Edad: Todos</option>
            <option value="Adultos">Adultos y jóvenes</option>
            <option value="Kids">Advantage Kids (3-12 años)</option>
          </select>
        </div>

        {/* Courses 3-column grid */}
        {filteredCourses.length === 0 ? (
          <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-10 text-center space-y-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              No hay cursos que coincidan con tu búsqueda actual.
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Prueba ajustando los filtros de idioma, modalidad o edad.
            </p>
            <Button variant="secondary" size="sm" onClick={resetFilters}>
              Mostrar todos los cursos
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledIds.has(course.id);
              return (
                <article
                  key={course.id}
                  className="group rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[#6C22A6] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--bg-tertiary)]">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      fallbackTitle={course.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between gap-5">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                        {course.kicker}
                      </p>
                      <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                        {course.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)] pt-3 border-t border-[var(--border-subtle)]">
                        <span>{course.duration}</span>
                        <span aria-hidden="true">·</span>
                        <span>{course.format}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{course.levelRange}</span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-base font-bold tabular-nums text-[var(--text-primary)]">
                          {course.priceLabel}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onOpenCourse(course.id)}
                          >
                            Ver curso
                          </Button>
                          {isEnrolled ? (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => onOpenCourse(course.id)}
                            >
                              Acceder
                            </Button>
                          ) : (
                            <Button
                              variant={course.featured ? 'lime' : 'primary'}
                              size="sm"
                              onClick={() => onEnrollCourse(course)}
                            >
                              Inscribirme
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Section 3: Próximas clases en vivo */}
      <section aria-labelledby="live-classes-heading" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2
              id="live-classes-heading"
              className="font-display text-xl font-bold text-[var(--text-primary)]"
            >
              Próximas clases en vivo
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              El botón «Unirme» se habilita automáticamente 15 minutos antes de iniciar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('live')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-highlight-text)] hover:underline whitespace-nowrap shrink-0"
          >
            <span>Abrir aula virtual</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)]">
          {liveClasses.map((session) => {
            const teacher = TEACHERS[session.teacherId];
            return (
              <div
                key={session.id}
                className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-[var(--bg-tertiary)]/50 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <div className="px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-center shrink-0 min-w-[104px]">
                    <div className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                      {session.dateLabel}
                    </div>
                    <div className="font-mono text-xs text-[var(--text-primary)] tabular-nums mt-0.5">
                      {session.timeLabel}
                    </div>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="text-xs text-[var(--text-secondary)]">
                      {session.courseTitle} · {session.modality}
                    </div>
                    <h3 className="font-display text-base font-bold text-[var(--text-primary)] truncate">
                      {session.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-secondary)]">
                      <span>Prof. {teacher.name}</span>
                      <span aria-hidden="true">·</span>
                      <button
                        type="button"
                        onClick={() => onCopyLink(session.meetingUrl)}
                        className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        <span className="truncate max-w-[210px]">{session.meetingUrl}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {session.canJoinNow ? (
                    <Button variant="lime" size="sm" onClick={() => onJoinLiveClass(session)}>
                      <Video className="w-4 h-4" />
                      <span>Unirme</span>
                    </Button>
                  ) : (
                    <Button variant="secondary" size="sm" disabled>
                      <Clock className="w-4 h-4" />
                      <span>Disponible 15 min antes</span>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 4: Mi progreso (resumen) */}
      <section aria-labelledby="progress-summary-heading" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2
              id="progress-summary-heading"
              className="font-display text-xl font-bold text-[var(--text-primary)]"
            >
              Mi progreso y ranking de cohorte
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Seguimiento por idioma, entregas corregidas y puntuación semanal.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('progress')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-highlight-text)] hover:underline whitespace-nowrap shrink-0"
          >
            <span>Detalle completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6C22A6]/15 dark:bg-[#6C22A6]/25 border border-[#6C22A6]/40 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-[var(--accent-highlight-text)]" />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-secondary)]">Puntos acumulados</div>
                  <div className="font-mono text-xl font-bold tabular-nums text-[var(--text-primary)]">
                    {user.points.toLocaleString('es-ES')} pts
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                <Flame className="w-4 h-4 text-[var(--accent-highlight-text)]" />
                <span className="font-mono tabular-nums font-semibold">
                  {user.streakDays} días
                </span>
                <span className="text-xs text-[var(--text-secondary)]">de racha activa</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-2">
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

            <div className="pt-5 border-t border-[var(--border-subtle)] space-y-3">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Últimas entregas corregidas
              </h3>
              <div className="divide-y divide-[var(--border-subtle)]">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {sub.title}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {sub.courseTitle} · {sub.submittedAt}
                      </div>
                    </div>
                    <div className="font-mono text-sm font-semibold tabular-nums text-[var(--accent-highlight-text)] shrink-0">
                      {sub.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                  Ranking de la cohorte (Top 5)
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{user.cohort}</p>
              </div>

              <div className="divide-y divide-[var(--border-subtle)]">
                {ranking.map((member, index) => (
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
                        0{index + 1}
                      </span>
                      <Avatar
                        initials={member.initials}
                        name={member.name}
                        size="xs"
                        tone={member.isCurrentUser ? 'lime' : 'neutral'}
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">
                          {member.name} {member.isCurrentUser ? '(Tú)' : ''}
                        </div>
                        <div className="text-[11px] text-[var(--text-secondary)]">
                          {member.level}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold tabular-nums shrink-0">
                      {member.points.toLocaleString('es-ES')} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              Asiste a clases en vivo y completa el quiz semanal para sumar puntos.
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Comunidad (preview) */}
      <section aria-labelledby="community-preview-heading" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2
              id="community-preview-heading"
              className="font-display text-xl font-bold text-[var(--text-primary)]"
            >
              Comunidad Advantage Gandía
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Actividad reciente de tu cohorte, avisos de profesores y eventos presenciales.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('community')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-highlight-text)] hover:underline whitespace-nowrap shrink-0"
          >
            <span>Entrar en comunidad</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--accent-highlight-text)]" />
                <span>Chat de cohorte</span>
              </h3>
              <button
                type="button"
                onClick={() => onNavigate('community')}
                className="text-xs font-semibold text-[var(--accent-highlight-text)] hover:underline"
              >
                Responder
              </button>
            </div>
            <div className="space-y-3">
              {messages.slice(-2).map((msg) => (
                <div
                  key={msg.id}
                  className="space-y-1 pb-3 border-b border-[var(--border-subtle)] last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--text-primary)]">
                      {msg.authorName}
                    </span>
                    <span className="font-mono text-[var(--text-secondary)] tabular-nums">
                      {msg.time}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-5 space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Anuncios de profesores
            </h3>
            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="space-y-1 pb-3 border-b border-[var(--border-subtle)] last:border-0 last:pb-0"
                >
                  <div className="text-[11px] font-semibold text-[var(--accent-highlight-text)]">
                    {ann.category} · {ann.date}
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {ann.title}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{ann.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-5 space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--accent-highlight-text)]" />
              <span>Próximos eventos</span>
            </h3>
            <div className="space-y-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="space-y-2 pb-3 border-b border-[var(--border-subtle)] last:border-0 last:pb-0"
                >
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{ev.title}</div>
                  <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {ev.date} · {ev.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[var(--text-secondary)] tabular-nums">
                      {ev.spotsLeft} plazas libres
                    </span>
                    <Button
                      variant={ev.rsvped ? 'secondary' : 'lime'}
                      size="sm"
                      onClick={() => onRsvpEvent(ev.id)}
                    >
                      {ev.rsvped ? 'Asistencia confirmada' : 'Reservar plaza'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
