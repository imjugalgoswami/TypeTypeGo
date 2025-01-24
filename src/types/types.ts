export interface DialogProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
  
export interface TestResults {
    wpm: number;
    accuracy: number;
    words: number;
    characters: number;
}

export interface TimeSelectorProps {
    selectedTime: number;
    onTimeSelect: (time: number) => void;
}

export interface TypingAreaProps {
    lines: string[];
    userInput: string;
    showCursor: boolean;
}

export interface ResultsDialogProps {
    open: boolean;
    onClose: () => void;
    results: TestResults;
    onTryAgain: () => void;
  }


export interface ResultCardProps {
    label: string;
    value: number | string;
  }

export interface CircularTimerProps {
    isRunning: boolean;
    timeLeft: number | null;
    totalTime?: number;
  }