import { useState, useEffect, useRef } from 'react';
import {
  Offcanvas1,
  Header1,
  Footer1,
  DotMatrixLoader,
} from './components';
import {
  Home,
  Services,
  ServiceDetails,
  Blog,
  BlogDetails,
  Faq,
  Contact,
  Login,
  AdminLayout,
} from './pages';

export type RouteType =
  | 'home'
  | 'services'
  | 'service-details'
  | 'blog'
  | 'blog-details'
  | 'faq'
  | 'contact'
  | 'login'
  | 'admin';

interface RouteState {
  route: RouteType;
  slug?: string;
}

const validRoutes: RouteType[] = [
  'home',
  'services',
  'service-details',
  'blog',
  'blog-details',
  'faq',
  'contact',
  'login',
  'admin',
];

const getRouteFromLocation = (): RouteState => {
  // 1. Check HTML5 Pathname (e.g. /login, /admin, /admin/blogs, /services/ui-ux-design)
  const path = window.location.pathname.replace(/^\/|\/$/g, '');
  const pathParts = path.split('/');
  const firstSegment = pathParts[0]?.toLowerCase();

  // Support /login & /admin
  if (firstSegment === 'login') {
    return { route: 'login' };
  }
  if (firstSegment === 'admin') {
    return {
      route: 'admin',
      slug: pathParts[1] || 'meta',
    };
  }

  // Support /services/:slug as service-details
  if (firstSegment === 'services' && pathParts[1]) {
    return {
      route: 'service-details',
      slug: pathParts[1],
    };
  }

  if (firstSegment && validRoutes.includes(firstSegment as RouteType)) {
    return {
      route: firstSegment as RouteType,
      slug: pathParts[1] || undefined,
    };
  }

  // 2. Check Hash Routing Fallback (e.g. #login, #admin, #services/ui-ux-design)
  const rawHash = window.location.hash.replace('#', '').toLowerCase();
  if (rawHash) {
    const hashParts = rawHash.split('?')[0].split('/');
    const hashBase = hashParts[0] as RouteType;

    if (hashBase === 'login') {
      return { route: 'login' };
    }
    if (hashBase === 'admin') {
      return {
        route: 'admin',
        slug: hashParts[1] || 'meta',
      };
    }

    if (hashBase === 'services' && hashParts[1]) {
      return {
        route: 'service-details',
        slug: hashParts[1],
      };
    }

    if (validRoutes.includes(hashBase)) {
      const searchParams = new URLSearchParams(rawHash.split('?')[1] || '');
      const slug =
        hashParts[1] ||
        searchParams.get('service') ||
        searchParams.get('slug') ||
        undefined;
      return {
        route: hashBase,
        slug,
      };
    }
  }

  return { route: 'home' };
};

function App() {
  const [routeState, setRouteState] = useState<RouteState>(getRouteFromLocation());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isTransitioningRef = useRef<boolean>(false);

  // Guarantee loading state finishes within 2.2s (skip for admin routes)
  useEffect(() => {
    if (routeState.route === 'login' || routeState.route === 'admin') {
      setIsLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, [routeState.route]);

  // Barba.js Curtain Transition Effect for all route changes
  const triggerBarbaTransition = (nextState: RouteState) => {
    if (nextState.route === 'login' || nextState.route === 'admin' || routeState.route === 'login' || routeState.route === 'admin') {
      setRouteState(nextState);
      window.scrollTo(0, 0);
      return;
    }

    if (isTransitioningRef.current) {
      setRouteState(nextState);
      window.scrollTo(0, 0);
      return;
    }

    const gsap = (window as any).gsap;
    const curtain = document.getElementById('barba-curtain');
    const logo = curtain?.querySelector('.barba-curtain-logo');

    if (gsap && curtain) {
      isTransitioningRef.current = true;
      gsap.killTweensOf([curtain, logo]);

      gsap
        .timeline({
          onComplete: () => {
            setRouteState(nextState);
            window.scrollTo(0, 0);

            // Animate curtain out downwards
            gsap.to(curtain, {
              yPercent: 100,
              duration: 0.45,
              ease: 'power3.inOut',
              delay: 0.05,
              onComplete: () => {
                gsap.set(curtain, { yPercent: -100, pointerEvents: 'none' });
                isTransitioningRef.current = false;
              },
            });
          },
        })
        .set(curtain, { yPercent: -100, pointerEvents: 'all' })
        .to(curtain, { yPercent: 0, duration: 0.4, ease: 'power3.inOut' })
        .to(logo, { opacity: 1, scale: 1, duration: 0.2 }, '-=0.15')
        .to(logo, { opacity: 0, scale: 0.95, duration: 0.15 }, '+=0.05');
    } else {
      setRouteState(nextState);
      window.scrollTo(0, 0);
    }
  };

  // Listen to popstate and hashchange events
  useEffect(() => {
    const handleLocationChange = () => {
      const next = getRouteFromLocation();
      if (next.route !== routeState.route || next.slug !== routeState.slug) {
        triggerBarbaTransition(next);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [routeState]);

  // Re-run theme initializations whenever the route or page component changes
  useEffect(() => {
    if (routeState.route === 'login' || routeState.route === 'admin') {
      return;
    }

    const timer = setTimeout(() => {
      const w = window as unknown as {
        initMainTheme?: () => void;
        initSliders?: () => void;
        initCursor?: () => void;
        ScrollTrigger?: { refresh: () => void };
      };

      if (typeof w.initMainTheme === 'function') {
        w.initMainTheme();
      }
      if (typeof w.initSliders === 'function') {
        w.initSliders();
      }
      if (typeof w.initCursor === 'function') {
        w.initCursor();
      }

      // Initialize Background SVG Slash ONLY on .tp-about-title-wrap with GSAP ScrollTrigger
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Remove title-bg-svg-slash from any titles outside .tp-about-title-wrap
        document.querySelectorAll('.title-bg-svg-slash').forEach((slash) => {
          if (!slash.closest('.tp-about-title-wrap')) {
            slash.remove();
          }
        });

        // Only target titles within .tp-about-title-wrap
        const titles = document.querySelectorAll('.tp-about-title-wrap .tp-section-title:not(.no-title-bg), .tp-about-title-wrap.mb-30 .tp-section-title:not(.no-title-bg)');
        titles.forEach((title) => {
          if (title.classList.contains('no-title-bg')) {
            return;
          }

          if (!title.querySelector('.title-bg-svg-slash')) {
            const svgWrap = document.createElement('div');
            svgWrap.className = 'title-bg-svg-slash';
            svgWrap.setAttribute('aria-hidden', 'true');
            svgWrap.innerHTML = `
              <svg width="256" height="58" viewBox="0 0 256 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.208008 29.8984L255.475 28" stroke="#B57BEE" stroke-width="56" stroke-linecap="round"/>
              </svg>
            `;
            title.prepend(svgWrap);

            const path = svgWrap.querySelector('path');
            if (path) {
              const pathLength = path.getTotalLength() || 260;
              gsap.set(path, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength,
              });

              gsap.to(path, {
                strokeDashoffset: 0,
                duration: 1.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: title,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              });

              // Subtle scale & parallax scrub on the background brush
              gsap.fromTo(
                svgWrap,
                { scaleX: 0.8, x: -15, opacity: 0.5 },
                {
                  scaleX: 1.05,
                  x: 0,
                  opacity: 0.85,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: title,
                    start: 'top 95%',
                    end: 'top 40%',
                    scrub: 1.2,
                  },
                }
              );
            }
          }
        });
      }

      if (w.ScrollTrigger && typeof w.ScrollTrigger.refresh === 'function') {
        w.ScrollTrigger.refresh();
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [routeState.route, routeState.slug]);

  const handleNavigate = (target: string) => {
    const clean = target.replace('#', '').replace(/^\//, '');
    const path = clean === 'home' || !clean ? '/' : `/${clean}`;
    window.history.pushState({}, '', path);
    const nextState = getRouteFromLocation();

    if (nextState.route !== routeState.route || nextState.slug !== routeState.slug) {
      triggerBarbaTransition(nextState);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If Admin or Login route, render standalone Admin / Login view
  if (routeState.route === 'login') {
    return <Login onLoginSuccess={() => handleNavigate('admin')} onNavigate={handleNavigate} />;
  }

  if (routeState.route === 'admin') {
    const initialTab = (routeState.slug === 'blogs' || routeState.slug === 'settings') ? routeState.slug : 'meta';
    return <AdminLayout initialTab={initialTab} onNavigate={handleNavigate} />;
  }

  const renderCurrentPage = () => {
    switch (routeState.route) {
      case 'services':
        return <Services />;
      case 'service-details':
        return <ServiceDetails slug={routeState.slug} />;
      case 'blog':
        return <Blog />;
      case 'blog-details':
        return <BlogDetails slug={routeState.slug} />;
      case 'faq':
        return <Faq />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <>
      {/* Editorial Dot Matrix Studio Loading Screen */}
      {isLoading && (
        <DotMatrixLoader
          minDuration={2200}
          onComplete={() => {
            setIsLoading(false);
          }}
        />
      )}

      {/* Offcanvas, Search & Mobile Menu */}
      <Offcanvas1 />

      {/* Barba.js Transition Curtain Overlay */}
      <div
        id="barba-curtain"
        className="barba-curtain"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#0c0c0c',
          zIndex: 999999,
          transform: 'translateY(-100%)',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform',
        }}
      >
        <div
          className="barba-curtain-logo"
          style={{
            color: '#ffffff',
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            letterSpacing: '1px',
            opacity: 0,
            fontFamily: 'var(--tp-ff-sequel-bold, sans-serif)',
          }}
        >
          <span style={{ color: 'var(--tp-theme-primary, #ff3c00)' }}>REV</span>LYTICS
        </div>
      </div>

      {/* Barba.js Wrapper */}
      <div data-barba="wrapper">
        {/* GSAP Smooth Scroll & Page View Container */}
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {/* Header Navigation */}
            <Header1 currentRoute={routeState.route} onNavigate={handleNavigate} />

            {/* Dynamic Page Content with Barba.js Container Attributes */}
            <main
              id="main-content"
              data-barba="container"
              data-barba-namespace={routeState.slug ? `services-${routeState.slug}` : routeState.route}
            >
              {renderCurrentPage()}
            </main>

            {/* Footer */}
            <Footer1 />
          </div>
        </div>
      </div>

      {/* Bottom 200px Progressive Blur Filter (Frosted depth as user scrolls) */}
      <div className="bottom-scroll-blur-overlay" aria-hidden="true" />
    </>
  );
}

export default App;
