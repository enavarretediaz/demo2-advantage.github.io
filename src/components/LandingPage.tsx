import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  MapPin,
  Menu,
  Star,
  Users,
  Video,
  X,
} from 'lucide-react';
import { Course, LanguageFilter } from '../types';
import { COURSES, TEACHERS } from '../data/mockData';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { ThemeToggle } from './ui/ThemeToggle';

interface LandingPageProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenTrialModal: () => void;
  onNotify: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export function LandingPage({
  theme,
  onToggleTheme,
  onOpenLogin,
  onOpenRegister,
  onOpenTrialModal,
  onNotify,
}: LandingPageProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<LanguageFilter>('Todos');

  // Lead capture form state
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadLanguage, setLeadLanguage] = useState('Inglés');
  const [leadFormat, setLeadFormat] = useState('Presencial en Gandía');
  const [leadErrors, setLeadErrors] = useState<{ name?: string; email?: string; phone?: string }>(
    {}
  );
  const [leadSent, setLeadSent] = useState(false);

  const filteredPrograms = COURSES.filter(
    (c) => selectedLang === 'Todos' || c.language === selectedLang
  );

  const featuredTestimonials = COURSES.flatMap((c) =>
    c.testimonials.map((t) => ({ ...t, courseTitle: c.title }))
  ).slice(0, 3);

  const teacherList = Object.values(TEACHERS);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof leadErrors = {};
    if (leadName.trim().length < 2) {
      errors.name = 'Indica tu nombre para contactarte.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim())) {
      errors.email = 'Introduce un correo electrónico válido.';
    }
    if (leadPhone.trim().length < 7) {
      errors.phone = 'Introduce un número de teléfono o WhatsApp válido.';
    }
    setLeadErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLeadSent(true);
    onNotify(
      'success',
      'Solicitud recibida',
      `Nuestro equipo de Gandía te escribirá para coordinar tu prueba de ${leadLanguage}.`
    );
  };

  return (
    <div id="top" className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Single wordmark */}
          <a
            href="#top"
            className="font-display text-xl font-extrabold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0"
          >
            ADVANTAGE<span className="text-[#6C22A6] dark:text-[#96E9C6]">.</span>
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="Navegación web"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--text-secondary)]"
          >
            <a
              href="#programas"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Programas
            </a>
            <a
              href="#metodologia"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Metodología
            </a>
            <a
              href="#profesores"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Profesores
            </a>
            <a
              href="#opiniones"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Opiniones
            </a>
            <a
              href="#contacto"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contacto
            </a>
          </nav>

          {/* Zone 3: Theme Switch + Primary Login CTA */}
          <div className="flex items-center gap-2.5 shrink-0">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <Button variant="primary" size="sm" onClick={onOpenLogin}>
              Acceso alumnos
            </Button>
            <button
              type="button"
              aria-label={mobileNavOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation panel */}
        {mobileNavOpen && (
          <nav
            aria-label="Navegación móvil"
            className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-6 py-4 flex flex-col gap-3 text-sm font-medium text-[var(--text-secondary)]"
          >
            {[
              { href: '#programas', label: 'Programas' },
              { href: '#metodologia', label: 'Metodología' },
              { href: '#profesores', label: 'Profesores' },
              { href: '#opiniones', label: 'Opiniones' },
              { href: '#contacto', label: 'Contacto' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className="py-1.5 text-[var(--text-primary)] hover:text-[#6C22A6] dark:hover:text-[#96E9C6]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        {/* Hero Section: Directly aligned with the Login screen's geometric lattice & split aesthetic */}
        <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          {/* Same architectural grid pattern as AuthScreen */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-55 dark:opacity-35"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="landing-grid" width="64" height="64" patternUnits="userSpaceOnUse">
                <path
                  d="M 64 0 L 0 0 0 64"
                  fill="none"
                  stroke="var(--grid-stroke)"
                  strokeWidth="1"
                />
                <circle cx="0" cy="0" r="1.5" fill="#6C22A6" />
                <circle cx="64" cy="64" r="1.5" fill="#96E9C6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#landing-grid)" />
          </svg>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-[#6C22A6]/10 dark:bg-[#6C22A6]/18 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 w-[340px] h-[340px] rounded-full bg-[#96E9C6]/20 dark:bg-[#96E9C6]/10 blur-3xl"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 lg:py-20 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left side: Editorial typography & pillars matching AuthScreen */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-8 py-2">
                <div className="space-y-6">
                  <p className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                    Academia de Idiomas · Gandía y Online en vivo
                  </p>
                  <h1
                    className="font-display font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.08]"
                    style={{
                      fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Tu próximo nivel con idiomas empieza aquí
                  </h1>
                  <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
                    Clases en vivo con profesores nativos TEFL. Inglés, alemán y francés en grupos
                    reducidos, preparación oficial y programa Advantage Kids en Gandía.
                  </p>

                  {/* Unified Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <Button variant="lime" size="lg" onClick={onOpenTrialModal}>
                      <span>Solicitar clase de prueba</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="lg" onClick={onOpenRegister}>
                      Crear cuenta de alumno
                    </Button>
                  </div>
                </div>

                {/* Social proof strip matching Login screen */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--border-subtle)] text-sm">
                  <div className="flex items-center gap-1.5 text-[var(--accent-highlight-text)] font-semibold tabular-nums">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.8★ en Google</span>
                  </div>
                  <span className="text-[var(--border-subtle)]" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-[var(--text-secondary)]">90+ reseñas verificadas</span>
                  <span className="text-[var(--border-subtle)]" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-[var(--text-secondary)]">Profesores nativos TEFL</span>
                </div>
              </div>

              {/* Right side: Framed Campus Card styled like AuthScreen card container */}
              <div className="lg:col-span-6">
                <div className="h-full rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-4 sm:p-5 flex flex-col justify-between gap-5 shadow-sm">
                  <div className="relative h-64 sm:h-72 lg:h-full min-h-[260px] rounded-xl overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]">
                    <ImageWithFallback
                      src="/src/assets/images/hero_academy_gandia_1795208049601.jpg"
                      alt="Aula presencial de conversación en la academia Advantage de Gandía"
                      fallbackTitle="Academia Advantage Gandía"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs text-white">
                      <span className="font-semibold">
                        Passeig de les Germanies, 48 · Gandía
                      </span>
                      <span className="font-mono text-[#96E9C6]">Presencial y Online</span>
                    </div>
                  </div>

                  {/* Quick Campus Bar inside the card */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)]">
                        ¿Ya eres alumno de Advantage?
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        Accede a tu cohorte, clases en vivo y entregas.
                      </div>
                    </div>
                    <Button variant="primary" size="md" onClick={onOpenLogin}>
                      Entrar al campus
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-column Architectural KPI Strip below hero split */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-subtle)] rounded-2xl overflow-hidden border border-[var(--border-subtle)]">
              <div className="bg-[var(--bg-primary)] p-5 sm:p-6">
                <div className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-[var(--accent-highlight-text)]">
                  A1 – C2
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-1">
                  Cambridge, Goethe y DELF/DALF
                </div>
              </div>
              <div className="bg-[var(--bg-primary)] p-5 sm:p-6">
                <div className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-[var(--text-primary)]">
                  Máx. 8
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-1">
                  Alumnos por grupo reducido
                </div>
              </div>
              <div className="bg-[var(--bg-primary)] p-5 sm:p-6">
                <div className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-[var(--text-primary)]">
                  94%
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-1">
                  Aprobados en convocatorias oficiales
                </div>
              </div>
              <div className="bg-[var(--bg-primary)] p-5 sm:p-6">
                <div className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-[var(--text-primary)]">
                  3 – 12 años
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-1">
                  Programa Advantage Kids
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programas" className="max-w-7xl mx-auto px-6 py-16 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                Oferta formativa 2026
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                Programas diseñados para hablar desde la primera semana
              </h2>
            </div>

            {/* Segmented Filter matching Login/Register tab switch */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] self-start md:self-auto">
              {(['Todos', 'Inglés', 'Alemán', 'Francés'] as LanguageFilter[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLang(lang)}
                  className={`min-h-[36px] px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedLang === lang
                      ? 'bg-[#6C22A6] text-[#ffffff]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((course: Course) => (
              <article
                key={course.id}
                className="group rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[#6C22A6] transition-all duration-200 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--bg-tertiary)]">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    fallbackTitle={course.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                      {course.kicker}
                    </p>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      {course.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-[var(--border-subtle)]">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <span>{course.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.format}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{course.levelRange}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-base font-bold tabular-nums text-[var(--text-primary)]">
                        {course.priceLabel}
                      </span>
                      <Button
                        variant={course.featured ? 'lime' : 'secondary'}
                        size="sm"
                        onClick={onOpenLogin}
                      >
                        Ver en plataforma
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Methodology & Integrated Platform Bento */}
        <section
          id="metodologia"
          className="max-w-7xl mx-auto px-6 py-16 border-t border-[var(--border-subtle)] space-y-8"
        >
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold text-[var(--accent-highlight-text)]">
              Método y campus digital
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
              Academia presencial en Gandía conectada con tu plataforma de alumno
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-8 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="text-xs font-mono font-semibold text-[var(--accent-highlight-text)]">
                  01. Campus Virtual Advantage
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  Clases en vivo, entregas corregidas y progreso por módulo en un solo lugar
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  Cada alumno dispone de acceso privado a su cohorte: enlace directo a clase en vivo,
                  quiz interactivos durante la sesión, descarga de apuntes del profesor, ranking
                  semanal y certificados oficiales verificables.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-subtle)]">
                <div className="space-y-1">
                  <Video className="w-4 h-4 text-[var(--accent-highlight-text)]" />
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    Aula híbrida HD
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    Asiste presencial o por vídeo
                  </div>
                </div>
                <div className="space-y-1">
                  <Clock className="w-4 h-4 text-[var(--accent-highlight-text)]" />
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    Feedback en 24h
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    Corrección escrita y oral
                  </div>
                </div>
                <div className="space-y-1">
                  <Award className="w-4 h-4 text-[var(--accent-highlight-text)]" />
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    Simulacros reales
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    Cambridge, Goethe y DELF
                  </div>
                </div>
              </div>
              <div>
                <Button variant="primary" size="md" onClick={onOpenLogin}>
                  Entrar a la plataforma de alumnos
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex-1 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-2">
                <div className="text-xs font-mono font-semibold text-[var(--accent-highlight-text)]">
                  02. Grupos reducidos reales
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  Máximo 8 alumnos por aula y nivel homogéneo
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Realizamos una entrevista oral previa de 15 minutos para ubicarte exactamente en
                  tu grupo MCER (A1 a C2) sin mezclar niveles.
                </p>
              </div>

              <div className="flex-1 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-2">
                <div className="text-xs font-mono font-semibold text-[var(--accent-highlight-text)]">
                  03. Advantage Kids (3 a 12 años)
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  Aprendizaje natural sin deberes repetitivos
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Divididos por etapas de desarrollo con método phonics, teatro en inglés y
                  seguimiento mensual para familias de la Safor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Native Teachers Section */}
        <section
          id="profesores"
          className="max-w-7xl mx-auto px-6 py-16 border-t border-[var(--border-subtle)] space-y-8"
        >
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold text-[var(--accent-highlight-text)]">
              Equipo docente titulado
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
              Profesores nativos certificados TEFL y especialistas infantiles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teacherList.map((teacher) => (
              <article
                key={teacher.id}
                className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Avatar
                      initials={teacher.initials}
                      name={teacher.name}
                      size="md"
                      tone="violet"
                    />
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[var(--accent-highlight-text)] tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {teacher.rating}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      {teacher.name}
                    </h3>
                    <p className="text-xs font-medium text-[var(--accent-highlight-text)] mt-0.5">
                      {teacher.language}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      {teacher.nationality}
                    </p>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {teacher.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
                  {teacher.credentials}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Proof & Testimonials Section */}
        <section
          id="opiniones"
          className="max-w-7xl mx-auto px-6 py-16 border-t border-[var(--border-subtle)] space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                Resultados en Gandía
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                Lo que logran nuestros alumnos y familias
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <Star className="w-4 h-4 fill-current text-[var(--accent-highlight-text)]" />
              <span className="tabular-nums">4.8★ en Google · 90+ reseñas verificadas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTestimonials.map((t) => (
              <article
                key={t.id}
                className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                    {t.courseTitle}
                  </div>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">«{t.quote}»</p>
                </div>
                <div className="pt-4 border-t border-[var(--border-subtle)] space-y-1">
                  <div className="text-sm font-bold text-[var(--text-primary)]">{t.studentName}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{t.role}</div>
                  <div className="text-xs font-medium text-[var(--accent-highlight-text)] pt-1">
                    {t.outcome}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Contact & Level Test Capture */}
        <section
          id="contacto"
          className="max-w-7xl mx-auto px-6 py-16 border-t border-[var(--border-subtle)]"
        >
          <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                Empieza hoy en Gandía
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                Reserva tu prueba de nivel y clase gratuita
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Cuéntanos qué idioma quieres mejorar y si prefieres asistir en nuestra sede de
                Passeig de les Germanies o en directo online.
              </p>
              <div className="space-y-3 pt-2 text-sm text-[var(--text-primary)]">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[var(--accent-highlight-text)] shrink-0" />
                  <span>Passeig de les Germanies, 48 · 46701 Gandía, Valencia</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[var(--accent-highlight-text)] shrink-0" />
                  <span>Lunes a Viernes · 09:30 – 21:00</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[var(--accent-highlight-text)] shrink-0" />
                  <span>Grupos para adultos, empresas y niños (3–12 años)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {leadSent ? (
                <div className="rounded-2xl bg-[var(--bg-primary)] border border-[#6C22A6]/40 dark:border-[#96E9C6]/40 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-[#96E9C6] font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Solicitud registrada correctamente</span>
                  </div>
                  <p className="text-sm text-[var(--text-primary)]">
                    Gracias, <span className="font-semibold">{leadName}</span>. Hemos recibido tu
                    solicitud para <span className="font-semibold">{leadLanguage}</span> (
                    {leadFormat}) y te contactaremos en menos de 24 horas laborables.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="lime" size="sm" onClick={onOpenLogin}>
                      Acceder a la plataforma de alumnos
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setLeadSent(false);
                        setLeadName('');
                        setLeadEmail('');
                        setLeadPhone('');
                      }}
                    >
                      Enviar otra consulta
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleLeadSubmit}
                  noValidate
                  className="space-y-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="lead-name"
                        className="block text-xs font-medium text-[var(--text-primary)]"
                      >
                        Nombre completo
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        value={leadName}
                        onChange={(e) => {
                          setLeadName(e.target.value);
                          if (leadErrors.name) setLeadErrors((p) => ({ ...p, name: undefined }));
                        }}
                        placeholder="Tu nombre"
                        className={`w-full h-11 px-3.5 rounded-xl bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] border focus:outline-none ${
                          leadErrors.name
                            ? 'border-red-500'
                            : 'border-[var(--border-subtle)] focus:border-[#6C22A6]'
                        }`}
                      />
                      {leadErrors.name && (
                        <p className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{leadErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="lead-email"
                        className="block text-xs font-medium text-[var(--text-primary)]"
                      >
                        Correo electrónico
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        value={leadEmail}
                        onChange={(e) => {
                          setLeadEmail(e.target.value);
                          if (leadErrors.email) setLeadErrors((p) => ({ ...p, email: undefined }));
                        }}
                        placeholder="tu@correo.com"
                        className={`w-full h-11 px-3.5 rounded-xl bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] border focus:outline-none ${
                          leadErrors.email
                            ? 'border-red-500'
                            : 'border-[var(--border-subtle)] focus:border-[#6C22A6]'
                        }`}
                      />
                      {leadErrors.email && (
                        <p className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{leadErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="lead-phone"
                        className="block text-xs font-medium text-[var(--text-primary)]"
                      >
                        Teléfono / WhatsApp
                      </label>
                      <input
                        id="lead-phone"
                        type="tel"
                        value={leadPhone}
                        onChange={(e) => {
                          setLeadPhone(e.target.value);
                          if (leadErrors.phone) setLeadErrors((p) => ({ ...p, phone: undefined }));
                        }}
                        placeholder="600 000 000"
                        className={`w-full h-11 px-3.5 rounded-xl bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] border focus:outline-none ${
                          leadErrors.phone
                            ? 'border-red-500'
                            : 'border-[var(--border-subtle)] focus:border-[#6C22A6]'
                        }`}
                      />
                      {leadErrors.phone && (
                        <p className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{leadErrors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="lead-lang"
                        className="block text-xs font-medium text-[var(--text-primary)]"
                      >
                        Idioma de interés
                      </label>
                      <select
                        id="lead-lang"
                        value={leadLanguage}
                        onChange={(e) => setLeadLanguage(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
                      >
                        <option value="Inglés">Inglés</option>
                        <option value="Alemán">Alemán</option>
                        <option value="Francés">Francés</option>
                        <option value="Advantage Kids">Advantage Kids (3-12 años)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="lead-format"
                        className="block text-xs font-medium text-[var(--text-primary)]"
                      >
                        Modalidad
                      </label>
                      <select
                        id="lead-format"
                        value={leadFormat}
                        onChange={(e) => setLeadFormat(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
                      >
                        <option value="Presencial en Gandía">Presencial en Gandía</option>
                        <option value="Online en vivo">Online en vivo</option>
                        <option value="Híbrida">Híbrida</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-[var(--text-secondary)]">
                      Sin compromiso · Diagnóstico oral gratuito incluido.
                    </span>
                    <Button type="submit" variant="lime" size="lg">
                      Solicitar información
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-display text-lg font-extrabold text-[var(--text-primary)]">
              ADVANTAGE<span className="text-[#6C22A6] dark:text-[#96E9C6]">.</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Academia de Idiomas en Gandía · Passeig de les Germanies, 48 · Valencia
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--text-secondary)]">
            <a href="#programas" className="hover:text-[var(--text-primary)]">
              Programas
            </a>
            <a href="#profesores" className="hover:text-[var(--text-primary)]">
              Profesores
            </a>
            <a href="#contacto" className="hover:text-[var(--text-primary)]">
              Contacto
            </a>
            <button
              type="button"
              onClick={onOpenLogin}
              className="text-[var(--accent-highlight-text)] font-semibold hover:underline"
            >
              Acceso alumnos
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
