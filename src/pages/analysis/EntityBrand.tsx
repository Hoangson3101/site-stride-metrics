import { AnalysisHeader } from "@/components/AnalysisHeader";
import { KPICards } from "@/components/KPICards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { BrandSignalsOverview } from "./components/BrandSignalsOverview";
import { BrandMentionsAnalysis } from "./components/BrandMentionsAnalysis";
import { SocialMediaNAPAnalysis } from "./components/SocialMediaNAPAnalysis";
import { WikipediaAuthorLinks } from "./components/WikipediaAuthorLinks";
import { EduGovLinksAnalysis } from "./components/EduGovLinksAnalysis";
import { BrandLinkStrategy } from "./components/BrandLinkStrategy";
import { useAnalysis } from "@/contexts/AnalysisContext";

export default function EntityBrand() {
  const { hasAnalysis } = useAnalysis();
  const kpiData = [
    {
      label: "Brand Mentions",
      value: 124,
      icon: Award,
      change: 18,
      changeLabel: "vs 6 tháng trước",
    },
    {
      label: "Social Profiles",
      value: 6,
      icon: CheckCircle,
      change: 0,
      changeLabel: "Đã phát hiện",
    },
    {
      label: "E-E-A-T Links",
      value: 8,
      icon: TrendingUp,
      change: 3,
      changeLabel: ".gov, .edu, báo lớn",
    },
    {
      label: "Mentions không link",
      value: 42,
      icon: XCircle,
      change: 0,
      changeLabel: "Cơ hội outreach",
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
        title="Entity & Brand Signals"
        description="Mở rộng phân tích ra các tín hiệu thương hiệu và thực thể, giúp đánh giá độ uy tín và sự hiện diện của website trên các nền tảng trực tuyến, cải thiện E-A-T"
      />

      {/* Tabs - Moved to top */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-5xl grid-cols-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="mentions">Brand Mentions</TabsTrigger>
          <TabsTrigger value="social">Social & NAP</TabsTrigger>
          <TabsTrigger value="wikipedia">Wikipedia/Author</TabsTrigger>
          <TabsTrigger value="edugov">.Edu/.Gov</TabsTrigger>
          <TabsTrigger value="strategy">Chiến lược</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* KPI Cards */}
          <div className="mb-6">
            <KPICards data={kpiData} />
          </div>
          <BrandSignalsOverview />
        </TabsContent>

        <TabsContent value="mentions" className="mt-6">
          <BrandMentionsAnalysis />
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          <SocialMediaNAPAnalysis />
        </TabsContent>

        <TabsContent value="wikipedia" className="mt-6">
          <WikipediaAuthorLinks />
        </TabsContent>

        <TabsContent value="edugov" className="mt-6">
          <EduGovLinksAnalysis />
        </TabsContent>

        <TabsContent value="strategy" className="mt-6">
          <BrandLinkStrategy />
        </TabsContent>
      </Tabs>
    </div>
  );
}
