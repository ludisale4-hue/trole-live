import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { LiveStatus } from "@/lib/youtube";

function formatDuration(start: string | null) {
  if (!start) return "";
  const diff = Date.now() - new Date(start).getTime();
  if (diff < 0) return "";
  const s = Math.floor(diff / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m ${sec}s`;
}

export function LiveStatusCard({ status, embedded }: { status: LiveStatus | null; embedded?: boolean }) {
  const live = !!status?.is_live;
  const [duration, setDuration] = useState(formatDuration(status?.started_at ?? null));

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setDuration(formatDuration(status?.started_at ?? null)), 1000);
    return () => clearInterval(id);
  }, [live, status?.started_at]);

  const wrapperClass = embedded
    ? ""
    : "mx-auto max-w-6xl px-4 py-16 sm:px-6";

  const Wrapper = embedded ? "div" : "section";

  return (
    <Wrapper id={embedded ? undefined : "live"} className={wrapperClass}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="card-premium flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8"
      >
        <div className="flex items-center gap-5">
          <div
            className={
              "relative flex h-14 w-14 items-center justify-center rounded-2xl " +
              (live ? "bg-destructive/15" : "bg-muted")
            }
          >
            <span
              className={
                "h-3 w-3 rounded-full " +
                (live ? "bg-destructive animate-live-pulse" : "bg-muted-foreground/50")
              }
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Stream status
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {live ? "Online" : "Offline"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {live
                ? status?.stream_title ?? "Streaming now"
                : "Currently offline. Check back soon."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {live && (
            <>
              <Stat label="Viewers" value={(status?.viewer_count ?? 0).toLocaleString()} />
              <Stat label="Duration" value={duration || "—"} />
            </>
          )}
          <a
            href={live ? status?.stream_url ?? "#" : "https://www.youtube.com/@Trole"}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 glow-orange-sm"
          >
            {live ? "Open stream" : "Visit channel"}
          </a>
        </div>
      </motion.div>
    </Wrapper>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="hidden text-right sm:block">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-mono text-lg text-foreground">{value}</p>
    </div>
  );
}
