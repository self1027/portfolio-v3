import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  action,
  className = '',
}) => {
  return (
    <div className={`mb-10 sm:mb-12 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          {badge && (
            <p className="text-xs font-mono font-medium text-accent uppercase tracking-wider mb-2">
              {badge}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-text-muted mt-2 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
};
