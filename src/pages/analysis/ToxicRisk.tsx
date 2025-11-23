import { AnalysisHeader } from "@/components/AnalysisHeader";
import { KPICards } from "@/components/KPICards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, Network, Download } from "lucide-react";
import { ToxicOverview } from "./components/ToxicOverview";
import { SpamFarmDetection } from "./components/SpamFarmDetection";
import { PBNFootprintDetection } from "./components/PBNFootprintDetection";
import { NegativeSEODetection } from "./components/NegativeSEODetection";
import { OutboundLinksCheck } from "./components/OutboundLinksCheck";
import { DisavowRecommendations } from "./components/DisavowRecommendations";
import { useAnalysis } from "@/contexts/AnalysisContext";

export default function ToxicRisk() {
  const { hasAnalysis } = useAnalysis();
  const kpiData = [
    {
      label: "Domain nguy cơ cao",
      value: 12,
      icon: AlertTriangle,
      change: 0,
      changeLabel: "Cần disavow",
    },
    {
      label: "Backlink Toxic",
      value: 45,
      icon: Shield,
      change: 8,
      changeLabel: "Cần xử lý",
    },
    {
      label: "Nghi PBN",
      value: 3,
      icon: Network,
      change: 0,
      changeLabel: "Clusters phát hiện",
    },
    {
      label: "Spam Score Avg",
      value: 28,
      unit: "/100",
      icon: AlertTriangle,
      change: 5,
      changeLabel: "Cao",
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
        title="Toxic & Risk Check"
        description="Tự động phát hiện các liên kết độc hại hoặc tiềm ẩn rủi ro, bảo vệ hồ sơ backlink khỏi những nguy cơ có thể làm hại đến thứ hạng SEO"
      />

      {/* Tabs - Moved to top */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-5xl grid-cols-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="spam">Spam/Farm</TabsTrigger>
          <TabsTrigger value="pbn">PBN</TabsTrigger>
          <TabsTrigger value="negative">Negative SEO</TabsTrigger>
          <TabsTrigger value="outbound">Outbound</TabsTrigger>
          <TabsTrigger value="disavow">Disavow</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* KPI Cards */}
          <div className="mb-6">
            <KPICards data={kpiData} />
          </div>
          <ToxicOverview />
        </TabsContent>

        <TabsContent value="spam" className="mt-6">
          <SpamFarmDetection />
        </TabsContent>

        <TabsContent value="pbn" className="mt-6">
          <PBNFootprintDetection />
        </TabsContent>

        <TabsContent value="negative" className="mt-6">
          <NegativeSEODetection />
        </TabsContent>

        <TabsContent value="outbound" className="mt-6">
          <OutboundLinksCheck />
        </TabsContent>

        <TabsContent value="disavow" className="mt-6">
          <DisavowRecommendations />
        </TabsContent>
      </Tabs>
    </div>
  );
}
