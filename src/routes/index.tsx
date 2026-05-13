import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LiveStatusCard } from "@/components/LiveStatusCard";
import { GiveawaySection } from "@/components/GiveawaySection";
import { BonusesSection } from "@/components/BonusesSection";
import { SocialSection } from "@/components/SocialSection";
import { FloatingPlayer } from "@/components/FloatingPlayer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useLiveStatus } from "@/hooks/useLiveStatus";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TROLE — Live streams, giveaways & CS2" },
      {
        name: "description",
        content:
          "Official site for TROLE. Watch live streams, enter CS2 skin giveaways, and follow the channel across YouTube, Discord, TikTok and Instagram.",
      },
      { property: "og:title", content: "TROLE — Live streams, giveaways & CS2" },
      {
        property: "og:description",
        content: "Live streams, giveaways and CS2 content from TROLE.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const status = useLiveStatus();
  const isLive = !!status?.is_live;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LoadingScreen />
      <Navbar isLive={isLive} />
      <main>
        <HeroSection status={status} />
        {isLive && <LiveStatusCard status={status} />}
        <GiveawaySection />
        <BonusesSection />
        <SocialSection />
      </main>
      <footer className="border-t border-border py-10 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} TROLE. All rights reserved.</p>
        <p className="mt-2">
          Please gamble responsibly.{" "}
          <a
            href="https://www.gambleaware.org"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            gambleaware.org
          </a>
        </p>
      </footer>
      <FloatingPlayer hidden={isLive} />
    </div>
  );
}
