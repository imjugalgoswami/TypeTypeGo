import { TimeSelectorProps } from "../types/types";

export const TimeSelector: React.FC<TimeSelectorProps> = ({ selectedTime, onTimeSelect }) => {
    const timeOptions = [15, 30, 60];
    
    return (
      <div className="flex justify-center gap-4 mb-12">
        <div className="flex items-center gap-2 px-3 py-2 rounded bg-[#1a2942] cursor-pointer">
          <span className="text-orange-700">⏱</span>
          <span className="text-gray-400">time</span>
        </div>
        <div className="flex items-center gap-4 px-4 py-2 rounded bg-[#1a2942]">
          {timeOptions.map(time => (
            <span 
              key={time}
              onClick={() => onTimeSelect(time)}
              className={`cursor-pointer ${selectedTime === time ? 'text-orange-700' : 'text-gray-600'}`}
            >
              {time}
            </span>
          ))}
        </div>
      </div>
    );
  };