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
import { CheckCircle, AlertTriangle, Target, TrendingUp, Lightbulb } from "lucide-react";

interface OptimizationStrategy {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  status: "recommended" | "in-progress" | "completed";
  actions: string[];
}

export function DofollowOptimization() {
  // Current ratios
  const currentDofollow = 75;
  const currentNofollow = 22;
  const targetDofollow = 70;
  const targetNofollow = 25;
  const dofollowGap = currentDofollow - targetDofollow;
  const nofollowGap = targetNofollow - currentNofollow;

  // Strategies data
  const strategies: OptimizationStrategy[] = [
    {
      id: "1",
      title: "Tăng cường tỷ lệ nofollow từ các nguồn tự nhiên",
      description:
        "Bổ sung thêm backlink nofollow từ các nguồn tự nhiên như mạng xã hội, blog comments, và forum để cân bằng tỷ lệ.",
      priority: "high",
      impact: "high",
      effort: "medium",
      status: "recommended",
      actions: [
        "Tăng cường hoạt động trên mạng xã hội và thêm link nofollow",
        "Tham gia thảo luận trên các forum và blog",
        "Để lại comments trên các blog liên quan với link nofollow",
        "Tạo nội dung trên các nền tảng UGC",
      ],
    },
    {
      id: "2",
      title: "Giảm tỷ lệ backlink từ footer",
      description:
        "Giảm tỷ lệ backlink từ footer và sidebar, ưu tiên backlink từ nội dung bài viết để tăng tính tự nhiên.",
      priority: "high",
      impact: "high",
      effort: "high",
      status: "recommended",
      actions: [
        "Yêu cầu chuyển backlink từ footer sang content",
        "Giảm số lượng backlink từ sidebar",
        "Tăng cường backlink từ nội dung bài viết",
        "Ưu tiên backlink từ guest posts và editorial links",
      ],
    },
    {
      id: "3",
      title: "Giảm tỷ lệ dofollow từ domain ít uy tín",
      description:
        "Giảm tỷ lệ backlink dofollow từ các domain có DR thấp, yêu cầu chuyển sang nofollow hoặc disavow.",
      priority: "medium",
      impact: "medium",
      effort: "medium",
      status: "in-progress",
      actions: [
        "Xác định các backlink dofollow từ domain DR < 30",
        "Liên hệ với webmaster để yêu cầu chuyển sang nofollow",
        "Disavow các backlink từ domain spam hoặc link farm",
        "Tăng cường backlink dofollow từ domain uy tín (DR ≥ 30)",
      ],
    },
    {
      id: "4",
      title: "Cân bằng tỷ lệ dofollow/nofollow theo chuẩn ngành",
      description:
        "Điều chỉnh tỷ lệ dofollow/nofollow để phù hợp với chuẩn ngành (70-75% dofollow, 20-25% nofollow).",
      priority: "high",
      impact: "high",
      effort: "medium",
      status: "recommended",
      actions: [
        "Theo dõi tỷ lệ dofollow/nofollow của đối thủ",
        "Điều chỉnh chiến lược xây dựng backlink",
        "Đảm bảo tỷ lệ dofollow/nofollow tự nhiên và hợp lý",
        "Theo dõi và điều chỉnh định kỳ",
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

  const isUnnatural = Math.abs(dofollowGap) > 5 || Math.abs(nofollowGap) > 5;

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isUnnatural && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tỷ lệ dofollow/nofollow hiện tại ({currentDofollow}% dofollow,{" "}
            {currentNofollow}% nofollow) không phù hợp với chuẩn ngành (mục tiêu: {targetDofollow}% dofollow,{" "}
            {targetNofollow}% nofollow). Khuyến nghị: Điều chỉnh tỷ lệ để đảm bảo tính tự nhiên và hiệu
            quả SEO.
          </AlertDescription>
        </Alert>
      )}

      {/* Current vs Target */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Dofollow hiện tại</p>
            <p className="text-2xl font-bold">{currentDofollow}%</p>
            <p className="text-xs text-muted-foreground">Mục tiêu: {targetDofollow}%</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Nofollow hiện tại</p>
            <p className="text-2xl font-bold">{currentNofollow}%</p>
            <p className="text-xs text-muted-foreground">Mục tiêu: {targetNofollow}%</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Cần giảm Dofollow</p>
            <p className="text-2xl font-bold text-red-500">
              {dofollowGap > 0 ? `-${dofollowGap}%` : "0%"}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Cần tăng Nofollow</p>
            <p className="text-2xl font-bold text-green-500">
              {nofollowGap > 0 ? `+${nofollowGap}%` : "0%"}
            </p>
          </div>
        </Card>
      </div>

      {/* Strategies Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Chiến Lược Tối Ưu Hóa Tỷ Lệ Dofollow/Nofollow
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
                  <TableCell className="font-medium max-w-xs">{strategy.title}</TableCell>
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
                    Chiến lược ưu tiên cao - nên thực hiện ngay để cải thiện tỷ lệ dofollow/nofollow.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Recommendations Summary */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Tổng Hợp Khuyến Nghị
        </h3>
        <div className="space-y-3 text-sm opacity-90">
          <div>
            <p className="font-semibold mb-2">Các hành động ưu tiên cao:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>
                Tăng cường tỷ lệ nofollow từ các nguồn tự nhiên (cần thêm khoảng {nofollowGap > 0 ? nofollowGap : 0}%)
              </li>
              <li>
                Giảm tỷ lệ dofollow từ footer và sidebar (cần giảm khoảng {dofollowGap > 0 ? dofollowGap : 0}%)
              </li>
              <li>Giảm tỷ lệ dofollow từ domain ít uy tín</li>
              <li>Cân bằng tỷ lệ dofollow/nofollow theo chuẩn ngành</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Mục tiêu:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Dofollow: {targetDofollow}% (hiện tại: {currentDofollow}%)</li>
              <li>Nofollow: {targetNofollow}% (hiện tại: {currentNofollow}%)</li>
              <li>UGC: 2-3%</li>
              <li>Sponsored: 1-2%</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

