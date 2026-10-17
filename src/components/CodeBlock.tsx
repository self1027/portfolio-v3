import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
interface CodeBlockProps { code: string; language: string; title?: string; description?: string; }
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title, description }) => {
  const { t } = useI18n();
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setStatus('copied'); }
    catch { setStatus('error'); }
  };
  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-title">{title || language}</span>
        <button type="button" className="code-copy" onClick={copy} aria-label={t('caseStudy.copySnippet')}>
          {status === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {status === 'copied' ? t('caseStudy.copied') : t('caseStudy.copy')}
        </button>
      </div>
      <pre tabIndex={0} aria-label={title || language}><code translate="no">{code}</code></pre>
      {description && <p className="code-description">{description}</p>}
      <p className={status === 'error' ? 'code-description' : 'sr-only'} role="status" aria-live="polite">
        {status === 'error' ? t('caseStudy.copyError') : status === 'copied' ? t('caseStudy.snippetCopied') : ''}
      </p>
    </div>
  );
};
