import { AnalysisHeader } from "@/components/AnalysisHeader";
import { KPICards } from "@/components/KPICards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { RelevanceOverview } from "./components/RelevanceOverview";
import { TopicRelevanceAnalysis } from "./components/TopicRelevanceAnalysis";
import { SemanticRelevance } from "./components/SemanticRelevance";
import { OutboundLinksAnalysis } from "./components/OutboundLinksAnalysis";
import { TopicalRelevance } from "./components/TopicalRelevance";
import { BacklinkStrategyOptimization } from "./components/BacklinkStrategyOptimization";
import { useAnalysis } from "@/contexts/AnalysisContext";

export default function Relevance() {
  const { hasAnalysis } = useAnalysis();
  const kpiData = [
    {
      label: "Cùng ngành",
      value: 58,
      unit: "%",
      icon: CheckCircle,
      change: 8,
      changeLabel: "vs Median",
    },
    {
      label: "Low Relevance",
      value: 22,
      unit: "%",
      icon: AlertTriangle,
      change: -5,
      changeLabel: "Cần cải thiện",
    },
    {
      label: "Semantic Score",
      value: 67,
      unit: "/100",
      icon: Target,
      change: 12,
      changeLabel: "Trung bình",
    },
    {
      label: "Outbound Spam",
      value: 8,
      unit: "%",
      icon: TrendingUp,
      change: 3,
      changeLabel: "Cần kiểm tra",
    },
  ];

  if (!hasAnalysis) {
    return (
      <div className="min-h-screen bg-gradient-soft p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Chưa có dữ liệu phân tích</h2>
          <p className="text-muted-foreground mb-4">Vui lòng quay lại trang chủ để nhập thông tin phân tích.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft p-6 space-y-6">
      {/* Header with New Analysis Button */}
      <AnalysisHeader
        title="Tính Liên Quan (Relevance)"
        description="Phân tích mức độ liên quan giữa nguồn backlink và trang đích, đánh giá chất lượng dựa trên ngữ cảnh và sự phù hợp chủ đề"
      />

      {/* Tabs - Moved to top */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-5xl grid-cols-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="topic">Chủ đề</TabsTrigger>
          <TabsTrigger value="semantic">Ngữ nghĩa</TabsTrigger>
          <TabsTrigger value="outbound">Outbound</TabsTrigger>
          <TabsTrigger value="topical">Topical</TabsTrigger>
          <TabsTrigger value="strategy">Chiến lược</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* KPI Cards - Only in Overview tab */}
          <div className="mb-6">
            <KPICards data={kpiData} />
          </div>
          <RelevanceOverview />
        </TabsContent>

        <TabsContent value="topic" className="mt-6">
          <TopicRelevanceAnalysis />
        </TabsContent>

        <TabsContent value="semantic" className="mt-6">
          <SemanticRelevance />
        </TabsContent>

        <TabsContent value="outbound" className="mt-6">
          <OutboundLinksAnalysis />
        </TabsContent>

        <TabsContent value="topical" className="mt-6">
          <TopicalRelevance />
        </TabsContent>

        <TabsContent value="strategy" className="mt-6">
          <BacklinkStrategyOptimization />
        </TabsContent>
      </Tabs>
    </div>
  );
}
