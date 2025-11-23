import { AnalysisHeader } from "@/components/AnalysisHeader";
import { KPICards } from "@/components/KPICards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Tag, AlertCircle, TrendingUp, TrendingDown, Target } from "lucide-react";
import { DofollowNofollowOverview } from "./components/DofollowNofollowOverview";
import { CompetitorDofollowComparison } from "./components/CompetitorDofollowComparison";
import { DomainTypeAnalysis } from "./components/DomainTypeAnalysis";
import { UnnaturalLinksWarning } from "./components/UnnaturalLinksWarning";
import { PlacementDofollowAnalysis } from "./components/PlacementDofollowAnalysis";
import { DofollowOptimization } from "./components/DofollowOptimization";
import { useAnalysis } from "@/contexts/AnalysisContext";

export default function DofollowNofollow() {
  const { hasAnalysis } = useAnalysis();
  const kpiData = [
    {
      label: "Dofollow",
      value: 75,
      unit: "%",
      icon: CheckCircle,
      change: 3,
      changeLabel: "vs Median",
    },
    {
      label: "Nofollow",
      value: 22,
      unit: "%",
      icon: XCircle,
      change: -3,
      changeLabel: "vs Median",
    },
    {
      label: "UGC",
      value: 2,
      unit: "%",
      icon: Tag,
      change: 0,
      changeLabel: "Forum/Comments",
    },
    {
      label: "Sponsored",
      value: 1,
      unit: "%",
      icon: AlertCircle,
      change: 0,
      changeLabel: "Quảng cáo",
    },
    {
      label: "Dofollow Gap vs Benchmark",
      value: 10,
      unit: "%",
      icon: TrendingUp,
      change: 10,
      changeLabel: "Cao hơn benchmark 10%",
    },
    {
      label: "Nofollow Gap vs Benchmark",
      value: -10,
      unit: "%",
      icon: TrendingDown,
      change: -10,
      changeLabel: "Thấp hơn benchmark 10%",
    },
    {
      label: "Cần bổ sung",
      value: 10,
      unit: "nofollow links",
      icon: Target,
      change: 0,
      changeLabel: "Để đạt benchmark",
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
        title="Tỷ lệ Dofollow / Nofollow"
        description="Phân tích và đánh giá tỷ lệ backlink dofollow và nofollow trong hồ sơ backlink, đảm bảo sự cân bằng tự nhiên giữa hai loại liên kết"
      />

      {/* Tabs - Moved to top */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-6xl grid-cols-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="competitor">So sánh đối thủ</TabsTrigger>
          <TabsTrigger value="domain">Theo loại domain</TabsTrigger>
          <TabsTrigger value="warnings">Cảnh báo</TabsTrigger>
          <TabsTrigger value="placement">Theo vị trí</TabsTrigger>
          <TabsTrigger value="optimization">Tối ưu hóa</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* KPI Cards */}
          <div className="mb-6">
            <KPICards data={kpiData} />
          </div>
          <DofollowNofollowOverview />
        </TabsContent>

        <TabsContent value="competitor" className="mt-6">
          <CompetitorDofollowComparison />
        </TabsContent>

        <TabsContent value="domain" className="mt-6">
          <DomainTypeAnalysis />
        </TabsContent>

        <TabsContent value="warnings" className="mt-6">
          <UnnaturalLinksWarning />
        </TabsContent>

        <TabsContent value="placement" className="mt-6">
          <PlacementDofollowAnalysis />
        </TabsContent>

        <TabsContent value="optimization" className="mt-6">
          <DofollowOptimization />
        </TabsContent>
      </Tabs>
    </div>
  );
}
