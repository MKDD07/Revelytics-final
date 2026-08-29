import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', type = 'text', ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={`flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${className}`}
      style={{
        width: '100%',
        height: '40px',
        padding: '8px 14px',
        fontSize: '14px',
        color: '#f4f4f5',
        backgroundColor: '#18181b',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '8px',
        boxSizing: 'border-box',
        outline: 'none',
        ...props.style,
      }}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={`flex min-h-[80px] w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${className}`}
      style={{
        width: '100%',
        minHeight: '90px',
        padding: '10px 14px',
        fontSize: '14px',
        color: '#f4f4f5',
        backgroundColor: '#18181b',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '8px',
        boxSizing: 'border-box',
        outline: 'none',
        fontFamily: 'inherit',
        lineHeight: 1.5,
        ...props.style,
      }}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

export const Badge = ({
  className = '',
  variant = 'default',
  children,
  style = {},
}: {
  className?: string;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'purple';
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  let bg = 'rgba(99, 102, 241, 0.15)';
  let color = '#818cf8';
  let border = '1px solid rgba(99, 102, 241, 0.3)';

  if (variant === 'secondary') {
    bg = 'rgba(255, 255, 255, 0.08)';
    color = '#d4d4d8';
    border = '1px solid rgba(255, 255, 255, 0.12)';
  } else if (variant === 'success') {
    bg = 'rgba(34, 197, 94, 0.15)';
    color = '#4ade80';
    border = '1px solid rgba(34, 197, 94, 0.3)';
  } else if (variant === 'warning') {
    bg = 'rgba(234, 179, 8, 0.15)';
    color = '#facc15';
    border = '1px solid rgba(234, 179, 8, 0.3)';
  } else if (variant === 'purple') {
    bg = 'rgba(168, 85, 247, 0.15)';
    color = '#c084fc';
    border = '1px solid rgba(168, 85, 247, 0.3)';
  } else if (variant === 'outline') {
    bg = 'transparent';
    color = '#a1a1aa';
    border = '1px solid rgba(255, 255, 255, 0.18)';
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        fontSize: '11px',
        fontWeight: 600,
        borderRadius: '9999px',
        background: bg,
        color,
        border,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
