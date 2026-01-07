import { motion } from "framer-motion";
import { Settings, ChevronRight, Heart, Crown, Bell, Gift, BookOpen, Compass, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface JourneyHighlight {
  icon: typeof BookOpen;
  title: string;
  description: string;
  color: string;
}

const journeyHighlights: JourneyHighlight[] = [
  {
    icon: BookOpen,
    title: "Finding Hope",
    description: "Currently exploring",
    color: "text-primary",
  },
  {
    icon: Compass,
    title: "Forgiveness",
    description: "Recently visited",
    color: "text-sage",
  },
  {
    icon: Sparkles,
    title: "Daily Reflections",
    description: "Part of your journey",
    color: "text-terracotta",
  },
];

export function ProfileView() {
  return (
    <div className="space-y-6 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Your Journey
          </h1>
          <p className="text-muted-foreground">Growing in faith, at your pace</p>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Journey Highlights */}
      <Card variant="gold">
        <CardContent className="p-5">
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
            Your Spiritual Journey
          </h3>
          <div className="space-y-3">
            {journeyHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/50">
                  <highlight.icon className={`h-5 w-5 ${highlight.color}`} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{highlight.title}</p>
                  <p className="text-xs text-muted-foreground">{highlight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reflection Card */}
      <Card variant="default">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-terracotta" />
            <div>
              <p className="font-medium text-foreground">Your Reflection Space</p>
              <p className="text-sm text-muted-foreground">
                This journey is personal. Take each step at your own pace, 
                without pressure or comparison.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Upgrade */}
      <Card variant="featured" className="overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Go Deeper
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Unlock all spiritual paths, deeper reflections, and extended content for your journey.
              </p>
              <Button variant="gold" size="sm" className="mt-3">
                Explore Premium
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2">
        {[
          { icon: Bell, label: "Gentle Reminders", desc: "Optional daily invitation" },
          { icon: Gift, label: "Support the Mission", desc: "Help others discover faith" },
          { icon: Heart, label: "Share with Friends", desc: "Invite someone on this journey" },
        ].map((item) => (
          <Card key={item.label} variant="interactive">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
