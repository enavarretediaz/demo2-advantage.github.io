import React from 'react';
import { BookOpen, Clock, Video } from 'lucide-react';
import { Course, EnrolledCourse } from '../types';
import { TEACHERS } from '../data/mockData';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { LinearProgress } from './ui/ProgressBar';

interface MyCoursesViewProps {
  courses: Course[];
  enrolledCourses: EnrolledCourse[];
  onOpenCourse: (courseId: string) => void;
  onGoToCatalog: () => void;
  onGoToLive: () => void;
}

export function MyCoursesView({
  courses,
  enrolledCourses,
  onOpenCourse,
  onGoToCatalog,
  onGoToLive,
}: MyCoursesViewProps) {
  const enrolledDetails = enrolledCourses
    .map((enrollment) => {
      const course = courses.find((c) => c.id === enrollment.courseId);
      if (!course) return null;
      return { enrollment, course, teacher: TEACHERS[course.teacherId] };
    })
    .filter(Boolean) as {
    enrollment: EnrolledCourse;
    course: Course;
    teacher: (typeof TEACHERS)[string];
  }[];

  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Mis cursos</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Accede a tus módulos, grabaciones y próximas sesiones en Gandía u online.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={onGoToCatalog}>
          Explorar catálogo completo
        </Button>
      </div>

      {enrolledDetails.length === 0 ? (
        <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#6C22A6]/15 dark:bg-[#6C22A6]/25 border border-[#6C22A6]/40 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6 text-[var(--accent-highlight-text)]" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              Todavía no estás inscrito en ningún curso
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Elige un programa de inglés, alemán, francés o Advantage Kids para empezar hoy.
            </p>
          </div>
          <Button variant="lime" onClick={onGoToCatalog}>
            Explorar cursos disponibles
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enrolledDetails.map(({ enrollment, course, teacher }) => (
            <article
              key={course.id}
              className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[#6C22A6] transition-colors overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-[var(--bg-tertiary)]">
                <ImageWithFallback
                  src={course.image}
                  alt={course.title}
                  fallbackTitle={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                    {enrollment.cohortName}
                  </p>
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {course.title}
                  </h2>
                  <div className="flex items-center gap-2.5">
                    <Avatar
                      initials={teacher.initials}
                      name={teacher.name}
                      size="xs"
                      tone="violet"
                    />
                    <span className="text-xs text-[var(--text-secondary)]">{teacher.name}</span>
                  </div>
                  <LinearProgress value={enrollment.progress} accent="lime" />
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent-highlight-text)]" />
                    <span>{enrollment.nextClassLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" onClick={onGoToLive}>
                      <Video className="w-3.5 h-3.5" />
                      <span>Aula en vivo</span>
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => onOpenCourse(course.id)}>
                      Continuar
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
