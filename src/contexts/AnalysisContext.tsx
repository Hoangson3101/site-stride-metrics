import { createContext, useContext, useState, ReactNode } from "react";

interface AnalysisFormData {
  url: string;
  keyword: string;
  location: string;
  topN: number;
  blLimit: number;
}

interface AnalysisContextType {
  analysisData: AnalysisFormData | null;
  setAnalysisData: (data: AnalysisFormData | null) => void;
  hasAnalysis: boolean;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisData, setAnalysisData] = useState<AnalysisFormData | null>(null);

  return (
    <AnalysisContext.Provider
      value={{
        analysisData,
        setAnalysisData,
        hasAnalysis: analysisData !== null,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
}

