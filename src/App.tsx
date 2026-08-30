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
  // 1. Check HTML5 Pathname (e.g. /services, /services/ui-ux-design, /blog, /blog/marketing-guide)
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

  // Support /services/:slug or /service-details/:slug as service-details
  if ((firstSegment === 'services' || firstSegment === 'service-details') && pathParts[1]) {
    return {
      route: 'service-details',
      slug: pathParts[1],
    };
  }

  // Support /blog/:slug or /blog-details/:slug as blog-details
  if ((firstSegment === 'blog' || firstSegment === 'blog-details') && pathParts[1]) {
    return {
      route: 'blog-details',
      slug: pathParts[1],
    };
  }

  if (firstSegment && validRoutes.includes(firstSegment as RouteType)) {
    return {
      route: firstSegment as RouteType,
      slug: pathParts[1] || undefined,
    };
  }

  // 2. Check Hash Routing Fallback (e.g. #login, #admin, #services/ui-ux-design, #blog-details/...)
  const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
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

    if ((hashBase === 'services' || hashBase === 'service-details') && hashParts[1]) {
      return {
        route: 'service-details',
        slug: hashParts[1],
      };
    }

    if ((hashBase === 'blog' || hashBase === 'blog-details') && hashParts[1]) {
      return {
        route: 'blog-details',
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

    // If hash is an in-page section anchor (e.g. #service, #about, #pricing), retain current pathname route if valid
    if (firstSegment && validRoutes.includes(firstSegment as RouteType)) {
      return {
        route: firstSegment as RouteType,
        slug: pathParts[1] || undefined,
      };
    }
  }

  return { route: 'home' };
};

function App() {
  const [routeState, setRouteState] = useState<RouteState>(getRouteFromLocation());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isTransitioningRef = useRef<boolean>(false);

  // Initial site loader runs once on first visit (skip for login/admin)
  useEffect(() => {
    if (routeState.route === 'login' || routeState.route === 'admin') {
      setIsLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Barba.js Curtain Transition Effect for route changes
  const triggerBarbaTransition = (nextState: RouteState) => {
    if (
      nextState.route === 'login' ||
      nextState.route === 'admin' ||
      routeState.route === 'login' ||
      routeState.route === 'admin'
    ) {
      setRouteState(nextState);
      window.scrollTo(0, 0);
      return;
    }

    // Prevent duplicate triggers while animation is in progress
    if (isTransitioningRef.current) {
      return;
    }

    const gsap = (window as any).gsap;
    const curtain = document.getElementById('barba-curtain');
    const logo = curtain?.querySelector('.barba-curtain-logo');

    if (gsap && curtain) {
      isTransitioningRef.current = true;
      gsap.killTweensOf([curtain, logo]);

      // Fallback safety timer
      const fallbackTimer = setTimeout(() => {
        if (isTransitioningRef.current) {
          isTransitioningRef.current = false;
          setRouteState(nextState);
          window.scrollTo(0, 0);
          gsap.set(curtain, { yPercent: -100, pointerEvents: 'none' });
          if (logo) gsap.set(logo, { opacity: 0 });
        }
      }, 1400);

      // Phase 1: Reset curtain to top and enable pointer events
      gsap.set(curtain, { yPercent: -100, pointerEvents: 'all' });
      if (logo) gsap.set(logo, { opacity: 0, scale: 0.94 });

      const tl = gsap.timeline();

      // Step 1: Wipe curtain down from top to fully cover the screen (0%)
      tl.to(curtain, {
        yPercent: 0,
        duration: 0.36,
        ease: 'power3.inOut',
      });

      // Step 2: Fade & pulse the Revlytics logo
      if (logo) {
        tl.to(logo, { opacity: 1, scale: 1, duration: 0.18, ease: 'power2.out' }, '-=0.1')
          .to(logo, { opacity: 0, scale: 0.95, duration: 0.14, ease: 'power2.in' }, '+=0.06');
      }

      // Step 3: While viewport is completely hidden under curtain, swap page route & scroll
      tl.call(() => {
        setRouteState(nextState);
        window.scrollTo(0, 0);

        const ScrollSmoother = (window as any).ScrollSmoother;
        if (ScrollSmoother && typeof ScrollSmoother.get === 'function') {
          const smoother = ScrollSmoother.get();
          if (smoother && typeof smoother.scrollTop === 'function') {
            smoother.scrollTop(0);
          }
        }
      });

      // Brief tick to allow React to mount the new component under the solid curtain
      tl.to({}, { duration: 0.08 });

      // Step 4: Wipe curtain downwards from 0% to 100% to reveal the already-rendered page
      tl.to(curtain, {
        yPercent: 100,
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => {
          clearTimeout(fallbackTimer);
          gsap.set(curtain, { yPercent: -100, pointerEvents: 'none' });
          if (logo) gsap.set(logo, { opacity: 0 });
          isTransitioningRef.current = false;
        },
      });
    } else {
      setRouteState(nextState);
      window.scrollTo(0, 0);
    }
  };

  const handleNavigate = (target: string) => {
    const clean = target.replace(/^#\/?/, '').replace(/^\//, '');
    const pathParts = clean.split('/');
    const firstSegment = pathParts[0]?.toLowerCase();

    // Map 'home' or empty to '/'
    const path = !clean || firstSegment === 'home' || firstSegment === 'index.html' ? '/' : `/${clean}`;
    
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    const nextState = getRouteFromLocation();

    if (nextState.route !== routeState.route || nextState.slug !== routeState.slug) {
      triggerBarbaTransition(nextState);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Global click interception for seamless Barba transitions on internal links
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore external links, tel, mailto, target="_blank", or download links
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        target.getAttribute('target') === '_blank' ||
        target.hasAttribute('download')
      ) {
        return;
      }

      // Check if it is an in-page anchor hash link
      if (href.startsWith('#')) {
        const hashTarget = href.replace(/^#\/?/, '');
        const hashBase = hashTarget.split('/')[0]?.toLowerCase() as RouteType;
        const isRoute = validRoutes.includes(hashBase);

        if (!isRoute) {
          // It is an in-page section link (e.g. #about, #service, #pricing, #contact-section)
          const el = document.getElementById(hashTarget);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }
      }

      // Intercept and navigate smoothly with Barba transition
      e.preventDefault();
      handleNavigate(href);
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [routeState]);

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
        ScrollTrigger?: {
          getAll: () => Array<{ kill: () => void }>;
          refresh: () => void;
        };
      };

      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;

      // Ensure all animation text & container elements are visible by default
      if (gsap) {
        gsap.set(
          '.tp_fade_anim, .tp-title-anim, .tp-char-animation, .tp-title-anim-inner, .tp-title-text',
          { opacity: 1, visibility: 'visible', clearProps: 'transform' }
        );
      }

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
    }, 100);

    return () => clearTimeout(timer);
  }, [routeState.route, routeState.slug]);

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
