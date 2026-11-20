import React, { useState } from 'react';
import { LogOut, Save } from 'lucide-react';
import { User } from '../types';
import { Button } from './ui/Button';
import { ThemeToggle } from './ui/ThemeToggle';

interface SettingsViewProps {
  user: User;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onUpdateUser: (updates: Partial<User>) => void;
  onLogout: () => void;
}

export function SettingsView({
  user,
  theme,
  onToggleTheme,
  onUpdateUser,
  onLogout,
}: SettingsViewProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [targetLanguage, setTargetLanguage] = useState(user.targetLanguage);
  const [campus, setCampus] = useState(user.campus);
  const [emailReminders, setEmailReminders] = useState(true);
  const [liveAlerts, setLiveAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: name.trim() || user.name,
      email: email.trim() || user.email,
      targetLanguage,
      campus,
    });
  };

  return (
    <div className="max-w-3xl space-y-8 pb-20 lg:pb-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
          Configuración
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Gestiona tu perfil de alumno, apariencia visual, sede en Gandía y avisos de clase.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              Apariencia de la plataforma
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Alterna entre el tema oscuro original y el tema blanco minimalista.
            </p>
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} showLabel />
        </div>

        <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
          Datos personales
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="set-name"
              className="block text-xs font-medium text-[var(--text-primary)]"
            >
              Nombre completo
            </label>
            <input
              id="set-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="set-email"
              className="block text-xs font-medium text-[var(--text-primary)]"
            >
              Correo electrónico
            </label>
            <input
              id="set-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="set-lang"
              className="block text-xs font-medium text-[var(--text-primary)]"
            >
              Idioma principal
            </label>
            <select
              id="set-lang"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
            >
              <option value="Inglés">Inglés</option>
              <option value="Alemán">Alemán</option>
              <option value="Francés">Francés</option>
              <option value="Varios">Varios</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="set-campus"
              className="block text-xs font-medium text-[var(--text-primary)]"
            >
              Modalidad / Sede habitual
            </label>
            <select
              id="set-campus"
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
            >
              <option value="Sede Gandía Centro (Passeig Germanies)">
                Sede Gandía Centro (Passeig Germanies)
              </option>
              <option value="Online en directo">Online en directo</option>
              <option value="Híbrida (Gandía + Online)">Híbrida (Gandía + Online)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">Notificaciones</h3>
          <label className="flex items-center justify-between gap-4 text-sm text-[var(--text-secondary)] cursor-pointer">
            <span>Recordatorio 15 minutos antes de cada clase en vivo</span>
            <input
              type="checkbox"
              checked={liveAlerts}
              onChange={(e) => setLiveAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#6C22A6]"
            />
          </label>
          <label className="flex items-center justify-between gap-4 text-sm text-[var(--text-secondary)] cursor-pointer">
            <span>Avisos por correo cuando un profesor corrija una entrega</span>
            <input
              type="checkbox"
              checked={emailReminders}
              onChange={(e) => setEmailReminders(e.target.checked)}
              className="w-4 h-4 accent-[#6C22A6]"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión</span>
          </Button>
          <Button type="submit" variant="lime">
            <Save className="w-4 h-4" />
            <span>Guardar cambios</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
