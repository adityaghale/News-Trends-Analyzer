
import React from 'react';
import type { GroundingChunk } from '../types';

interface SourceListProps {
  sources: GroundingChunk[];
}

const SourceList: React.FC<SourceListProps> = ({ sources }) => {
  if (sources.length === 0) {
    return null;
  }
  
  const uniqueSources = sources.reduce<GroundingChunk[]>((acc, current) => {
    if (!acc.some(item => item.web.uri === current.web.uri)) {
      acc.push(current);
    }
    return acc;
  }, []);


  return (
    <div>
      <h3 className="text-xl font-bold text-cyan-400 mb-4">News Sources</h3>
      <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {uniqueSources.map((source, index) => (
          <li key={index}>
            <a
              href={source.web.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="group block text-gray-400 hover:text-cyan-300 transition-colors duration-200"
            >
              <p className="font-semibold text-sm truncate group-hover:underline">{source.web.title}</p>
              <p className="text-xs text-gray-500 truncate">{source.web.uri}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SourceList;
