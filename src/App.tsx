import { useState, useEffect, useRef } from 'react';
import {
  Offcanvas1,
  Header1,
  Footer1,
} from './components';
import {
  Home,
  Services,
  ServiceDetails,
  Blog,
  BlogDetails,
  Faq,
  Contact,
} from './pages';

export type RouteType =
  | 'home'
  | 'services'
  | 'service-details'
  | 'blog'
  | 'blog-details'
  | 'faq'
  | 'contact';

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
];

const getRouteFromLocation = (): RouteState => {
  // 1. Check HTML5 Pathname (e.g. /services/ui-ux-design, /service-details/ui-ux-design, /services)
  const path = window.location.pathname.replace(/^\/|\/$/g, '');
  const pathParts = path.split('/');
  const firstSegment = pathParts[0]?.toLowerCase();

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

  // 2. Check Hash Routing Fallback (e.g. #services/ui-ux-design or #service-details?service=ui-ux-design)
  const rawHash = window.location.hash.replace('#', '').toLowerCase();
  if (rawHash) {
    const hashParts = rawHash.split('?')[0].split('/');
    const hashBase = hashParts[0] as RouteType;

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
  const isTransitioningRef = useRef<boolean>(false);

  // Barba.js Curtain Transition Effect
  const triggerBarbaTransition = (nextState: RouteState) => {
    const gsap = (window as any).gsap;
    const curtain = document.getElementById('barba-curtain');
    const logo = curtain?.querySelector('.barba-curtain-logo');

    if (gsap && curtain) {
      isTransitioningRef.current = true;
      gsap
        .timeline({
          onComplete: () => {
            setRouteState(nextState);
            window.scrollTo(0, 0);

            // Animate curtain out
            gsap.to(curtain, {
              yPercent: 100,
              duration: 0.5,
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
        .to(curtain, { yPercent: 0, duration: 0.45, ease: 'power3.inOut' })
        .to(logo, { opacity: 1, duration: 0.2 }, '-=0.15')
        .to(logo, { opacity: 0, duration: 0.2 }, '+=0.1');
    } else {
      setRouteState(nextState);
      window.scrollTo(0, 0);
    }
  };

  // Listen to popstate and hashchange events
  useEffect(() => {
    const handleLocationChange = () => {
      const next = getRouteFromLocation();
      // Apply smooth transition when navigating to/from services or service-details
      if (
        (next.route === 'services' ||
          next.route === 'service-details' ||
          routeState.route === 'services' ||
          routeState.route === 'service-details') &&
        (next.route !== routeState.route || next.slug !== routeState.slug)
      ) {
        triggerBarbaTransition(next);
      } else {
        setRouteState(next);
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

    if (
      nextState.route === 'services' ||
      nextState.route === 'service-details' ||
      routeState.route === 'services' ||
      routeState.route === 'service-details'
    ) {
      triggerBarbaTransition(nextState);
    } else {
      setRouteState(nextState);
      window.scrollTo(0, 0);
    }
  };

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
    </>
  );
}

export default App;
