import React, { useEffect, useRef, useState } from 'react';
import { Copy, Check, Play, Pause, RefreshCw, Sliders, Sparkles } from 'lucide-react';

// ============================================================================
// 10 Standalone Morph Shape Presets
// Mathematically aligned bezier curves for smooth GSAP attr / path morphing
// ============================================================================
export interface MorphPreset {
  id: string;
  name: string;
  category: string;
  fromPath: string;
  toPath: string;
  viewBox: string;
  defaultDuration: number;
  defaultEase: string;
  defaultGradient: { from: string; mid: string; to: string };
}

export const MORPH_PRESETS: MorphPreset[] = [
  {
    id: 'preset-1',
    name: '1. Diamond ↔ Lightning Bolt',
    category: 'Dynamic Motion',
    viewBox: '0 0 300 300',
    fromPath:
      'M136.499 150.219L119.898 75.0521L152.178 42.9688C166.012 29.2188 170.624 10.8854 166.012 1.71875C156.789 -2.86458 138.344 1.71875 124.509 15.4688L92.229 47.5521L16.6012 31.0521C11.9898 30.1354 8.30061 31.9687 6.45603 35.6354L3.68916 40.2187C1.84458 44.8021 2.76687 49.3854 6.45603 52.1354L55.3374 84.2188L36.8916 111.719H9.2229L0 120.885L27.6687 139.219L46.1145 166.719L55.3374 157.552V130.052L83.0061 111.719L115.286 160.302C118.053 163.969 122.665 164.885 127.276 163.052L131.888 161.219C135.577 158.469 137.421 154.802 136.499 150.219',
    toPath:
      'M 150,15 C 200,60 260,65 255,120 C 250,175 175,160 180,210 C 185,260 120,275 100,240 C 80,205 140,185 130,140 C 120,95 50,105 60,55 C 70,5 100,0 150,15 Z',
    defaultDuration: 2.0,
    defaultEase: 'expo.inOut',
    defaultGradient: { from: '#ff3c00', mid: '#fd5b0a', to: '#cd4631' },
  },
  {
    id: 'preset-2',
    name: '2. Fluid Organic Blob ↔ Smooth Orb',
    category: 'Organic Abstract',
    viewBox: '0 0 300 300',
    fromPath:
      'M 150,30 C 220,20 280,70 270,145 C 260,220 215,280 145,275 C 75,270 20,215 30,145 C 40,75 80,40 150,30 Z',
    toPath:
      'M 150,50 C 205,50 250,95 250,150 C 250,205 205,250 150,250 C 95,250 50,205 50,150 C 50,95 95,50 150,50 Z',
    defaultDuration: 2.4,
    defaultEase: 'power2.inOut',
    defaultGradient: { from: '#a855f7', mid: '#ec4899', to: '#f43f5e' },
  },
  {
    id: 'preset-3',
    name: '3. Cyber Starburst ↔ Concentric Prism',
    category: 'Futuristic Tech',
    viewBox: '0 0 300 300',
    fromPath:
      'M 150,20 C 180,90 210,120 280,150 C 210,180 180,210 150,280 C 120,210 90,180 20,150 C 90,120 120,90 150,20 Z',
    toPath:
      'M 150,60 C 190,100 200,110 240,150 C 200,190 190,200 150,240 C 110,200 100,190 60,150 C 100,110 110,100 150,60 Z',
    defaultDuration: 1.8,
    defaultEase: 'back.inOut(1.4)',
    defaultGradient: { from: '#06b6d4', mid: '#3b82f6', to: '#6366f1' },
  },
  {
    id: 'preset-4',
    name: '4. Tech Shield ↔ Hexagon Crest',
    category: 'Identity & Crest',
    viewBox: '0 0 300 300',
    fromPath:
      'M 150,30 C 240,40 260,80 250,160 C 240,225 180,265 150,280 C 120,265 60,225 50,160 C 40,80 60,40 150,30 Z',
    toPath:
      'M 150,40 C 220,80 240,90 240,150 C 240,210 220,220 150,260 C 80,220 60,210 60,150 C 60,90 80,80 150,40 Z',
    defaultDuration: 2.2,
    defaultEase: 'expo.inOut',
    defaultGradient: { from: '#10b981', mid: '#059669', to: '#047857' },
  },
  {
    id: 'preset-5',
    name: '5. Infinity Loop ↔ Dynamic Wave',
    category: 'Continuous Motion',
    viewBox: '0 0 300 300',
    fromPath:
      'M 80,110 C 120,110 180,190 220,190 C 260,190 280,160 280,140 C 280,100 240,90 200,130 C 160,170 120,210 80,210 C 40,210 20,180 20,150 C 20,110 50,110 80,110 Z',
    toPath:
      'M 40,150 C 90,80 140,220 190,150 C 230,90 270,180 280,150 C 290,120 250,60 210,130 C 170,200 120,100 70,160 C 50,180 30,170 40,150 Z',
    defaultDuration: 2.6,
    defaultEase: 'sine.inOut',
    defaultGradient: { from: '#f59e0b', mid: '#f97316', to: '#ef4444' },
  },
  {
    id: 'preset-6',
    name: '6. Solar Flare ↔ Blossom Star',
    category: 'Celestial',
    viewBox: '0 0 300 300',
    fromPath:
      'M 150,40 C 190,75 225,40 260,80 C 225,115 260,150 225,185 C 260,225 225,260 185,225 C 150,260 115,225 80,260 C 115,225 80,190 115,150 C 80,115 115,80 80,40 C 115,75 150,40 150,40 Z',
    toPath:
      'M 150,70 C 180,95 205,70 230,100 C 205,125 230,150 205,175 C 230,205 205,230 175,205 C 150,230 125,205 100,230 C 125,205 100,180 125,150 C 100,125 125,100 100,70 C 125,95 150,70 150,70 Z',
    defaultDuration: 2.1,
    defaultEase: 'power2.inOut',
    defaultGradient: { from: '#eab308', mid: '#e11d48', to: '#9333ea' },
  },
  {
    id: 'preset-7',
    name: '7. Angular Delta ↔ Prism Diamond',
    category: 'Geometric Minimalism',
    viewBox: '0 0 300 300',
    fromPath:
      'M 150,25 C 190,100 240,190 275,255 C 190,245 110,245 25,255 C 60,190 110,100 150,25 Z',
    toPath:
      'M 150,30 C 220,100 250,130 250,150 C 250,170 220,200 150,270 C 80,200 50,170 50,150 C 50,130 80,100 150,30 Z',
    defaultDuration: 1.9,
    defaultEase: 'expo.inOut',
    defaultGradient: { from: '#3b82f6', mid: '#8b5cf6', to: '#ec4899' },
  },
  {
    id: 'preset-8',
    name: '8. Liquid Droplet ↔ Splash Ripple',
    category: 'Fluid Mechanics',
    viewBox: '0 0 300 300',
    fromPath:
      'M 150,20 C 190,80 240,140 240,190 C 240,240 200,275 150,275 C 100,275 60,240 60,190 C 60,140 110,80 150,20 Z',
    toPath:
      'M 150,70 C 210,70 260,120 260,170 C 260,225 210,250 150,250 C 90,250 40,225 40,170 C 40,120 90,70 150,70 Z',
    defaultDuration: 2.3,
    defaultEase: 'elastic.out(1, 0.4)',
    defaultGradient: { from: '#0284c7', mid: '#06b6d4', to: '#14b8a6' },
  },
  {
    id: 'preset-9',
    name: '9. Cyber Octagon ↔ Crosshair Nexus',
    category: 'Sci-Fi HUD',
    viewBox: '0 0 300 300',
    fromPath:
      'M 100,30 C 150,30 200,30 200,30 C 245,75 270,100 270,100 C 270,150 270,200 270,200 C 225,245 200,270 200,270 C 150,270 100,270 100,270 C 55,225 30,200 30,200 C 30,150 30,100 30,100 C 75,55 100,30 100,30 Z',
    toPath:
      'M 130,40 C 170,40 170,40 170,110 C 240,110 240,110 240,150 C 240,190 240,190 170,190 C 170,260 170,260 130,260 C 130,190 130,190 60,190 C 60,150 60,150 60,110 C 130,110 130,110 130,40 Z',
    defaultDuration: 1.7,
    defaultEase: 'power3.inOut',
    defaultGradient: { from: '#10b981', mid: '#06b6d4', to: '#3b82f6' },
  },
  {
    id: 'preset-10',
    name: '10. Minimal Badge ↔ Soft Pill Capsule',
    category: 'Brand Modernism',
    viewBox: '0 0 300 300',
    fromPath:
      'M 60,60 C 150,40 240,60 240,60 C 260,150 240,240 240,240 C 150,260 60,240 60,240 C 40,150 60,60 60,60 Z',
    toPath:
      'M 70,90 C 150,90 230,90 230,90 C 260,120 260,180 230,210 C 150,210 70,210 70,210 C 40,180 40,120 70,90 Z',
    defaultDuration: 2.0,
    defaultEase: 'expo.inOut',
    defaultGradient: { from: '#ff3c00', mid: '#f59e0b', to: '#e11d48' },
  },
];

export interface MorphSvgSnippetProps {
  initialPresetId?: string;
  size?: number;
  className?: string;
}

export const MorphSvgSnippet: React.FC<MorphSvgSnippetProps> = ({
  initialPresetId = 'preset-1',
  size = 260,
  className = '',
}) => {
  const [selectedId, setSelectedId] = useState(initialPresetId);
  const [duration, setDuration] = useState(2.0);
  const [ease, setEase] = useState('expo.inOut');
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
  const [glowEnabled, setGlowEnabled] = useState(true);
  const [selectedSize, setSelectedSize] = useState(size);

  const currentPreset = MORPH_PRESETS.find((p) => p.id === selectedId) || MORPH_PRESETS[0];
  const pathRef = useRef<SVGPathElement | null>(null);
  const tweenRef = useRef<any>(null);

  // Sync preset defaults
  useEffect(() => {
    setDuration(currentPreset.defaultDuration);
    setEase(currentPreset.defaultEase);
  }, [selectedId]);

  // GSAP Morph Tween
  useEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap || !pathRef.current) return;

    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    gsap.set(pathRef.current, { attr: { d: currentPreset.fromPath } });

    if (isPlaying) {
      tweenRef.current = gsap.to(pathRef.current, {
        attr: { d: currentPreset.toPath },
        duration: duration,
        ease: ease,
        repeat: -1,
        yoyo: true,
      });
    }

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [currentPreset, duration, ease, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCopyCode = () => {
    const code = `
/* -------------------------------------------------------------------------- */
/* Standalone Morph SVG Snippet: ${currentPreset.name}                        */
/* -------------------------------------------------------------------------- */
import React, { useEffect, useRef } from 'react';

export const MorphIcon: React.FC<{ size?: number; className?: string }> = ({
  size = ${selectedSize},
  className = '',
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap || !pathRef.current) return;

    const tween = gsap.to(pathRef.current, {
      attr: { d: '${currentPreset.toPath}' },
      duration: ${duration},
      ease: '${ease}',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      if (tween) tween.kill();
    };
  }, []);

  return (
    <div
      className={\`pure-morph-icon-wrap \${className}\`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="${currentPreset.viewBox}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient
            id="morph-gradient-${currentPreset.id}"
            x1="20"
            y1="20"
            x2="280"
            y2="280"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="${currentPreset.defaultGradient.from}" />
            <stop offset="50%" stopColor="${currentPreset.defaultGradient.mid}" />
            <stop offset="100%" stopColor="${currentPreset.defaultGradient.to}" />
          </linearGradient>
          ${
            glowEnabled
              ? `<filter id="morph-glow-${currentPreset.id}" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>`
              : ''
          }
        </defs>
        <path
          ref={pathRef}
          d="${currentPreset.fromPath}"
          fill="url(#morph-gradient-${currentPreset.id})"
          ${glowEnabled ? `filter="url(#morph-glow-${currentPreset.id})"` : ''}
        />
      </svg>
    </div>
  );
};
    `.trim();

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      className={`morph-svg-snippet-builder card border-0 p-4 p-md-5 ${className}`.trim()}
      style={{
        backgroundColor: '#0c0d0f',
        borderRadius: '24px',
        color: '#ffffff',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 pb-4 mb-4 border-bottom border-secondary border-opacity-25">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <Sparkles size={18} color="var(--tp-theme-primary, #ff3c00)" />
            <span className="text-uppercase fw-600 text-muted" style={{ fontSize: '12px', letterSpacing: '2px' }}>
              Vector Morph Studio
            </span>
          </div>
          <h3 className="m-0 text-white fw-700" style={{ fontSize: '26px' }}>
            10 SVG Morph Presets &amp; Code Generator
          </h3>
        </div>
        <button
          type="button"
          onClick={handleCopyCode}
          className="btn btn-sm d-inline-flex align-items-center gap-2 px-3 py-2 fw-600"
          style={{
            backgroundColor: copied ? '#10b981' : 'var(--tp-theme-primary, #ff3c00)',
            color: '#ffffff',
            borderRadius: '10px',
            transition: 'all 0.2s ease',
          }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Copied Code!' : 'Copy React Component'}</span>
        </button>
      </div>

      <div className="row g-4 align-items-center">
        {/* Live Morph Preview Stage */}
        <div className="col-lg-6">
          <div
            className="morph-stage-preview position-relative d-flex align-items-center justify-content-center"
            style={{
              height: '380px',
              backgroundColor: '#14161a',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Background Grid Accent */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 0.5,
              }}
            />

            {/* Morph SVG Render */}
            <div
              className="pure-morph-icon-wrap"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <svg
                width={selectedSize}
                height={selectedSize}
                viewBox={currentPreset.viewBox}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
              >
                <defs>
                  <linearGradient
                    id={`preview-morph-grad-${currentPreset.id}`}
                    x1="20"
                    y1="20"
                    x2="280"
                    y2="280"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor={currentPreset.defaultGradient.from} />
                    <stop offset="50%" stopColor={currentPreset.defaultGradient.mid} />
                    <stop offset="100%" stopColor={currentPreset.defaultGradient.to} />
                  </linearGradient>
                  {glowEnabled && (
                    <filter
                      id={`preview-morph-glow-${currentPreset.id}`}
                      x="-30%"
                      y="-30%"
                      width="160%"
                      height="160%"
                    >
                      <feGaussianBlur stdDeviation="12" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  )}
                </defs>
                <path
                  ref={pathRef}
                  d={currentPreset.fromPath}
                  fill={`url(#preview-morph-grad-${currentPreset.id})`}
                  filter={glowEnabled ? `url(#preview-morph-glow-${currentPreset.id})` : undefined}
                />
              </svg>
            </div>

            {/* Play/Pause Control Overlay */}
            <div
              className="position-absolute bottom-0 start-0 end-0 p-3 d-flex align-items-center justify-content-between"
              style={{ zIndex: 3 }}
            >
              <div className="badge px-3 py-2 rounded-pill bg-dark border border-secondary border-opacity-50 text-white-50">
                {currentPreset.category}
              </div>
              <button
                type="button"
                onClick={togglePlay}
                className="btn btn-sm btn-dark border border-secondary border-opacity-50 text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '38px', height: '38px' }}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Morph Settings Controls */}
        <div className="col-lg-6">
          <div className="d-flex flex-column gap-3">
            {/* Preset Selector Dropdown */}
            <div>
              <label className="form-label text-muted fw-600 mb-1" style={{ fontSize: '13px' }}>
                Select Morph Preset (10 Settings):
              </label>
              <select
                className="form-select bg-dark text-white border-secondary border-opacity-50 py-2"
                style={{ borderRadius: '10px' }}
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {MORPH_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Grid Selector */}
            <div className="d-flex flex-wrap gap-2">
              {MORPH_PRESETS.map((p, idx) => {
                const isActive = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    className="btn btn-sm px-2 py-1"
                    style={{
                      backgroundColor: isActive ? 'var(--tp-theme-primary, #ff3c00)' : '#1e2126',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    #{idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Speed / Duration Slider */}
            <div>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label text-muted fw-600 m-0" style={{ fontSize: '13px' }}>
                  Duration: {duration.toFixed(1)}s
                </label>
                <span className="text-white-50" style={{ fontSize: '12px' }}>
                  Speed: {duration <= 1.2 ? 'Fast' : duration >= 3 ? 'Slow' : 'Standard'}
                </span>
              </div>
              <input
                type="range"
                className="form-range"
                min="0.5"
                max="4.5"
                step="0.1"
                value={duration}
                onChange={(e) => setDuration(parseFloat(e.target.value))}
              />
            </div>

            {/* Easing Options */}
            <div>
              <label className="form-label text-muted fw-600 mb-1" style={{ fontSize: '13px' }}>
                GSAP Easing Function:
              </label>
              <select
                className="form-select bg-dark text-white border-secondary border-opacity-50 py-2"
                style={{ borderRadius: '10px' }}
                value={ease}
                onChange={(e) => setEase(e.target.value)}
              >
                <option value="expo.inOut">expo.inOut (Snappy Cinematic)</option>
                <option value="power2.inOut">power2.inOut (Smooth Fluid)</option>
                <option value="sine.inOut">sine.inOut (Gentle Wave)</option>
                <option value="back.inOut(1.4)">back.inOut (Elastic Overshoot)</option>
                <option value="elastic.out(1, 0.4)">elastic.out (Jelly Splash)</option>
                <option value="none">none (Linear)</option>
              </select>
            </div>

            {/* Size & Glow Toggles */}
            <div className="d-flex align-items-center justify-content-between pt-2">
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted fw-600" style={{ fontSize: '13px' }}>
                  Size:
                </span>
                {[180, 220, 260].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: selectedSize === sz ? '#ffffff' : '#1e2126',
                      color: selectedSize === sz ? '#000000' : '#ffffff',
                      borderRadius: '6px',
                      fontSize: '12px',
                      padding: '2px 10px',
                    }}
                  >
                    {sz}px
                  </button>
                ))}
              </div>

              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="glowToggle"
                  checked={glowEnabled}
                  onChange={(e) => setGlowEnabled(e.target.checked)}
                />
                <label className="form-check-label text-muted fw-600" htmlFor="glowToggle" style={{ fontSize: '13px' }}>
                  Glow Effect
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorphSvgSnippet;
