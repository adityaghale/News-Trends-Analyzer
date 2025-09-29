export interface Sentiment {
  positive: number;
  neutral: number;
  negative: number;
}

export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  };
}

export interface AnalysisData {
  summary: string;
  keyThemes: string[];
  sentiment: Sentiment;
  keywords: string[];
}

export interface AnalysisResult {
  analysis: AnalysisData;
  sources: GroundingChunk[];
}

export interface HistoryItem {
  id: string;
  topic: string;
  result: AnalysisResult;
  savedAt: string;
}
