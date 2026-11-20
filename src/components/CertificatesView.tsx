import React, { useState } from 'react';
import { Award, Download, Eye } from 'lucide-react';
import { Certificate, User } from '../types';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

interface CertificatesViewProps {
  user: User;
  certificates: Certificate[];
  onNotify: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export function CertificatesView({ user, certificates, onNotify }: CertificatesViewProps) {
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

  const handleDownloadCertificate = (cert: Certificate) => {
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="840" viewBox="0 0 1200 840">
  <rect width="1200" height="840" fill="#0a0a0a"/>
  <rect x="36" y="36" width="1128" height="768" rx="18" fill="#141414" stroke="#6C22A6" stroke-width="3"/>
  <text x="90" y="130" fill="#f5f5f5" font-family="sans-serif" font-size="36" font-weight="800">ADVANTAGE.</text>
  <text x="90" y="165" fill="#96E9C6" font-family="sans-serif" font-size="16" font-weight="600">ACADEMIA DE IDIOMAS · GANDÍA, ESPAÑA</text>
  <text x="90" y="280" fill="#a0a0a0" font-family="sans-serif" font-size="20">CERTIFICADO OFICIAL DE APROVECHAMIENTO</text>
  <text x="90" y="355" fill="#f5f5f5" font-family="sans-serif" font-size="48" font-weight="700">${user.name}</text>
  <text x="90" y="425" fill="#d4d4d4" font-family="sans-serif" font-size="24">Ha completado satisfactoriamente el programa:</text>
  <text x="90" y="485" fill="#96E9C6" font-family="sans-serif" font-size="34" font-weight="700">${cert.title}</text>
  <text x="90" y="560" fill="#a0a0a0" font-family="sans-serif" font-size="20">Nivel: ${cert.level} · Carga lectiva: ${cert.hours} horas · Calificación: ${cert.grade}</text>
  <line x1="90" y1="650" x2="1110" y2="650" stroke="#2a2a2a" stroke-width="2"/>
  <text x="90" y="705" fill="#f5f5f5" font-family="sans-serif" font-size="18" font-weight="600">${cert.teacherName}</text>
  <text x="90" y="732" fill="#a0a0a0" font-family="sans-serif" font-size="14">Docente Titular TEFL · Advantage Gandía</text>
  <text x="760" y="705" fill="#f5f5f5" font-family="monospace" font-size="16">Código: ${cert.credentialCode}</text>
  <text x="760" y="732" fill="#a0a0a0" font-family="sans-serif" font-size="14">Expedido el ${cert.issueDate}</text>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Certificado_Advantage_${cert.credentialCode}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onNotify('success', 'Certificado descargado', `${cert.title} listo para compartir.`);
  };

  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Certificados</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Acreditaciones verificables de Advantage Gandía para LinkedIn y expediente académico.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <article
            key={cert.id}
            className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 space-y-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#6C22A6]/15 dark:bg-[#6C22A6]/25 border border-[#6C22A6]/40 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[var(--accent-highlight-text)]" />
              </div>
              <span className="font-mono text-xs text-[var(--text-secondary)] tabular-nums">
                {cert.credentialCode}
              </span>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-[var(--accent-highlight-text)]">
                {cert.language} · {cert.level}
              </p>
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                {cert.title}
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Expedido el {cert.issueDate} · {cert.hours} horas · {cert.grade}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[var(--text-secondary)]">
                Firma docente: {cert.teacherName}
              </span>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setPreviewCert(cert)}>
                  <Eye className="w-4 h-4" />
                  <span>Vista previa</span>
                </Button>
                <Button variant="lime" size="sm" onClick={() => handleDownloadCertificate(cert)}>
                  <Download className="w-4 h-4" />
                  <span>Descargar</span>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={Boolean(previewCert)}
        onClose={() => setPreviewCert(null)}
        title="Vista previa del certificado"
        maxWidth="lg"
      >
        {previewCert && (
          <div className="space-y-5">
            <div className="rounded-xl bg-[var(--bg-secondary)] border-2 border-[#6C22A6] p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="font-display text-xl font-extrabold text-[var(--text-primary)]">
                  ADVANTAGE<span className="text-[#6C22A6] dark:text-[#96E9C6]">.</span>
                </div>
                <span className="font-mono text-xs text-[var(--text-secondary)]">
                  {previewCert.credentialCode}
                </span>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-[var(--text-secondary)]">
                  CERTIFICADO DE APROVECHAMIENTO
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  {user.name}
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Ha completado con éxito el programa{' '}
                  <span className="text-[var(--accent-highlight-text)] font-semibold">
                    {previewCert.title}
                  </span>{' '}
                  con una calificación de{' '}
                  <span className="text-[var(--text-primary)] font-semibold">
                    {previewCert.grade}
                  </span>
                  .
                </p>
              </div>
              <div className="pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <div>
                  <div className="text-[var(--text-primary)] font-semibold">
                    {previewCert.teacherName}
                  </div>
                  <div>Docente TEFL · Sede Gandía</div>
                </div>
                <div className="text-right">
                  <div className="text-[var(--text-primary)] font-mono">{previewCert.issueDate}</div>
                  <div>{previewCert.hours} horas lectivas</div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setPreviewCert(null)}>
                Cerrar
              </Button>
              <Button variant="lime" onClick={() => handleDownloadCertificate(previewCert)}>
                <Download className="w-4 h-4" />
                <span>Descargar archivo</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
