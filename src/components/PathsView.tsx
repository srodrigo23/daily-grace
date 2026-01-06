import { motion } from "framer-motion";
import { PathCard, SpiritualPath } from "@/components/PathCard";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const allPaths: SpiritualPath[] = [
  {
    id: "hope",
    title: "Finding Hope",
    description: "Discover God's promises for your future and learn to trust in His plan.",
    icon: "🌅",
    progress: 60,
    totalLessons: 10,
    completedLessons: 6,
    isPremium: false,
    color: "gold",
  },
  {
    id: "forgiveness",
    title: "The Path of Forgiveness",
    description: "Experience freedom through the transformative power of forgiveness.",
    icon: "🕊️",
    progress: 30,
    totalLessons: 8,
    completedLessons: 2,
    isPremium: false,
    color: "sage",
  },
  {
    id: "fear",
    title: "Overcoming Fear",
    description: "Find courage and peace through Scripture when facing life's challenges.",
    icon: "🛡️",
    progress: 100,
    totalLessons: 8,
    completedLessons: 8,
    isPremium: false,
    color: "gold",
  },
  {
    id: "faith",
    title: "Growing in Faith",
    description: "Strengthen your trust in God through daily spiritual practices.",
    icon: "🌱",
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    isPremium: true,
    color: "terracotta",
  },
  {
    id: "jesus-teachings",
    title: "Words of Jesus",
    description: "Deep dive into the teachings of Christ and their meaning for today.",
    icon: "✨",
    progress: 0,
    totalLessons: 15,
    completedLessons: 0,
    isPremium: true,
    color: "sage",
  },
  {
    id: "love",
    title: "Understanding Love",
    description: "Explore the many dimensions of God's love and how to share it.",
    icon: "❤️",
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    isPremium: true,
    color: "terracotta",
  },
];

interface PathsViewProps {
  onSelectPath: () => void;
}

export function PathsView({ onSelectPath }: PathsViewProps) {
  const freePaths = allPaths.filter((p) => !p.isPremium);
  const premiumPaths = allPaths.filter((p) => p.isPremium);

  return (
    <div className="space-y-6 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold text-foreground">
          Spiritual Paths
        </h1>
        <p className="text-muted-foreground">
          Choose a journey that speaks to your heart
        </p>
      </motion.div>

      {/* Free Paths */}
      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
          Your Paths
        </h2>
        <div className="grid gap-4">
          {freePaths.map((path) => (
            <PathCard key={path.id} path={path} onClick={onSelectPath} />
          ))}
        </div>
      </section>

      {/* Premium CTA */}
      <Card variant="featured" className="overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Unlock Premium Paths
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Go deeper with exclusive spiritual journeys and advanced reflections.
              </p>
              <Button variant="gold" size="sm" className="mt-3">
                Explore Premium
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Paths */}
      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
          Premium Journeys
        </h2>
        <div className="grid gap-4">
          {premiumPaths.map((path) => (
            <PathCard key={path.id} path={path} onClick={onSelectPath} />
          ))}
        </div>
      </section>
    </div>
  );
}
