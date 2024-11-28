import React, { useEffect, useState } from 'react';
import { TimeSelector } from './TimeSelector';
import { TypingArea } from './TypingArea';
import { ResultsDialog } from './ResultsDialog';
import { useTypingTest } from '../hooks/useTypingTest';
import { formatTextIntoLines, calculateResults } from '../utils/calculations';
import CircularTimer from './CircularTimer';

const CHARS_PER_LINE = 50;
const SAMPLE_TEXT = "only govern little find think and plan year another state program one develop public same year know say only which child who must day way large little interest govern well people both and school";

const TypingTest: React.FC = () => {
  const [showCursor, setShowCursor] = useState(true);
  
  const {
    time,
    setTime,
    timeLeft,
    isRunning,
    userInput,
    showResults,
    setShowResults,
    startTest,
  } = useTypingTest(30, SAMPLE_TEXT);

  const lines = React.useMemo(() => 
    formatTextIntoLines(SAMPLE_TEXT, CHARS_PER_LINE), 
    [SAMPLE_TEXT]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const results = calculateResults(userInput, SAMPLE_TEXT, time);

  const handleTryAgain = () => {
    setShowResults(false);
    startTest(); 
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-300 p-8 font-mono">
      <TimeSelector selectedTime={time} onTimeSelect={setTime} />
      
      <CircularTimer 
        isRunning={isRunning}
        timeLeft={timeLeft}
        totalTime={time}
      />

      <TypingArea 
        lines={lines}
        userInput={userInput}
        showCursor={showCursor}
      />

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500">
        <span className="px-2 py-1 bg-[#1a2942] rounded">shift</span>
        +
        <span className="px-2 py-1 bg-[#1a2942] rounded ml-2">enter</span>
        <span className="ml-2">- Start Test</span>
      </div>

      <ResultsDialog 
        open={showResults}
        onClose={() => setShowResults(false)}
        results={results}
        onTryAgain={handleTryAgain}
      />
    </div>
  );
};

export default TypingTest;