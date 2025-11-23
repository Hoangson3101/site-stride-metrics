import { useState } from "react";
import { AnalysisHeader } from "@/components/AnalysisHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RDOverview } from "./components/RDOverview";
import { RDList } from "./components/RDList";
import { RDGapCompetitors } from "./components/RDGapCompetitors";
import { RDDetailDialog } from "./components/RDDetailDialog";
import { useAnalysis } from "@/contexts/AnalysisContext";

export default function ReferringDomains() {
  const { hasAnalysis } = useAnalysis();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const handleDomainClick = (domain: string) => {
    setSelectedDomain(domain);
    setIsDetailDialogOpen(true);
  };

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
        title="Hồ sơ Referring Domains (RD)"
        description="Tổng quan domain đang trỏ link về website, mức độ đa dạng và chênh lệch so với đối thủ."
      />

      {/* Tabs - Moved to top */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="list">Danh sách RD</TabsTrigger>
          <TabsTrigger value="gap">Gap vs Đối thủ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <RDOverview />
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <RDList onDomainClick={handleDomainClick} />
        </TabsContent>

        <TabsContent value="gap" className="mt-6">
          <RDGapCompetitors />
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      <RDDetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        domain={selectedDomain}
      />
    </div>
  );
}
