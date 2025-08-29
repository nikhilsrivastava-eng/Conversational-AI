import React from 'react';
import type { IconType } from 'react-icons';
import { Icon } from './Icon';

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <div className="flex flex-col items-start rounded-lg bg-white p-6 shadow-lg transition-transform duration-200 hover:scale-105">
      <div className="mb-4 rounded-lg bg-[var(--primary)] bg-opacity-10 p-3">
        <Icon 
          icon={icon} 
          size={24} 
          className="text-[var(--primary)]" 
        />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-[var(--text)]">
        {title}
      </h3>
      <p className="text-[var(--text)] opacity-70">
        {description}
      </p>
    </div>
  );
};
