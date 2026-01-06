import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Sparkles, ChevronRight, Lock, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlayViewProps {
  onStartQuiz: (mode: "book" | "theme", selection: string) => void;
}

const bibleBooks = [
  { id: "genesis", name: "Genesis", questions: 12, premium: false },
  { id: "psalms", name: "Psalms", questions: 20, premium: false },
  { id: "proverbs", name: "Proverbs", questions: 15, premium: false },
  { id: "matthew", name: "Matthew", questions: 18, premium: false },
  { id: "john", name: "John", questions: 16, premium: false },
  { id: "romans", name: "Romans", questions: 14, premium: true },
  { id: "james", name: "James", questions: 10, premium: true },
  { id: "revelation", name: "Revelation", questions: 12, premium: true },
];

const themes = [
  { id: "faith", name: "Faith", icon: "✨", questions: 15, premium: false, color: "bg-gold-light" },
  { id: "hope", name: "Hope", icon: "🌅", questions: 12, premium: false, color: "bg-sage-light" },
  { id: "forgiveness", name: "Forgiveness", icon: "💝", questions: 14, premium: false, color: "bg-terracotta-light" },
  { id: "fear", name: "Overcoming Fear", icon: "🦁", questions: 10, premium: false, color: "bg-gold-light" },
  { id: "love", name: "God's Love", icon: "❤️", questions: 18, premium: true, color: "bg-sage-light" },
  { id: "purpose", name: "Finding Purpose", icon: "🎯", questions: 16, premium: true, color: "bg-terracotta-light" },
  { id: "peace", name: "Inner Peace", icon: "🕊️", questions: 12, premium: true, color: "bg-gold-light" },
  { id: "jesus", name: "Jesus' Teachings", icon: "✝️", questions: 20, premium: true, color: "bg-sage-light" },
];

type TabType = "books" | "themes";

export function PlayView({ onStartQuiz }: PlayViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("themes");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-gold shadow-glow"
        >
          <Play className="h-8 w-8 text-primary-foreground" fill="currentColor" />
        </motion.div>
        <h1 className="font-display text-3xl font-bold text-foreground">Play</h1>
        <p className="mt-1 text-muted-foreground">Choose your journey</p>
      </div>

      {/* Tab Selector */}
      <div className="flex gap-2 rounded-xl bg-muted p-1">
        <button
          onClick={() => setActiveTab("themes")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-all",
            activeTab === "themes"
              ? "bg-card text-foreground shadow-soft"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Sparkles className="h-4 w-4" />
          By Theme
        </button>
        <button
          onClick={() => setActiveTab("books")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-all",
            activeTab === "books"
              ? "bg-card text-foreground shadow-soft"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Book className="h-4 w-4" />
          By Book
        </button>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-3"
      >
        {activeTab === "themes" ? (
          <>
            <p className="text-sm text-muted-foreground">
              Explore Scripture through life themes and emotions
            </p>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme, index) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={cn(
                      "group cursor-pointer border-2 transition-all duration-200 hover:shadow-card",
                      theme.premium
                        ? "border-border hover:border-muted-foreground"
                        : "border-border hover:border-primary"
                    )}
                    onClick={() => !theme.premium && onStartQuiz("theme", theme.id)}
                  >
                    <CardContent className="p-4">
                      <div className={cn("mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-2xl", theme.color)}>
                        {theme.icon}
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">{theme.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {theme.questions} questions
                          </p>
                        </div>
                        {theme.premium ? (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Dive deep into individual books of the Bible
            </p>
            <div className="space-y-2">
              {bibleBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={cn(
                      "group cursor-pointer border-2 transition-all duration-200 hover:shadow-soft",
                      book.premium
                        ? "border-border hover:border-muted-foreground"
                        : "border-border hover:border-primary"
                    )}
                    onClick={() => !book.premium && onStartQuiz("book", book.id)}
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-light">
                          <Book className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{book.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {book.questions} questions
                          </p>
                        </div>
                      </div>
                      {book.premium ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Premium CTA */}
      <Card className="border-2 border-primary/20 bg-gold-light">
        <CardContent className="p-4 text-center">
          <Lock className="mx-auto mb-2 h-5 w-5 text-primary" />
          <h3 className="font-display text-lg font-semibold text-foreground">
            Unlock All Content
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Get access to all books, themes, and deeper reflections
          </p>
          <button className="mt-3 rounded-full bg-gradient-gold px-6 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-105">
            Go Premium
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
