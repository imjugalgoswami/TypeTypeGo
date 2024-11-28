import { useState, useEffect } from 'react';

export const useTypingTest = (initialTime: number, sampleText: string) => {
  const [time, setTime] = useState(initialTime);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let interval: number;
    
    if (isRunning && timeLeft !== null && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setShowResults(true);
    }
    
    return () => window.clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTest = (initialChar: string = '') => {
    setTimeLeft(time);
    setIsRunning(true);
    setUserInput(initialChar);
    setShowResults(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) return;

    if (showResults) {
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        startTest();
      }
      return;
    }

    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      startTest();
      return;
    }

    if (!isRunning && !showResults && e.key.length === 1) {
      startTest(e.key);
      return;
    }

    if (isRunning) {
      if (e.key.length === 1 && userInput.length < sampleText.length) {
        setUserInput(prev => prev + e.key);
      } else if (e.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, time, showResults, userInput.length, sampleText]);

  return {
    time,
    setTime,
    timeLeft,
    isRunning,
    userInput,
    showResults,
    setShowResults,
    startTest,
  };
};