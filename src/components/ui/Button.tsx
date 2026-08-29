import React from 'react';

export type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'ghost'
  | 'link'
  | 'gradient'
  | 'fill-red'
  | 'fill-black'
  | 'border-red'
  | 'border-white'
  | 'border-black';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'md';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant | string;
  size?: ButtonSize | string;
  loading?: boolean;
  text?: string;
  href?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'default',
      size = 'default',
      loading = false,
      disabled,
      text,
      href,
      showIcon = false,
      icon,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    let bg = '#ffffff';
    let color = '#09090b';
    let border = '1px solid transparent';

    if (variant === 'secondary' || variant === 'fill-black') {
      bg = '#27272a';
      color = '#fafafa';
      border = '1px solid rgba(255, 255, 255, 0.08)';
    } else if (variant === 'outline' || variant === 'border-white') {
      bg = 'transparent';
      color = '#f4f4f5';
      border = '1px solid rgba(255, 255, 255, 0.15)';
    } else if (variant === 'destructive' || variant === 'fill-red') {
      bg = '#ef4444';
      color = '#ffffff';
      border = '1px solid #dc2626';
    } else if (variant === 'border-red') {
      bg = 'transparent';
      color = '#ef4444';
      border = '1px solid #ef4444';
    } else if (variant === 'ghost') {
      bg = 'transparent';
      color = '#e4e4e7';
      border = '1px solid transparent';
    } else if (variant === 'gradient') {
      bg = 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)';
      color = '#ffffff';
      border = '1px solid rgba(255, 255, 255, 0.2)';
    }

    let padding = '10px 18px';
    let fontSize = '14px';
    if (size === 'sm') {
      padding = '6px 14px';
      fontSize = '12px';
    } else if (size === 'lg') {
      padding = '12px 26px';
      fontSize = '16px';
    } else if (size === 'icon') {
      padding = '8px';
      fontSize = '14px';
    }

    const content = (
      <>
        {loading ? (
          <span
            className="inline-block animate-spin"
            style={{
              width: 14,
              height: 14,
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
            }}
          />
        ) : null}
        {text || children}
        {showIcon && (icon || (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ))}
      </>
    );

    const baseStyle: React.CSSProperties = {
      background: bg,
      color,
      border,
      padding,
      fontSize,
      fontWeight: 500,
      borderRadius: '8px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? 0.6 : 1,
      textDecoration: 'none',
      transition: 'all 0.15s ease-in-out',
      ...props.style,
    };

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={`tp-btn inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all ${className}`}
          style={baseStyle}
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
        className={`tp-btn inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all cursor-pointer ${className}`}
        style={baseStyle}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = 'Button';

export default Button;
