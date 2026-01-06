import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, BookOpen, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BibleReading {
  book: string;
  chapter: number;
  verses: { number: number; text: string }[];
}

const sampleReading: BibleReading = {
  book: "Psalm",
  chapter: 23,
  verses: [
    { number: 1, text: "The Lord is my shepherd; I shall not want." },
    { number: 2, text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
    { number: 3, text: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
    { number: 4, text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
    { number: 5, text: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over." },
    { number: 6, text: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever." },
  ],
};

const suggestedReadings = [
  { book: "John", chapter: 3, title: "God's Love for the World" },
  { book: "Romans", chapter: 8, title: "Life Through the Spirit" },
  { book: "Matthew", chapter: 5, title: "The Beatitudes" },
  { book: "1 Corinthians", chapter: 13, title: "The Way of Love" },
];

export function ReadView() {
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold text-foreground">
          Read Scripture
        </h1>
        <p className="text-muted-foreground">
          Take time to dwell in God's Word
        </p>
      </motion.div>

      {/* Current Reading */}
      <Card variant="default">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-semibold text-foreground">
                {sampleReading.book} {sampleReading.chapter}
              </h2>
            </div>
            <Button variant="ghost" size="icon">
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {sampleReading.verses.map((verse) => (
              <motion.p
                key={verse.number}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: verse.number * 0.1 }}
                className={`cursor-pointer leading-relaxed transition-all duration-200 ${
                  selectedVerse === verse.number
                    ? "rounded-lg bg-gold-light px-3 py-2 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setSelectedVerse(verse.number === selectedVerse ? null : verse.number)}
              >
                <sup className="mr-1 text-xs text-primary">{verse.number}</sup>
                {verse.text}
              </motion.p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Readings */}
      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
          Suggested Readings
        </h2>
        <div className="space-y-3">
          {suggestedReadings.map((reading, index) => (
            <motion.div
              key={`${reading.book}-${reading.chapter}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="interactive">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium text-foreground">
                      {reading.book} {reading.chapter}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {reading.title}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
