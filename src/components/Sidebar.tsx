import React from 'react';
import {
  Award,
  BarChart3,
  BookOpen,
  CalendarPlus,
  Home,
  MessageSquare,
  Settings,
  Video,
  X,
} from 'lucide-react';
import { AppScreen, User } from '../types';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';

interface SidebarProps {
  user: User;
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onBookTrial: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const NAV_ITEMS: { id: AppScreen; label: string; icon: React.ComponentType<{ className?: string }> }[] =
  [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'courses', label: 'Mis cursos', icon: BookOpen },
    { id: 'live', label: 'Clases en vivo', icon: Video },
    { id: 'progress', label: 'Mi progreso', icon: BarChart3 },
    { id: 'certificates', label: 'Certificados', icon: Award },
    { id: 'community', label: 'Comunidad', icon: MessageSquare },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function Sidebar({
  user,
  activeScreen,
  onNavigate,
  onBookTrial,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const effectiveActive = activeScreen === 'course-detail' ? 'courses' : activeScreen;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)] w-[240px] px-4 py-6">
      {/* Brand mark */}
      <div className="flex items-center justify-between px-2 mb-6">
        <button
          type="button"
          onClick={() => {
            onNavigate('home');
            onCloseMobile();
          }}
          className="font-display text-xl font-extrabold tracking-tight text-[var(--text-primary)] whitespace-nowrap"
        >
          ADVANTAGE<span className="text-[#6C22A6] dark:text-[#96E9C6]">.</span>
        </button>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Cerrar menú"
          className="lg:hidden p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Student card */}
      <div className="flex items-center gap-3 px-2.5 py-3 mb-6 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)]">
        <Avatar initials={getInitials(user.name)} name={user.name} size="sm" tone="violet" />
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[var(--text-primary)] truncate">{user.name}</div>
          <div className="text-xs text-[var(--accent-highlight-text)] font-medium truncate">
            {user.level}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav aria-label="Navegación principal" className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = effectiveActive === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onNavigate(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#6C22A6] text-[#ffffff] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-[#96E9C6]' : 'text-[var(--text-secondary)]'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className="pt-4 mt-4 border-t border-[var(--border-subtle)]">
        <Button
          variant="lime"
          size="md"
          fullWidth
          onClick={() => {
            onBookTrial();
            onCloseMobile();
          }}
        >
          <CalendarPlus className="w-4 h-4 shrink-0" />
          <span>Clase de prueba</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-30 w-[240px]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative z-10 h-full">{sidebarContent}</div>
        </div>
      )}

      {/* Mobile Compact Bottom Navigation */}
      <nav
        aria-label="Navegación móvil rápida"
        className="lg:hidden fixed bottom-0 inset-x-0 z-30 h-16 bg-[var(--bg-secondary)]/95 backdrop-blur-md border-t border-[var(--border-subtle)] grid grid-cols-5 px-1"
      >
        {[
          { id: 'home' as AppScreen, label: 'Inicio', icon: Home },
          { id: 'courses' as AppScreen, label: 'Cursos', icon: BookOpen },
          { id: 'live' as AppScreen, label: 'En vivo', icon: Video },
          { id: 'progress' as AppScreen, label: 'Progreso', icon: BarChart3 },
          { id: 'community' as AppScreen, label: 'Comunidad', icon: MessageSquare },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = effectiveActive === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                isActive ? 'text-[var(--accent-highlight-text)]' : 'text-[var(--text-secondary)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="truncate max-w-full px-1">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
