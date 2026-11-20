import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Star,
  User as UserIcon,
} from 'lucide-react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { ThemeToggle } from './ui/ThemeToggle';

interface AuthScreenProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  initialTab?: 'login' | 'register';
  onBackToSite?: () => void;
  onAuthenticate: (payload: {
    name: string;
    email: string;
    targetLanguage: string;
    isNewAccount: boolean;
  }) => void;
  onNotify: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

type AuthTab = 'login' | 'register';

function getPasswordStrength(password: string): {
  score: 0 | 1 | 2 | 3;
  label: string;
  barColor: string;
  textColor: string;
} {
  if (!password) {
    return {
      score: 0,
      label: '',
      barColor: 'bg-[var(--border-subtle)]',
      textColor: 'text-[var(--text-secondary)]',
    };
  }
  let points = 0;
  if (password.length >= 8) points += 1;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) points += 1;
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) points += 1;

  if (points <= 1) {
    return {
      score: 1,
      label: 'Débil',
      barColor: 'bg-red-500 dark:bg-red-400',
      textColor: 'text-red-600 dark:text-red-400',
    };
  }
  if (points === 2) {
    return {
      score: 2,
      label: 'Media',
      barColor: 'bg-amber-500 dark:bg-amber-400',
      textColor: 'text-amber-600 dark:text-amber-400',
    };
  }
  return {
    score: 3,
    label: 'Fuerte',
    barColor: 'bg-emerald-500 dark:bg-[#96E9C6]',
    textColor: 'text-emerald-700 dark:text-[#96E9C6]',
  };
}

export function AuthScreen({
  theme,
  onToggleTheme,
  initialTab = 'login',
  onBackToSite,
  onAuthenticate,
  onNotify,
}: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regLanguage, setRegLanguage] = useState('Inglés');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [regErrors, setRegErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirm?: string;
    terms?: string;
  }>({});

  // Forgot password modal
  const [forgotOpen, setForgotOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [recoveryError, setRecoveryError] = useState('');

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { email?: string; password?: string } = {};

    if (!isValidEmail(loginEmail)) {
      errors.email = 'Introduce un correo electrónico válido.';
    }
    if (loginPassword.trim().length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setLoginErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const cleanEmail = loginEmail.trim().toLowerCase();
    const derivedName =
      cleanEmail === 'ana@ejemplo.com'
        ? 'Ana Belén Ivars'
        : cleanEmail
            .split('@')[0]
            .replace(/[._-]/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());

    onAuthenticate({
      name: derivedName,
      email: cleanEmail,
      targetLanguage: 'Inglés',
      isNewAccount: false,
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof regErrors = {};

    if (regName.trim().length < 3) {
      errors.name = 'Introduce tu nombre y apellidos.';
    }
    if (!isValidEmail(regEmail)) {
      errors.email = 'Introduce un correo electrónico válido.';
    }
    if (regPassword.length < 6) {
      errors.password = 'Usa al menos 6 caracteres para tu contraseña.';
    }
    if (regConfirm !== regPassword || !regConfirm) {
      errors.confirm = 'Las contraseñas no coinciden.';
    }
    if (!acceptTerms) {
      errors.terms = 'Debes aceptar los términos y condiciones para continuar.';
    }

    setRegErrors(errors);
    if (Object.keys(errors).length > 0) return;

    onAuthenticate({
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      targetLanguage: regLanguage,
      isNewAccount: true,
    });
  };

  const handleOAuth = (provider: 'Google' | 'Apple') => {
    onNotify('info', `Conectando con ${provider}`, 'Verificando sesión de estudiante...');
    window.setTimeout(() => {
      onAuthenticate({
        name: 'Ana Belén Ivars',
        email: 'ana@ejemplo.com',
        targetLanguage: 'Inglés',
        isNewAccount: false,
      });
    }, 350);
  };

  const handleDemoFill = () => {
    setLoginEmail('ana@ejemplo.com');
    setLoginPassword('Advantage2026!');
    setLoginErrors({});
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(recoveryEmail)) {
      setRecoveryError('Introduce un correo electrónico válido.');
      return;
    }
    setRecoveryError('');
    setRecoverySent(true);
    onNotify(
      'success',
      'Enlace de recuperación enviado',
      `Revisa la bandeja de ${recoveryEmail.trim()}.`
    );
  };

  const strength = getPasswordStrength(regPassword);
  const loginEmailValid = isValidEmail(loginEmail);
  const regEmailValid = isValidEmail(regEmail);
  const passwordsMatch = regConfirm.length > 0 && regConfirm === regPassword;

  return (
    <div className="min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)] grid lg:grid-cols-2">
      {/* Left column: Branding & Social Proof */}
      <div className="relative overflow-hidden bg-[var(--bg-secondary)] border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] px-8 py-12 lg:px-16 lg:py-16 flex flex-col justify-between">
        {/* Subtle geometric lattice pattern in violet & lime */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-55 dark:opacity-35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="advantage-grid" width="64" height="64" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#advantage-grid)" />
        </svg>

        {/* Architectural accent shapes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#6C22A6]/12 dark:bg-[#6C22A6]/18 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-[#96E9C6]/20 dark:bg-[#96E9C6]/10 blur-3xl"
        />

        {/* Brand mark */}
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="space-y-4">
            {onBackToSite && (
              <button
                type="button"
                onClick={onBackToSite}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-highlight-text)] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a la web</span>
              </button>
            )}
            <div>
              <div className="font-display text-2xl font-extrabold tracking-tight text-[var(--text-primary)] whitespace-nowrap">
                ADVANTAGE<span className="text-[#6C22A6] dark:text-[#96E9C6]">.</span>
              </div>
              <p className="mt-2 text-xs font-medium text-[var(--text-secondary)]">
                Academia de Idiomas · Gandía, España
              </p>
            </div>
          </div>

          <div className="lg:hidden">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>

        {/* Hero messaging */}
        <div className="relative z-10 my-12 lg:my-0 max-w-xl space-y-6">
          <h1
            className="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12] tracking-tight text-[var(--text-primary)]"
            style={{ textWrap: 'balance' }}
          >
            Tu próximo nivel con idiomas empieza aquí
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg">
            Clases en vivo con profesores nativos. Inglés, alemán y francés en grupos reducidos,
            modalidad presencial en Gandía u online.
          </p>

          {/* Compact academy pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-subtle)]">
            <div>
              <div className="font-mono text-lg font-semibold tabular-nums text-[var(--accent-highlight-text)]">
                A1 – C2
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-0.5">
                Cambridge, Goethe y DELF
              </div>
            </div>
            <div>
              <div className="font-mono text-lg font-semibold tabular-nums text-[var(--text-primary)]">
                Máx. 8
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-0.5">
                Alumnos por grupo reducido
              </div>
            </div>
            <div>
              <div className="font-mono text-lg font-semibold tabular-nums text-[var(--text-primary)]">
                3 – 12
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-0.5">
                Programa Advantage Kids
              </div>
            </div>
          </div>
        </div>

        {/* Social proof footer */}
        <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--border-subtle)] text-sm">
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

      {/* Right column: Auth Form */}
      <div className="relative flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16 bg-[var(--bg-primary)]">
        <div className="hidden lg:block absolute top-6 right-8">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} showLabel />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md space-y-6"
        >
          {/* Segmented Tabs */}
          <div
            role="tablist"
            aria-label="Opciones de acceso"
            className="grid grid-cols-2 p-1 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'login'}
              onClick={() => setActiveTab('login')}
              className={`min-h-[40px] rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeTab === 'login'
                  ? 'bg-[#6C22A6] text-[#ffffff] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'register'}
              onClick={() => setActiveTab('register')}
              className={`min-h-[40px] rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeTab === 'register'
                  ? 'bg-[#6C22A6] text-[#ffffff] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Registrarse
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleLoginSubmit}
                noValidate
                className="space-y-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 sm:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                      Acceso de alumnos
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Continúa con tus clases y entregas en Advantage.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDemoFill}
                    className="text-xs font-semibold text-[var(--accent-highlight-text)] hover:underline whitespace-nowrap shrink-0"
                  >
                    Rellenar demo
                  </button>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="login-email"
                    className="block text-xs font-medium text-[var(--text-primary)]"
                  >
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        if (loginErrors.email) setLoginErrors((p) => ({ ...p, email: undefined }));
                      }}
                      placeholder="ana@ejemplo.com"
                      className={`w-full h-11 pl-10 pr-10 rounded-xl bg-[var(--bg-primary)] dark:bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 border transition-colors focus:outline-none ${
                        loginErrors.email
                          ? 'border-red-500 focus:border-red-400'
                          : loginEmailValid
                            ? 'border-emerald-500 dark:border-[#96E9C6]/60'
                            : 'border-[var(--border-subtle)] focus:border-[#6C22A6]'
                      }`}
                    />
                    {loginEmailValid && !loginErrors.email && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#96E9C6] absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  {loginErrors.email && (
                    <p className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{loginErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-medium text-[var(--text-primary)]"
                  >
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        if (loginErrors.password)
                          setLoginErrors((p) => ({ ...p, password: undefined }));
                      }}
                      placeholder="Introduce tu contraseña"
                      className={`w-full h-11 pl-10 pr-11 rounded-xl bg-[var(--bg-primary)] dark:bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 border transition-colors focus:outline-none ${
                        loginErrors.password
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-[var(--border-subtle)] focus:border-[#6C22A6]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      aria-label={showLoginPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg"
                    >
                      {showLoginPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{loginErrors.password}</span>
                    </p>
                  )}
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <label className="inline-flex items-center gap-2 text-[var(--text-secondary)] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--border-subtle)] bg-[var(--bg-tertiary)] accent-[#6C22A6]"
                    />
                    <span>Recordarme</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setRecoveryEmail(loginEmail);
                      setRecoverySent(false);
                      setRecoveryError('');
                      setForgotOpen(true);
                    }}
                    className="text-[var(--accent-highlight-text)] hover:underline font-semibold"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Iniciar sesión
                </Button>

                {/* OAuth divider */}
                <div className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-[var(--border-subtle)]" />
                  <span className="px-3 text-xs text-[var(--text-secondary)]">o continúa con</span>
                  <div className="flex-grow border-t border-[var(--border-subtle)]" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => handleOAuth('Google')}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#EA4335"
                        d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z"
                      />
                    </svg>
                    <span>Google</span>
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => handleOAuth('Apple')}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
                    </svg>
                    <span>Apple</span>
                  </Button>
                </div>

                <p className="text-center text-xs text-[var(--text-secondary)] pt-1">
                  ¿No tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="text-[var(--accent-highlight-text)] font-semibold hover:underline"
                  >
                    Regístrate
                  </button>
                </p>
              </motion.form>
            ) : (
              <motion.form
                key="register-form"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleRegisterSubmit}
                noValidate
                className="space-y-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 sm:p-8"
              >
                <div>
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    Crea tu cuenta de alumno
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Empieza tu diagnóstico gratuito y reserva tu primera clase.
                  </p>
                </div>

                {/* Full name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="reg-name"
                    className="block text-xs font-medium text-[var(--text-primary)]"
                  >
                    Nombre completo
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="reg-name"
                      type="text"
                      value={regName}
                      onChange={(e) => {
                        setRegName(e.target.value);
                        if (regErrors.name) setRegErrors((p) => ({ ...p, name: undefined }));
                      }}
                      placeholder="Ana Belén Ivars"
                      className={`w-full h-11 pl-10 pr-4 rounded-xl bg-[var(--bg-primary)] dark:bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 border focus:outline-none ${
                        regErrors.name
                          ? 'border-red-500'
                          : regName.trim().length >= 3
                            ? 'border-emerald-500 dark:border-[#96E9C6]/60'
                            : 'border-[var(--border-subtle)] focus:border-[#6C22A6]'
                      }`}
                    />
                  </div>
                  {regErrors.name && (
                    <p className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{regErrors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="reg-email"
                    className="block text-xs font-medium text-[var(--text-primary)]"
                  >
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="reg-email"
                      type="email"
                      value={regEmail}
                      onChange={(e) => {
                        setRegEmail(e.target.value);
                        if (regErrors.email) setRegErrors((p) => ({ ...p, email: undefined }));
                      }}
                      placeholder="tu@correo.com"
                      className={`w-full h-11 pl-10 pr-10 rounded-xl bg-[var(--bg-primary)] dark:bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 border focus:outline-none ${
                        regErrors.email
                          ? 'border-red-500'
                          : regEmailValid
                            ? 'border-emerald-500 dark:border-[#96E9C6]/60'
                            : 'border-[var(--border-subtle)] focus:border-[#6C22A6]'
                      }`}
                    />
                    {regEmailValid && !regErrors.email && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#96E9C6] absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  {regErrors.email && (
                    <p className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{regErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* Password + Strength */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="reg-password"
                    className="block text-xs font-medium text-[var(--text-primary)]"
                  >
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="reg-password"
                      type={showRegPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => {
                        setRegPassword(e.target.value);
                        if (regErrors.password)
                          setRegErrors((p) => ({ ...p, password: undefined }));
                      }}
                      placeholder="Mínimo 6 caracteres"
                      className={`w-full h-11 pl-10 pr-11 rounded-xl bg-[var(--bg-primary)] dark:bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 border focus:outline-none ${
                        regErrors.password
                          ? 'border-red-500'
                          : 'border-[var(--border-subtle)] focus:border-[#6C22A6]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword((p) => !p)}
                      aria-label={showRegPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      {showRegPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {regPassword && (
                    <div className="space-y-1 pt-0.5">
                      <div className="grid grid-cols-3 gap-1.5">
                        {[1, 2, 3].map((step) => (
                          <div
                            key={step}
                            className={`h-1 rounded-full transition-colors ${
                              strength.score >= step
                                ? strength.barColor
                                : 'bg-[var(--border-subtle)]'
                            }`}
                          />
                        ))}
                      </div>
                      <div className={`text-[11px] font-medium ${strength.textColor}`}>
                        Seguridad de contraseña: {strength.label}
                      </div>
                    </div>
                  )}
                  {regErrors.password && (
                    <p className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{regErrors.password}</span>
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="reg-confirm"
                    className="block text-xs font-medium text-[var(--text-primary)]"
                  >
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="reg-confirm"
                      type="password"
                      value={regConfirm}
                      onChange={(e) => {
                        setRegConfirm(e.target.value);
                        if (regErrors.confirm) setRegErrors((p) => ({ ...p, confirm: undefined }));
                      }}
                      placeholder="Repite la contraseña"
                      className={`w-full h-11 pl-10 pr-10 rounded-xl bg-[var(--bg-primary)] dark:bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 border focus:outline-none ${
                        regErrors.confirm
                          ? 'border-red-500'
                          : passwordsMatch
                            ? 'border-emerald-500 dark:border-[#96E9C6]/60'
                            : 'border-[var(--border-subtle)] focus:border-[#6C22A6]'
                      }`}
                    />
                    {passwordsMatch && (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-[#96E9C6] absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  {regErrors.confirm && (
                    <p className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{regErrors.confirm}</span>
                    </p>
                  )}
                </div>

                {/* Language select */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="reg-lang"
                    className="block text-xs font-medium text-[var(--text-primary)]"
                  >
                    ¿Qué idioma te interesa?
                  </label>
                  <select
                    id="reg-lang"
                    value={regLanguage}
                    onChange={(e) => setRegLanguage(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-primary)] dark:bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
                  >
                    <option value="Inglés">Inglés (Adultos / Cambridge / Negocios)</option>
                    <option value="Alemán">Alemán (General / Goethe prep)</option>
                    <option value="Francés">Francés (General / DELF-DALF)</option>
                    <option value="Varios">Varios idiomas / Advantage Kids</option>
                  </select>
                </div>

                {/* Terms */}
                <div className="space-y-1">
                  <label className="inline-flex items-start gap-2.5 text-xs text-[var(--text-secondary)] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => {
                        setAcceptTerms(e.target.checked);
                        if (regErrors.terms) setRegErrors((p) => ({ ...p, terms: undefined }));
                      }}
                      className="w-4 h-4 mt-0.5 rounded border-[var(--border-subtle)] bg-[var(--bg-tertiary)] accent-[#6C22A6]"
                    />
                    <span>
                      Acepto los términos y condiciones y la política de privacidad de Advantage
                      Gandía.
                    </span>
                  </label>
                  {regErrors.terms && (
                    <p className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{regErrors.terms}</span>
                    </p>
                  )}
                </div>

                <Button type="submit" variant="lime" size="lg" fullWidth>
                  Crear cuenta
                </Button>

                <p className="text-center text-xs text-[var(--text-secondary)] pt-1">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="text-[var(--accent-highlight-text)] font-semibold hover:underline"
                  >
                    Inicia sesión
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Password Recovery Modal */}
      <Modal
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
        title="Recuperar contraseña"
        subtitle="Te enviaremos un enlace seguro para restablecer tu acceso."
        maxWidth="sm"
      >
        {recoverySent ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-xl bg-[var(--bg-secondary)] border border-emerald-500/40 dark:border-[#96E9C6]/40 p-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-[#96E9C6] shrink-0 mt-0.5" />
              <div className="text-sm text-[var(--text-primary)]">
                Hemos enviado las instrucciones a{' '}
                <span className="font-semibold">{recoveryEmail}</span>.
              </div>
            </div>
            <Button variant="primary" fullWidth onClick={() => setForgotOpen(false)}>
              Volver al acceso
            </Button>
          </div>
        ) : (
          <form onSubmit={handleRecoverySubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label
                htmlFor="rec-email"
                className="block text-xs font-medium text-[var(--text-primary)]"
              >
                Correo electrónico de tu cuenta
              </label>
              <input
                id="rec-email"
                type="email"
                value={recoveryEmail}
                onChange={(e) => {
                  setRecoveryEmail(e.target.value);
                  setRecoveryError('');
                }}
                placeholder="ana@ejemplo.com"
                className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
              />
              {recoveryError && (
                <p className="text-xs text-red-600 dark:text-red-400">{recoveryError}</p>
              )}
            </div>
            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => setForgotOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Enviar enlace
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
