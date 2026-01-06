import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { HomeView } from "@/components/HomeView";
import { PathsView } from "@/components/PathsView";
import { ReadView } from "@/components/ReadView";
import { ProfileView } from "@/components/ProfileView";
import { QuizExperience } from "@/components/QuizExperience";
import heroLight from "@/assets/hero-light.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showQuiz, setShowQuiz] = useState(false);

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  const handleCompleteQuiz = () => {
    setShowQuiz(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeView onStartQuiz={handleStartQuiz} />;
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
    </div>
  );
};

export default Index;
