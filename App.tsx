import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import LoadingSpinner from './components/LoadingSpinner';
import ResultsDisplay from './components/ResultsDisplay';
import HistoryPanel from './components/HistoryPanel';
import TrendingTopics from './components/TrendingTopics';
import { analyzeNewsTrends } from './services/geminiService';
import type { AnalysisResult, HistoryItem } from './types';

const App: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on initial render and set initial dashboard view
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('newsPulseHistory');
      if (storedHistory) {
        const parsedHistory: HistoryItem[] = JSON.parse(storedHistory);
        setHistory(parsedHistory);
        // On initial load, if history exists, display the most recent analysis
        if (parsedHistory.length > 0) {
          setCurrentTopic(parsedHistory[0].topic);
          setAnalysisResult(parsedHistory[0].result);
        }
      }
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
      setHistory([]);
    }
  }, []);

  // Persist history to localStorage whenever it changes
  useEffect(() => {
    try {
        localStorage.setItem('newsPulseHistory', JSON.stringify(history));
    } catch (e) {
        console.error("Failed to save history to localStorage", e);
    }
  }, [history]);

  const handleSearch = useCallback(async (topic: string) => {
    if (!topic.trim()) {
      setError('Please enter a topic to analyze.');
      return;
    }
    setCurrentTopic(topic);
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeNewsTrends(topic);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSaveResult = useCallback(() => {
    if (!analysisResult || !currentTopic) return;
    
    // Avoid saving duplicates of the same topic to prevent clutter
    if (history.some(item => item.topic.toLowerCase() === currentTopic.toLowerCase())) return;

    const newHistoryItem: HistoryItem = {
      id: new Date().toISOString() + Math.random(), // Add random number to ensure unique ID
      topic: currentTopic,
      result: analysisResult,
      savedAt: new Date().toISOString(),
    };
    setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
  }, [analysisResult, currentTopic, history]);

  const handleSelectItem = useCallback((item: HistoryItem) => {
    setCurrentTopic(item.topic);
    setAnalysisResult(item.result);
    setError(null);
    setIsLoading(false);
    // On larger screens, scroll to top might not be necessary, but it's good for mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleClearHistory = useCallback(() => {
    if (window.confirm("Are you sure you want to clear all saved analysis history? This cannot be undone.")) {
        setHistory([]);
    }
  }, []);
  
  const isCurrentResultSaved = currentTopic ? history.some(item => item.topic.toLowerCase() === currentTopic.toLowerCase()) : false;

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl">
        <Header />
        <main className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8 mt-4">
          {/* Main Dashboard Column */}
          <div className="flex-grow flex flex-col gap-8">
             {/* Controls Card */}
            <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
                <TrendingTopics onTopicSelect={handleSearch} isLoading={isLoading} />
                <div className="border-t border-gray-700 my-6"></div>
                <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </section>

            {/* Analysis Content */}
            <section id="analysis-dashboard">
              {isLoading && <LoadingSpinner />}
              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                  <p className="font-bold">Analysis Failed</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}
              {analysisResult && !isLoading && currentTopic && (
                <div className="animate-fade-in">
                   <h2 className="text-3xl font-bold text-white mb-6">Analysis Dashboard</h2>
                  <ResultsDisplay 
                    result={analysisResult} 
                    topic={currentTopic}
                    onSave={handleSaveResult}
                    isSaved={isCurrentResultSaved}
                  />
                </div>
              )}
              {!isLoading && !analysisResult && !error && (
                <div className="text-center text-gray-500 bg-gray-800/50 p-10 rounded-xl border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-4">Welcome to News Pulse</h2>
                  <p className="text-lg">Your dashboard is ready.</p>
                  <p className="mt-2">Select a trending topic, or enter your own topic above to begin analyzing global news trends.</p>
                </div>
              )}
            </section>
          </div>

          {/* History Panel Column */}
          <div className="lg:col-span-1">
            <HistoryPanel 
                history={history}
                onSelectItem={handleSelectItem}
                onClearHistory={handleClearHistory}
                currentTopic={currentTopic}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;