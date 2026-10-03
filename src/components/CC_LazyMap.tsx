import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { MapPin } from "lucide-react";
import communityConfig from "@/config/communityConfig";
import type { CC_MapProps } from "@/components/CC_Map";

// Dynamically import the Mapbox-backed map so the ~1.77MB mapbox-gl bundle
// is split into its own chunk and only fetched when a map scrolls near the
// viewport, rather than on first paint.
const CC_Map = lazy(() => import("@/components/CC_Map").then((m) => ({ default: m.CC_Map })));

type CC_LazyMapProps = CC_MapProps;

/**
 * Wraps CC_Map behind an IntersectionObserver. The Mapbox library only loads
 * once the map container scrolls within 200px of the viewport. Before it
 * loads (or if WebGL is unavailable), a static fallback is shown: a styled
 * location card with the community address.
 */
export const CC_LazyMap = (props: CC_LazyMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    // Detect WebGL availability — if missing, keep the static fallback.
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglAvailable(false);
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  useEffect(() => {
    if (!shouldLoad && webglAvailable) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoad(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: "200px" },
      );

      if (containerRef.current) observer.observe(containerRef.current);

      return () => observer.disconnect();
    }
    return undefined;
  }, [shouldLoad, webglAvailable]);

  const fallback = (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 bg-cream border border-border rounded-xl ${props.className ?? ""}`}
      style={{ height: props.height ?? "400px" }}
    >
      <MapPin className="w-12 h-12 text-primary/40 mb-3" />
      <h3 className="text-lg font-display font-bold text-bark">Country Close, Lutz, FL 33548</h3>
      <p className="text-sm text-text-light max-w-xs mt-2">Loading interactive map…</p>
    </div>
  );

  // No WebGL — permanently show the static fallback.
  if (!webglAvailable) {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center p-6 bg-cream border border-border rounded-xl ${props.className ?? ""}`}
        style={{ height: props.height ?? "400px" }}
      >
        <MapPin className="w-12 h-12 text-primary/40 mb-3" />
        <h3 className="text-lg font-display font-bold text-bark">Country Close, Lutz, FL 33548</h3>
        <p className="text-sm text-text-light max-w-xs mt-2">
          A quiet community of 26 homes in Lutz, Florida.
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      {shouldLoad ? (
        <Suspense fallback={fallback}>
          <CC_Map {...props} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

export default CC_LazyMap;
