import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const adminButtonVariants = cva(
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
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface AdminButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof adminButtonVariants> {
  loading?: boolean;
}

const AdminButton = React.forwardRef<HTMLButtonElement, AdminButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(adminButtonVariants({ variant, size, className }))}
        {...props}
      >
        {loading && (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-1" />
        )}
        {children}
      </button>
    );
  }
);
AdminButton.displayName = 'AdminButton';

export { AdminButton, adminButtonVariants };
export default AdminButton;
