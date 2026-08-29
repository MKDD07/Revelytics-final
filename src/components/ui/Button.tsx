import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-zinc-50 text-zinc-900 shadow hover:bg-zinc-50/90',
        destructive: 'bg-red-600 text-zinc-50 shadow-sm hover:bg-red-600/90',
        outline: 'border border-zinc-800 bg-transparent shadow-sm hover:bg-zinc-800 hover:text-zinc-50 text-zinc-100',
        secondary: 'bg-zinc-800 text-zinc-50 shadow-sm hover:bg-zinc-800/80',
        ghost: 'hover:bg-zinc-800 hover:text-zinc-50 text-zinc-300',
        link: 'text-zinc-50 underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow hover:opacity-90',
        'fill-red': 'bg-red-600 text-white hover:bg-red-700',
        'fill-black': 'bg-black text-white hover:bg-zinc-900',
        'fill-grey': 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
        'border-red': 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
        'border-white': 'border border-white text-white hover:bg-white hover:text-black',
        'border-black': 'border border-black text-black hover:bg-black hover:text-white',
        'border-grey': 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
        md: 'h-9 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'gradient'
  | 'fill-red'
  | 'fill-black'
  | 'fill-grey'
  | 'border-red'
  | 'border-white'
  | 'border-black'
  | 'border-grey';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'md';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  text?: string;
  href?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading,
      disabled,
      text,
      href,
      showIcon,
      icon,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {loading && (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {text || children}
        {showIcon && (icon || (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ))}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(buttonVariants({ variant: variant as any, size: size as any, className }))}
          onClick={onClick as any}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant: variant as any, size: size as any, className }))}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export default Button;
