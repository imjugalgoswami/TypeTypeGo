# TypeTypeGo Documentation

## Overview
TypeTypeGo is a modern web application built with React and TypeScript that helps users improve their typing speed and accuracy. The application features a clean, dark-themed interface with real-time feedback, accurate WPM calculation, and detailed results analysis.

## Tech Stack
- React 
- TypeScript
- Tailwind CSS
- React Router

## Project Structure
```
TypeTypeGo/
├── components/
│   ├── CircularTimer.tsx      # Animated countdown timer
│   ├── Dialog.tsx            # Reusable modal component
│   ├── ResultsDialog.tsx     # Test results display
│   ├── TimeSelector.tsx      # Test duration selector
│   ├── TypeTypeGo.tsx        # Landing page
│   ├── TypingArea.tsx        # Main typing interface
│   └── TypingTest.tsx        # Test orchestration
├── hooks/
│   └── useTypingTest.ts      # Core typing test logic
├── types/
│   └── types.ts              # TypeScript interfaces
└── utils/
    └── calculations.ts       # Performance calculations
```

## Core Features
1. **Real-time Typing Test**
   - Character-by-character accuracy feedback
   - Visual cursor tracking
   - Words-per-minute (WPM) calculation
   - Accuracy percentage

2. **Test Configuration**
   - Configurable test duration (15, 30, 60 seconds)
   - Shift + Enter to start/restart test
   - Auto-start on first keystroke

3. **Results Analysis**
   - WPM (Words Per Minute)
   - Accuracy percentage
   - Total words typed
   - Character count

## Component Documentation

### TypeTypeGo (Landing Page)
The landing page component featuring:
- Split layout design
- Animated cursor effect
- Navigation to test page
- Responsive design

#### Props
- None (standalone component)

### TypingTest
Main test component orchestrating the typing experience.

#### Features
- Test duration selection
- Countdown timer
- Real-time typing feedback
- Results display

#### Constants
- `CHARS_PER_LINE`: 50
- `SAMPLE_TEXT`: Predefined text for typing test

### TypingArea
Handles the display and input of text during the test.

#### Props
```typescript
interface TypingAreaProps {
    lines: string[];        // Formatted text lines
    userInput: string;      // Current user input
    showCursor: boolean;    // Cursor visibility state
}
```

### CircularTimer
Visual countdown timer with circular progress indicator.

#### Props
```typescript
interface CircularTimerProps {
    isRunning: boolean;          // Timer state
    timeLeft: number | null;     // Remaining time
    totalTime?: number;          // Total test duration
}
```

### TimeSelector
Test duration selection component.

#### Props
```typescript
interface TimeSelectorProps {
    selectedTime: number;                    // Current selection
    onTimeSelect: (time: number) => void;    // Selection handler
}
```

### ResultsDialog
Displays test results in a modal dialog.

#### Props
```typescript
interface ResultsDialogProps {
    open: boolean;                // Dialog visibility
    onClose: () => void;         // Close handler
    results: TestResults;        // Test metrics
    onTryAgain: () => void;     // Restart handler
}
```

## Hooks

### useTypingTest
Custom hook managing the typing test logic.

#### Parameters
- `initialTime`: number (default test duration)
- `sampleText`: string (text to type)

#### Returns
```typescript
{
    time: number;                    // Selected duration
    setTime: (time: number) => void; // Duration setter
    timeLeft: number | null;         // Remaining time
    isRunning: boolean;              // Test state
    userInput: string;               // Current input
    showResults: boolean;            // Results visibility
    setShowResults: (show: boolean) => void;
    startTest: (initialChar?: string) => void;
}
```

## Utility Functions

### calculations.ts

#### calculateResults
Calculates typing test metrics.

```typescript
function calculateResults(
    userInput: string,
    sampleText: string,
    time: number
): TestResults
```

#### formatTextIntoLines
Formats text into lines of specified length.

```typescript
function formatTextIntoLines(
    text: string,
    charsPerLine: number
): string[]
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Access the application at `http://localhost:5173`

## Usage
1. Navigate to the test page using the "Get Started" button
2. Select desired test duration (15, 30, or 60 seconds)
3. Press Shift + Enter or start typing to begin the test
4. Type the displayed text as accurately as possible
5. View results when the timer ends
6. Press "Try Again" to restart

## Key Interactions
- `Shift + Enter`: Start/restart test
- First keystroke: Auto-starts test
- `Backspace`: Correct mistakes
- Regular typing: Input text

## Future Improvements
1. Different text samples and difficulty levels
2. User accounts and progress tracking
3. Practice modes and targeted exercises
4. Keyboard sound effects
5. More detailed statistics and analysis
6. Competitive features and leaderboards