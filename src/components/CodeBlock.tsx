import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  description?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  title,
  description,
}) => {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code snippet', err);
    }
  };

  return (
    <div className="my-5 rounded-lg border border-code overflow-hidden bg-code shadow-md text-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e0f13] border-b border-code text-xs font-mono">
        <div className="flex items-center gap-2.5 text-text-subtle truncate">
          <Terminal className="w-3.5 h-3.5 text-accent shrink-0" />
          <span className="text-text-muted font-medium truncate">{title || `${language}`}</span>
          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-muted/30 text-text-subtle border border-code">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          aria-label={copied ? t('caseStudy.snippetCopied') : t('caseStudy.copySnippet')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors text-text-muted hover:text-text hover:bg-surface-muted/40 border border-transparent hover:border-code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono text-code">
        <pre className="tab-4">
          <code>{code}</code>
        </pre>
      </div>

      {/* Optional Description */}
      {description && (
        <div className="px-4 py-2 bg-[#0b0c0e] border-t border-code text-xs text-text-subtle font-mono">
          <span className="text-accent mr-1.5">›</span>
          {description}
        </div>
      )}
    </div>
  );
};
