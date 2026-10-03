import { useEffect } from "react";

interface MetaOptions {
  title: string;
  description: string;
}

/**
 * Updates the document title and meta description for a given route.
 * Used to give each route a unique, descriptive meta description for SEO
 * and social sharing. The canonical and og:url remain "/" sitewide.
 */
export function useMeta({ title, description }: MetaOptions) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const [, name] = selector.match(/name="([^"]+)"/) || [];
        const [, prop] = selector.match(/property="([^"]+)"/) || [];
        if (name) el.setAttribute("name", name);
        if (prop) el.setAttribute("property", prop);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
  }, [title, description]);
}
