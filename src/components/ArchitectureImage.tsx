import React, { useState } from 'react';
import { ZoomIn, Cpu, Layers } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { TechnicalDiagram } from './TechnicalDiagrams';

interface ArchitectureImageProps {
  src: string;
  alt: string;
  caption?: string;
  onZoom?: (src: string, alt: string, caption?: string) => void;
  className?: string;
}

export const ArchitectureImage: React.FC<ArchitectureImageProps> = ({
  src,
  alt,
  caption,
  onZoom,
  className = '',
}) => {
  const { t } = useI18n();

  const isMermaid = src.includes('/mermaid/');

  const handleClick = () => {
    if (onZoom) {
      onZoom(src, alt, caption);
    }
  };

  return (
    <figure className={`my-6 rounded-lg border border-border bg-surface-subtle overflow-hidden ${className}`}>
      <div
        className="relative group cursor-pointer overflow-hidden flex items-center justify-center p-4 sm:p-6 bg-surface-subtle/80 hover:bg-surface-muted/30 transition-colors"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={`${alt} - ${t('projects.zoomImage')}`}
      >
        {isMermaid ? (
          <div className="w-full flex justify-center py-2">
            <TechnicalDiagram id={src} />
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full max-h-[460px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        )}

        {/* Hover overlay hint */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface/90 text-text text-xs font-mono font-medium shadow-md border border-border backdrop-blur-xs">
            <ZoomIn className="w-3.5 h-3.5 text-accent" />
            <span>{t('projects.zoomImage')}</span>
          </div>
        </div>
      </div>

      {caption && (
        <figcaption className="px-4 py-2.5 border-t border-border bg-surface text-xs font-mono text-text-muted flex items-start gap-2">
          <span className="text-accent font-bold select-none">#</span>
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
};
