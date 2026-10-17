import React from 'react';
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action, className = '' }) => (
  <div className={'section-heading ' + className}>
    <div>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-description">{subtitle}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
