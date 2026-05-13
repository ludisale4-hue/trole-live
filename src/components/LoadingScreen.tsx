import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/trole-logo.jpg";

export function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          {/* glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            {/* rotating ring */}
            <div className="relative flex h-40 w-40 items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-transparent border-b-primary/60"
              />

              {/* logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.5 },
                }}
                className="relative h-24 w-24 overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(255,120,40,0.55)]"
              >
                <img
                  src={logo}
                  alt="TROLE"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>

            {/* wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-muted-foreground">
                Loading
              </span>
              <div className="flex h-1 w-40 overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
