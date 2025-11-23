import { AnalysisHeader } from "@/components/AnalysisHeader";
import { KPICards } from "@/components/KPICards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hash, Type, Link as LinkIcon, AlertTriangle } from "lucide-react";
import { AnchorOverview } from "./components/AnchorOverview";
import { AnchorTypeDistribution } from "./components/AnchorTypeDistribution";
import { OverOptimizedWarnings } from "./components/OverOptimizedWarnings";
import { AnchorRelevance } from "./components/AnchorRelevance";
import { SpamAnchorWarnings } from "./components/SpamAnchorWarnings";
import { KeywordAnchorRatio } from "./components/KeywordAnchorRatio";
import { useAnalysis } from "@/contexts/AnalysisContext";

export default function AnchorText() {
  const { hasAnalysis } = useAnalysis();
  const kpiData = [
    {
      label: "Brand Anchor",
      value: 32,
      unit: "%",
      icon: Type,
      change: 8,
      changeLabel: "vs Median",
    },
    {
      label: "Naked URL",
      value: 28,
      unit: "%",
      icon: LinkIcon,
      change: 5,
      changeLabel: "vs Median",
    },
    {
      label: "Generic",
      value: 22,
      unit: "%",
      icon: Hash,
      change: 0,
      changeLabel: "vs Median",
    },
    {
      label: "Exact Match",
      value: 9.5,
      unit: "%",
      icon: AlertTriangle,
      change: 5,
      changeLabel: "Cảnh báo: > 5%",
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
        title="Anchor Text Distribution"
        description="Kiểm soát tỷ lệ anchor và phát hiện over-optimization, spam anchor text"
      />

      {/* Tabs - Moved to top */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-5xl grid-cols-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="types">Phân loại</TabsTrigger>
          <TabsTrigger value="over-optimized">Over-optimized</TabsTrigger>
          <TabsTrigger value="relevance">Liên quan</TabsTrigger>
          <TabsTrigger value="spam">Spam</TabsTrigger>
          <TabsTrigger value="keyword-ratio">Từ khóa</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* KPI Cards - Only in overview tab */}
          <div className="mb-6">
            <KPICards data={kpiData} />
          </div>
          <AnchorOverview />
        </TabsContent>

        <TabsContent value="types" className="mt-6">
          <AnchorTypeDistribution />
        </TabsContent>

        <TabsContent value="over-optimized" className="mt-6">
          <OverOptimizedWarnings />
        </TabsContent>

        <TabsContent value="relevance" className="mt-6">
          <AnchorRelevance />
        </TabsContent>

        <TabsContent value="spam" className="mt-6">
          <SpamAnchorWarnings />
        </TabsContent>

        <TabsContent value="keyword-ratio" className="mt-6">
          <KeywordAnchorRatio />
        </TabsContent>
      </Tabs>
    </div>
  );
}
