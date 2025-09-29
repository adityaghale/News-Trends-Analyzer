
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-700 border-t-cyan-400 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-400 text-lg">AI is analyzing global news...</p>
      <p className="mt-1 text-gray-500 text-sm">This may take a moment.</p>
    </div>
  );
};

export default LoadingSpinner;
