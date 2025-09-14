import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { HeroInput } from "@/components/HeroInput";
import { AnalysisProgress } from "@/components/AnalysisProgress";
import { KPICards } from "@/components/KPICards";
import { CompetitorTable } from "@/components/CompetitorTable";
import { BenchmarkComparison } from "@/components/BenchmarkComparison";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = (data: any) => {
    setIsAnalyzing(true);
    setShowProgress(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setShowResults(true);
      setIsAnalyzing(false);
    }, 5000);
  };

  const mockAnalysisSteps = [
    { id: 'serp', name: 'SERP Fetcher (Top 10)', vietnameseName: 'Thu thập kết quả tìm kiếm', status: 'completed' as const },
    { id: 'target', name: 'Target Backlink Collector', vietnameseName: 'Thu thập backlink mục tiêu', status: 'completed' as const },
    { id: 'competitor', name: 'Competitor Backlink Collector', vietnameseName: 'Thu thập backlink đối thủ', status: 'running' as const, progress: 65 },
    { id: 'normalizer', name: 'Normalizer & Merger', vietnameseName: 'Chuẩn hóa và gộp dữ liệu', status: 'pending' as const },
    { id: 'index', name: 'Index Checker (mẫu)', vietnameseName: 'Kiểm tra chỉ mục', status: 'pending' as const },
    { id: 'metrics', name: 'Metrics Calculator', vietnameseName: 'Tính toán chỉ số', status: 'pending' as const },
    { id: 'analyzer', name: 'Gap Analyzer & Report', vietnameseName: 'Phân tích khoảng cách', status: 'pending' as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader isAnalyzing={isAnalyzing} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Input Section */}
        <HeroInput onAnalyze={handleAnalyze} isLoading={isAnalyzing} />

        {/* Analysis Progress */}
        {showProgress && (
          <AnalysisProgress 
            steps={mockAnalysisSteps}
            currentStep={2}
            isVisible={showProgress}
          />
        )}

        {/* Results Section */}
        {showResults && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Chỉ số hiện tại</h2>
              <KPICards isLoading={false} />
            </div>

            {/* Competitor Analysis */}
            <CompetitorTable hasPartialResults={false} />

            {/* Benchmark Comparison */}
            <BenchmarkComparison />
          </div>
        )}

        {/* Welcome State */}
        {!showProgress && !showResults && (
          <div className="text-center py-16 space-y-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Phân tích Off-page SEO chuyên nghiệp
              </h2>
              <p className="text-muted-foreground text-lg">
                Nhập URL và từ khóa để bắt đầu so sánh với đối thủ, 
                phân tích gap và nhận gợi ý cải thiện ranking
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl mx-auto flex items-center justify-center">
                    <span className="text-primary text-xl">📊</span>
                  </div>
                  <h3 className="font-semibold">Thu thập dữ liệu</h3>
                  <p className="text-sm text-muted-foreground">
                    Phân tích backlink từ nhiều nguồn: Ahrefs, Moz, Semrush
                  </p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl mx-auto flex items-center justify-center">
                    <span className="text-secondary text-xl">🎯</span>
                  </div>
                  <h3 className="font-semibold">So sánh đối thủ</h3>
                  <p className="text-sm text-muted-foreground">
                    Benchmark với Top 10 SERP, tìm khoảng cách cần bù
                  </p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-success/10 rounded-xl mx-auto flex items-center justify-center">
                    <span className="text-success text-xl">💡</span>
                  </div>
                  <h3 className="font-semibold">Gợi ý hành động</h3>
                  <p className="text-sm text-muted-foreground">
                    Nhận chiến lược cụ thể để cải thiện thứ hạng
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;