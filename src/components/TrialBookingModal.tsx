import React, { useState } from 'react';
import { Calendar, CheckCircle2, MapPin, Video } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface TrialBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultName: string;
  defaultEmail: string;
  onConfirm: (summary: string) => void;
}

export function TrialBookingModal({
  isOpen,
  onClose,
  defaultName,
  defaultEmail,
  onConfirm,
}: TrialBookingModalProps) {
  const [language, setLanguage] = useState<'Inglés' | 'Alemán' | 'Francés' | 'Advantage Kids'>(
    'Inglés'
  );
  const [modality, setModality] = useState<'Presencial Gandía' | 'Online en vivo'>(
    'Presencial Gandía'
  );
  const [slot, setSlot] = useState('Jueves 26 Nov · 18:00');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    onConfirm(`${language} (${modality}) el ${slot}`);
  };

  const resetAndClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetAndClose}
      title="Reservar clase de prueba gratuita"
      subtitle="Conoce a tu profesor nativo TEFL y evalúa tu nivel real en 45 minutos."
      maxWidth="md"
    >
      {confirmed ? (
        <div className="space-y-5">
          <div className="rounded-xl bg-[var(--bg-secondary)] border border-emerald-500/40 dark:border-[#96E9C6]/40 p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-[#96E9C6] font-semibold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Reserva confirmada</span>
            </div>
            <p className="text-sm text-[var(--text-primary)]">
              Hemos reservado tu clase de prueba de <span className="font-semibold">{language}</span>{' '}
              para el <span className="font-semibold">{slot}</span>.
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Enviamos el recordatorio y detalles de acceso a {defaultEmail} ({defaultName}).
            </p>
          </div>
          <Button variant="lime" fullWidth onClick={resetAndClose}>
            Volver a mi panel
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-[var(--text-primary)]">
              Idioma o programa
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Inglés', 'Alemán', 'Francés', 'Advantage Kids'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`min-h-[40px] px-3 rounded-xl text-xs font-semibold border transition-colors ${
                    language === item
                      ? 'bg-[#6C22A6]/15 dark:bg-[#6C22A6]/25 border-[#6C22A6] text-[var(--text-primary)]'
                      : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-[var(--text-primary)]">
              Modalidad preferida
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setModality('Presencial Gandía')}
                className={`flex items-center justify-center gap-2 min-h-[42px] px-3 rounded-xl text-xs font-semibold border transition-colors ${
                  modality === 'Presencial Gandía'
                    ? 'bg-[#96E9C6]/30 dark:bg-[#96E9C6]/15 border-[#6bd8ac] dark:border-[#96E9C6] text-[var(--text-primary)] dark:text-[#96E9C6]'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Presencial Gandía</span>
              </button>
              <button
                type="button"
                onClick={() => setModality('Online en vivo')}
                className={`flex items-center justify-center gap-2 min-h-[42px] px-3 rounded-xl text-xs font-semibold border transition-colors ${
                  modality === 'Online en vivo'
                    ? 'bg-[#96E9C6]/30 dark:bg-[#96E9C6]/15 border-[#6bd8ac] dark:border-[#96E9C6] text-[var(--text-primary)] dark:text-[#96E9C6]'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Online en vivo</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="trial-slot"
              className="block text-xs font-medium text-[var(--text-primary)]"
            >
              Horario disponible
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="trial-slot"
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
              >
                <option value="Jueves 26 Nov · 18:00">Jueves 26 Nov · 18:00</option>
                <option value="Viernes 27 Nov · 11:30">Viernes 27 Nov · 11:30</option>
                <option value="Lunes 30 Nov · 19:00">Lunes 30 Nov · 19:00</option>
                <option value="Martes 1 Dic · 17:30">Martes 1 Dic · 17:30</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="trial-notes"
              className="block text-xs font-medium text-[var(--text-primary)]"
            >
              Objetivo (opcional)
            </label>
            <input
              id="trial-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Preparar Cambridge B2, mejorar conversación laboral..."
              className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={resetAndClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="lime">
              Confirmar clase gratuita
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
