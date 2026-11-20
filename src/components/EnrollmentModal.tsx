import React, { useState } from 'react';
import { CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';
import { Course } from '../types';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface EnrollmentModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteEnrollment: (course: Course, modality: string, schedule: string) => void;
}

export function EnrollmentModal({
  course,
  isOpen,
  onClose,
  onCompleteEnrollment,
}: EnrollmentModalProps) {
  const [modality, setModality] = useState('Presencial · Sede Gandía');
  const [schedule, setSchedule] = useState('Tardes · 19:00 – 20:30');
  const [paymentMethod, setPaymentMethod] = useState<'tarjeta' | 'domiciliacion'>('tarjeta');
  const [stepDone, setStepDone] = useState(false);

  if (!course) return null;

  const monthlyAmount = course.priceMonthly ?? 95;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onCompleteEnrollment(course, modality, schedule);
    setStepDone(true);
  };

  const handleClose = () => {
    setStepDone(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={stepDone ? 'Inscripción completada' : `Inscribirme en ${course.title}`}
      subtitle={
        stepDone
          ? 'Tu plaza ya está activa en tu panel de alumno.'
          : `${course.duration} · ${course.groupSize} · ${course.priceLabel}`
      }
      maxWidth="md"
    >
      {stepDone ? (
        <div className="space-y-5">
          <div className="rounded-xl bg-[var(--bg-secondary)] border border-emerald-500/40 dark:border-[#96E9C6]/40 p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-[#96E9C6] font-semibold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Bienvenido al curso</span>
            </div>
            <p className="text-sm text-[var(--text-primary)]">
              Has quedado inscrito en <span className="font-semibold">{course.title}</span> (
              {modality}, {schedule}).
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Ya puedes acceder al temario completo y a las sesiones en vivo desde «Mis cursos».
            </p>
          </div>
          <Button variant="primary" fullWidth onClick={handleClose}>
            Ir a mis cursos
          </Button>
        </div>
      ) : (
        <form onSubmit={handleConfirm} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-[var(--text-primary)]">
              Modalidad
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Presencial · Sede Gandía', 'Online en directo'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setModality(opt)}
                  className={`min-h-[40px] px-3 rounded-xl text-xs font-semibold border transition-colors ${
                    modality === opt
                      ? 'bg-[#6C22A6]/15 dark:bg-[#6C22A6]/25 border-[#6C22A6] text-[var(--text-primary)]'
                      : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="enroll-schedule"
              className="block text-xs font-medium text-[var(--text-primary)]"
            >
              Turno de preferencia
            </label>
            <select
              id="enroll-schedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
            >
              <option value="Mañanas · 10:00 – 11:30">Mañanas · 10:00 – 11:30</option>
              <option value="Tardes · 17:30 – 19:00">Tardes · 17:30 – 19:00</option>
              <option value="Tardes · 19:00 – 20:30">Tardes · 19:00 – 20:30</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-[var(--text-primary)]">
              Método de pago (simulación)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('tarjeta')}
                className={`flex items-center justify-center gap-2 min-h-[42px] px-3 rounded-xl text-xs font-semibold border transition-colors ${
                  paymentMethod === 'tarjeta'
                    ? 'bg-[#96E9C6]/30 dark:bg-[#96E9C6]/15 border-[#6bd8ac] dark:border-[#96E9C6] text-[var(--text-primary)] dark:text-[#96E9C6]'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Tarjeta bancaria</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('domiciliacion')}
                className={`flex items-center justify-center gap-2 min-h-[42px] px-3 rounded-xl text-xs font-semibold border transition-colors ${
                  paymentMethod === 'domiciliacion'
                    ? 'bg-[#96E9C6]/30 dark:bg-[#96E9C6]/15 border-[#6bd8ac] dark:border-[#96E9C6] text-[var(--text-primary)] dark:text-[#96E9C6]'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                <span>Domiciliación SEPA</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-[var(--text-secondary)]">Cuota mensual sin matrícula</div>
              <div className="font-mono text-lg font-bold tabular-nums text-[var(--text-primary)] mt-0.5">
                {course.priceMonthly ? `${monthlyAmount}€ / mes` : 'Presupuesto a medida'}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-highlight-text)]">
              <ShieldCheck className="w-4 h-4" />
              <span>Sin permanencia</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="lime">
              Confirmar inscripción
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
