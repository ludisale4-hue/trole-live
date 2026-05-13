import { useEffect, useState } from "react";
import { fetchLiveStatus, type LiveStatus } from "@/lib/youtube";

export function useLiveStatus() {
  const [status, setStatus] = useState<LiveStatus | null>(null);

  useEffect(() => {
    let mounted = true;
    const tick = async () => {
      const s = await fetchLiveStatus();
      if (mounted) setStatus(s);
    };
    tick();
    const interval = setInterval(tick, 30_000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return status;
}
