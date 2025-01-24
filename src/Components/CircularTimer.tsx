import React from 'react';
import { CircularTimerProps } from '../types/types';

const CircularTimer: React.FC<CircularTimerProps> = ({ isRunning, timeLeft, totalTime = 60 }) => {
  // Calculate the circumference of the circle
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the stroke-dashoffset based on remaining time
  const progress = (timeLeft ?? totalTime) / totalTime;
  const dashoffset = circumference * (1 - progress);

  return (
    <div className='flex justify-center h-20'>
      {isRunning && <div className="w-16 h-16 relative">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="fill-orange-500"
            strokeWidth="0"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            style={{
              transition: 'stroke-dashoffset 1s linear',
              clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`
            }}
          />
        </svg>
      
        {/* Time text */}
        {isRunning && timeLeft !== null && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl text-white">
              {timeLeft}
            </span>
          </div>
        )}
      </div>}
    </div>
  );
};

export default CircularTimer;