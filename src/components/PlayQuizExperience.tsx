import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Heart, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type QuestionType = "multiple" | "truefalse" | "reflection";

interface PlayQuestion {
  id: number;
  type: QuestionType;
  verse: string;
  reference: string;
  question: string;
  options: string[];
  correctAnswer?: number; // For multiple choice and true/false
  explanation: string;
  reflection: string;
}

// Questions organized by theme
const themeQuestions: Record<string, PlayQuestion[]> = {
  faith: [
    {
      id: 1,
      type: "multiple",
      verse: "Now faith is confidence in what we hope for and assurance about what we do not see.",
      reference: "Hebrews 11:1",
      question: "According to this verse, faith is best described as:",
      options: [
        "Believing only what we can prove",
        "Confidence in unseen hopes",
        "Following religious traditions",
        "Having no doubts ever",
      ],
      correctAnswer: 1,
      explanation: "Faith is described as confidence and assurance in what we cannot see with our eyes.",
      reflection: "Consider today: where might God be inviting you to trust beyond what you can see?",
    },
    {
      id: 2,
      type: "truefalse",
      verse: "For we walk by faith, not by sight.",
      reference: "2 Corinthians 5:7",
      question: "Walking by faith means we must have complete understanding before taking steps forward.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False! Walking by faith means trusting God's guidance even when we don't fully understand.",
      reflection: "What step might God be asking you to take today, even without full clarity?",
    },
    {
      id: 3,
      type: "reflection",
      verse: "I have fought the good fight, I have finished the race, I have kept the faith.",
      reference: "2 Timothy 4:7",
      question: "What does 'keeping the faith' look like in your daily life?",
      options: [
        "Attending church regularly",
        "Trusting God through challenges",
        "Sharing my beliefs with others",
        "All of these in different seasons",
      ],
      explanation: "Keeping faith is a journey that looks different for everyone, encompassing worship, trust, and witness.",
      reflection: "How has your faith been tested recently? How did you respond?",
    },
  ],
  hope: [
    {
      id: 1,
      type: "multiple",
      verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
      reference: "Jeremiah 29:11",
      question: "What does God promise about His plans for us?",
      options: [
        "They will always be easy",
        "They include hope and a future",
        "We will never face difficulties",
        "We will become wealthy",
      ],
      correctAnswer: 1,
      explanation: "God's plans are for our welfare, including hope and a future, though this doesn't mean no challenges.",
      reflection: "In what area of your life do you need to trust God's bigger plan today?",
    },
    {
      id: 2,
      type: "truefalse",
      verse: "Be joyful in hope, patient in affliction, faithful in prayer.",
      reference: "Romans 12:12",
      question: "According to this verse, hope and affliction can coexist.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True! We can be joyful in hope even while being patient in affliction.",
      reflection: "How can you practice hope during a current difficulty in your life?",
    },
    {
      id: 3,
      type: "reflection",
      verse: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
      reference: "Isaiah 40:31",
      question: "What does 'hoping in the Lord' mean to you personally?",
      options: [
        "Waiting passively for change",
        "Active trust while I wait",
        "Expecting miracles daily",
        "Never feeling discouraged",
      ],
      explanation: "Hoping in the Lord combines trust with patient waiting, leading to renewed strength.",
      reflection: "Where in your life do you need God's strength to help you soar?",
    },
  ],
  forgiveness: [
    {
      id: 1,
      type: "multiple",
      verse: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
      reference: "Colossians 3:13",
      question: "What is the standard for how we should forgive others?",
      options: [
        "Only when they apologize first",
        "As the Lord forgave us",
        "When we feel ready",
        "Only minor offenses",
      ],
      correctAnswer: 1,
      explanation: "We are called to forgive as Christ forgave us — fully and graciously.",
      reflection: "Is there someone you've been waiting to forgive? What would it take to begin that journey?",
    },
    {
      id: 2,
      type: "truefalse",
      verse: "For if you forgive other people when they sin against you, your heavenly Father will also forgive you.",
      reference: "Matthew 6:14",
      question: "Forgiving others affects our own relationship with God.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True! Jesus teaches that our willingness to forgive others is connected to our own forgiveness.",
      reflection: "How might unforgiveness be affecting your spiritual life?",
    },
    {
      id: 3,
      type: "reflection",
      verse: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
      reference: "Ephesians 4:32",
      question: "What makes forgiveness most challenging for you?",
      options: [
        "When the hurt was deep",
        "When there's no apology",
        "When I have to see them often",
        "When I'm still healing",
      ],
      explanation: "Forgiveness is a process that takes time, especially with deep wounds. Be patient with yourself.",
      reflection: "What small step could you take today toward healing and forgiveness?",
    },
  ],
  fear: [
    {
      id: 1,
      type: "multiple",
      verse: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
      reference: "2 Timothy 1:7",
      question: "What has God given us instead of fear?",
      options: [
        "Wealth and success",
        "Power, love, and sound mind",
        "Perfect circumstances",
        "Freedom from all problems",
      ],
      correctAnswer: 1,
      explanation: "God equips us with power, love, and a sound mind to face our fears.",
      reflection: "Which of these three — power, love, or sound mind — do you need most today?",
    },
    {
      id: 2,
      type: "truefalse",
      verse: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?",
      reference: "Psalm 27:1",
      question: "This verse suggests that with God as our stronghold, we have reason to not live in fear.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True! When we recognize God as our light, salvation, and stronghold, fear loses its grip.",
      reflection: "What fear in your life needs to be surrendered to God today?",
    },
    {
      id: 3,
      type: "reflection",
      verse: "Even though I walk through the darkest valley, I will fear no evil, for you are with me.",
      reference: "Psalm 23:4",
      question: "In dark times, what helps you remember God is with you?",
      options: [
        "Reading Scripture",
        "Prayer and meditation",
        "Community and friends",
        "Past experiences of His faithfulness",
      ],
      explanation: "God's presence is our greatest comfort in dark times, accessed through many means.",
      reflection: "How can you cultivate awareness of God's presence in your current challenges?",
    },
  ],
};

// Questions organized by book
const bookQuestions: Record<string, PlayQuestion[]> = {
  genesis: [
    {
      id: 1,
      type: "multiple",
      verse: "In the beginning God created the heavens and the earth.",
      reference: "Genesis 1:1",
      question: "What does Genesis reveal as the very first thing?",
      options: [
        "The creation of humanity",
        "God's existence and creative power",
        "The story of Adam and Eve",
        "The fall of mankind",
      ],
      correctAnswer: 1,
      explanation: "The Bible opens by establishing God as the eternal Creator of all things.",
      reflection: "How does recognizing God as Creator change how you see the world around you?",
    },
    {
      id: 2,
      type: "truefalse",
      verse: "Then God said, 'Let us make mankind in our image, in our likeness.'",
      reference: "Genesis 1:26",
      question: "According to Genesis, humans are created in God's image.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True! This establishes the inherent dignity and value of every human being.",
      reflection: "How does being made in God's image affect how you see yourself and others?",
    },
    {
      id: 3,
      type: "reflection",
      verse: "The Lord God said, 'It is not good for the man to be alone. I will make a helper suitable for him.'",
      reference: "Genesis 2:18",
      question: "What does this verse teach about human relationships?",
      options: [
        "We were created for community",
        "Marriage is the only relationship that matters",
        "Being alone is sinful",
        "We don't need God if we have people",
      ],
      explanation: "God designed us for connection and community — we flourish in healthy relationships.",
      reflection: "How are your relationships reflecting God's design for community?",
    },
  ],
  psalms: [
    {
      id: 1,
      type: "multiple",
      verse: "The Lord is my shepherd, I lack nothing.",
      reference: "Psalm 23:1",
      question: "What does calling God our 'shepherd' imply?",
      options: [
        "We are His followers",
        "He provides and guides us",
        "We are weak and helpless",
        "Religion is outdated",
      ],
      correctAnswer: 1,
      explanation: "A shepherd provides, protects, and guides — this is God's relationship with us.",
      reflection: "In what area of life do you need to trust the Shepherd's guidance today?",
    },
    {
      id: 2,
      type: "truefalse",
      verse: "I will praise you, Lord, with all my heart; I will tell of all your wonderful deeds.",
      reference: "Psalm 9:1",
      question: "Praise in the Psalms is typically shown as half-hearted and occasional.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False! The Psalms model wholehearted, enthusiastic praise to God.",
      reflection: "What wonderful deed of God could you praise Him for today?",
    },
    {
      id: 3,
      type: "reflection",
      verse: "Create in me a pure heart, O God, and renew a steadfast spirit within me.",
      reference: "Psalm 51:10",
      question: "What does David's prayer reveal about spiritual growth?",
      options: [
        "We can purify ourselves",
        "God is the one who transforms us",
        "Past sins disqualify us",
        "Perfection is required",
      ],
      explanation: "David acknowledges that true heart change comes from God, not our own efforts.",
      reflection: "What would you ask God to renew or create fresh in your heart today?",
    },
  ],
  matthew: [
    {
      id: 1,
      type: "multiple",
      verse: "Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
      reference: "Matthew 5:3",
      question: "Being 'poor in spirit' refers to:",
      options: [
        "Having no money",
        "Feeling sad or depressed",
        "Recognizing our need for God",
        "Lacking confidence",
      ],
      correctAnswer: 2,
      explanation: "Being poor in spirit means humbly recognizing our spiritual need and dependence on God.",
      reflection: "How does humility open the door to experiencing God's kingdom?",
    },
    {
      id: 2,
      type: "truefalse",
      verse: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
      reference: "Matthew 6:33",
      question: "Jesus teaches that we should prioritize God's kingdom above our material needs.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True! Jesus promises that when we prioritize His kingdom, our needs will be met.",
      reflection: "What would it look like to seek God's kingdom first in your daily decisions?",
    },
    {
      id: 3,
      type: "reflection",
      verse: "Come to me, all you who are weary and burdened, and I will give you rest.",
      reference: "Matthew 11:28",
      question: "What is Jesus offering in this invitation?",
      options: [
        "A vacation from problems",
        "Soul rest and peace",
        "An easy life",
        "Freedom from all responsibility",
      ],
      explanation: "Jesus offers deep soul rest — not absence of work, but peace amid life's demands.",
      reflection: "What burden do you need to bring to Jesus today?",
    },
  ],
  john: [
    {
      id: 1,
      type: "multiple",
      verse: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      reference: "John 1:1",
      question: "Who is 'the Word' referring to in this verse?",
      options: [
        "The Bible",
        "Jesus Christ",
        "The Holy Spirit",
        "The Ten Commandments",
      ],
      correctAnswer: 1,
      explanation: "John identifies Jesus as 'the Word' — eternal, divine, and present at creation.",
      reflection: "How does knowing Jesus is eternal change how you relate to Him?",
    },
    {
      id: 2,
      type: "truefalse",
      verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      reference: "John 3:16",
      question: "According to this verse, God's love is conditional on our behavior.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False! God loved and gave while we were still sinners — His love initiates, not responds.",
      reflection: "How does unconditional love change how you approach God?",
    },
    {
      id: 3,
      type: "reflection",
      verse: "Jesus said to her, 'I am the resurrection and the life. The one who believes in me will live, even though they die.'",
      reference: "John 11:25",
      question: "What hope does this promise give you?",
      options: [
        "Death is not the end",
        "This life is all that matters",
        "We earn eternal life",
        "Only perfect people are saved",
      ],
      explanation: "Jesus offers hope beyond death — eternal life through faith in Him.",
      reflection: "How does the promise of resurrection affect how you live today?",
    },
  ],
  proverbs: [
    {
      id: 1,
      type: "multiple",
      verse: "The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.",
      reference: "Proverbs 1:7",
      question: "What is the foundation of true knowledge according to Proverbs?",
      options: [
        "Higher education",
        "Life experience",
        "Reverent awe of God",
        "Natural intelligence",
      ],
      correctAnswer: 2,
      explanation: "Wisdom begins with properly honoring God — this orients all other learning.",
      reflection: "How does your reverence for God shape your pursuit of knowledge?",
    },
    {
      id: 2,
      type: "truefalse",
      verse: "Trust in the Lord with all your heart and lean not on your own understanding.",
      reference: "Proverbs 3:5",
      question: "This verse encourages us to fully rely on our own reasoning.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False! We're called to trust God's wisdom above our limited understanding.",
      reflection: "Where are you tempted to rely only on your own understanding?",
    },
    {
      id: 3,
      type: "reflection",
      verse: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
      reference: "Proverbs 15:1",
      question: "How does this wisdom apply to your relationships?",
      options: [
        "Avoid all conflict",
        "Speak gently in tense moments",
        "Never express disagreement",
        "Be passive in all situations",
      ],
      explanation: "Gentleness is powerful — it de-escalates conflict and opens hearts.",
      reflection: "Think of a recent difficult conversation. How might gentleness have changed it?",
    },
  ],
};

interface PlayQuizExperienceProps {
  mode: "book" | "theme";
  selection: string;
  onClose: () => void;
  onComplete: () => void;
}

export function PlayQuizExperience({ mode, selection, onClose, onComplete }: PlayQuizExperienceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const questions = useMemo(() => {
    if (mode === "theme") {
      return themeQuestions[selection] || themeQuestions.faith;
    }
    return bookQuestions[selection] || bookQuestions.psalms;
  }, [mode, selection]);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
  };

  const handleContinue = () => {
    if (selectedOption === null) return;

    if (!showResult) {
      setShowResult(true);
    } else {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        setIsComplete(true);
      }
    }
  };

  const getSelectionTitle = () => {
    if (mode === "theme") {
      return selection.charAt(0).toUpperCase() + selection.slice(1);
    }
    return selection.charAt(0).toUpperCase() + selection.slice(1);
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedOption === index
        ? "border-primary bg-gold-light"
        : "border-border bg-card hover:border-primary/50";
    }

    // After showing result - highlight selected answer warmly, show insight gently
    if (selectedOption === index) {
      return "border-primary bg-gold-light";
    }
    if (question.type !== "reflection" && index === question.correctAnswer) {
      return "border-sage/50 bg-sage-light/50";
    }
    return "border-border bg-card opacity-50";
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
          <Heart className="h-12 w-12 text-primary-foreground" />
        </motion.div>

        <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
          Beautiful Reflection
        </h2>
        
        <p className="mb-8 max-w-xs text-center text-muted-foreground">
          You've explored {getSelectionTitle()} with an open heart. May these truths stay with you today.
        </p>

        <div className="flex w-full flex-col gap-3">
          <Button variant="gold" size="lg" className="w-full" onClick={onComplete}>
            <Heart className="h-4 w-4" />
            Continue Your Journey
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
        <div className="flex flex-1 items-center gap-3 px-4">
          <Progress value={progress} variant="gold" className="flex-1" size="sm" />
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1">
          {mode === "theme" ? (
            <Sparkles className="h-4 w-4 text-primary" />
          ) : (
            <BookOpen className="h-4 w-4 text-primary" />
          )}
          <span className="text-xs font-medium text-foreground">{getSelectionTitle()}</span>
        </div>
      </div>

      {/* Question Type Badge */}
      <div className="px-6">
        <span
          className={cn(
            "inline-flex rounded-full px-3 py-1 text-xs font-medium",
            question.type === "multiple" && "bg-gold-light text-primary",
            question.type === "truefalse" && "bg-sage-light text-sage",
            question.type === "reflection" && "bg-terracotta-light text-terracotta"
          )}
        >
          {question.type === "multiple" && "Multiple Choice"}
          {question.type === "truefalse" && "True or False"}
          {question.type === "reflection" && "Reflection"}
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
            <div className="mb-6 mt-4 rounded-2xl bg-gold-light p-5">
              <blockquote className="font-display text-lg leading-relaxed text-foreground">
                "{question.verse}"
              </blockquote>
              <footer className="mt-2 text-sm text-muted-foreground">
                — {question.reference}
              </footer>
            </div>

            {/* Question */}
            <h2 className="mb-5 font-display text-xl font-semibold text-foreground">
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
                  disabled={showResult}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
                    getOptionStyle(index)
                  )}
                >
                  {showResult && question.type !== "reflection" && index === question.correctAnswer && (
                    <Sparkles className="h-5 w-5 shrink-0 text-sage" />
                  )}
                  <span className="text-sm text-foreground">{option}</span>
                </motion.button>
              ))}
            </div>

            {/* Result Feedback */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4"
                >
                  {/* Explanation */}
                  <div className="rounded-2xl bg-gold-light p-4">
                    {question.type !== "reflection" && selectedOption === question.correctAnswer && (
                      <p className="mb-2 flex items-center gap-2 font-medium text-foreground">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Great insight!
                      </p>
                    )}
                    {question.type !== "reflection" && selectedOption !== question.correctAnswer && (
                      <p className="mb-2 flex items-center gap-2 font-medium text-foreground">
                        <Heart className="h-4 w-4 text-terracotta" />
                        Here's another perspective
                      </p>
                    )}
                    <p className="text-sm leading-relaxed text-foreground">
                      {question.explanation}
                    </p>
                  </div>

                  {/* Reflection */}
                  <div className="rounded-2xl bg-muted p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      💭 <span className="font-medium">For reflection:</span> {question.reflection}
                    </p>
                  </div>
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
          {showResult ? (
            currentQuestion < questions.length - 1 ? (
              <>
                Next Question
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              "See Results"
            )
          ) : (
            "Check Answer"
          )}
        </Button>
      </div>
    </div>
  );
}
