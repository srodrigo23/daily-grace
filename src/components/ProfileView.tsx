import { motion } from "framer-motion";
import { Settings, ChevronRight, Heart, Crown, Bell, Moon, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
          <p className="text-muted-foreground">7 day streak 🔥</p>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Progress Overview */}
      <Card variant="gold">
        <CardContent className="p-5">
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
            Weekly Progress
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <div key={`${day}-${index}`} className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                    index < 5
                      ? "bg-gradient-gold text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index < 5 ? "✓" : day}
                </div>
                <span className="text-xs text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card variant="default">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Reflections</span>
            <span className="font-semibold text-foreground">47</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Verses Explored</span>
            <span className="font-semibold text-foreground">128</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Paths Completed</span>
            <span className="font-semibold text-foreground">2 of 6</span>
          </div>
          <Progress value={33} variant="gold" />
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
                Go Premium
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Unlock all spiritual paths, deeper reflections, and exclusive content.
              </p>
              <Button variant="gold" size="sm" className="mt-3">
                Upgrade Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2">
        {[
          { icon: Bell, label: "Reminders", desc: "Daily notification" },
          { icon: Gift, label: "Support the Mission", desc: "Make a donation" },
          { icon: Heart, label: "Share with Friends", desc: "Spread the word" },
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
