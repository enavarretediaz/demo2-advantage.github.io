import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bell, Check, Menu, Search, X } from 'lucide-react';
import {
  AcademyEvent,
  AppScreen,
  CommunityMessage,
  Course,
  EnrolledCourse,
  LiveClassSession,
  NotificationItem,
  ToastItem,
  User,
} from './types';
import {
  ACADEMY_EVENTS,
  ANNOUNCEMENTS,
  CERTIFICATES,
  COHORT_RANKING,
  COURSES,
  DEFAULT_USER,
  GRADED_SUBMISSIONS,
  INITIAL_COMMUNITY_MESSAGES,
  INITIAL_ENROLLED_COURSES,
  INITIAL_NOTIFICATIONS,
  LIVE_CLASSES,
} from './data/mockData';
import { AuthScreen } from './components/AuthScreen';
import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { DashboardHome } from './components/DashboardHome';
import { CourseDetailView } from './components/CourseDetailView';
import { LiveClassView } from './components/LiveClassView';
import { MyCoursesView } from './components/MyCoursesView';
import { ProgressView } from './components/ProgressView';
import { CertificatesView } from './components/CertificatesView';
import { CommunityView } from './components/CommunityView';
import { SettingsView } from './components/SettingsView';
import { TrialBookingModal } from './components/TrialBookingModal';
import { EnrollmentModal } from './components/EnrollmentModal';
import { ToastContainer } from './components/ui/ToastContainer';
import { ThemeToggle } from './components/ui/ThemeToggle';

type SiteView = 'landing' | 'auth' | 'platform';
type ThemeMode = 'dark' | 'light';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = window.localStorage.getItem('advantage_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [siteView, setSiteView] = useState<SiteView>('landing');
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [activeScreen, setActiveScreen] = useState<AppScreen>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(COURSES[0].id);
  const [activeLiveSession, setActiveLiveSession] = useState<LiveClassSession>(LIVE_CLASSES[0]);

  const [enrolledCourses, setEnrolledCourses] =
    useState<EnrolledCourse[]>(INITIAL_ENROLLED_COURSES);
  const [messages, setMessages] = useState<CommunityMessage[]>(INITIAL_COMMUNITY_MESSAGES);
  const [events, setEvents] = useState<AcademyEvent[]>(ACADEMY_EVENTS);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [enrollModalCourse, setEnrollModalCourse] = useState<Course | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const notifRef = useRef<HTMLDivElement>(null);

  const addToast = (
    type: 'success' | 'error' | 'info',
    title: string,
    description?: string
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem('advantage_theme', theme);
    } catch {
      // Ignore storage failures in sandboxed contexts
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const rankingWithUser = useMemo(() => {
    return COHORT_RANKING.map((member) =>
      member.isCurrentUser ? { ...member, name: user.name, points: user.points } : member
    ).sort((a, b) => b.points - a.points);
  }, [user.name, user.points]);

  const handleAuthenticate = ({
    name,
    email,
    targetLanguage,
    isNewAccount,
  }: {
    name: string;
    email: string;
    targetLanguage: string;
    isNewAccount: boolean;
  }) => {
    if (isNewAccount) {
      setUser({
        ...DEFAULT_USER,
        name,
        email,
        targetLanguage,
        level: `Inicial · ${targetLanguage}`,
        points: 100,
        streakDays: 1,
      });
      setEnrolledCourses([]);
      addToast('success', `¡Bienvenido a Advantage, ${name.split(' ')[0]}!`, 'Cuenta creada correctamente.');
    } else {
      setUser({
        ...DEFAULT_USER,
        name,
        email,
      });
      setEnrolledCourses(INITIAL_ENROLLED_COURSES);
      addToast('success', `Sesión iniciada`, `Hola de nuevo, ${name}.`);
    }
    setActiveScreen('home');
    setSiteView('platform');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveScreen('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteEnrollment = (course: Course, modality: string, schedule: string) => {
    setEnrolledCourses((prev) => {
      if (prev.some((e) => e.courseId === course.id)) return prev;
      return [
        ...prev,
        {
          courseId: course.id,
          progress: 10,
          nextClassLabel: `${schedule.split('·')[0].trim()} · ${modality.split('·')[0].trim()}`,
          completedModuleIds: [],
          cohortName: `${course.shortTitle} · Gandía`,
        },
      ];
    });
    setUser((prev) => ({ ...prev, points: prev.points + 100 }));
    addToast('success', 'Inscripción confirmada', `Ya tienes acceso a ${course.title} (+100 pts).`);
  };

  const handleToggleModule = (courseId: string, moduleId: string) => {
    const course = COURSES.find((c) => c.id === courseId);
    if (!course) return;

    setEnrolledCourses((prev) =>
      prev.map((enrollment) => {
        if (enrollment.courseId !== courseId) return enrollment;
        const exists = enrollment.completedModuleIds.includes(moduleId);
        const updatedIds = exists
          ? enrollment.completedModuleIds.filter((id) => id !== moduleId)
          : [...enrollment.completedModuleIds, moduleId];
        const newProgress = Math.round((updatedIds.length / course.modules.length) * 100);
        return {
          ...enrollment,
          completedModuleIds: updatedIds,
          progress: newProgress,
        };
      })
    );
  };

  const handleJoinLiveClass = (session: LiveClassSession) => {
    setActiveLiveSession(session);
    setActiveScreen('live');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAwardPoints = (points: number, reason: string) => {
    if (points <= 0) return;
    setUser((prev) => ({ ...prev, points: prev.points + points }));
    addToast('success', `+${points} puntos sumados`, reason);
  };

  const handleCopyLink = (url: string) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    addToast('info', 'Enlace copiado', 'Pégalo o únete directamente desde el aula en vivo.');
  };

  const handleRsvpEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev;
        const nextRsvp = !ev.rsvped;
        addToast(
          nextRsvp ? 'success' : 'info',
          nextRsvp ? 'Plaza reservada en evento' : 'Reserva cancelada',
          ev.title
        );
        return {
          ...ev,
          rsvped: nextRsvp,
          spotsLeft: nextRsvp ? Math.max(0, ev.spotsLeft - 1) : ev.spotsLeft + 1,
        };
      })
    );
  };

  const handleSendCommunityMessage = (text: string, channel: string) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const initials = user.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join('');

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        authorName: user.name,
        authorRole: `Alumno · ${user.level}`,
        initials,
        time,
        channel,
        text,
      },
    ]);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const selectedCourse = useMemo(
    () => COURSES.find((c) => c.id === selectedCourseId) ?? COURSES[0],
    [selectedCourseId]
  );

  const selectedEnrollment = useMemo(
    () => enrolledCourses.find((e) => e.courseId === selectedCourse.id),
    [enrolledCourses, selectedCourse.id]
  );

  if (siteView === 'landing') {
    return (
      <>
        <LandingPage
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenLogin={() => {
            setAuthInitialTab('login');
            setSiteView('auth');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenRegister={() => {
            setAuthInitialTab('register');
            setSiteView('auth');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenTrialModal={() => setTrialModalOpen(true)}
          onNotify={addToast}
        />
        <TrialBookingModal
          isOpen={trialModalOpen}
          onClose={() => setTrialModalOpen(false)}
          defaultName={user.name}
          defaultEmail={user.email}
          onConfirm={(summary) => addToast('success', 'Clase de prueba reservada', summary)}
        />
        <ToastContainer
          toasts={toasts}
          onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))}
        />
      </>
    );
  }

  if (siteView === 'auth') {
    return (
      <>
        <AuthScreen
          key={authInitialTab}
          theme={theme}
          onToggleTheme={toggleTheme}
          initialTab={authInitialTab}
          onBackToSite={() => {
            setSiteView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onAuthenticate={handleAuthenticate}
          onNotify={addToast}
        />
        <ToastContainer
          toasts={toasts}
          onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))}
        />
      </>
    );
  }

  const firstName = user.name.split(' ').slice(0, 2).join(' ');

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Sidebar
        user={user}
        activeScreen={activeScreen}
        onNavigate={(screen) => {
          setActiveScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBookTrial={() => setTrialModalOpen(true)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Shell */}
      <div className="lg:pl-[240px] min-h-screen flex flex-col">
        {/* Top Workspace Header */}
        <header className="sticky top-0 z-20 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] px-4 sm:px-8 py-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menú lateral"
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="font-display text-lg sm:text-xl font-extrabold text-[var(--text-primary)] truncate">
                  ¡Hola, {firstName}!
                </h1>
                <p className="text-xs text-[var(--text-secondary)] truncate">
                  Tu próximo nivel empieza hoy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-1 sm:flex-initial justify-end max-w-lg">
              {/* Search bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  aria-label="Buscar cursos, profesores o recursos"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeScreen !== 'home' && e.target.value.trim()) {
                      setActiveScreen('home');
                    }
                  }}
                  placeholder="Buscar cursos, profesores..."
                  className="w-full h-10 pl-10 pr-8 rounded-xl bg-[var(--bg-secondary)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Limpiar búsqueda"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <ThemeToggle theme={theme} onToggle={toggleTheme} />

              {/* Notifications Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={() => setNotificationsOpen((prev) => !prev)}
                  aria-label={`Notificaciones (${unreadCount} sin leer)`}
                  className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[#6C22A6] text-[var(--text-primary)] transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#96E9C6] text-[#0a0a0a] font-mono text-[10px] font-bold flex items-center justify-center tabular-nums">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[var(--bg-primary)] dark:bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden z-40">
                    <div className="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        Notificaciones
                      </span>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={handleMarkAllRead}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--accent-highlight-text)] hover:underline"
                        >
                          <Check className="w-3 h-3" />
                          <span>Marcar leídas</span>
                        </button>
                      )}
                    </div>
                    <div className="divide-y divide-[var(--border-subtle)] max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <button
                          key={notif.id}
                          type="button"
                          onClick={() => {
                            setNotifications((prev) =>
                              prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
                            );
                            setNotificationsOpen(false);
                            if (notif.targetScreen) setActiveScreen(notif.targetScreen);
                          }}
                          className={`w-full text-left px-4 py-3.5 hover:bg-[var(--bg-tertiary)] transition-colors ${
                            notif.read ? 'opacity-70' : 'bg-[#6C22A6]/8 dark:bg-[#6C22A6]/15'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-[var(--text-primary)]">
                              {notif.title}
                            </span>
                            <span className="text-[11px] text-[var(--text-secondary)] shrink-0">
                              {notif.time}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] mt-1">
                            {notif.detail}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Viewport */}
        <main className="flex-1 px-4 sm:px-8 py-8 pb-24 lg:pb-12">
          <div className="max-w-7xl mx-auto">
            {activeScreen === 'home' && (
              <DashboardHome
                user={user}
                searchQuery={searchQuery}
                courses={COURSES}
                enrolledCourses={enrolledCourses}
                liveClasses={LIVE_CLASSES}
                submissions={GRADED_SUBMISSIONS}
                ranking={rankingWithUser}
                messages={messages}
                announcements={ANNOUNCEMENTS}
                events={events}
                onOpenCourse={handleOpenCourse}
                onEnrollCourse={(course) => setEnrollModalCourse(course)}
                onJoinLiveClass={handleJoinLiveClass}
                onNavigate={(screen) => setActiveScreen(screen)}
                onCopyLink={handleCopyLink}
                onRsvpEvent={handleRsvpEvent}
              />
            )}

            {activeScreen === 'courses' && (
              <MyCoursesView
                courses={COURSES}
                enrolledCourses={enrolledCourses}
                onOpenCourse={handleOpenCourse}
                onGoToCatalog={() => setActiveScreen('home')}
                onGoToLive={() => setActiveScreen('live')}
              />
            )}

            {activeScreen === 'course-detail' && (
              <CourseDetailView
                course={selectedCourse}
                enrollment={selectedEnrollment}
                onBack={() => setActiveScreen('home')}
                onEnroll={(course) => setEnrollModalCourse(course)}
                onToggleModule={handleToggleModule}
                onGoToLiveClass={() => setActiveScreen('live')}
              />
            )}

            {activeScreen === 'live' && (
              <LiveClassView
                session={activeLiveSession}
                studentName={user.name}
                onAwardPoints={handleAwardPoints}
                onNotify={addToast}
              />
            )}

            {activeScreen === 'progress' && (
              <ProgressView
                user={user}
                submissions={GRADED_SUBMISSIONS}
                ranking={rankingWithUser}
              />
            )}

            {activeScreen === 'certificates' && (
              <CertificatesView user={user} certificates={CERTIFICATES} onNotify={addToast} />
            )}

            {activeScreen === 'community' && (
              <CommunityView
                user={user}
                messages={messages}
                announcements={ANNOUNCEMENTS}
                events={events}
                onSendMessage={handleSendCommunityMessage}
                onRsvpEvent={handleRsvpEvent}
              />
            )}

            {activeScreen === 'settings' && (
              <SettingsView
                user={user}
                theme={theme}
                onToggleTheme={toggleTheme}
                onUpdateUser={(updates) => {
                  setUser((prev) => ({ ...prev, ...updates }));
                  addToast('success', 'Perfil actualizado', 'Tus cambios se han guardado.');
                }}
                onLogout={() => {
                  setSiteView('landing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  addToast('info', 'Sesión cerrada', 'Has vuelto a la página principal de Advantage.');
                }}
              />
            )}
          </div>
        </main>
      </div>

      {/* Interactive Modals */}
      <TrialBookingModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        defaultName={user.name}
        defaultEmail={user.email}
        onConfirm={(summary) =>
          addToast('success', 'Clase de prueba reservada', summary)
        }
      />

      <EnrollmentModal
        course={enrollModalCourse}
        isOpen={Boolean(enrollModalCourse)}
        onClose={() => setEnrollModalCourse(null)}
        onCompleteEnrollment={handleCompleteEnrollment}
      />

      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))}
      />
    </div>
  );
}
