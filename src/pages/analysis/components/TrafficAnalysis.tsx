import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ExternalLink, Activity, XCircle } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DeadSiteBacklink {
  sourceUrl: string;
  domain: string;
  dr: number;
  traffic: number;
  indexStatus: "deindexed" | "no-traffic" | "penalized";
  reason: string;
  lastSeen: string;
  backlinks: number;
}

export function TrafficAnalysis() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Traffic vs Dead Sites Distribution
  const trafficDistribution = [
    { name: "Domain có Traffic", value: 92, count: 1704, color: "#10b981" },
    { name: "Site chết/Unindex", value: 8, count: 148, color: "#ef4444" },
  ];

  const detailedTrafficDistribution = [
    { range: "Traffic > 10K", count: 850, percentage: 46 },
    { range: "Traffic 1K-10K", count: 650, percentage: 35 },
    { range: "Traffic < 1K", count: 204, percentage: 11 },
    { range: "No Traffic/Dead", count: 148, percentage: 8 },
  ];

  // Dead Sites Backlinks
  const deadSiteBacklinks: DeadSiteBacklink[] = [
    {
      sourceUrl: "https://spammy-site1.xyz/article",
      domain: "spammy-site1.xyz",
      dr: 5,
      traffic: 0,
      indexStatus: "deindexed",
      reason: "Site bị Google de-index do spam",
      lastSeen: "2024-08-15",
      backlinks: 8,
    },
    {
      sourceUrl: "https://dead-forum2.net/thread",
      domain: "dead-forum2.net",
      dr: 12,
      traffic: 50,
      indexStatus: "no-traffic",
      reason: "Domain không có traffic thực tế",
      lastSeen: "2024-09-20",
      backlinks: 15,
    },
    {
      sourceUrl: "https://link-farm3.info/directory",
      domain: "link-farm3.info",
      dr: 8,
      traffic: 0,
      indexStatus: "penalized",
      reason: "Site bị phạt do link farm",
      lastSeen: "2024-07-10",
      backlinks: 22,
    },
    {
      sourceUrl: "https://expired-blog.com/post",
      domain: "expired-blog.com",
      dr: 15,
      traffic: 0,
      indexStatus: "deindexed",
      reason: "Domain đã hết hạn, không còn hoạt động",
      lastSeen: "2024-06-05",
      backlinks: 5,
    },
    {
      sourceUrl: "https://parked-domain.net",
      domain: "parked-domain.net",
      dr: 3,
      traffic: 0,
      indexStatus: "no-traffic",
      reason: "Domain đang được park, không có nội dung",
      lastSeen: "2024-10-01",
      backlinks: 3,
    },
  ];

  // Pagination
  const totalPages = Math.ceil(deadSiteBacklinks.length / pageSize);
  const paginatedBacklinks = deadSiteBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const deadSitesPercentage = trafficDistribution[1].value;
  const isWarning = deadSitesPercentage > 5;

  const COLORS = ["#10b981", "#ef4444"]; // Green and Red - không dùng trắng/xám

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "deindexed":
        return <Badge variant="destructive">Đã bị gỡ index</Badge>;
      case "no-traffic":
        return <Badge className="bg-yellow-500">Không có Traffic</Badge>;
      case "penalized":
        return <Badge variant="destructive">Bị phạt</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deindexed":
      case "penalized":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "no-traffic":
        return <Activity className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Traffic Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Backlink từ Domain có Traffic vs Site chết
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {trafficDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value}% (${props.payload.count} backlink)`,
                  props.payload.name,
                ]}
              />
              <Legend 
                formatter={(value) => {
                  const entry = trafficDistribution.find(d => d.name === value);
                  return entry ? `${value}: ${entry.value}%` : value;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân bố chi tiết theo Traffic
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={detailedTrafficDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="range"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={80}
                label={{ value: "Khoảng Traffic", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                label={{ value: "Số lượng Backlink", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value} backlink (${props.payload.percentage}%)`,
                  props.payload.range,
                ]}
              />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Phát hiện {deadSitesPercentage}% backlink từ các site chết
            hoặc không có traffic ({trafficDistribution[1].count} backlinks). Những backlink này có
            thể ảnh hưởng xấu đến hồ sơ SEO. Gợi ý: Xem xét disavow các backlink từ site chết hoặc
            liên hệ để gỡ bỏ link nếu có thể.
          </AlertDescription>
        </Alert>
      )}

      {/* Dead Sites Backlinks List */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Danh sách Backlink từ Site chết/Unindex ({deadSiteBacklinks.length} domain)
          </h3>
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

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trạng thái</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Lý do</TableHead>
                <TableHead>Lần cuối thấy</TableHead>
                <TableHead>Backlinks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBacklinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào từ site chết.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBacklinks.map((link, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50 bg-red-50/50 dark:bg-red-950/20">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(link.indexStatus)}
                        {getStatusBadge(link.indexStatus)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={link.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 max-w-xs truncate"
                      >
                        {link.sourceUrl}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell className="font-medium">{link.domain}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">{link.dr}</Badge>
                    </TableCell>
                    <TableCell>
                      {link.traffic > 0 ? (
                        link.traffic.toLocaleString()
                      ) : (
                        <span className="text-destructive">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {link.reason}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{link.lastSeen}</TableCell>
                    <TableCell>{link.backlinks}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-4 bg-muted/50 border-0">
        <div className="space-y-2 text-sm">
          <p className="font-medium">Lưu ý về Site chết:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              <strong>Đã bị gỡ index:</strong> Domain đã bị Google loại bỏ khỏi index, không còn xuất
              hiện trong kết quả tìm kiếm.
            </li>
            <li>
              <strong>Không có Traffic:</strong> Domain vẫn còn index nhưng không có traffic thực tế,
              có thể là domain mới hoặc không có nội dung chất lượng.
            </li>
            <li>
              <strong>Bị phạt:</strong> Domain bị Google phạt do vi phạm nguyên tắc SEO (spam,
              link farm, v.v.).
            </li>
            <li>
              Nên xem xét disavow các backlink từ site chết để tránh ảnh hưởng xấu đến hồ sơ SEO.
            </li>
          </ul>
        </div>
      </Card>

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

