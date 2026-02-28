'use client';

import { cn } from '@/shared/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  outline: 'border-2 border-primary text-primary hover:bg-primary-light',
  ghost: 'text-gray-700 hover:bg-gray-100',
};

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors disabled:opacity-50',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
