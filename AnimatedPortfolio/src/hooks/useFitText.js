import { useLayoutEffect } from "react";

/**
 * Hook that scales a single‑line text element to fill its container's width.
 *
 * @param {React.RefObject<HTMLElement>} ref - Ref to the text element.
 * @param {{ max: number }} options - Maximum font‑size in pixels (desktop size).
 */
export default function useFitText(ref, { max }) {
  useLayoutEffect(() => {
    const el = ref?.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const fit = () => {
      // Ensure the element does not wrap while measuring.
      const originalWhiteSpace = el.style.whiteSpace;
      el.style.whiteSpace = "nowrap";
      // Rendered at a reference size of 100px.
      const referenceFontSize = 100;
      const textWidth = el.scrollWidth; // width at reference size
      const containerWidth = parent.clientWidth;
      const newSize = Math.min(max, containerWidth / (textWidth / referenceFontSize));
      el.style.fontSize = `${newSize}px`;
      // Restore whitespace.
      el.style.whiteSpace = originalWhiteSpace;
    };

    // Initial fit.
    fit();
    // Resize observation.
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    // Font‑load handling.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fit);
    }

    return () => {
      ro.disconnect();
    };
  }, [ref, max]);
}
