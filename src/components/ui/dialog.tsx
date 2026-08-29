import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  description,
  children,
}) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-0"
      onClick={onClose}
    >
      <div
        className={cn(
          'relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold leading-none tracking-tight text-zinc-50">{title}</h3>
            {description && (
              <p className="text-sm text-zinc-400">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-zinc-950 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 cursor-pointer p-1 text-zinc-400 hover:text-zinc-50"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
