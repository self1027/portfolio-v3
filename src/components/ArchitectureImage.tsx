import React from 'react';
import { ZoomIn } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { TechnicalDiagram } from './TechnicalDiagrams';
interface ArchitectureImageProps {
  src: string; alt: string; caption?: string;
  onZoom?: (src: string, alt: string, caption?: string) => void;
  className?: string;
}
export const ArchitectureImage: React.FC<ArchitectureImageProps> = ({ src, alt, caption, onZoom, className = '' }) => {
  const { t } = useI18n();
  const isDiagram = src.includes('/mermaid/');
  return (
    <figure className={'architecture-figure ' + className}>
      {isDiagram ? (
        <>
          <div className="diagram-scroll" tabIndex={0} role="region" aria-label={alt}><TechnicalDiagram id={src} /></div>
          {onZoom && <button type="button" className="text-link" onClick={() => onZoom(src, alt, caption)} aria-label={t('projects.zoomImage') + ': ' + alt}><ZoomIn aria-hidden="true" />{t('projects.zoomImage')}</button>}
        </>
      ) : (
        <button type="button" className="image-trigger" onClick={() => onZoom?.(src, alt, caption)} aria-label={t('projects.zoomImage') + ': ' + alt}>
          <img src={src} alt={alt} width={1920} height={1080} loading="lazy" decoding="async" />
          <span className="image-hint"><ZoomIn aria-hidden="true" /></span>
        </button>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};
