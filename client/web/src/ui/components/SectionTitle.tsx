import React from 'react';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  centered?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
  centered = false
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
        {subtitle}
      </h2>
      <h3 className="text-3xl font-bold text-[var(--text)] sm:text-4xl">
        {title}
      </h3>
    </div>
  );
};
