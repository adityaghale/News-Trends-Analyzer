import React from 'react';

interface TrendingTopicsProps {
  onTopicSelect: (topic: string) => void;
  isLoading: boolean;
}

const topics = [
  'AI in healthcare',
  'Global supply chain',
  'Electric vehicle market',
  'Space exploration missions',
  'Future of remote work',
];

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ onTopicSelect, isLoading }) => {
  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-400 mb-4">Trending Topics</h2>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => onTopicSelect(topic)}
            disabled={isLoading}
            className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-gray-300 hover:text-white font-medium px-4 py-2 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {topic}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TrendingTopics;