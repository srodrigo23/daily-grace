import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: number;
  verse: string;
  reference: string;
  question: string;
  options: string[];
  reflection: string;
}

const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    verse: "Cast all your anxiety on him because he cares for you.",
    reference: "1 Peter 5:7",
    question: "When facing anxiety, what feels most natural to you?",
    options: [
      "I try to control every detail myself",
      "I share my worries with friends or family",
      "I pray and try to trust God's plan",
      "I avoid thinking about what worries me",
    ],
    reflection: "God invites us to release our burdens to Him. No matter how you answered, know that learning to trust is a journey.",
  },
  {
    id: 2,
    verse: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
    reference: "Ephesians 4:32",
    question: "Think of someone who has hurt you. Which response resonates most?",
    options: [
      "I've fully forgiven them and moved on",
      "I'm working on forgiveness but it's hard",
      "I struggle to even consider forgiving",
      "I'm not sure what true forgiveness looks like",
    ],
    reflection: "Forgiveness is not about forgetting, but about freeing yourself. Christ's forgiveness of us shows us the way.",
  },
  {
    id: 3,
    verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
    question: "How does knowing God's love affect your daily life?",
    options: [
      "It gives me peace and confidence",
      "I believe it but don't always feel it",
      "I struggle to accept I'm truly loved",
      "I'm still exploring what this means",
    ],
    reflection: "God's love is unconditional and ever-present. Feeling it may take time, but His love remains constant.",
  },
];

interface QuizExperienceProps {
  onClose: () => void;
  onComplete: () => void;
}

export function QuizExperience({ onClose, onComplete }: QuizExperienceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showReflection, setShowReflection] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const question = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleContinue = () => {
    if (selectedOption === null) return;

    if (!showReflection) {
      setShowReflection(true);
    } else {
      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowReflection(false);
      } else {
        setIsComplete(true);
      }
    }
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-gold"
        >
          <CheckCircle2 className="h-12 w-12 text-primary-foreground" />
        </motion.div>
        
        <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
          Beautiful Reflection
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          You've taken time to connect with Scripture today. May these words stay with you.
        </p>
        
        <div className="flex w-full flex-col gap-3">
          <Button variant="gold" size="lg" className="w-full" onClick={onComplete}>
            <Heart className="h-4 w-4" />
            Complete
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </button>
        <Progress value={progress} variant="gold" className="mx-4 flex-1" size="sm" />
        <span className="text-sm text-muted-foreground">
          {currentQuestion + 1}/{sampleQuestions.length}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Verse */}
            <div className="mb-8 mt-4 rounded-2xl bg-gold-light p-6">
              <blockquote className="font-display text-xl leading-relaxed text-foreground">
                "{question.verse}"
              </blockquote>
              <footer className="mt-3 text-sm text-muted-foreground">
                — {question.reference}
              </footer>
            </div>

            {/* Question */}
            <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleOptionSelect(index)}
                  className={cn(
                    "w-full rounded-xl border-2 p-4 text-left transition-all duration-200",
                    selectedOption === index
                      ? "border-primary bg-gold-light"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <span className="text-sm text-foreground">{option}</span>
                </motion.button>
              ))}
            </div>

            {/* Reflection */}
            <AnimatePresence>
              {showReflection && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-2xl bg-sage-light p-5"
                >
                  <p className="text-sm leading-relaxed text-foreground">
                    💭 {question.reflection}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 p-4 backdrop-blur-sm safe-area-pb">
        <Button
          variant="gold"
          size="lg"
          className="w-full"
          onClick={handleContinue}
          disabled={selectedOption === null}
        >
          {showReflection ? (
            currentQuestion < sampleQuestions.length - 1 ? (
              <>
                Next Question
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              "Finish Reflection"
            )
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
}
