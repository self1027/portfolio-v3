import React, { useEffect, useRef } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { TechnicalDiagram } from './TechnicalDiagrams';

interface ImageLightboxProps {
  src: string | null;
  alt: string;
  caption?: string;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  src,
  alt,
  caption,
  onClose,
}) => {
  const { t } = useI18n();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!src) return;

    // Prevent background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      // Simple focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [src, onClose]);

  if (!src) return null;

  const isMermaid = src.includes('/mermaid/');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image zoom modal'}
      onClick={onClose}
      ref={modalRef}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center bg-surface border border-border rounded-lg p-2 sm:p-4 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with caption and close button */}
        <div className="w-full flex items-center justify-between pb-3 px-2 border-b border-border text-xs font-mono text-text-muted">
          <div className="flex items-center gap-2 truncate pr-4">
            <ZoomIn className="w-4 h-4 text-accent shrink-0" />
            <span className="truncate">{caption || alt}</span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label={t('lightbox.close')}
            className="p-1.5 rounded-md hover:bg-surface-muted text-text-muted hover:text-text transition-colors border border-transparent hover:border-border cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content container */}
        <div className="relative w-full flex-1 min-h-[250px] max-h-[78vh] flex items-center justify-center overflow-auto p-4 sm:p-8 bg-surface-subtle">
          {isMermaid ? (
            <div className="w-full max-w-4xl py-4">
              <TechnicalDiagram id={src} />
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded border border-border/50"
            />
          )}
        </div>

        {/* Footer keyboard hint */}
        <div className="w-full pt-2 px-2 flex justify-between items-center text-[11px] font-mono text-text-subtle">
          <span className="truncate pr-4">{alt}</span>
          <span className="shrink-0">{t('lightbox.zoomHint')}</span>
        </div>
      </div>
    </div>
  );
};
