import React, { useState } from 'react';
import { Calendar, MapPin, Megaphone, MessageSquare, Send } from 'lucide-react';
import { AcademyEvent, Announcement, CommunityMessage, User } from '../types';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';

interface CommunityViewProps {
  user: User;
  messages: CommunityMessage[];
  announcements: Announcement[];
  events: AcademyEvent[];
  onSendMessage: (text: string, channel: string) => void;
  onRsvpEvent: (eventId: string) => void;
}

const CHANNELS = ['Cohorte B1 Gandía', 'Práctica Speaking', 'Dudas Cambridge & Goethe'];

export function CommunityView({
  messages,
  announcements,
  events,
  onSendMessage,
  onRsvpEvent,
}: CommunityViewProps) {
  const [selectedChannel, setSelectedChannel] = useState(CHANNELS[0]);
  const [draft, setDraft] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onSendMessage(text, selectedChannel);
    setDraft('');
  };

  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
          Comunidad Advantage
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Conversa con tu cohorte de Gandía, lee avisos académicos y apúntate a clubes de
          conversación.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col h-[560px] overflow-hidden">
          <div className="p-4 border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <MessageSquare className="w-4 h-4 text-[var(--accent-highlight-text)]" />
              <span>Chat de alumnos y profesores</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto">
              {CHANNELS.map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setSelectedChannel(ch)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedChannel === ch
                      ? 'bg-[#6C22A6] text-[#ffffff]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <Avatar
                  initials={msg.initials}
                  name={msg.authorName}
                  size="sm"
                  tone={msg.isTeacher ? 'lime' : 'violet'}
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-[var(--text-primary)]">
                      {msg.authorName}
                    </span>
                    <span className="text-[var(--accent-highlight-text)] font-medium">
                      {msg.authorRole}
                    </span>
                    <span className="font-mono text-[var(--text-secondary)] tabular-nums ml-auto">
                      {msg.time}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-[var(--border-subtle)] flex items-center gap-3"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Enviar mensaje en ${selectedChannel}...`}
              className="flex-1 h-11 px-4 rounded-xl bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
            />
            <Button type="submit" variant="primary" size="md">
              <Send className="w-4 h-4" />
              <span>Enviar</span>
            </Button>
          </form>
        </div>

        <div className="xl:col-span-5 space-y-6">
          <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[var(--accent-highlight-text)]" />
              <span>Anuncios oficiales</span>
            </h2>
            <div className="divide-y divide-[var(--border-subtle)]">
              {announcements.map((ann) => (
                <div key={ann.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                    {ann.category} · {ann.date}
                  </div>
                  <div className="text-sm font-bold text-[var(--text-primary)]">{ann.title}</div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {ann.body}
                  </p>
                  <div className="text-[11px] text-[var(--text-secondary)]">
                    Publicado por {ann.author}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--accent-highlight-text)]" />
              <span>Eventos en Gandía</span>
            </h2>
            <div className="divide-y divide-[var(--border-subtle)]">
              {events.map((ev) => (
                <div key={ev.id} className="py-4 first:pt-0 last:pb-0 space-y-2.5">
                  <div className="text-sm font-bold text-[var(--text-primary)]">{ev.title}</div>
                  <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {ev.date} · {ev.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[var(--text-secondary)] tabular-nums">
                      {ev.spotsLeft} plazas disponibles
                    </span>
                    <Button
                      variant={ev.rsvped ? 'secondary' : 'lime'}
                      size="sm"
                      onClick={() => onRsvpEvent(ev.id)}
                    >
                      {ev.rsvped ? 'Plaza reservada' : 'Confirmar asistencia'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
