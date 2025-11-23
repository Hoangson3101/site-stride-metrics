import { AnalysisHeader } from "@/components/AnalysisHeader";
import { KPICards } from "@/components/KPICards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, TrendingUp, FileText, Target, FileX } from "lucide-react";
import { QualityOverview } from "./components/QualityOverview";
import { LinkTypeClassification } from "./components/LinkTypeClassification";
import { TrafficAnalysis } from "./components/TrafficAnalysis";
import { LinkPlacement } from "./components/LinkPlacement";
import { DomainAnalysis } from "./components/DomainAnalysis";
import { QualityWarnings } from "./components/QualityWarnings";
import { useAnalysis } from "@/contexts/AnalysisContext";

export default function LinkQuality() {
  const { hasAnalysis } = useAnalysis();
  const kpiData = [
    {
      label: "RD với DR > 30",
      value: 18,
      unit: "%",
      icon: Shield,
      change: -22,
      changeLabel: "so với Trung vị Top 10",
    },
    {
      label: "RD có Traffic > 1K",
      value: 42,
      unit: "%",
      icon: TrendingUp,
      change: 5,
      changeLabel: "so với Trung vị Top 10",
    },
    {
      label: "Contextual Backlinks",
      value: 68,
      unit: "%",
      icon: FileText,
      change: 12,
      changeLabel: "so với Profile/Comment",
    },
    {
      label: "Site chết/Unindex",
      value: 8,
      unit: "%",
      icon: Target,
      change: 8,
      changeLabel: "Cần kiểm tra",
    },
    {
      label: "Orphan Page Backlinks",
      value: 15,
      unit: "%",
      icon: FileX,
      change: 7,
      changeLabel: "so với Trung vị Top 10",
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
        title="Chất lượng Backlink"
        description="Đánh giá sức mạnh backlink dựa trên DR, traffic, loại nguồn và vị trí đặt link"
      />

      {/* Tabs - Moved to top */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-4xl grid-cols-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="types">Loại Backlink</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="placement">Vị trí</TabsTrigger>
          <TabsTrigger value="domains">Domain</TabsTrigger>
          <TabsTrigger value="warnings">Cảnh báo</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* KPI Cards - Chỉ hiển thị ở tab Tổng quan */}
          <div className="mb-6">
            <KPICards data={kpiData} />
          </div>
          <QualityOverview />
        </TabsContent>

        <TabsContent value="types" className="mt-6">
          <LinkTypeClassification />
        </TabsContent>

        <TabsContent value="traffic" className="mt-6">
          <TrafficAnalysis />
        </TabsContent>

        <TabsContent value="placement" className="mt-6">
          <LinkPlacement />
        </TabsContent>

        <TabsContent value="domains" className="mt-6">
          <DomainAnalysis />
        </TabsContent>

        <TabsContent value="warnings" className="mt-6">
          <QualityWarnings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
