import React from 'react';
import type { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 24,
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <IconComponent size={size} />
    </div>
  );
};
