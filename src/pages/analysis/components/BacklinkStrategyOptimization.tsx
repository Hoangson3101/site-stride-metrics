import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, TrendingUp, Target, Lightbulb, Shield } from "lucide-react";

interface Strategy {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  status: "recommended" | "in-progress" | "completed";
  actions: string[];
}

export function BacklinkStrategyOptimization() {
  // Strategies Data
  const strategies: Strategy[] = [
    {
      id: "1",
      title: "Tăng tỷ lệ backlink từ domain có chủ đề cùng ngành",
      description:
        "Hiện tại chỉ có 58% backlink từ các domain cùng chủ đề. Mục tiêu: Đạt 75% trong 6 tháng tới.",
      priority: "high",
      impact: "high",
      effort: "medium",
      status: "recommended",
      actions: [
        "Tập trung vào các domain Marketing/SEO, Technology",
        "Xây dựng quan hệ với các blog chuyên ngành",
        "Tạo nội dung chất lượng để thu hút backlink tự nhiên",
      ],
    },
    {
      id: "2",
      title: "Giảm tỷ lệ backlink từ nguồn không liên quan",
      description:
        "22% backlink hiện tại có relevance thấp. Cần giảm xuống dưới 15% để cải thiện topical authority.",
      priority: "high",
      impact: "high",
      effort: "low",
      status: "recommended",
      actions: [
        "Rà soát và disavow các backlink từ domain không liên quan",
        "Tránh xây dựng backlink từ các nguồn không phù hợp",
        "Tập trung vào chất lượng thay vì số lượng",
      ],
    },
    {
      id: "3",
      title: "Cải thiện semantic relevance của anchor text",
      description:
        "Một số backlink có semantic score thấp. Cần điều chỉnh anchor text để phù hợp hơn với nội dung trang đích.",
      priority: "medium",
      impact: "medium",
      effort: "medium",
      status: "recommended",
      actions: [
        "Thay đổi anchor text generic thành anchor text có ý nghĩa",
        "Đảm bảo anchor text liên quan đến nội dung trang đích",
        "Tránh anchor text quá tối ưu hóa",
      ],
    },
    {
      id: "4",
      title: "Giảm backlink từ domain có outbound links xấu",
      description:
        "8% domain nguồn có tỷ lệ outbound links không uy tín cao. Cần xử lý để tránh ảnh hưởng xấu.",
      priority: "high",
      impact: "medium",
      effort: "low",
      status: "recommended",
      actions: [
        "Xác định các domain có outbound links spam",
        "Disavow các backlink từ domain nguy hiểm",
        "Tránh xây dựng backlink từ các nguồn này trong tương lai",
      ],
    },
    {
      id: "5",
      title: "Tăng cường backlink từ báo chí và blog chuyên ngành",
      description:
        "Xây dựng quan hệ với các báo chí và blog chuyên ngành để có được backlink chất lượng cao.",
      priority: "medium",
      impact: "high",
      effort: "high",
      status: "in-progress",
      actions: [
        "Liên hệ với các báo chí trong ngành",
        "Tạo nội dung có giá trị để được đề cập",
        "Tham gia các sự kiện và hội thảo trong ngành",
      ],
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Cao</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Trung bình</Badge>;
      case "low":
        return <Badge variant="outline">Thấp</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-green-500">Cao</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Trung bình</Badge>;
      case "low":
        return <Badge variant="outline">Thấp</Badge>;
      default:
        return <Badge variant="outline">{impact}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "recommended":
        return <Badge variant="outline">Đề xuất</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">Đang thực hiện</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Hoàn thành</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const highPriorityCount = strategies.filter((s) => s.priority === "high").length;
  const recommendedCount = strategies.filter((s) => s.status === "recommended").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng chiến lược</p>
            <p className="text-2xl font-bold">{strategies.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Ưu tiên cao</p>
            <p className="text-2xl font-bold text-red-500">{highPriorityCount}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-blue-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Đề xuất</p>
            <p className="text-2xl font-bold text-blue-500">{recommendedCount}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-green-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Đang thực hiện</p>
            <p className="text-2xl font-bold text-green-500">
              {strategies.filter((s) => s.status === "in-progress").length}
            </p>
          </div>
        </Card>
      </div>

      {/* Key Recommendations */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Tổng hợp Chiến lược Liên Kết
        </h3>
        <div className="space-y-4 text-sm opacity-90">
          <div>
            <p className="font-semibold mb-2">Chiến lược ưu tiên cao:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Tăng tỷ lệ backlink từ domain có chủ đề cùng ngành lên 75%</li>
              <li>Giảm tỷ lệ backlink từ nguồn không liên quan xuống dưới 15%</li>
              <li>Xử lý các backlink từ domain có outbound links xấu</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Chiến lược dài hạn:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Xây dựng quan hệ với báo chí và blog chuyên ngành</li>
              <li>Cải thiện semantic relevance của anchor text</li>
              <li>Tạo nội dung chất lượng để thu hút backlink tự nhiên</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Strategies Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Chi tiết Các Chiến lược Tối Ưu Hóa
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chiến lược</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Ưu tiên</TableHead>
                <TableHead>Ảnh hưởng</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {strategies.map((strategy) => (
                <TableRow key={strategy.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium max-w-xs">
                    {strategy.title}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-md">
                    {strategy.description}
                  </TableCell>
                  <TableCell>{getPriorityBadge(strategy.priority)}</TableCell>
                  <TableCell>{getImpactBadge(strategy.impact)}</TableCell>
                  <TableCell>{getStatusBadge(strategy.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Detailed Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategies.map((strategy) => (
          <Card key={strategy.id} className="p-6 bg-surface shadow-medium">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{strategy.title}</h4>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  {getPriorityBadge(strategy.priority)}
                  {getImpactBadge(strategy.impact)}
                  {getStatusBadge(strategy.status)}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Hành động cụ thể:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {strategy.actions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {strategy.priority === "high" && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Chiến lược ưu tiên cao - nên thực hiện ngay để cải thiện hiệu quả SEO.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Warning for Ineffective Strategy */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Cảnh báo Chiến lược Không Hiệu Quả
        </h3>
        <p className="text-sm opacity-90 mb-4">
          Nếu chiến lược xây dựng backlink hiện tại không hiệu quả, hệ thống sẽ cảnh báo và cung
          cấp các gợi ý để điều chỉnh. Hiện tại, các chiến lược được đề xuất đều dựa trên phân tích
          dữ liệu thực tế và được khuyến nghị để cải thiện hiệu quả SEO.
        </p>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm opacity-90">
            Theo dõi định kỳ để đảm bảo các chiến lược đang được thực hiện đúng và đạt hiệu quả.
          </span>
        </div>
      </Card>
    </div>
  );
}

