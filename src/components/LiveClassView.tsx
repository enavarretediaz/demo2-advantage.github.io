import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Download,
  FileText,
  Hand,
  Mic,
  MicOff,
  MonitorUp,
  Send,
  Upload,
  Video,
  VideoOff,
} from 'lucide-react';
import { CommunityMessage, LiveClassSession } from '../types';
import { LIVE_QUIZ_QUESTIONS, TEACHERS } from '../data/mockData';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { LinearProgress } from './ui/ProgressBar';

interface LiveClassViewProps {
  session: LiveClassSession;
  studentName: string;
  onAwardPoints: (points: number, reason: string) => void;
  onNotify: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

type SideTab = 'chat' | 'entregas' | 'quiz' | 'notas';

export function LiveClassView({
  session,
  studentName,
  onAwardPoints,
  onNotify,
}: LiveClassViewProps) {
  const teacher = TEACHERS[session.teacherId];

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(2140);

  const [sideTab, setSideTab] = useState<SideTab>('chat');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<CommunityMessage[]>([
    {
      id: 'lc-1',
      authorName: teacher.name,
      authorRole: 'Profesora',
      initials: teacher.initials,
      time: '19:02',
      channel: 'Sala en vivo',
      text: 'Welcome everyone! Hoy practicamos "go over", "bring up" y "follow up" en contexto real.',
      isTeacher: true,
    },
    {
      id: 'lc-2',
      authorName: 'Carlos Mendoza',
      authorRole: 'Alumno',
      initials: 'CM',
      time: '19:14',
      channel: 'Sala en vivo',
      text: '¿Podemos usar "follow up on" al final de un email comercial?',
    },
  ]);

  const [uploadedFiles, setUploadedFiles] = useState<
    { id: string; name: string; size: string; time: string }[]
  >([
    {
      id: 'up-1',
      name: 'B1_Speaking_Notes_AnaBelen.pdf',
      size: '420 KB',
      time: 'Subido hoy · 18:55',
    },
  ]);

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg: CommunityMessage = {
      id: `lc-${Date.now()}`,
      authorName: studentName,
      authorRole: 'Alumno',
      initials: studentName
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase() ?? '')
        .join(''),
      time: timeStr,
      channel: 'Sala en vivo',
      text: trimmed,
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKb = Math.max(12, Math.round(file.size / 1024));
    setUploadedFiles((prev) => [
      {
        id: `up-${Date.now()}`,
        name: file.name,
        size: `${sizeKb} KB`,
        time: 'Subido ahora',
      },
      ...prev,
    ]);
    onNotify('success', 'Entrega subida correctamente', `${file.name} enviada a ${teacher.name}.`);
    onAwardPoints(25, 'Entrega de ejercicio en clase en vivo');
  };

  const handleQuizSubmit = () => {
    if (Object.keys(quizAnswers).length < LIVE_QUIZ_QUESTIONS.length) {
      onNotify('error', 'Completa todas las preguntas', 'Selecciona una opción en cada pregunta.');
      return;
    }
    setQuizSubmitted(true);
    const correctCount = LIVE_QUIZ_QUESTIONS.filter(
      (q) => quizAnswers[q.id] === q.correctIndex
    ).length;
    onAwardPoints(correctCount * 25, 'Quiz en vivo completado');
  };

  const handleDownloadNotes = () => {
    const content = [
      `ADVANTAGE ACADEMIA DE IDIOMAS - GANDÍA`,
      `Notas de clase: ${session.title}`,
      `Profesora: ${teacher.name}`,
      ``,
      `1. Phrasal Verbs clave para reuniones:`,
      `- Go over: revisar un documento o propuesta paso a paso.`,
      `- Bring up: sacar un tema o problema a colación.`,
      `- Follow up on: hacer seguimiento después de una reunión.`,
      ``,
      `2. Estructuras recomendadas (Cambridge B1):`,
      `- "I have lived in Gandía for five years." (duración hasta hoy)`,
      `- "From my point of view, we should..." (opinión formal)`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Notas_Advantage_B1_Phrasal_Verbs.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onNotify('success', 'Notas descargadas', 'Se ha guardado el resumen de la profesora.');
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Top session metadata + progress bar */}
      <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-highlight-text)]">
            <span>EN DIRECTO</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{formatTimer(elapsedSec)}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[var(--text-secondary)] font-normal">{session.courseTitle}</span>
          </div>
          <h1 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            {session.title}
          </h1>
        </div>

        <div className="w-full md:w-64">
          <LinearProgress value={58} label="Bloque 2 de 4 · Práctica oral" accent="violet" />
        </div>
      </div>

      {/* Main Split: Video Stage + Side Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Video Stage (8 cols) */}
        <div className="xl:col-span-8 space-y-4">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#141414] border border-[var(--border-subtle)]">
            <ImageWithFallback
              src="/src/assets/images/live_class_sarah_1795207556949.jpg"
              alt={`Profesora ${teacher.name} impartiendo clase en directo`}
              fallbackTitle={teacher.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-sm border border-white/10 text-xs font-medium text-white">
              {teacher.name} · Profesora nativa TEFL
            </div>

            <div className="absolute bottom-4 right-4 w-32 sm:w-40 aspect-video rounded-xl bg-[#141414] border border-white/15 flex flex-col items-center justify-center p-2 shadow-xl">
              {camOn ? (
                <>
                  <Avatar
                    initials={studentName
                      .split(' ')
                      .slice(0, 2)
                      .map((n) => n[0]?.toUpperCase() ?? '')
                      .join('')}
                    name={studentName}
                    size="sm"
                    tone="lime"
                  />
                  <span className="text-[11px] text-white mt-1.5 truncate max-w-full">
                    {studentName} (Tú)
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1 text-white/70">
                  <VideoOff className="w-4 h-4" />
                  <span className="text-[11px]">Cámara apagada</span>
                </div>
              )}
            </div>
          </div>

          {/* Media Controls Bar */}
          <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={micOn ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => setMicOn((v) => !v)}
              >
                {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                <span>{micOn ? 'Micro activo' : 'Micro silenciado'}</span>
              </Button>
              <Button
                variant={camOn ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => setCamOn((v) => !v)}
              >
                {camOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                <span>{camOn ? 'Cámara activa' : 'Cámara apagada'}</span>
              </Button>
              <Button
                variant={handRaised ? 'lime' : 'secondary'}
                size="sm"
                onClick={() => {
                  setHandRaised((v) => !v);
                  onNotify(
                    'info',
                    handRaised ? 'Has bajado la mano' : 'Mano levantada',
                    handRaised
                      ? undefined
                      : `${teacher.name} verá tu solicitud de turno de palabra.`
                  );
                }}
              >
                <Hand className="w-4 h-4" />
                <span>{handRaised ? 'Mano levantada' : 'Pedir turno'}</span>
              </Button>
              <Button
                variant={screenSharing ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setScreenSharing((v) => !v)}
              >
                <MonitorUp className="w-4 h-4" />
                <span>{screenSharing ? 'Compartiendo' : 'Compartir pantalla'}</span>
              </Button>
            </div>

            <Button variant="secondary" size="sm" onClick={handleDownloadNotes}>
              <Download className="w-4 h-4 text-[var(--accent-highlight-text)]" />
              <span>Descargar notas</span>
            </Button>
          </div>
        </div>

        {/* Right Interactive Panel (4 cols) */}
        <aside className="xl:col-span-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col h-[560px] overflow-hidden">
          <div className="grid grid-cols-4 border-b border-[var(--border-subtle)] bg-[var(--bg-tertiary)]/60">
            {(
              [
                { id: 'chat', label: 'Chat' },
                { id: 'entregas', label: 'Entregas' },
                { id: 'quiz', label: 'Quiz' },
                { id: 'notas', label: 'Notas' },
              ] as { id: SideTab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSideTab(tab.id)}
                className={`py-3 text-xs font-semibold border-b-2 transition-colors ${
                  sideTab === tab.id
                    ? 'border-[#6C22A6] dark:border-[#96E9C6] text-[var(--text-primary)] bg-[var(--bg-secondary)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {sideTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`font-semibold ${
                          msg.isTeacher
                            ? 'text-[var(--accent-highlight-text)]'
                            : 'text-[var(--text-primary)]'
                        }`}
                      >
                        {msg.authorName}
                      </span>
                      <span className="font-mono text-[var(--text-secondary)] tabular-nums">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-primary)] leading-relaxed bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2">
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleSendChat}
                className="p-3 border-t border-[var(--border-subtle)] flex items-center gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Escribe a la clase..."
                  className="flex-1 h-10 px-3 rounded-xl bg-[var(--bg-primary)] text-xs text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[#6C22A6] focus:outline-none"
                />
                <Button type="submit" variant="primary" size="sm" aria-label="Enviar mensaje">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          )}

          {sideTab === 'entregas' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <label className="block rounded-xl border border-dashed border-[#6C22A6] bg-[var(--bg-primary)] p-5 text-center cursor-pointer hover:bg-[var(--bg-tertiary)] transition-colors">
                <Upload className="w-5 h-5 text-[var(--accent-highlight-text)] mx-auto mb-2" />
                <div className="text-xs font-semibold text-[var(--text-primary)]">
                  Subir ejercicio o audio de práctica
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-1">
                  PDF, DOCX, MP3 hasta 15 MB
                </div>
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>

              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-[var(--text-secondary)]">
                  Archivos enviados
                </div>
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-3 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-4 h-4 text-[var(--accent-highlight-text)] shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-[var(--text-primary)] truncate">
                          {file.name}
                        </div>
                        <div className="text-[11px] text-[var(--text-secondary)] tabular-nums">
                          {file.size} · {file.time}
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#96E9C6] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {sideTab === 'quiz' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              <div className="text-xs text-[var(--text-secondary)]">
                Responde en tiempo real para ganar +25 puntos por respuesta correcta.
              </div>
              {LIVE_QUIZ_QUESTIONS.map((q, qIdx) => (
                <div
                  key={q.id}
                  className="space-y-2.5 pb-4 border-b border-[var(--border-subtle)] last:border-0"
                >
                  <div className="text-xs font-semibold text-[var(--text-primary)]">
                    {qIdx + 1}. {q.question}
                  </div>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oIdx) => {
                      const selected = quizAnswers[q.id] === oIdx;
                      const isCorrect = q.correctIndex === oIdx;
                      let stateStyle =
                        'bg-[var(--bg-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]';
                      if (quizSubmitted) {
                        if (isCorrect) {
                          stateStyle =
                            'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-[#96E9C6]';
                        } else if (selected) {
                          stateStyle = 'bg-red-500/15 border-red-500 text-red-600 dark:text-red-300';
                        }
                      } else if (selected) {
                        stateStyle =
                          'bg-[#6C22A6]/15 dark:bg-[#6C22A6]/25 border-[#6C22A6] text-[var(--text-primary)]';
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                          className={`w-full text-left px-3 py-2 rounded-xl border text-xs transition-colors ${stateStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <p className="text-[11px] text-emerald-700 dark:text-[#96E9C6] leading-relaxed">
                      {q.explanation}
                    </p>
                  )}
                </div>
              ))}

              {!quizSubmitted ? (
                <Button variant="lime" size="sm" fullWidth onClick={handleQuizSubmit}>
                  Enviar respuestas
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                >
                  Reintentar práctica
                </Button>
              )}
            </div>
          )}

          {sideTab === 'notas' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Pizarra y apuntes de {teacher.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Resumen actualizado en directo durante la sesión de hoy.
                </p>
              </div>
              <div className="rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-4 space-y-3 text-xs">
                <div>
                  <div className="font-semibold text-[var(--accent-highlight-text)]">
                    Phrasal Verbs clave
                  </div>
                  <ul className="mt-1 space-y-1 list-disc list-inside text-[var(--text-secondary)]">
                    <li>go over: revisar un documento</li>
                    <li>bring up: plantear un punto</li>
                    <li>follow up on: hacer seguimiento</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-[var(--accent-highlight-text)]">
                    Corrección frecuente B1
                  </div>
                  <p className="mt-1 text-[var(--text-secondary)]">
                    Usa «for five years» con Present Perfect («I have lived»), nunca «since five
                    years».
                  </p>
                </div>
              </div>
              <Button variant="lime" size="sm" fullWidth onClick={handleDownloadNotes}>
                <Download className="w-4 h-4" />
                <span>Descargar apuntes (.txt)</span>
              </Button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
