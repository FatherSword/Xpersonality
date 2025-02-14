// components/ModelSelector.tsx
'use client'

import React, { useState } from 'react';

interface ModelSelectorProps {
  model: string;
  setModel: (newModel: string) => void;
}

export default function ModelSelector({ model, setModel }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelClick = (newModel: string) => {
    setModel(newModel);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center w-full px-4 py-2 text-lg font-semibold text-white bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {model}
        <svg
          className={`ml-2 h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02l4.5 4.25a.75.75 0 001.06-1.06l-4.25-4a.75.75 0 00-1.06 0l-4 4a.75.75 0 001.06 1.06zm4.72 4.71a.75.75 0 101.06-1.06l-4.5-4.25a.75.75 0 01-1.06 0l-4.25 4a.75.75 0 011.06-1.06l4-4a.75.75 0 011.06 0l4 4a.75.75 0 01-1.06 1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-gray-600 rounded-b-lg shadow-lg"> {/* 调整背景颜色 */}
          <button
            className="w-full px-4 py-2 text-lg font-semibold text-white hover:bg-gray-500 transition-colors duration-300"
            onClick={() => handleModelClick('Deepseek R1')}
          >
            Deepseek R1
          </button>
          <button
            className="w-full px-4 py-2 text-lg font-semibold text-white hover:bg-gray-500 transition-colors duration-300"
            onClick={() => handleModelClick('Llama3.3')}
          >
            Llama3.3
          </button>
          <button
            className="w-full px-4 py-2 text-lg font-semibold text-white hover:bg-gray-500 transition-colors duration-300"
            onClick={() => handleModelClick('Kimi')}
          >
            Kimi
          </button>
        </div>
      )}
    </div>
  );
}
