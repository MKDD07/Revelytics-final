import React from 'react';

export const TabsList = ({
  className = '',
  children,
  style = {},
}: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    className={`inline-flex items-center justify-center rounded-xl bg-zinc-900/90 p-1 border border-zinc-800 text-zinc-400 ${className}`}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px',
      backgroundColor: 'rgba(24, 24, 27, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '10px',
      gap: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export const TabsTrigger = ({
  active,
  onClick,
  children,
  className = '',
  style = {},
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
      active ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
    } ${className}`}
    style={{
      padding: '8px 16px',
      fontSize: '13px',
      fontWeight: 500,
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: active ? '#27272a' : 'transparent',
      color: active ? '#ffffff' : '#a1a1aa',
      boxShadow: active ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
      transition: 'all 0.15s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      ...style,
    }}
  >
    {children}
  </button>
);

export const Table = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className="w-full overflow-auto rounded-lg border border-zinc-800/60" style={{ width: '100%', overflowX: 'auto', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
    <table className={`w-full caption-bottom text-sm text-zinc-300 ${className}`} style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', color: '#d4d4d8' }}>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
    {children}
  </thead>
);

export const TableRow = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background-color 0.15s', ...style }}>
    {children}
  </tr>
);

export const TableHead = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#a1a1aa', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', ...style }}>
    {children}
  </th>
);

export const TableCell = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <td style={{ padding: '14px 16px', verticalAlign: 'middle', ...style }}>
    {children}
  </td>
);
