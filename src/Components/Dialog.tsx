import React from 'react';
import { DialogProps } from '../types';

export const Dialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
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