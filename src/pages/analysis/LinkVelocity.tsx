import { AnalysisHeader } from "@/components/AnalysisHeader";
import { KPICards } from "@/components/KPICards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Activity, AlertTriangle } from "lucide-react";
import { LinkVelocityOverview } from "./components/LinkVelocityOverview";
import { CompetitiveVelocityComparison } from "./components/CompetitiveVelocityComparison";
import { SpikeAnalysis } from "./components/SpikeAnalysis";
import { IndustryAverageComparison } from "./components/IndustryAverageComparison";
import { VelocityStabilityAnalysis } from "./components/VelocityStabilityAnalysis";
import { GrowthStrategyOptimization } from "./components/GrowthStrategyOptimization";
import { useAnalysis } from "@/contexts/AnalysisContext";

export default function LinkVelocity() {
  const { hasAnalysis } = useAnalysis();
  const kpiData = [
    {
      label: "RD/tháng (Bạn)",
      value: 15,
      icon: Activity,
      change: -30,
      changeLabel: "vs Top 10 (22/tháng)",
    },
    {
      label: "Tháng cao nhất",
      value: 38,
      icon: TrendingUp,
      change: 0,
      changeLabel: "Tháng 9/2024",
    },
    {
      label: "Tháng thấp nhất",
      value: 8,
      icon: TrendingDown,
      change: 0,
      changeLabel: "Tháng 6/2024",
    },
    {
      label: "Spike cảnh báo",
      value: 1,
      icon: AlertTriangle,
      change: 0,
      changeLabel: "Kiểm tra tháng 9",
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
        title="Link Velocity & Growth"
        description="Theo dõi và phân tích tốc độ tăng trưởng backlink của website theo thời gian, so sánh với đối thủ, và đánh giá tính tự nhiên của quá trình xây dựng liên kết"
      />

      {/* Tabs - Moved to top */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-6xl grid-cols-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="competitive">So sánh đối thủ</TabsTrigger>
          <TabsTrigger value="spike">Phân tích spike</TabsTrigger>
          <TabsTrigger value="industry">Trung bình ngành</TabsTrigger>
          <TabsTrigger value="stability">Độ ổn định</TabsTrigger>
          <TabsTrigger value="strategy">Chiến lược</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* KPI Cards */}
          <div className="mb-6">
            <KPICards data={kpiData} />
          </div>
          <LinkVelocityOverview />
        </TabsContent>

        <TabsContent value="competitive" className="mt-6">
          <CompetitiveVelocityComparison />
        </TabsContent>

        <TabsContent value="spike" className="mt-6">
          <SpikeAnalysis />
        </TabsContent>

        <TabsContent value="industry" className="mt-6">
          <IndustryAverageComparison />
        </TabsContent>

        <TabsContent value="stability" className="mt-6">
          <VelocityStabilityAnalysis />
        </TabsContent>

        <TabsContent value="strategy" className="mt-6">
          <GrowthStrategyOptimization />
        </TabsContent>
      </Tabs>
    </div>
  );
}
