import React from "react";
const QUERY = "(prefers-reduced-motion: no-preference)";
const isRenderingOnServer = typeof window === "undefined";
const getInitialState = () => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
};
const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(
    getInitialState
  );
  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };
    try {
      mediaQueryList.addEventListener("change", listener);
    } catch (e) {
      mediaQueryList.addListener(listener);
    }
    return () => {
      try {
        mediaQueryList.removeEventListener("change", listener);
      } catch (e) {
        mediaQueryList.removeListener(listener);
      }
    };
  }, []);
  return prefersReducedMotion;
};

export default usePrefersReducedMotion;
