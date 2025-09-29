import React from 'react';
import type { AnalysisResult } from '../types';
import SentimentChart from './SentimentChart';
import SourceList from './SourceList';

interface ResultsDisplayProps {
  result: AnalysisResult;
  topic: string;
  onSave: () => void;
  isSaved: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, topic, onSave, isSaved }) => {
  const { analysis, sources } = result;

  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-3">
            <div className="flex-grow">
                 <h2 className="text-2xl font-bold text-cyan-400">Analysis Summary</h2>
                 <p className="text-sm text-gray-500 mt-1">Topic: "{topic}"</p>
            </div>
            <button 
                onClick={onSave}
                disabled={isSaved}
                className="w-full sm:w-auto flex-shrink-0 bg-gray-700 hover:bg-cyan-500/20 text-white font-bold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-500 transition-all duration-300 transform hover:scale-105 border border-gray-600 disabled:border-gray-700"
                aria-label={isSaved ? `Analysis for ${topic} is saved` : `Save analysis for ${topic}`}
            >
                {isSaved ? '✓ Saved' : 'Save Analysis'}
            </button>
        </div>
        <p className="text-gray-300 leading-relaxed">{analysis.summary}</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Key Themes & Keywords */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Key Themes</h2>
            <ul className="space-y-3 list-disc list-inside">
              {analysis.keyThemes.map((theme, index) => (
                <li key={index} className="text-gray-300">{theme}</li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Keywords</h2>
            <div className="flex flex-wrap gap-3">
              {analysis.keywords.map((keyword, index) => (
                <span key={index} className="bg-gray-700 text-cyan-300 text-sm font-medium px-3 py-1.5 rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sentiment & Sources */}
        <div className="space-y-8">
          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg h-fit">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">Sentiment Analysis</h2>
            <SentimentChart data={analysis.sentiment} />
          </section>
          
          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
             <SourceList sources={sources} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;