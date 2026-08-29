import React from 'react';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-xl border border-zinc-800/80 bg-zinc-950/80 text-zinc-100 shadow-xl backdrop-blur-md transition-all ${className}`}
      style={{
        backgroundColor: 'rgba(18, 18, 22, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        color: '#f4f4f5',
        ...props.style,
      }}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 border-b border-zinc-800/40 ${className}`}
      style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', ...props.style }}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-xl font-semibold leading-none tracking-tight text-white ${className}`}
      style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#ffffff', ...props.style }}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm text-zinc-400 mt-1 ${className}`}
      style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#a1a1aa', lineHeight: 1.5, ...props.style }}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`p-6 pt-0 ${className}`}
      style={{ padding: '24px', ...props.style }}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center p-6 pt-0 border-t border-zinc-800/40 ${className}`}
      style={{ padding: '16px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', ...props.style }}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';
