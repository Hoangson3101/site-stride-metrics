import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export function BrandLinkStrategy() {
  // Strategies Data
  const strategies: Strategy[] = [
    {
      id: "1",
      title: "Tăng cường hiện diện trên mạng xã hội",
      description:
        "Xây dựng thêm các social profiles và đảm bảo tính nhất quán của NAP trên tất cả các nền tảng.",
      priority: "high",
      impact: "high",
      effort: "medium",
      status: "recommended",
      actions: [
        "Tạo LinkedIn company profile nếu chưa có",
        "Đảm bảo NAP nhất quán trên tất cả social profiles",
        "Xác minh các social profiles quan trọng",
        "Thêm link về website trên tất cả social profiles",
      ],
    },
    {
      id: "2",
      title: "Củng cố E-A-T với Wikipedia và Authoritative Links",
      description:
        "Tăng cường các backlink từ các trang uy tín như Wikipedia, .edu, .gov để củng cố E-A-T.",
      priority: "high",
      impact: "high",
      effort: "high",
      status: "recommended",
      actions: [
        "Liên hệ với Wikipedia để thêm thông tin về thương hiệu",
        "Xây dựng quan hệ với các trường đại học để có backlink .edu",
        "Tạo nội dung nghiên cứu để được các trang .edu đề cập",
        "Tham gia các chương trình hợp tác với cơ quan chính phủ",
      ],
    },
    {
      id: "3",
      title: "Phát triển brand mentions từ báo chí và blog uy tín",
      description:
        "Tăng cường sự nhắc đến thương hiệu trên các nền tảng báo chí, blog uy tín để cải thiện brand authority.",
      priority: "medium",
      impact: "high",
      effort: "high",
      status: "in-progress",
      actions: [
        "Tạo nội dung có giá trị để được báo chí đề cập",
        "Thực hiện PR campaigns với các báo chí lớn",
        "Viết guest posts trên các blog chuyên ngành",
        "Tham gia các sự kiện và hội thảo trong ngành",
      ],
    },
    {
      id: "4",
      title: "Outreach cho brand mentions không có link",
      description:
        "Liên hệ với các tác giả hoặc webmaster để thêm link vào các brand mentions hiện có.",
      priority: "medium",
      impact: "medium",
      effort: "medium",
      status: "recommended",
      actions: [
        "Xác định các brand mentions không có link",
        "Liên hệ với tác giả để yêu cầu thêm link",
        "Cung cấp giá trị để đổi lấy backlink",
        "Theo dõi kết quả outreach",
      ],
    },
    {
      id: "5",
      title: "Cải thiện Author Bio links",
      description:
        "Xây dựng quan hệ với các tác giả uy tín để có backlink từ trang tiểu sử tác giả.",
      priority: "medium",
      impact: "medium",
      effort: "medium",
      status: "recommended",
      actions: [
        "Xác định các blog có trang About the Author",
        "Liên hệ với các tác giả để hợp tác",
        "Viết guest posts và yêu cầu link trong author bio",
        "Xây dựng quan hệ lâu dài với các tác giả",
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
          Tổng Hợp Chiến Lược Xây Dựng Liên Kết Thương Hiệu
        </h3>
        <div className="space-y-4 text-sm opacity-90">
          <div>
            <p className="font-semibold mb-2">Chiến lược ưu tiên cao:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Tăng cường hiện diện trên mạng xã hội và đảm bảo NAP nhất quán</li>
              <li>Củng cố E-A-T với Wikipedia, .edu, .gov links</li>
              <li>Phát triển brand mentions từ báo chí và blog uy tín</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Chiến lược dài hạn:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Outreach cho brand mentions không có link</li>
              <li>Cải thiện Author Bio links từ các tác giả uy tín</li>
              <li>Xây dựng quan hệ lâu dài với các nền tảng uy tín</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Strategies Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Chi tiết Các Chiến Lược Tối Ưu Hóa
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
                    Chiến lược ưu tiên cao - nên thực hiện ngay để cải thiện brand signals và E-A-T.
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
          Cảnh Báo Chiến Lược Không Hiệu Quả
        </h3>
        <p className="text-sm opacity-90 mb-4">
          Nếu chiến lược xây dựng liên kết thương hiệu hiện tại không hiệu quả, hệ thống sẽ cảnh
          báo và cung cấp các gợi ý để điều chỉnh. Hiện tại, các chiến lược được đề xuất đều dựa
          trên phân tích dữ liệu thực tế và được khuyến nghị để cải thiện brand signals và E-A-T.
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

