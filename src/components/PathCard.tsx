import { motion } from "framer-motion";
import { Lock, Check, CircleDot, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type PathStatus = "not-started" | "started" | "in-progress" | "completed";

export interface SpiritualPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: PathStatus;
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

const statusLabels: Record<PathStatus, string> = {
  "not-started": "Begin this journey",
  "started": "Just beginning",
  "in-progress": "On this path",
  "completed": "Journey complete",
};

const StatusIcon = ({ status }: { status: PathStatus }) => {
  switch (status) {
    case "completed":
      return <Check className="h-4 w-4 text-sage" />;
    case "in-progress":
      return <CircleDot className="h-4 w-4 text-primary" />;
    case "started":
      return <Circle className="h-4 w-4 text-muted-foreground" />;
    default:
      return null;
  }
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
          
          <div className="mt-4 flex items-center gap-2">
            <StatusIcon status={path.status} />
            <span className="text-xs text-muted-foreground">
              {statusLabels[path.status]}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
