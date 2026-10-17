import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
const email = 'diasmurilo02@gmail.com';
export const ContactCTA: React.FC = () => {
  const { t } = useI18n();
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setStatus('copied'); }
    catch { setStatus('error'); }
  };
  return (
    <section id="contact" className="section contact-section">
      <div className="shell contact-layout">
        <div className="scroll-reveal">
          <h2 className="contact-heading">{t('contact.title')}</h2>
          <p className="contact-copy">{t('contact.subtitle')}</p>
        </div>
        <div className="contact-options scroll-reveal">
          <a className="email-link" href={'mailto:' + email} translate="no">{email}</a>
          <div className="contact-buttons">
            <a className="action" href={'mailto:' + email + '?subject=' + encodeURIComponent(t('contact.emailSubject'))}>
              {t('contact.emailAction')}<ArrowUpRight aria-hidden="true" />
            </a>
            <button type="button" className="action secondary-action" onClick={copyEmail}>
              {status === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{t('contact.form.copyEmail')}
            </button>
          </div>
          <p className="contact-status" role="status" aria-live="polite">
            {status === 'copied' ? t('contact.form.copied') : status === 'error' ? t('contact.copyError') : t('contact.emailHint')}
          </p>
          <div className="contact-socials">
            <a href="https://www.linkedin.com/in/murilo-dias-dev/" target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn<ArrowUpRight aria-hidden="true" /></a>
            <a href="https://github.com/self1027" target="_blank" rel="noopener noreferrer" className="text-link">GitHub<ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
};
