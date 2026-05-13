import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchRecentVideos, type RecentVideo } from "@/lib/youtube";

export function FloatingPlayer({ hidden }: { hidden?: boolean }) {
  const [videos, setVideos] = useState<RecentVideo[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    fetchRecentVideos().then(setVideos).catch(() => {});
  }, []);

  if (hidden || !open || videos.length === 0) return null;
  const v = videos[activeIdx];

  if (minimized) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setMinimized(false)}
        className="card-premium fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3 py-2 glow-orange-sm hover:opacity-90 sm:bottom-6 sm:right-6"
        aria-label="Expand player"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
          Recent video
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-4 right-4 z-40 w-[340px] max-w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6"
      >
        <div className="card-premium overflow-hidden glow-orange-sm">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Recent video
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setExpanded((e) => !e)}
                className="rounded-md px-2 py-1 text-[10px] text-muted-foreground transition hover:text-foreground"
                aria-label="Toggle list"
              >
                {expanded ? "Hide" : "More"}
              </button>
              <button
                onClick={() => setMinimized(true)}
                className="rounded-md px-2 py-1 text-muted-foreground transition hover:text-foreground"
                aria-label="Minimize"
                title="Minimize"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1 text-muted-foreground transition hover:text-foreground"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="aspect-video w-full bg-background">
            <iframe
              key={v.id}
              src={`https://www.youtube.com/embed/${v.id}?rel=0`}
              title={v.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>

          <div className="px-3 py-2.5">
            <p className="line-clamp-2 text-xs font-medium text-foreground">{v.title}</p>
          </div>

          {expanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-h-44 overflow-y-auto border-t border-border"
            >
              {videos.map((vid, i) => (
                <li key={vid.id}>
                  <button
                    onClick={() => setActiveIdx(i)}
                    className={
                      "flex w-full items-center gap-2 px-3 py-2 text-left transition hover:bg-foreground/5 " +
                      (i === activeIdx ? "bg-foreground/5" : "")
                    }
                  >
                    <img
                      src={vid.thumbnail}
                      alt=""
                      className="h-9 w-16 flex-shrink-0 rounded object-cover"
                    />
                    <span className="line-clamp-2 text-[11px] text-foreground/90">
                      {vid.title}
                    </span>
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
