import React from 'react';
import type { HistoryItem } from '../types';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
  currentTopic: string | null;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelectItem, onClearHistory, currentTopic }) => {
  return (
    <aside className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg lg:sticky lg:top-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-cyan-400">Analysis History</h2>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-sm text-gray-500 hover:text-red-400 transition-colors"
            aria-label="Clear all history"
          >
            Clear All
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Your saved analyses will appear here.</p>
      ) : (
        <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {history.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelectItem(item)}
                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                  currentTopic === item.topic
                    ? 'bg-cyan-500/20 ring-1 ring-cyan-500'
                    : 'hover:bg-gray-700/50'
                }`}
              >
                <p className="font-semibold text-gray-200 truncate">{item.topic}</p>
                <p className="text-xs text-gray-400">
                  {new Date(item.savedAt).toLocaleString()}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default HistoryPanel;
