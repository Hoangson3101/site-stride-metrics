import { AnalysisHeader } from "@/components/AnalysisHeader";
import { KPICards } from "@/components/KPICards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck, TrendingDown, Clock, AlertCircle } from "lucide-react";
import { IndexStatusOverview } from "./components/IndexStatusOverview";
import { LostLinksAnalysis } from "./components/LostLinksAnalysis";
import { BacklinkDurability } from "./components/BacklinkDurability";
import { Tier2Suggestions } from "./components/Tier2Suggestions";
import { BacklinkTimelineAnalysis } from "./components/BacklinkTimelineAnalysis";
import { BacklinkStability } from "./components/BacklinkStability";
import { useAnalysis } from "@/contexts/AnalysisContext";

export default function IndexDurability() {
  const { hasAnalysis } = useAnalysis();
  const kpiData = [
    {
      label: "Đã Index",
      value: 78,
      unit: "%",
      icon: CalendarCheck,
      change: -2,
      changeLabel: "vs Median",
    },
    {
      label: "Lost Backlinks",
      value: 24,
      icon: TrendingDown,
      change: 8,
      changeLabel: "3 tháng gần",
    },
    {
      label: "Tồn tại > 6 tháng",
      value: 68,
      unit: "%",
      icon: Clock,
      change: 12,
      changeLabel: "vs Median",
    },
    {
      label: "Chưa Index",
      value: 22,
      icon: AlertCircle,
      change: 5,
      changeLabel: "Cần Tier 2",
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
        title="Index & Durability"
        description="Theo dõi tình trạng index của backlink và độ bền vững của chúng theo thời gian, đảm bảo các backlink có hiệu lực trong chiến lược SEO"
      />

      {/* Tabs - Moved to top */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-5xl grid-cols-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="lost">Lost Links</TabsTrigger>
          <TabsTrigger value="durability">Độ bền</TabsTrigger>
          <TabsTrigger value="tier2">Tier 2</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="stability">Ổn định</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* KPI Cards - Only in Overview tab */}
          <div className="mb-6">
            <KPICards data={kpiData} />
          </div>
          <IndexStatusOverview />
        </TabsContent>

        <TabsContent value="lost" className="mt-6">
          <LostLinksAnalysis />
        </TabsContent>

        <TabsContent value="durability" className="mt-6">
          <BacklinkDurability />
        </TabsContent>

        <TabsContent value="tier2" className="mt-6">
          <Tier2Suggestions />
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <BacklinkTimelineAnalysis />
        </TabsContent>

        <TabsContent value="stability" className="mt-6">
          <BacklinkStability />
        </TabsContent>
      </Tabs>
    </div>
  );
}
