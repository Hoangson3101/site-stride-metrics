import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SpikeEvent {
  period: string;
  velocity: number;
  previousAvg: number;
  spikePercentage: number;
  reason?: string;
  severity: "high" | "medium" | "low";
  recommendation: string;
}

export function SpikeAnalysis() {
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Velocity data with spike detection
  const velocityData = [
    { period: "2024-05", you: 12, avg: 15 },
    { period: "2024-06", you: 8, avg: 15 },
    { period: "2024-07", you: 14, avg: 15 },
    { period: "2024-08", you: 18, avg: 15 },
    { period: "2024-09", you: 38, avg: 15, isSpike: true },
    { period: "2024-10", you: 16, avg: 15 },
    { period: "2024-11", you: 12, avg: 15 },
  ];

  // Spike events data
  const spikeEvents: SpikeEvent[] = [
    {
      period: "2024-09",
      velocity: 38,
      previousAvg: 15,
      spikePercentage: 153.3,
      reason: "Tăng đột ngột từ 18 lên 38 RD trong một tháng",
      severity: "high",
      recommendation:
        "Kiểm tra nguồn gốc của 38 RD mới. Nếu đến từ chiến dịch PR hợp lệ, tiếp tục theo dõi. Nếu phát hiện domain spam, cần disavow ngay.",
    },
  ];

  // Filter spikes
  const filteredSpikes = spikeEvents.filter((spike) => {
    if (severityFilter === "all") return true;
    return spike.severity === severityFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSpikes.length / pageSize);
  const paginatedSpikes = filteredSpikes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const highSeverityCount = spikeEvents.filter((s) => s.severity === "high").length;
  const avgVelocity = velocityData.reduce((sum, d) => sum + d.you, 0) / velocityData.length;

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">Cao</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Trung bình</Badge>;
      case "low":
        return <Badge variant="outline">Thấp</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {highSeverityCount > 0 && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo nghiêm trọng:</strong> Phát hiện {highSeverityCount} spike bất thường trong tốc độ
            tăng trưởng backlink. Những spike này có thể khiến Google nghi ngờ chiến lược xây dựng liên kết và có
            thể dẫn đến hình phạt. Khuyến nghị: Kiểm tra ngay lập tức và đảm bảo các backlink mới có chất lượng tốt.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng số spike</p>
            <p className="text-2xl font-bold">{spikeEvents.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mức độ cao</p>
            <p className="text-2xl font-bold text-red-500">{highSeverityCount}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tốc độ trung bình</p>
            <p className="text-2xl font-bold">{avgVelocity.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">backlinks/tháng</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Spike lớn nhất</p>
            <p className="text-2xl font-bold">
              {Math.max(...spikeEvents.map((s) => s.spikePercentage)).toFixed(1)}%
            </p>
          </div>
        </Card>
      </div>

      {/* Spike Chart */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Biểu Đồ Spike Tốc Độ Tăng Trưởng
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={velocityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="period"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend />
            <ReferenceLine
              y={avgVelocity}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              label="Trung bình"
            />
            <Line
              type="monotone"
              dataKey="you"
              name="Tốc độ thực tế"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={(props: any) => {
                const isSpike = velocityData.find((d) => d.period === props.payload.period)?.isSpike;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={isSpike ? 8 : 5}
                    fill={isSpike ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                    stroke={isSpike ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                    strokeWidth={isSpike ? 3 : 1}
                  />
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="avg"
              name="Tốc độ trung bình"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Spike Bar Chart */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          So Sánh Tốc Độ với Trung Bình
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={velocityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="period"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend />
            <Bar
              dataKey="you"
              name="Tốc độ thực tế"
              fill="hsl(var(--primary))"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="avg"
              name="Tốc độ trung bình"
              fill="#8b5cf6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Mức độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả mức độ</SelectItem>
                <SelectItem value="high">Cao</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="low">Thấp</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="ml-auto">
            <Select value={pageSize.toString()} onValueChange={(v) => setPageSize(Number(v))}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25/trang</SelectItem>
                <SelectItem value="50">50/trang</SelectItem>
                <SelectItem value="100">100/trang</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Spike Events Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh Sách Spike Bất Thường
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thời gian</TableHead>
                <TableHead>Tốc độ</TableHead>
                <TableHead>Trung bình trước</TableHead>
                <TableHead>Spike %</TableHead>
                <TableHead>Lý do</TableHead>
                <TableHead>Mức độ</TableHead>
                <TableHead>Khuyến nghị</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSpikes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy spike nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedSpikes.map((spike, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      spike.severity === "high"
                        ? "bg-red-50/50 dark:bg-red-950/20"
                        : spike.severity === "medium"
                        ? "bg-yellow-50/50 dark:bg-yellow-950/20"
                        : ""
                    }`}
                  >
                    <TableCell className="font-medium">{spike.period}</TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">{spike.velocity} backlinks</Badge>
                    </TableCell>
                    <TableCell>{spike.previousAvg.toFixed(1)} backlinks</TableCell>
                    <TableCell>
                      <Badge variant="destructive">
                        {spike.spikePercentage > 0 ? "+" : ""}
                        {spike.spikePercentage.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {spike.reason || "Không xác định"}
                    </TableCell>
                    <TableCell>{getSeverityBadge(spike.severity)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {spike.recommendation}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Recommendations */}
      {highSeverityCount > 0 && (
        <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Hành Động Khẩn Cấp
          </h3>
          <div className="space-y-3 text-sm opacity-90">
            <p>
              Phát hiện {highSeverityCount} spike có mức độ nguy hiểm cao. Các spike này cần được xử lý ngay lập
              tức:
            </p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Kiểm tra nguồn gốc của các backlink mới trong thời gian spike</li>
              <li>Xác định xem spike đến từ chiến dịch PR hợp lệ hay từ nguồn spam/negative SEO</li>
              <li>Nếu phát hiện domain spam, cần disavow ngay để tránh bị Google phạt</li>
              <li>Giảm tốc độ xây dựng backlink trong tháng tới để tránh nguy cơ bị phạt</li>
              <li>Theo dõi và điều chỉnh chiến lược để đảm bảo tốc độ tăng trưởng ổn định</li>
            </ul>
          </div>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

