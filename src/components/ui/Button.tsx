import React from 'react';

export type ButtonVariant =
  | 'fill'
  | 'stroke'
  | 'fill-red'
  | 'fill-black'
  | 'fill-white'
  | 'fill-grey'
  | 'stroke-white'
  | 'stroke-black';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface BaseButtonProps {
  /** Text content of the button (supports automatic hover text-roll animation) */
  text?: string;
  /** Button visual style: 'fill' (solid) or 'stroke' (border/outline) */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Whether to show the arrow icon (defaults to true) */
  showIcon?: boolean;
  /** Custom icon node (if provided, replaces default arrow) */
  icon?: React.ReactNode;
  /** Font family class (defaults to 'inter' -> 'tp-ff-inter') */
  fontFamily?: 'inter' | 'inherit' | 'none';
  /** Custom CSS classes */
  className?: string;
  /** Children content if not using `text` prop */
  children?: React.ReactNode;
}

export type ButtonAsAnchorProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  };

export type ButtonAsButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };

export type ButtonProps = ButtonAsAnchorProps | ButtonAsButtonProps;

/**
 * Default Arrow Icon for ThemePure / Revlytics button styles.
 * Renders 2 SVG copies to support the sliding exit & entry hover animation.
 */
const DefaultArrowIcon: React.FC = () => (
  <i>
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
        fill="currentColor"
      />
    </svg>
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
        fill="currentColor"
      />
    </svg>
  </i>
);

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    text,
    variant = 'fill',
    size,
    showIcon = true,
    icon,
    fontFamily = 'inter',
    className = '',
    children,
    ...rest
  } = props;

  // Map variant to corresponding theme CSS class
  const getVariantClass = (v: ButtonVariant) => {
    switch (v) {
      case 'stroke':
      case 'stroke-black':
        return 'tp-btn-border';
      case 'stroke-white':
        return 'tp-btn-white-border';
      case 'fill-red':
        return 'tp-btn-red';
      case 'fill-white':
        return 'tp-btn-white';
      case 'fill-grey':
        return 'tp-btn-grey';
      case 'fill-black':
      case 'fill':
      default:
        return '';
    }
  };

  // Map size to CSS class
  const getSizeClass = (s?: ButtonSize) => {
    switch (s) {
      case 'sm':
        return 'tp-btn-sm';
      case 'lg':
        return 'tp-btn-lg';
      case 'xl':
        return 'tp-btn-xl';
      case 'xxl':
        return 'tp-btn-xxl';
      default:
        return '';
    }
  };

  const fontClass = fontFamily === 'inter' ? 'tp-ff-inter' : '';
  const variantClass = getVariantClass(variant);
  const sizeClass = getSizeClass(size);

  const combinedClassName = ['tp-btn', fontClass, variantClass, sizeClass, className]
    .filter(Boolean)
    .join(' ');

  const labelContent = text || children;

  // Inner animated content
  const renderInnerContent = () => (
    <>
      {typeof labelContent === 'string' ? (
        <span>
          <span className="text-1">{labelContent}</span>
          <span className="text-2">{labelContent}</span>
        </span>
      ) : (
        <span>{labelContent}</span>
      )}

      {showIcon && (icon ? <i>{icon}</i> : <DefaultArrowIcon />)}
    </>
  );

  if ('href' in props && props.href) {
    const { href, target, rel, onClick, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={href}
        className={combinedClassName}
        target={target}
        rel={target === '_blank' && !rel ? 'noopener noreferrer' : rel}
        onClick={onClick}
        {...anchorRest}
      >
        {renderInnerContent()}
      </a>
    );
  }

  const { type = 'button', onClick, ...buttonRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      {...buttonRest}
    >
      {renderInnerContent()}
    </button>
  );
};

export default Button;
