import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { TechnicalDiagram } from './TechnicalDiagrams';
interface ImageLightboxProps { src: string | null; alt: string; caption?: string; onClose: () => void; }
export const ImageLightbox: React.FC<ImageLightboxProps> = ({ src, alt, caption, onClose }) => {
  const { t } = useI18n();
  const panel = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!src) return;
    const trigger = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    const main = document.getElementById('page-content');
    const wasInert = main?.inert ?? false;
    if (main) main.inert = true;
    document.body.style.overflow = 'hidden';
    close.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key === 'Tab' && panel.current) {
        const focusable = panel.current.querySelectorAll<HTMLElement>('button, [href], [tabindex="0"]');
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      if (main) main.inert = wasInert;
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', onKey);
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [src, onClose]);
  if (!src) return null;
  return (
    <div className="lightbox" role="presentation" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={panel} className="lightbox-panel" role="dialog" aria-modal="true" aria-label={caption || alt}>
        <div className="lightbox-header">
          <span>{caption || alt}</span>
          <button type="button" ref={close} className="icon-control" onClick={onClose} aria-label={t('lightbox.close')}><X aria-hidden="true" /></button>
        </div>
        <div className="lightbox-content" tabIndex={0} role="region" aria-label={alt}>
          {src.includes('/mermaid/') ? <TechnicalDiagram id={src} /> : <img src={src} alt={alt} width={1920} height={1080} />}
        </div>
        <p className="lightbox-caption">{t('lightbox.zoomHint')}</p>
      </div>
    </div>
  );
};
