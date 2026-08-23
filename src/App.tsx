import { useState, useEffect } from 'react';
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
  // 1. Check HTML5 Pathname (e.g. /service-details/ui-ux-design, /services)
  const path = window.location.pathname.replace(/^\/|\/$/g, '');
  const pathParts = path.split('/');
  const firstPathSegment = pathParts[0]?.toLowerCase() as RouteType;

  if (firstPathSegment && validRoutes.includes(firstPathSegment)) {
    return {
      route: firstPathSegment,
      slug: pathParts[1] || undefined,
    };
  }

  // 2. Check Hash Routing Fallback (e.g. #service-details?service=ui-ux-design or #service-details/ui-ux-design)
  const rawHash = window.location.hash.replace('#', '').toLowerCase();
  if (rawHash) {
    const hashBase = rawHash.split('?')[0].split('/')[0] as RouteType;
    if (validRoutes.includes(hashBase)) {
      const searchParams = new URLSearchParams(rawHash.split('?')[1] || '');
      const slug = rawHash.split('/')[1] || searchParams.get('service') || searchParams.get('slug') || undefined;
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

  // Listen to both popstate and hashchange events
  useEffect(() => {
    const handleLocationChange = () => {
      setRouteState(getRouteFromLocation());
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Re-run theme initializations whenever the route or page component changes
  useEffect(() => {
    window.scrollTo(0, 0);

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
    setRouteState(getRouteFromLocation());
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
        return <BlogDetails />;
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

      {/* GSAP Smooth Scroll & Page View Container */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* Header Navigation */}
          <Header1 currentRoute={routeState.route} onNavigate={handleNavigate} />

          {/* Dynamic Page Content */}
          <main id="main-content">
            {renderCurrentPage()}
          </main>

          {/* Footer */}
          <Footer1 />
        </div>
      </div>
    </>
  );
}

export default App;
