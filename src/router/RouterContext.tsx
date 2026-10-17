import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
interface RouterContextType { path: string; navigate: (to: string) => void; currentRoute: string; }
const RouterContext = createContext<RouterContextType | null>(null);
const currentLocation = () => window.location.pathname + window.location.search + window.location.hash;
export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState(currentLocation);
  const previousLocation = useRef(location);
  const path = location.split(/[?#]/)[0] || '/';
  const focusDestination = useCallback(() => {
    let id = window.location.hash.slice(1);
    try { id = decodeURIComponent(id); } catch { return; }
    const element = id ? document.getElementById(id) : document.getElementById('main-content');
    if (!element) return;
    const focusTarget = id ? element : element.querySelector<HTMLElement>('h1') || element;
    if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1');
    focusTarget.focus({ preventScroll: true });
    if (id) element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const navigate = useCallback((to: string) => {
    const destination = new URL(to, window.location.href);
    const next = destination.pathname + destination.search + destination.hash;
    if (currentLocation() === next) { focusDestination(); return; }
    window.history.pushState({}, '', next);
    setLocation(next);
  }, [focusDestination]);
  useEffect(() => {
    const changed = previousLocation.current !== location;
    previousLocation.current = location;
    if (!changed && !window.location.hash) return;
    const frame = requestAnimationFrame(focusDestination);
    return () => cancelAnimationFrame(frame);
  }, [location, focusDestination]);
  useEffect(() => {
    const onPopState = () => setLocation(currentLocation());
    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onPopState);
    };
  }, []);
  return <RouterContext.Provider value={{ path, navigate, currentRoute: path }}>{children}</RouterContext.Provider>;
};
export const useRouter = () => {
  const value = useContext(RouterContext);
  if (!value) throw new Error('useRouter must be used within a RouterProvider');
  return value;
};
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { to: string; children: React.ReactNode; activeClassName?: string; }
export const Link: React.FC<LinkProps> = ({ to, children, className = '', activeClassName = '', onClick, ...rest }) => {
  const { path, navigate } = useRouter();
  return <a href={to} className={className + (path === to ? ' ' + activeClassName : '')} {...rest} onClick={event => {
    onClick?.(event);
    if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey && !rest.target && !rest.download) {
      event.preventDefault(); navigate(to);
    }
  }}>{children}</a>;
};
