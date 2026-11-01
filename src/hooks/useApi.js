import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Runs `fetcher(signal)` whenever `key` changes and exposes
 * `{ data, error, loading, retry }`. Loading is derived (not stored) so no
 * state is set synchronously inside the effect, and stale responses from a
 * previous key are never shown.
 */
export function useApi(fetcher, key) {
  const [result, setResult] = useState({ key: null, data: null, error: null });
  const [attempt, setAttempt] = useState(0);
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  const requestKey = `${key}#${attempt}`;

  useEffect(() => {
    const controller = new AbortController();
    fetcherRef
      .current(controller.signal)
      .then((data) => setResult({ key: requestKey, data, error: null }))
      .catch((error) => {
        if (error?.name === "AbortError") return;
        setResult({ key: requestKey, data: null, error });
      });
    return () => controller.abort();
  }, [requestKey]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);
  const settled = result.key === requestKey;

  return {
    data: settled ? result.data : null,
    error: settled ? result.error : null,
    loading: !settled,
    retry,
  };
}
