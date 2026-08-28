import React, { useEffect, useState, useRef } from 'react';

// 5x7 dot-matrix bitmap font definitions for digits 0-9 and symbol '%'
const FONT_5X7: Record<string, number[][]> = {
  '0': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '1': [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
  ],
  '2': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  '3': [
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  '4': [
    [1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ],
  '5': [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '6': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '7': [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
  ],
  '8': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '9': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '%': [
    [1, 1, 0, 0, 1],
    [1, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 1],
    [1, 0, 0, 1, 1],
  ],
};

// 7x7 Arrow Dot Matrix pointing right
const ARROW_DOTS: number[][] = [
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

interface DotMatrixDigitProps {
  char: string;
  dotSize?: number;
  dotGap?: number;
  accentColor?: string;
}

const DotMatrixChar: React.FC<DotMatrixDigitProps> = ({
  char,
  dotSize = 11,
  dotGap = 7,
  accentColor = '#ff3c00',
}) => {
  const matrix = FONT_5X7[char] || FONT_5X7['0'];

  return (
    <div
      className="dot-matrix-char"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${matrix[0].length}, ${dotSize}px)`,
        gridTemplateRows: `repeat(${matrix.length}, ${dotSize}px)`,
        gap: `${dotGap}px`,
        userSelect: 'none',
      }}
    >
      {matrix.map((row, rIdx) =>
        row.map((active, cIdx) => (
          <div
            key={`${rIdx}-${cIdx}`}
            className="matrix-dot"
            data-active={active === 1 ? 'true' : 'false'}
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              borderRadius: '50%',
              backgroundColor: active === 1 ? '#ffffff' : 'transparent',
              transition: 'background-color 0.08s ease, transform 0.08s ease, box-shadow 0.08s ease',
              transform: active === 1 ? 'scale(1)' : 'scale(0.25)',
              boxShadow:
                active === 1
                  ? char === '%'
                    ? `0 0 10px ${accentColor}, 0 0 4px #ffffff`
                    : '0 0 8px rgba(255,255,255,0.45)'
                  : 'none',
            }}
          />
        ))
      )}
    </div>
  );
};

export interface DotMatrixLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const DotMatrixLoader: React.FC<DotMatrixLoaderProps> = ({
  onComplete,
  minDuration = 2000,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Resolution of the pixel/dot grid curtain that covers the screen
  const [grid, setGrid] = useState<{ cols: number; rows: number }>({
    cols: 28,
    rows: 16,
  });

  useEffect(() => {
    const calcGrid = () => {
      // Calculate responsive tile size (~50-60px per tile block)
      const tileSize = Math.max(45, Math.min(65, window.innerWidth / 24));
      const cols = Math.ceil(window.innerWidth / tileSize);
      const rows = Math.ceil(window.innerHeight / tileSize);
      setGrid({ cols, rows });
    };

    calcGrid();
    window.addEventListener('resize', calcGrid);
    return () => window.removeEventListener('resize', calcGrid);
  }, []);

  // Fast & smooth non-linear progression from 0 to 100%
  useEffect(() => {
    const startTime = performance.now();
    let animFrame: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / minDuration, 1);
      const easeOut = Math.pow(t, 0.82);
      const currentVal = Math.floor(easeOut * 100);

      setProgress(currentVal);

      if (t < 1) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Short pause at 100% before triggering dot-by-dot dissolve exit
        setTimeout(() => {
          setIsDone(true);
        }, 220);
      }
    };

    animFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animFrame);
  }, [minDuration]);

  // Dot-by-Dot & Tile Matrix Dissolve Exit Animation
  useEffect(() => {
    if (!isDone) return;

    const gsap = (window as any).gsap;
    if (gsap && loaderRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      const activeDots = loaderRef.current.querySelectorAll('.matrix-dot[data-active="true"], .header-dot[data-active="true"]');
      const textElements = loaderRef.current.querySelectorAll('.loader-meta-text');
      const screenTiles = loaderRef.current.querySelectorAll('.black-screen-tile');

      // 1. Text fades & scales out smoothly
      tl.to(
        textElements,
        {
          opacity: 0,
          scale: 0.92,
          duration: 0.25,
          stagger: 0.02,
          ease: 'power2.in',
        },
        0
      );

      // 2. Active counter dots scatter away
      tl.to(
        activeDots,
        {
          scale: 0,
          opacity: 0,
          duration: 0.25,
          stagger: {
            amount: 0.2,
            from: 'random',
            ease: 'power2.in',
          },
        },
        0.05
      );

      // 3. The entire black screen dissolves tile by tile like circular dots opening up the site
      tl.to(
        screenTiles,
        {
          scale: 0,
          opacity: 0,
          borderRadius: '50%',
          duration: 0.45,
          stagger: {
            grid: [grid.rows, grid.cols],
            from: 'center',
            amount: 0.4,
            ease: 'power2.inOut',
          },
        },
        0.1
      );

      // 4. Clean loader container cleanup
      tl.set(loaderRef.current, { pointerEvents: 'none' }, 0.1);
    } else {
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 600);
    }
  }, [isDone, onComplete, grid]);

  // Format progress as string like "0%", "45%", "100%"
  const progressStr = `${progress}%`;
  const chars = progressStr.split('');

  const totalTiles = grid.cols * grid.rows;

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent',
        color: '#ffffff',
        zIndex: 9999999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(24px, 4vw, 48px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* ---------------- Black Background Matrix Tiles (Fades out like dots) ---------------- */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {Array.from({ length: totalTiles }).map((_, i) => (
          <div
            key={`tile-${i}`}
            className="black-screen-tile"
            style={{
              width: '101%',
              height: '101%',
              backgroundColor: '#0c0c0d',
              transformOrigin: 'center center',
              willChange: 'transform, opacity, border-radius',
            }}
          />
        ))}
      </div>

      {/* ---------------- Top Section ---------------- */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
          position: 'relative',
          zIndex: 5,
        }}
      >
        {/* Top-Left Arrow Matrix with Theme Accent Glow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 5px)',
            gridTemplateRows: 'repeat(7, 5px)',
            gap: '3px',
          }}
        >
          {ARROW_DOTS.map((row, r) =>
            row.map((active, c) => (
              <div
                key={`arr-${r}-${c}`}
                className="header-dot"
                data-active={active === 1 ? 'true' : 'false'}
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor:
                    active === 1
                      ? c === 4 && r === 2
                        ? 'var(--tp-theme-primary, #ff3c00)'
                        : '#ffffff'
                      : 'transparent',
                  boxShadow:
                    active === 1 && c === 4 && r === 2
                      ? '0 0 8px var(--tp-theme-primary, #ff3c00)'
                      : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            ))
          )}
        </div>

        {/* Top-Right Studio Metadata with Theme Primary Highlight */}
        <div
          className="loader-meta-text"
          style={{
            textAlign: 'right',
            fontFamily: '"SF Pro Text", "Space Mono", monospace, sans-serif',
            fontSize: 'clamp(11px, 1.15vw, 13px)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.85)',
            letterSpacing: '0.02em',
          }}
        >
          <div style={{ fontWeight: 700, letterSpacing: '0.04em' }}>
            <span style={{ color: 'var(--tp-theme-primary, #ff3c00)' }}>REV</span>LYTICS STUDIO
          </div>
          <div>creative engineering practice</div>
          <div>
            Websites, brand systems, <span style={{ color: 'var(--tp-theme-primary, #ff3c00)' }}>&</span> intelligence.
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '10px' }}>EST. 2026 // MOTION LAB</div>
        </div>
      </div>

      {/* ---------------- Center Dot Matrix Percentage Counter ---------------- */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(14px, 2.5vw, 32px)',
          width: '100%',
          userSelect: 'none',
          position: 'relative',
          zIndex: 5,
        }}
      >
        {chars.map((char, index) => (
          <DotMatrixChar
            key={index}
            char={char}
            dotSize={11}
            dotGap={7}
            accentColor="var(--tp-theme-primary, #ff3c00)"
          />
        ))}
      </div>

      {/* ---------------- Bottom Section ---------------- */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
          fontFamily: '"SF Pro Text", "Space Mono", monospace, sans-serif',
          fontSize: 'clamp(10px, 1.1vw, 12px)',
          lineHeight: 1.6,
          color: 'rgba(255, 255, 255, 0.7)',
          position: 'relative',
          zIndex: 5,
        }}
      >
        {/* Bottom-Left Manifesto Text */}
        <div className="loader-meta-text" style={{ maxWidth: '360px' }}>
          We work in the browser rather than in static mockups. Type,{' '}
          <span style={{ color: 'var(--tp-theme-primary, #ff3c00)' }}>motion</span> and load
          order turn out to be one decision, and it is easier to judge running than described.
        </div>

        {/* Bottom-Right Location, Live Progress Bar & Coordinates */}
        <div
          className="loader-meta-text"
          style={{ textAlign: 'right', color: 'rgba(255, 255, 255, 0.5)' }}
        >
          {/* Micro Progress Bar with Theme Color */}
          <div
            style={{
              width: '120px',
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: '2px',
              marginBottom: '8px',
              marginLeft: 'auto',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: 'var(--tp-theme-primary, #ff3c00)',
                boxShadow: '0 0 8px var(--tp-theme-primary, #ff3c00)',
                transition: 'width 0.05s linear',
              }}
            />
          </div>
          <div style={{ color: 'var(--tp-theme-primary, #ff3c00)', fontWeight: 600 }}>
            [ 28°38'N 77°13'E ]
          </div>
          <div>REVLYTICS_CORE // v2.4</div>
        </div>
      </div>
    </div>
  );
};

export default DotMatrixLoader;
