import React from 'react';
import { Button } from './Button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] py-24 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90 sm:text-xl">
            {subtitle}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryAction && (
              <Button
                size="lg"
                onClick={primaryAction.onClick}
                className="bg-white text-[var(--primary)] hover:bg-opacity-90"
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant="outline"
                size="lg"
                onClick={secondaryAction.onClick}
                className="border-white text-white hover:bg-white hover:text-[var(--primary)]"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
