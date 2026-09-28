import React, { createContext, useContext, useEffect, useState } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  currentRoute: string;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const navigate = (to: string) => {
    if (to.startsWith('#')) {
      // Anchor link on current page
      const el = document.getElementById(to.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (to.includes('#') && to.startsWith('/#')) {
      const anchor = to.split('#')[1];
      if (path === '/') {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
      // If we are on another page, navigate to '/' then scroll
      window.history.pushState({}, '', '/');
      setPath('/');
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    if (to !== path) {
      window.history.pushState({}, '', to);
      setPath(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate, currentRoute: path }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export const Link: React.FC<LinkProps> = ({
  to,
  children,
  className = '',
  activeClassName = '',
  onClick,
  ...rest
}) => {
  const { path, navigate } = useRouter();
  const isActive = path === to;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.shiftKey &&
      !rest.target
    ) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClassName : ''}`.trim()}
      {...rest}
    >
      {children}
    </a>
  );
};
