
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
        News Pulse
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Global News Trend Analyzer
      </p>
    </header>
  );
};

export default Header;
