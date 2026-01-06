import { motion } from "framer-motion";
import { Flame, BookOpen, Trophy, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Stat {
  icon: typeof Flame;
  label: string;
  value: string | number;
  color: string;
}

const stats: Stat[] = [
  { icon: Flame, label: "Day Streak", value: 7, color: "text-terracotta" },
  { icon: BookOpen, label: "Verses Read", value: 45, color: "text-sage" },
  { icon: Trophy, label: "Paths Done", value: 2, color: "text-primary" },
  { icon: Calendar, label: "This Week", value: "5/7", color: "text-muted-foreground" },
];

export function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card variant="default" className="border-0 bg-muted/50">
            <CardContent className="flex flex-col items-center p-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="mt-1 text-lg font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {stat.label}
              </span>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
