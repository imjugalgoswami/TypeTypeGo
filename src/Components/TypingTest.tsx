import React, { useState, useEffect } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SimpleDialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a2942] border border-gray-700 rounded-lg p-6 max-w-md w-full relative">
        {children}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const TypingTest: React.FC = () => {
  const [time, setTime] = useState<number>(30);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const sampleText = "only govern little find think and plan year another state program one develop public same year know say only which child who must day way large little interest govern well people both and school";
  const CHARS_PER_LINE = 50;
  
  const lines = React.useMemo(() => {
    const words = sampleText.split(' ');
    const result: string[] = [];
    let currentLine = '';

    words.forEach(word => {
      if (currentLine.length + word.length + 1 <= CHARS_PER_LINE) {
        currentLine += (currentLine.length === 0 ? '' : ' ') + word;
      } else {
        result.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine.length > 0) {
      result.push(currentLine);
    }

    return result;
  }, [sampleText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setShowResults(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTest = (initialChar: string = '') => {
    setTimeLeft(time);
    setIsRunning(true);
    setUserInput(initialChar);
    setShowResults(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) return;

      // If results are showing, only allow Shift+Enter to start new test
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
        if (e.key.length === 1) {
          setUserInput(prev => prev + e.key);
        } else if (e.key === 'Backspace') {
          setUserInput(prev => prev.slice(0, -1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, time, showResults]);

  const calculateResults = () => {
    const totalCharacters = userInput.length;
    const words = userInput.trim().split(/\s+/).length;
    const wpm = Math.round((words / time) * 60);
    
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === sampleText[i]) {
        correctChars++;
      }
    }
    const accuracy = totalCharacters > 0 ? Math.round((correctChars / totalCharacters) * 100) : 0;

    return { wpm, accuracy, words, characters: totalCharacters };
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-300 p-8 font-mono">
      <div className="flex justify-center gap-4 mb-8">
        <div className="flex items-center gap-2 px-3 py-2 rounded bg-[#1a2942] cursor-pointer">
          <span className="text-orange-700">⏱</span>
          <span className="text-gray-400">time</span>
        </div>
        <div className="flex items-center gap-4 px-4 py-2 rounded bg-[#1a2942]">
          <span 
            onClick={() => setTime(15)}
            className={`cursor-pointer ${time === 15 ? 'text-orange-700' : 'text-gray-600'}`}
          >
            15
          </span>
          <span 
            onClick={() => setTime(30)}
            className={`cursor-pointer ${time === 30 ? 'text-orange-700' : 'text-gray-600'}`}
          >
            30
          </span>
          <span 
            onClick={() => setTime(60)}
            className={`cursor-pointer ${time === 60 ? 'text-orange-700' : 'text-gray-600'}`}
          >
            60
          </span>
        </div>
      </div>

      <div className="h-8 text-center mb-4">
        {isRunning && timeLeft !== null && (
          <div className="text-2xl text-orange-700">
            {timeLeft}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto text-center mb-8">
        <div className="text-4xl leading-normal tracking-wide text-gray-600 whitespace-pre-line">
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="leading-normal">
              {line.split('').map((char, charIndex) => {
                let globalIndex = 0;
                for (let i = 0; i < lineIndex; i++) {
                  globalIndex += lines[i].length + 1;
                }
                globalIndex += charIndex;

                if (globalIndex < userInput.length) {
                  return (
                    <span 
                      key={charIndex}
                      className={userInput[globalIndex] === char ? 'text-gray-300' : 'text-red-500'}
                    >
                      {char}
                    </span>
                  );
                }
                return (
                  <span 
                    key={charIndex} 
                    className={`relative ${
                      globalIndex === userInput.length ? 
                      (showCursor ? 'before:content-[""] before:absolute before:h-8 before:w-[2px] before:bg-orange-700 before:left-0 before:top-1/2 before:-translate-y-1/2' : '') 
                      : ''
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
              {lineIndex < lines.length - 1 && ' '}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500">
        <span className="px-2 py-1 bg-[#1a2942] rounded">shift</span>
        +
        <span className="px-2 py-1 bg-[#1a2942] rounded ml-2">enter</span>
        <span className="ml-2">- Start Test</span>
      </div>

      <SimpleDialog open={showResults} onClose={() => setShowResults(false)}>
        <div className="text-gray-200 text-xl mb-6">Test Complete!</div>
        <div className="grid grid-cols-2 gap-4">
          {(() => {
            const results = calculateResults();
            return (
              <>
                <div className="text-center p-4 bg-[#0a192f] rounded">
                  <div className="text-3xl text-yellow-500">{results.wpm}</div>
                  <div className="text-gray-400 text-sm">WPM</div>
                </div>
                <div className="text-center p-4 bg-[#0a192f] rounded">
                  <div className="text-3xl text-yellow-500">{results.accuracy}%</div>
                  <div className="text-gray-400 text-sm">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-[#0a192f] rounded">
                  <div className="text-3xl text-yellow-500">{results.words}</div>
                  <div className="text-gray-400 text-sm">Words</div>
                </div>
                <div className="text-center p-4 bg-[#0a192f] rounded">
                  <div className="text-3xl text-yellow-500">{results.characters}</div>
                  <div className="text-gray-400 text-sm">Characters</div>
                </div>
              </>
            );
          })()}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              setShowResults(false);
            }}
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </SimpleDialog>
    </div>
  );
};

export default TypingTest;