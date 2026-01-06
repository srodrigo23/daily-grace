import { motion } from "framer-motion";
import { Sun, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DailyReflectionCardProps {
  onStart: () => void;
}

const todaysReflection = {
  verse: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
  reference: "Jeremiah 29:11",
  theme: "Hope",
};

export function DailyReflectionCard({ onStart }: DailyReflectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="featured" className="overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sun className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">Today's Reflection</p>
              <p className="text-xs text-muted-foreground">{todaysReflection.theme}</p>
            </div>
          </div>
          
          <blockquote className="mb-4">
            <p className="font-display text-xl leading-relaxed text-foreground">
              "{todaysReflection.verse}"
            </p>
            <footer className="mt-2 text-sm text-muted-foreground">
              — {todaysReflection.reference}
            </footer>
          </blockquote>
          
          <Button variant="gold" className="w-full" size="lg" onClick={onStart}>
            Begin Reflection
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
