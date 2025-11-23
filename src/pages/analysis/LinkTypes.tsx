import { AnalysisHeader } from "@/components/AnalysisHeader";
import { KPICards } from "@/components/KPICards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Layout, AlertCircle, CheckCircle } from "lucide-react";
import { LinkTypesOverview } from "./components/LinkTypesOverview";
import { DofollowNofollowAnalysis } from "./components/DofollowNofollowAnalysis";
import { SponsoredUGCAnalysis } from "./components/SponsoredUGCAnalysis";
import { LinkPlacementAnalysis } from "./components/LinkPlacementAnalysis";
import { UnnaturalLinkWarnings } from "./components/UnnaturalLinkWarnings";
import { IndustryBenchmark } from "./components/IndustryBenchmark";
import { useAnalysis } from "@/contexts/AnalysisContext";

export default function LinkTypes() {
  const { hasAnalysis } = useAnalysis();
  const kpiData = [
    {
      label: "Contextual",
      value: 72,
      unit: "%",
      icon: FileText,
      change: 15,
      changeLabel: "Tốt cho SEO",
    },
    {
      label: "Sitewide",
      value: 18,
      unit: "%",
      icon: Layout,
      change: -8,
      changeLabel: "Cần rà soát",
    },
    {
      label: "Dofollow",
      value: 78,
      unit: "%",
      icon: CheckCircle,
      change: 3,
      changeLabel: "vs Median",
    },
    {
      label: "Nofollow",
      value: 22,
      unit: "%",
      icon: AlertCircle,
      change: -3,
      changeLabel: "vs Median",
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
        title="Link Types & Placement"
        description="Phân tích loại link và vị trí đặt link trên trang, đảm bảo tính tự nhiên và sức mạnh của backlink"
      />

      {/* Tabs - Moved to top */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-5xl grid-cols-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="dofollow-nofollow">Dofollow/Nofollow</TabsTrigger>
          <TabsTrigger value="sponsored-ugc">Sponsored/UGC</TabsTrigger>
          <TabsTrigger value="placement">Vị trí</TabsTrigger>
          <TabsTrigger value="warnings">Cảnh báo</TabsTrigger>
          <TabsTrigger value="benchmark">Chuẩn ngành</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* KPI Cards - Only in Overview tab */}
          <div className="mb-6">
            <KPICards data={kpiData} />
          </div>
          <LinkTypesOverview />
        </TabsContent>

        <TabsContent value="dofollow-nofollow" className="mt-6">
          <DofollowNofollowAnalysis />
        </TabsContent>

        <TabsContent value="sponsored-ugc" className="mt-6">
          <SponsoredUGCAnalysis />
        </TabsContent>

        <TabsContent value="placement" className="mt-6">
          <LinkPlacementAnalysis />
        </TabsContent>

        <TabsContent value="warnings" className="mt-6">
          <UnnaturalLinkWarnings />
        </TabsContent>

        <TabsContent value="benchmark" className="mt-6">
          <IndustryBenchmark />
        </TabsContent>
      </Tabs>
    </div>
  );
}
