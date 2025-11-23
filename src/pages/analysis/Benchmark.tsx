import { AnalysisHeader } from "@/components/AnalysisHeader";
import { KPICards } from "@/components/KPICards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Target, BarChart3 } from "lucide-react";
import { BenchmarkingOverview } from "./components/BenchmarkingOverview";
import { BacklinkRDComparison } from "./components/BacklinkRDComparison";
import { AnchorTextComparison } from "./components/AnchorTextComparison";
import { LinkTypePlacementComparison } from "./components/LinkTypePlacementComparison";
import { LinkVelocityComparison } from "./components/LinkVelocityComparison";
import { OverallFactorsComparison } from "./components/OverallFactorsComparison";
import { useAnalysis } from "@/contexts/AnalysisContext";

export default function Benchmark() {
  const { hasAnalysis } = useAnalysis();
  const kpiData = [
    {
      label: "Backlinks Gap",
      value: 700,
      icon: TrendingDown,
      change: -700,
      changeLabel: "vs trung bình đối thủ",
    },
    {
      label: "RD Gap",
      value: 120,
      icon: TrendingDown,
      change: -120,
      changeLabel: "vs trung bình đối thủ",
    },
    {
      label: "Link Velocity",
      value: 70,
      icon: TrendingUp,
      change: 15,
      changeLabel: "backlinks/tháng",
    },
    {
      label: "Vị trí SERP",
      value: 4,
      icon: Target,
      change: 0,
      changeLabel: "Top 5",
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
        title="SERP Benchmark – So sánh Đối thủ"
        description="So sánh hồ sơ backlink của website với các đối thủ cạnh tranh trực tiếp trên SERP, nhận diện khoảng cách và xây dựng chiến lược SEO hiệu quả"
      />

      {/* Tabs - Moved to top */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-6xl grid-cols-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="backlinks">Backlinks & RD</TabsTrigger>
          <TabsTrigger value="anchor">Anchor Text</TabsTrigger>
          <TabsTrigger value="linktype">Loại Link & Vị trí</TabsTrigger>
          <TabsTrigger value="velocity">Tốc độ tăng trưởng</TabsTrigger>
          <TabsTrigger value="overall">Tổng hợp</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* KPI Cards */}
          <div className="mb-6">
            <KPICards data={kpiData} />
          </div>
          <BenchmarkingOverview />
        </TabsContent>

        <TabsContent value="backlinks" className="mt-6">
          <BacklinkRDComparison />
        </TabsContent>

        <TabsContent value="anchor" className="mt-6">
          <AnchorTextComparison />
        </TabsContent>

        <TabsContent value="linktype" className="mt-6">
          <LinkTypePlacementComparison />
        </TabsContent>

        <TabsContent value="velocity" className="mt-6">
          <LinkVelocityComparison />
        </TabsContent>

        <TabsContent value="overall" className="mt-6">
          <OverallFactorsComparison />
        </TabsContent>
      </Tabs>
    </div>
  );
}
