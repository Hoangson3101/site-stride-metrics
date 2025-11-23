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
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown, Calendar, ExternalLink } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface LostLink {
  domain: string;
  sourceUrl: string;
  lostDate: string;
  reason: string;
  dr: number;
  traffic: number;
  importance: "high" | "medium" | "low";
}

export function LostLinksAnalysis() {
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Lost Links Timeline
  const lostLinksTimeline = [
    { month: "2024-05", lost: 2 },
    { month: "2024-06", lost: 3 },
    { month: "2024-07", lost: 5 },
    { month: "2024-08", lost: 4 },
    { month: "2024-09", lost: 6 },
    { month: "2024-10", lost: 8 },
    { month: "2024-11", lost: 3 },
  ];

  // Lost Links Data
  const lostLinks: LostLink[] = [
    {
      domain: "old-blog.com",
      sourceUrl: "https://old-blog.com/article-removed",
      lostDate: "2024-09-15",
      reason: "404 Error - Trang bị xóa",
      dr: 45,
      traffic: 12000,
      importance: "high",
    },
    {
      domain: "partner-site.com",
      sourceUrl: "https://partner-site.com/partnership-page",
      lostDate: "2024-10-03",
      reason: "Gỡ link - Hết hợp tác",
      dr: 68,
      traffic: 25000,
      importance: "high",
    },
    {
      domain: "news-archive.com",
      sourceUrl: "https://news-archive.com/old-news",
      lostDate: "2024-10-28",
      reason: "Noindex - Trang bị noindex",
      dr: 52,
      traffic: 15000,
      importance: "medium",
    },
    {
      domain: "directory-site.com",
      sourceUrl: "https://directory-site.com/listing",
      lostDate: "2024-11-05",
      reason: "404 Error - Trang bị xóa",
      dr: 28,
      traffic: 3000,
      importance: "low",
    },
  ];

  // Filter lost links
  const filteredLostLinks = lostLinks.filter((link) => {
    if (dateFilter === "all") return true;
    // Simple filter logic - can be enhanced
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLostLinks.length / pageSize);
  const paginatedLostLinks = filteredLostLinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const highImportanceLost = lostLinks.filter((l) => l.importance === "high").length;
  const isWarning = highImportanceLost > 0;

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case "high":
        return <Badge variant="destructive">Cao</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Trung bình</Badge>;
      case "low":
        return <Badge variant="outline">Thấp</Badge>;
      default:
        return <Badge variant="outline">{importance}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeline Chart */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Biểu Đồ Lost Links Theo Thời Gian
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lostLinksTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="lost"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              name="Số lượng Lost Links"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Phát hiện {highImportanceLost} backlink quan trọng (DR cao)
            đã bị mất. Điều này có thể ảnh hưởng nghiêm trọng đến hiệu quả SEO. Khuyến nghị: Liên
            hệ với domain nguồn để lấy lại backlink hoặc thay thế bằng các backlink mới từ domain
            uy tín tương đương.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng Lost Links</p>
            <p className="text-2xl font-bold">{lostLinks.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Quan trọng</p>
            <p className="text-2xl font-bold text-red-500">{highImportanceLost}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Trung bình/Thấp</p>
            <p className="text-2xl font-bold">
              {lostLinks.filter((l) => l.importance !== "high").length}
            </p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Khoảng thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả thời gian</SelectItem>
                <SelectItem value="week">Tuần qua</SelectItem>
                <SelectItem value="month">Tháng qua</SelectItem>
                <SelectItem value="quarter">Quý qua</SelectItem>
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

      {/* Lost Links Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh sách Backlink Đã Mất
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>URL cũ</TableHead>
                <TableHead>Ngày mất</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Lý do</TableHead>
                <TableHead>Mức độ quan trọng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLostLinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy lost link nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLostLinks.map((link, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      link.importance === "high" ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <TableCell className="font-medium">{link.domain}</TableCell>
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
                    <TableCell className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {link.lostDate}
                    </TableCell>
                    <TableCell>
                      <Badge variant={link.dr > 50 ? "default" : "secondary"}>
                        {link.dr}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                        {link.reason}
                      </Badge>
                    </TableCell>
                    <TableCell>{getImportanceBadge(link.importance)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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

