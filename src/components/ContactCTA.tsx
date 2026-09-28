import React, { useState } from 'react';
import { Mail, Send, Check, Copy, Linkedin, Github, MessageSquare } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../theme/ThemeContext';

export const ContactCTA: React.FC = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contato Portfólio — ${formData.name || 'Oportunidade Backend'}`);
    const body = encodeURIComponent(
      `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`
    );
    window.location.href = `mailto:diasmurilo02@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('diasmurilo02@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy email', err);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-border" aria-label="Contact Section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Context, Email, and Social */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-mono text-accent mb-2">
              <span className="font-semibold">{t('contact.sectionBadge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-6">
              {t('contact.subtitle')}
            </p>

            {/* Direct Email Card */}
            <div className="p-5 rounded-lg border border-border bg-surface-subtle mb-6">
              <div className="text-xs font-mono text-text-subtle mb-1">Email direto:</div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href="mailto:diasmurilo02@gmail.com"
                  className="font-mono text-sm font-semibold text-accent hover:underline"
                >
                  diasmurilo02@gmail.com
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border bg-surface text-xs font-mono text-text hover:border-accent transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">{t('contact.form.copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t('contact.form.copyEmail')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href="https://www.linkedin.com/in/murilo-dias-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded border border-border bg-surface hover:border-accent text-text hover:text-accent transition-colors"
              >
                <Linkedin className="w-4 h-4 text-accent" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/self1027"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded border border-border bg-surface hover:border-accent text-text hover:text-accent transition-colors"
              >
                <Github className="w-4 h-4 text-accent" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-7 rounded-lg border border-border bg-surface shadow-2xs space-y-4"
            >
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-text font-medium mb-1.5">
                  {t('contact.form.name')}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder={t('contact.form.placeholderName')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-border bg-bg text-sm text-text placeholder:text-text-subtle/50 focus:border-accent focus:outline-hidden transition-colors font-mono"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-text font-medium mb-1.5">
                  {t('contact.form.email')}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder={t('contact.form.placeholderEmail')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-border bg-bg text-sm text-text placeholder:text-text-subtle/50 focus:border-accent focus:outline-hidden transition-colors font-mono"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-text font-medium mb-1.5">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder={t('contact.form.placeholderMessage')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-border bg-bg text-sm text-text placeholder:text-text-subtle/50 focus:border-accent focus:outline-hidden transition-colors resize-none font-mono"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 px-5 rounded-md font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-150 shadow-sm focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.99] ${
                  theme === 'dark'
                    ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-amber-400/20 shadow-md border border-amber-300'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-800 shadow-sm'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{t('contact.form.submit')}</span>
              </button>

              <p className="text-[11px] font-mono text-text-subtle text-center pt-1">
                {t('contact.form.mailtoFallbackNotice')}
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
