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

type RouteType = 'home' | 'services' | 'service-details' | 'blog' | 'blog-details' | 'faq' | 'contact';

function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteType>('home');

  // Handle URL hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase() as RouteType;
      const validRoutes: RouteType[] = ['home', 'services', 'service-details', 'blog', 'blog-details', 'faq', 'contact'];
      if (validRoutes.includes(hash)) {
        setCurrentRoute(hash);
      } else if (!hash) {
        setCurrentRoute('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
  }, [currentRoute]);

  const handleNavigate = (route: string) => {
    const cleanRoute = route.replace('#', '') as RouteType;
    setCurrentRoute(cleanRoute);
    window.location.hash = cleanRoute;
  };

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'services':
        return <Services />;
      case 'service-details':
        return <ServiceDetails />;
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
          <Header1 currentRoute={currentRoute} onNavigate={handleNavigate} />

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
