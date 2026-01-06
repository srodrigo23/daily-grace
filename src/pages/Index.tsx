import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { HomeView } from "@/components/HomeView";
import { PlayView } from "@/components/PlayView";
import { PathsView } from "@/components/PathsView";
import { ReadView } from "@/components/ReadView";
import { ProfileView } from "@/components/ProfileView";
import { QuizExperience } from "@/components/QuizExperience";
import { PlayQuizExperience } from "@/components/PlayQuizExperience";
import heroLight from "@/assets/hero-light.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPlayQuiz, setShowPlayQuiz] = useState(false);
  const [playQuizMode, setPlayQuizMode] = useState<"book" | "theme">("theme");
  const [playQuizSelection, setPlayQuizSelection] = useState("");

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  const handleCompleteQuiz = () => {
    setShowQuiz(false);
  };

  const handleStartPlayQuiz = (mode: "book" | "theme", selection: string) => {
    setPlayQuizMode(mode);
    setPlayQuizSelection(selection);
    setShowPlayQuiz(true);
  };

  const handleClosePlayQuiz = () => {
    setShowPlayQuiz(false);
  };

  const handleCompletePlayQuiz = () => {
    setShowPlayQuiz(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeView onStartQuiz={handleStartQuiz} />;
      case "play":
        return <PlayView onStartQuiz={handleStartPlayQuiz} />;
      case "paths":
        return <PathsView onSelectPath={handleStartQuiz} />;
      case "read":
        return <ReadView />;
      case "profile":
        return <ProfileView />;
      default:
        return <HomeView onStartQuiz={handleStartQuiz} />;
    }
  };

  return (
    <div className="min-h-screen bg-warm">
      {/* Subtle background image overlay */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url(${heroLight})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Main content */}
      <main className="relative mx-auto max-w-md px-4 pb-24 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Quiz Experience Modal */}
      <AnimatePresence>
        {showQuiz && (
          <QuizExperience onClose={handleCloseQuiz} onComplete={handleCompleteQuiz} />
        )}
      </AnimatePresence>

      {/* Play Quiz Experience Modal */}
      <AnimatePresence>
        {showPlayQuiz && (
          <PlayQuizExperience
            mode={playQuizMode}
            selection={playQuizSelection}
            onClose={handleClosePlayQuiz}
            onComplete={handleCompletePlayQuiz}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
