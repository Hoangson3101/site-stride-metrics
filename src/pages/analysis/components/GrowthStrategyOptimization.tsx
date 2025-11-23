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
import { CheckCircle, AlertTriangle, Target, TrendingUp, Lightbulb, Calendar } from "lucide-react";

interface Strategy {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  status: "recommended" | "in-progress" | "completed";
  actions: string[];
  timeline?: string;
}

export function GrowthStrategyOptimization() {
  // Current metrics
  const currentVelocity = 15;
  const targetVelocity = 22;
  const velocityGap = targetVelocity - currentVelocity;

  // Strategies data
  const strategies: Strategy[] = [
    {
      id: "1",
      title: "Tăng cường Outreach và Liên Kết Từ Blog Uy Tín",
      description:
        "Xây dựng quan hệ với các blog uy tín trong ngành để có được backlink chất lượng cao và tự nhiên.",
      priority: "high",
      impact: "high",
      effort: "medium",
      status: "recommended",
      timeline: "3-6 tháng",
      actions: [
        "Xác định danh sách 50-100 blog uy tín trong ngành (DR ≥ 30)",
        "Tạo nội dung có giá trị để đề xuất cho các blog",
        "Thực hiện outreach cá nhân hóa cho từng blog",
        "Theo dõi và duy trì quan hệ lâu dài với các blog",
      ],
    },
    {
      id: "2",
      title: "Tạo Chiến Dịch PR và Bài Viết Thu Hút Liên Kết",
      description:
        "Tạo các bài viết PR chất lượng cao và phân phối chúng trên các nền tảng báo chí và blog để thu hút liên kết tự nhiên.",
      priority: "high",
      impact: "high",
      effort: "high",
      status: "recommended",
      timeline: "2-4 tháng",
      actions: [
        "Tạo nội dung PR có giá trị và mới mẻ",
        "Phân phối bài viết trên các nền tảng báo chí uy tín",
        "Tối ưu hóa nội dung để tăng khả năng được đề cập",
        "Theo dõi và đo lường hiệu quả của chiến dịch PR",
      ],
    },
    {
      id: "3",
      title: "Tham Gia Sự Kiện và Hội Thảo Trong Ngành",
      description:
        "Tham gia các sự kiện và hội thảo trong ngành để xây dựng quan hệ và có cơ hội nhận được backlink từ các trang web sự kiện.",
      priority: "medium",
      impact: "medium",
      effort: "medium",
      status: "recommended",
      timeline: "Ongoing",
      actions: [
        "Xác định các sự kiện và hội thảo quan trọng trong ngành",
        "Đăng ký tham gia với tư cách speaker hoặc sponsor",
        "Tạo nội dung liên quan đến sự kiện để được đề cập",
        "Xây dựng quan hệ với các tổ chức và cá nhân trong ngành",
      ],
    },
    {
      id: "4",
      title: "Tối Ưu Hóa Nội Dung Để Tăng Khả Năng Được Đề Cập",
      description:
        "Tối ưu hóa nội dung website để tăng khả năng được các trang web khác đề cập và liên kết một cách tự nhiên.",
      priority: "medium",
      impact: "medium",
      effort: "medium",
      status: "in-progress",
      timeline: "Ongoing",
      actions: [
        "Tạo nội dung độc đáo và có giá trị cao",
        "Tối ưu hóa nội dung cho các từ khóa có tiềm năng",
        "Tạo các infographic và visual content dễ chia sẻ",
        "Đảm bảo nội dung được cập nhật thường xuyên",
      ],
    },
    {
      id: "5",
      title: "Xây Dựng Quan Hệ Với Influencer và Chuyên Gia",
      description:
        "Xây dựng quan hệ với các influencer và chuyên gia trong ngành để có cơ hội nhận được backlink từ các trang web của họ.",
      priority: "medium",
      impact: "medium",
      effort: "high",
      status: "recommended",
      timeline: "6-12 tháng",
      actions: [
        "Xác định các influencer và chuyên gia quan trọng trong ngành",
        "Tương tác với họ trên mạng xã hội và các nền tảng khác",
        "Cung cấp giá trị và hỗ trợ họ khi có thể",
        "Xây dựng quan hệ lâu dài và tin cậy",
      ],
    },
    {
      id: "6",
      title: "Tạo Lịch Trình Xây Dựng Liên Kết Đều Đặn",
      description:
        "Tạo một lịch trình xây dựng liên kết đều đặn để đảm bảo tốc độ tăng trưởng ổn định và tự nhiên.",
      priority: "high",
      impact: "high",
      effort: "low",
      status: "recommended",
      timeline: "Ngay lập tức",
      actions: [
        "Lập kế hoạch xây dựng liên kết hàng tuần và hàng tháng",
        "Phân bổ đều các hoạt động outreach và link building",
        "Theo dõi và điều chỉnh lịch trình khi cần thiết",
        "Đảm bảo tốc độ tăng trưởng ổn định và tự nhiên",
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

  return (
    <div className="space-y-6">
      {/* Current vs Target */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tốc độ hiện tại</p>
            <p className="text-2xl font-bold">{currentVelocity}</p>
            <p className="text-xs text-muted-foreground">backlinks/tháng</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mục tiêu</p>
            <p className="text-2xl font-bold">{targetVelocity}</p>
            <p className="text-xs text-muted-foreground">backlinks/tháng</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Cần tăng thêm</p>
            <p className="text-2xl font-bold text-red-500">+{velocityGap}</p>
            <p className="text-xs text-muted-foreground">backlinks/tháng</p>
          </div>
        </Card>
      </div>

      {/* Strategies Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Chiến Lược Tăng Cường Tốc Độ Xây Dựng Liên Kết
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chiến lược</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Ưu tiên</TableHead>
                <TableHead>Ảnh hưởng</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {strategies.map((strategy) => (
                <TableRow key={strategy.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium max-w-xs">{strategy.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-md">
                    {strategy.description}
                  </TableCell>
                  <TableCell>{getPriorityBadge(strategy.priority)}</TableCell>
                  <TableCell>{getImpactBadge(strategy.impact)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {strategy.timeline || "—"}
                  </TableCell>
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
              {strategy.timeline && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Thời gian: {strategy.timeline}</span>
                </div>
              )}
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
                    Chiến lược ưu tiên cao - nên thực hiện ngay để tăng tốc độ xây dựng backlink.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Link Building Schedule */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Lịch Trình Xây Dựng Liên Kết Đề Xuất
        </h3>
        <div className="space-y-4 text-sm opacity-90">
          <div>
            <p className="font-semibold mb-2">Mục tiêu: Tăng từ {currentVelocity} lên {targetVelocity} backlinks/tháng</p>
            <p className="mb-3">Để đạt mục tiêu, bạn cần tăng thêm {velocityGap} backlinks/tháng. Lịch trình đề xuất:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-semibold mb-2">Tuần 1-2</p>
              <ul className="space-y-1 text-xs list-disc list-inside">
                <li>Outreach: 5-7 blog</li>
                <li>PR: 1-2 bài viết</li>
                <li>Mục tiêu: 3-4 backlinks</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-semibold mb-2">Tuần 3-4</p>
              <ul className="space-y-1 text-xs list-disc list-inside">
                <li>Outreach: 5-7 blog</li>
                <li>Guest post: 1-2 bài</li>
                <li>Mục tiêu: 3-4 backlinks</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-semibold mb-2">Tháng 2-3</p>
              <ul className="space-y-1 text-xs list-disc list-inside">
                <li>Tăng cường outreach</li>
                <li>Tham gia sự kiện</li>
                <li>Mục tiêu: 18-20 backlinks/tháng</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-semibold mb-2">Tháng 4-6</p>
              <ul className="space-y-1 text-xs list-disc list-inside">
                <li>Duy trì tốc độ</li>
                <li>Mở rộng quan hệ</li>
                <li>Mục tiêu: 22+ backlinks/tháng</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Recommendations */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Tổng Hợp Khuyến Nghị
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold mb-2">Các chiến lược ưu tiên cao:</p>
            <ul className="space-y-1 ml-4 list-disc text-muted-foreground">
              <li>Tăng cường outreach và liên kết từ blog uy tín (3-6 tháng)</li>
              <li>Tạo chiến dịch PR và bài viết thu hút liên kết (2-4 tháng)</li>
              <li>Tạo lịch trình xây dựng liên kết đều đặn (ngay lập tức)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Mục tiêu:</p>
            <ul className="space-y-1 ml-4 list-disc text-muted-foreground">
              <li>Tăng tốc độ từ {currentVelocity} lên {targetVelocity} backlinks/tháng</li>
              <li>Đảm bảo tốc độ tăng trưởng ổn định và tự nhiên</li>
              <li>Tránh spike đột ngột để không bị Google nghi ngờ</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

