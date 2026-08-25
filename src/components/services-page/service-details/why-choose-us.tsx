import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import Matter from 'matter-js';
import { fetchServiceDetailBySlug, type ServiceDetailItem, type WhyChooseItem } from '../../../services/api';

// ==================================================
// START: WhyChooseUs (Service Details)
// Dynamic Matter.js Physics Badges + Accordion
// ==================================================

export interface ServiceDetailsWhyChooseUsProps {
  slug?: string;
}

const DEFAULT_WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: 'collapseOne',
    icon: 'Users',
    title: 'User-Centric Architecture',
    description:
      'We map intuitive user journeys, wireframes, and workflows tailored precisely to solve user pain points and drive product adoption.',
  },
  {
    id: 'collapseTwo',
    icon: 'Layers',
    title: 'Interactive Prototyping',
    description:
      'We build clickable, responsive prototypes to test interactions, gather early feedback, and validate ideas before development begins.',
  },
  {
    id: 'collapseThree',
    icon: 'Component',
    title: 'Scalable Design Systems',
    description:
      'We create clean, modular component libraries and design tokens in Figma to ensure consistent brand identity and faster frontend builds.',
  },
  {
    id: 'collapseFour',
    icon: 'FlaskConical',
    title: 'Data & Usability Testing',
    description:
      'We run rigorous usability tests, analyze behavioral analytics, and refine layouts to maximize engagement and conversion rates.',
  },
  {
    id: 'collapseFive',
    icon: 'TrendingUp',
    title: 'Conversion-Rate Optimization',
    description:
      'We strategically place micro-interactions and clear calls-to-action to turn regular visitors into active, long-term paying customers.',
  },
  {
    id: 'collapseSix',
    icon: 'Code2',
    title: 'Seamless Developer Handoff',
    description:
      'We deliver pixel-perfect Figma files with complete asset exports, responsive auto-layouts, and precise tokens for effortless development.',
  },
];

const renderLucideIcon = (iconName?: string) => {
  if (!iconName) return null;
  const CleanName = iconName.trim();
  const IconComponent = (LucideIcons as any)[CleanName];
  if (!IconComponent) return null;
  return (
    <span className="tp-faq-icon me-2 d-inline-flex align-items-center">
      <IconComponent size={20} />
    </span>
  );
};

// Physics Canvas Component with Matter.js
interface MatterTagsCanvasProps {
  subtitleText?: string;
  categoryName?: string;
  customKeywords?: string[];
}

const DEFAULT_KEYWORDS = [
  'Channel Manager',
  'OTA Dynamic Sync',
  'Rate Parity Engine',
  'Direct Booking Engine',
  'Revenue Management',
  'Hotel Metasearch',
  'Google Hotels Ads',
  'Airbnb & Vrbo API',
  'Expedia Partner Central',
  'Booking.com Connectivity',
  'Yield Optimization',
  'Smart Pricing Rules',
  'Multi-Calendar Sync',
  'Guest Communication',
  'Automated Invoicing',
  'Reputation Management',
  'Zero Overbooking',
  'PMS Deep Integration',
  'VIP Concierge Tech',
  'Conversion Analytics',
];

const COLOR_THEMES = [
  { bg: '#ffb4a2', text: '#3d1f1a', border: '#e89a86' }, // Coral Pastel
  { bg: '#d4d4d8', text: '#27272a', border: '#b8b8bd' }, // Slate Mist
  { bg: '#a7d7c5', text: '#1e3a2f', border: '#8ec2ac' }, // Sage Mint
  { bg: '#a8c5e8', text: '#1a2e4a', border: '#8fabd1' }, // Powder Blue
  { bg: '#f0c987', text: '#4a3418', border: '#dbb26e' }, // Butter Amber
  { bg: '#cbb2e8', text: '#3a1f4d', border: '#b599d1' }, // Lilac Violet
  { bg: '#9fd4dc', text: '#1a3a3f', border: '#86bfc7' }, // Sky Cyan
  { bg: '#f0a8b8', text: '#4a1f28', border: '#dc93a3' }, // Rose Blush
  { bg: '#b8bcc4', text: '#24272d', border: '#a0a4ac' }, // Stone Charcoal
  { bg: '#faf8f5', text: '#3d3a35', border: 'rgba(0,0,0,0.12)' }, // Ivory Cream
];

const MatterTagsCanvas: React.FC<MatterTagsCanvasProps> = ({
  subtitleText,
  categoryName = 'Travel & Hospitality Tech',
  customKeywords,
}) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    const engine = Engine.create({
      gravity: { x: 0, y: 0.85, scale: 0.001 },
    });

    const rect = sceneRef.current.getBoundingClientRect();
    const containerWidth = Math.max(rect.width || sceneRef.current.clientWidth || 320, 280);
    const containerHeight = Math.max(rect.height || sceneRef.current.clientHeight || 420, 380);

    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        wireframes: false,
        background: 'transparent',
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      },
    });

    // Static Boundaries (Floor, Left, Right, Ceiling)
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(containerWidth / 2, containerHeight + 10, containerWidth * 2, 40, wallOptions);
    const leftWall = Bodies.rectangle(-20, containerHeight / 2, 40, containerHeight * 2, wallOptions);
    const rightWall = Bodies.rectangle(containerWidth + 20, containerHeight / 2, 40, containerHeight * 2, wallOptions);
    const ceiling = Bodies.rectangle(containerWidth / 2, -60, containerWidth * 2, 40, wallOptions);

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    const keywords = ((customKeywords && customKeywords.length > 0) ? customKeywords : DEFAULT_KEYWORDS).slice(0, 10);

    const spawnTimers: number[] = [];
    const pillBodies: Matter.Body[] = [];
    const bodyAlpha = new Map<number, { value: number }>();

    const spawnPill = (idx: number) => {
      if (!sceneRef.current) return;
      const phrase = keywords[idx % keywords.length];
      const theme = COLOR_THEMES[idx % COLOR_THEMES.length];
      const textLen = phrase.length;
      const width = Math.max(80, Math.min(containerWidth - 30, textLen * 7.5 + 28));
      const height = 34;
      const minX = width / 2 + 10;
      const maxX = Math.max(minX, containerWidth - width / 2 - 10);
      const x = Math.random() * (maxX - minX) + minX;
      const y = -40;

      const body = Bodies.rectangle(x, y, width, height, {
        chamfer: { radius: 17 },
        restitution: 0.85,
        friction: 0.15,
        frictionAir: 0.005,
        density: 0.01,
        render: {
          fillStyle: theme.bg,
          strokeStyle: theme.border,
          lineWidth: 1.5,
          opacity: 0,
        },
      });

      (body as any).customData = {
        label: phrase,
        textColor: theme.text,
        width,
        height,
      };

      pillBodies.push(body);
      Composite.add(engine.world, body);

      // Smooth gsap fade/scale-in for this pill as it drops
      const alphaState = { value: 0 };
      bodyAlpha.set(body.id, alphaState);
      const gsap = (window as any).gsap;
      if (gsap) {
        gsap.to(alphaState, {
          value: 1,
          duration: 0.45,
          ease: 'power2.out',
          onUpdate: () => {
            body.render.opacity = alphaState.value;
          },
        });
      } else {
        body.render.opacity = 1;
        alphaState.value = 1;
      }
    };

    // Staggered pill drops
    keywords.forEach((_, idx) => {
      const timer = window.setTimeout(() => spawnPill(idx), idx * 220);
      spawnTimers.push(timer);
    });

    // Custom Canvas Render for crisp centered text
    const afterRenderHandler = () => {
      const ctx = render.context;
      if (!ctx) return;

      pillBodies.forEach((body) => {
        const custom = (body as any).customData;
        if (!custom) return;

        const { label, textColor } = custom;
        const { x, y } = body.position;
        const angle = body.angle;
        const alpha = bodyAlpha.get(body.id)?.value ?? 1;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.font = '600 32px';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, 0, 1);
        ctx.restore();
      });
    };
    Events.on(render, 'afterRender', afterRenderHandler);

    // Interactive Mouse Drag Constraint without hijacking page scroll
    const mouse = Mouse.create(render.canvas);
    if (mouse.element) {
      mouse.element.removeEventListener('mousewheel', (mouse as any).mousewheel);
      mouse.element.removeEventListener('DOMMouseScroll', (mouse as any).mousewheel);
    }

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Smooth entrance animation for wrapper
    const gsapInstance = (window as any).gsap;
    if (wrapperRef.current && gsapInstance) {
      gsapInstance.fromTo(
        wrapperRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }

    return () => {
      spawnTimers.forEach((t) => window.clearTimeout(t));
      Events.off(render, 'afterRender', afterRenderHandler);
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      if (render.canvas && render.canvas.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }
    };
  }, [categoryName, customKeywords]);

  return (
    <div ref={wrapperRef} className="d-flex flex-column h-100 position-relative w-100 mb-30" style={{ minHeight: '480px' }}>
      <div className="d-flex align-items-center gap-2 mb-3">
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--tp-theme-primary, #ff3c00)',
          }}
        />
        <span
          className="text-uppercase fw-600"
          style={{ fontSize: '17px', letterSpacing: '2px', color: 'rgba(0, 0, 0, 0.65)' }}
        >
          {subtitleText || categoryName}
        </span>
      </div>

      {/* 100% Available Height Physics Canvas */}
      <div
        ref={sceneRef}
        style={{
          width: '100%',
          flex: 1,
          minHeight: '380px',
          overflow: 'hidden',
          cursor: 'grab',
          position: 'relative',
        }}
      />

    </div>
  );
};

const WhyChooseUs: React.FC<ServiceDetailsWhyChooseUsProps> = ({ slug: propSlug }) => {
  // Extract slug from prop, pathname (/service-details/ui-ux-design), or hash
  const currentSlug = useMemo(() => {
    if (propSlug) return propSlug;
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const parts = path.split('/');
    if (parts[0] === 'service-details' && parts[1]) {
      return parts[1];
    }
    const hash = window.location.hash.replace('#', '');
    const hashParts = hash.split('?')[0].split('/');
    if (hashParts[0] === 'service-details' && hashParts[1]) {
      return hashParts[1];
    }
    const param = new URLSearchParams(window.location.search || hash.split('?')[1] || '').get('service');
    return param || 'ui-ux-design';
  }, [propSlug]);

  const [detail, setDetail] = useState<ServiceDetailItem | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadServiceDetail() {
      if (!currentSlug) return;
      try {
        const data = await fetchServiceDetailBySlug(currentSlug);
        if (isMounted && data) {
          setDetail(data);
        }
      } catch (err) {
        console.warn('Failed to load service detail for why choose us:', err);
      }
    }

    loadServiceDetail();

    return () => {
      isMounted = false;
    };
  }, [currentSlug]);

  // Parse why_choose_items
  const items: WhyChooseItem[] = useMemo(() => {
    if (!detail?.why_choose_items) return DEFAULT_WHY_CHOOSE_ITEMS;
    if (Array.isArray(detail.why_choose_items)) {
      return detail.why_choose_items;
    }
    if (typeof detail.why_choose_items === 'string') {
      try {
        const parsed = JSON.parse(detail.why_choose_items);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // parsing failed
      }
    }
    return DEFAULT_WHY_CHOOSE_ITEMS;
  }, [detail]);

  // Extract custom keywords from features or detail if available
  const customKeywords = useMemo(() => {
    if (detail?.features) {
      try {
        const feats = typeof detail.features === 'string' ? JSON.parse(detail.features) : detail.features;
        if (Array.isArray(feats) && feats.length > 0) return feats;
      } catch {
        if (typeof detail.features === 'string') {
          return detail.features.split(',').map((s) => s.trim()).filter(Boolean);
        }
      }
    }
    return undefined;
  }, [detail]);

  const subtitle = detail?.why_choose_subtitle || 'One update, every channel, no more manual double-checking';
  const headingTitle =
    detail?.why_choose_title ||
    'At revlytics, we don’t just build interfaces we engineer experiences.';

  return (
    <>
      {/* Why Choose Us / Service FAQ 1 Section */}
      <div className="tp-faq-area pb-130 pt-60">
        <div className="container">
          <div className="row align-items-stretch">
            {/* Left Column with Matter.js Interactive Cards Canvas (100% height) */}
            <div className="col-xxl-5 col-xl-4 col-lg-5 d-flex flex-column">
              <MatterTagsCanvas
                subtitleText={subtitle}
                categoryName={detail?.category || detail?.service_name}
                customKeywords={customKeywords}
              />
            </div>

            {/* Right Column with FAQs Accordion */}
            <div className="col-xxl-7 col-xl-8 col-lg-7">
              <div className="tp-faq tp-service-details-faq-one tp-service-details-faq mb-30">
                <h2 className="tp-section-title reveal-text fs-72 mb-30">{headingTitle}</h2>
                <div className="accordion" id="accordionWhyChooseUs">
                  {items.map((item, index) => {
                    const collapseId = item.id || `collapseWhyChoose${index}`;
                    const isFirst = index === 0;
                    const itemNumber = item.number
                      ? (item.number.endsWith('.') ? item.number : `${item.number}.`)
                      : (index < 9 ? `0${index + 1}.` : `${index + 1}.`);

                    return (
                      <div key={index} className="tp-faq-item tp_fade_anim" data-delay=".3">
                        <h2 className="accordion-header">
                          <button
                            className={`tp-faq-button ${isFirst ? '' : 'collapsed'} d-flex align-items-center`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${collapseId}`}
                            aria-expanded={isFirst ? 'true' : 'false'}
                            aria-controls={collapseId}
                          >
                            <span className="d-inline-flex align-items-center">
                              {renderLucideIcon(item.icon)}
                              <span>
                                {itemNumber} {item.title}
                              </span>
                            </span>
                          </button>
                        </h2>
                        <div
                          id={collapseId}
                          className={`tp-faq-collapse collapse ${isFirst ? 'show' : ''}`}
                          data-bs-parent="#accordionWhyChooseUs"
                        >
                          <div className="tp-faq-body">
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tp-faq-area-end */}
    </>
  );
};

export default WhyChooseUs;