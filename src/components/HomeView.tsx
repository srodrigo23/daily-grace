import { useState } from "react";
import { motion } from "framer-motion";
import { DailyReflectionCard } from "@/components/DailyReflectionCard";
import { PathCard, SpiritualPath } from "@/components/PathCard";
import { StatsRow } from "@/components/StatsRow";
import { QuizExperience } from "@/components/QuizExperience";

const spiritualPaths: SpiritualPath[] = [
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
];

interface HomeViewProps {
  onStartQuiz: () => void;
}

export function HomeView({ onStartQuiz }: HomeViewProps) {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-muted-foreground">Good morning</p>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Begin with peace
        </h1>
      </motion.div>

      {/* Stats */}
      <StatsRow />

      {/* Daily Reflection */}
      <DailyReflectionCard onStart={onStartQuiz} />

      {/* Spiritual Paths */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Continue Your Journey
          </h2>
        </div>
        <div className="grid gap-4">
          {spiritualPaths.map((path) => (
            <PathCard
              key={path.id}
              path={path}
              onClick={() => onStartQuiz()}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
