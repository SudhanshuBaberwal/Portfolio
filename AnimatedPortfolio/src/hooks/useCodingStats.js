import { useState, useEffect, useRef } from "react";
import { fetchCodingStats } from "../lib/api.js";

// Session-level memory cache
let cachedStats = null;

export function useCodingStats(targetRef) {
  const [state, setState] = useState({
    status: cachedStats ? "ok" : "idle",
    data: cachedStats,
  });

  const hasFetched = useRef(Boolean(cachedStats));

  useEffect(() => {
    if (hasFetched.current) return;
    const target = targetRef.current;
    if (!target) return;

    let retryCount = 0;

    const doFetch = async () => {
      setState((prev) => ({ ...prev, status: "loading" }));

      const attempt = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        try {
          const data = await fetchCodingStats(controller.signal);
          cachedStats = data;
          hasFetched.current = true;
          setState({ status: "ok", data });
        } finally {
          clearTimeout(timeoutId);
        }
      };

      try {
        await attempt();
      } catch (err) {
        if (retryCount < 1) {
          retryCount++;
          try {
            await attempt();
          } catch {
            setState({ status: "error", data: null });
          }
        } else {
          setState({ status: "error", data: null });
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasFetched.current) {
          hasFetched.current = true;
          observer.disconnect();
          doFetch();
        }
      },
      {
        rootMargin: "300px 0px 300px 0px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [targetRef]);

  return state;
}
