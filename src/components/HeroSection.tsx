import { motion } from "framer-motion";
import logo from "@/assets/trole-logo.jpg";
import type { LiveStatus } from "@/lib/youtube";
import { LiveStatusCard } from "./LiveStatusCard";

export function HeroSection({ status }: { status: LiveStatus | null }) {
  const isLive = status?.is_live;

  if (isLive) return <LiveHero status={status!} />;

  return <OfflineHero status={status} />;
}

function OfflineHero({ status }: { status: LiveStatus | null }) {
  return (
    <section id="home" className="bg-hero relative overflow-hidden pt-28 pb-8 sm:pt-32">
      <div className="absolute left-1/2 top-1/3 -z-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px] animate-float-glow" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <motion.img
            src={logo}
            alt="TROLE logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="h-10 w-10 rounded-xl glow-orange-sm"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70" />
            Currently offline
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-gradient-orange mb-6 text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl"
        >
          TROLE
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <LiveStatusCard status={status} embedded />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <a
            href="#giveaways"
            className="hover-scale rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-orange-sm transition hover:opacity-90"
          >
            Giveaways
          </a>
          <a
            href="https://www.youtube.com/@Trole"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40"
          >
            Visit channel
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function LiveHero({ status }: { status: LiveStatus }) {
  return (
    <section id="home" className="bg-hero relative overflow-hidden pt-28 pb-16 sm:pt-32">
      <div className="absolute left-1/2 top-0 -z-0 h-[380px] w-[600px] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px] animate-float-glow" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-destructive">
            <span className="h-2 w-2 rounded-full bg-destructive animate-live-pulse" />
            Live now
          </span>
          {status.viewer_count > 0 && (
            <span className="text-xs text-muted-foreground">
              {status.viewer_count.toLocaleString()} watching
            </span>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          {status.stream_title ?? "TROLE is live"}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="card-premium overflow-hidden glow-orange-sm"
        >
          <div className="aspect-video w-full">
            <iframe
              key={status.video_id ?? "live"}
              src={`https://www.youtube.com/embed/${status.video_id}?autoplay=1`}
              title={status.stream_title ?? "Livestream"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
