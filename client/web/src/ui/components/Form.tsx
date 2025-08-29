import React, { type FormHTMLAttributes } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  loading = false,
  className = '',
  ...props
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${loading ? 'opacity-70 pointer-events-none' : ''} ${className}`}
      {...props}
    >
      {children}
    </form>
  );
};
