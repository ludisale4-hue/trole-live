import { motion } from "framer-motion";
import logo from "@/assets/trole-logo.jpg";

const links = [
  { href: "#home", label: "Home" },
  { href: "#live", label: "Live" },
  { href: "#giveaways", label: "Giveaways" },
  { href: "#bonuses", label: "Bonuses" },
  { href: "#socials", label: "Socials" },
];

export function Navbar({ isLive }: { isLive: boolean }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" className="group flex items-center gap-3">
            <img src={logo} alt="TROLE" className="h-9 w-9 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
          <span className="text-sm font-semibold tracking-[0.2em] text-foreground">TROLE</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {isLive && (
            <span className="hidden items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-destructive sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-live-pulse" />
              Live
            </span>
          )}
          <a
            href="https://www.youtube.com/@Trole"
            target="_blank"
            rel="noreferrer"
            className="hover-scale rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 glow-orange-sm"
          >
            Subscribe
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
