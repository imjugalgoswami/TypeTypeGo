import { TypingAreaProps } from "../types";

export const TypingArea: React.FC<TypingAreaProps> = ({ lines, userInput, showCursor }) => {
    return (
      <div className="max-w-7xl mx-auto text-center mt-2 mb-8">
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
    );
  };