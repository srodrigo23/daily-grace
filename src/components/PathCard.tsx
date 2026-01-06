import { motion } from "framer-motion";
import { Lock, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface SpiritualPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  isPremium: boolean;
  color: "gold" | "sage" | "terracotta";
}

interface PathCardProps {
  path: SpiritualPath;
  onClick: () => void;
}

const colorClasses = {
  gold: "bg-gold-light border-gold/20",
  sage: "bg-sage-light border-sage/20",
  terracotta: "bg-terracotta-light border-terracotta/20",
};

const progressVariants = {
  gold: "gold" as const,
  sage: "sage" as const,
  terracotta: "gold" as const,
};

export function PathCard({ path, onClick }: PathCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        variant="interactive"
        className={cn("relative overflow-hidden", colorClasses[path.color])}
        onClick={onClick}
      >
        {path.isPremium && (
          <div className="absolute right-3 top-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-3 w-3 text-primary" />
            </div>
          </div>
        )}
        
        <CardContent className="p-5">
          <div className="mb-3 text-3xl">{path.icon}</div>
          
          <h3 className="font-display text-xl font-semibold text-foreground">
            {path.title}
          </h3>
          
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {path.description}
          </p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {path.completedLessons} of {path.totalLessons} lessons
              </span>
              {path.progress === 100 && (
                <Check className="h-4 w-4 text-sage" />
              )}
            </div>
            <Progress
              value={path.progress}
              variant={progressVariants[path.color]}
              size="sm"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
