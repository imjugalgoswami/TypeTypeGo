import { ResultCardProps, ResultsDialogProps } from "../types";
import { Dialog } from "./Dialog";

export const ResultsDialog: React.FC<ResultsDialogProps> = ({ 
    open, 
    onClose, 
    results, 
    onTryAgain 
  }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <div className="text-gray-200 text-xl mb-6">Test Complete!</div>
        <div className="grid grid-cols-2 gap-4">
          <ResultCard label="WPM" value={results.wpm} />
          <ResultCard label="Accuracy" value={`${results.accuracy}%`} />
          <ResultCard label="Words" value={results.words} />
          <ResultCard label="Characters" value={results.characters} />
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={onTryAgain}
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </Dialog>
    );
  };

  
  const ResultCard: React.FC<ResultCardProps> = ({ label, value }) => (
    <div className="text-center p-4 bg-[#0a192f] rounded">
      <div className="text-3xl text-yellow-500">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );