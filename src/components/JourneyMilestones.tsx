import { motion } from "framer-motion";
import { BookOpen, Heart, Compass, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Milestone {
  icon: typeof BookOpen;
  label: string;
  description: string;
  color: string;
  achieved: boolean;
}

const milestones: Milestone[] = [
  { 
    icon: BookOpen, 
    label: "Seeker", 
    description: "Started your journey",
    color: "text-sage", 
    achieved: true 
  },
  { 
    icon: Heart, 
    label: "Reflector", 
    description: "Explored daily reflections",
    color: "text-terracotta", 
    achieved: true 
  },
  { 
    icon: Compass, 
    label: "Explorer", 
    description: "Began a spiritual path",
    color: "text-primary", 
    achieved: true 
  },
  { 
    icon: Sparkles, 
    label: "Growing", 
    description: "Deepening in faith",
    color: "text-muted-foreground", 
    achieved: false 
  },
];

export function JourneyMilestones() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {milestones.map((milestone, index) => (
        <motion.div
          key={milestone.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card 
            variant="default" 
            className={`border-0 ${milestone.achieved ? 'bg-muted/50' : 'bg-muted/20'}`}
          >
            <CardContent className="flex flex-col items-center p-3">
              <milestone.icon 
                className={`h-5 w-5 ${milestone.achieved ? milestone.color : 'text-muted-foreground/40'}`} 
              />
              <span className={`mt-1 text-xs font-medium ${milestone.achieved ? 'text-foreground' : 'text-muted-foreground/40'}`}>
                {milestone.label}
              </span>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
