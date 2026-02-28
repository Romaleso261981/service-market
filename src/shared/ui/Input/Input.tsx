'use client';

import { cn } from '@/shared/lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border bg-white px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
        className
      )}
      {...props}
    />
  );
}
