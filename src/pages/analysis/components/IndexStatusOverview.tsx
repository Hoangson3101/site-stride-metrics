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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle, XCircle, ExternalLink, Calendar } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IndexedBacklink {
  sourceUrl: string;
  domain: string;
  indexStatus: "indexed" | "not-indexed";
  dr: number;
  traffic: number;
  createdDate: string;
  lastChecked: string;
  reason?: string;
  suggestion?: string;
}

export function IndexStatusOverview() {
  const [selectedLink, setSelectedLink] = useState<IndexedBacklink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Index Status Distribution
  const indexStatusDistribution = [
    { name: "Đã Index", value: 78, count: 1476, color: "hsl(var(--primary))" },
    { name: "Chưa Index", value: 22, count: 416, color: "hsl(var(--destructive))" },
  ];

  // Backlinks Data
  const backlinks: IndexedBacklink[] = [
    {
      sourceUrl: "https://seo-blog.com/article",
      domain: "seo-blog.com",
      indexStatus: "indexed",
      dr: 68,
      traffic: 45000,
      createdDate: "2024-10-15",
      lastChecked: "2024-11-20",
    },
    {
      sourceUrl: "https://tech-news.com/review",
      domain: "tech-news.com",
      indexStatus: "indexed",
      dr: 72,
      traffic: 120000,
      createdDate: "2024-09-20",
      lastChecked: "2024-11-20",
    },
    {
      sourceUrl: "https://quality-blog.com/new-article",
      domain: "quality-blog.com",
      indexStatus: "not-indexed",
      dr: 45,
      traffic: 12000,
      createdDate: "2024-10-15",
      lastChecked: "2024-11-20",
      reason: "Trang nguồn không được Google crawl",
      suggestion: "Sử dụng ping URL hoặc xây dựng liên kết tầng 2",
    },
    {
      sourceUrl: "https://news-portal.com/press-release",
      domain: "news-portal.com",
      indexStatus: "not-indexed",
      dr: 52,
      traffic: 25000,
      createdDate: "2024-10-20",
      lastChecked: "2024-11-20",
      reason: "Trang mới, chưa được index",
      suggestion: "Đề xuất xây dựng tier 2 links",
    },
    {
      sourceUrl: "https://forum-site.com/thread",
      domain: "forum-site.com",
      indexStatus: "not-indexed",
      dr: 28,
      traffic: 5000,
      createdDate: "2024-11-01",
      lastChecked: "2024-11-20",
      reason: "Forum post, cần thời gian để index",
      suggestion: "Có thể chờ thêm hoặc ping URL",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = backlinks.filter((link) => {
    if (statusFilter === "all") return true;
    return link.indexStatus === statusFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const notIndexedPercentage = indexStatusDistribution[1].value;
  const isWarning = notIndexedPercentage > 30;

  const COLORS = ["hsl(var(--primary))", "hsl(var(--destructive))"];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "indexed":
        return <Badge className="bg-green-500">Đã Index</Badge>;
      case "not-indexed":
        return <Badge variant="destructive">Chưa Index</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "indexed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "not-indexed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleViewDetails = (link: IndexedBacklink) => {
    setSelectedLink(link);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Tình Trạng Index
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={indexStatusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {indexStatusDistribution.map((entry, index) => (
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
                  `${value}% (${props.payload.count} backlinks)`,
                  props.payload.name,
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So sánh Số lượng
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={indexStatusDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
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
                formatter={(value: number, name: string, props: any) => [
                  `${props.payload.count} backlinks (${value}%)`,
                  props.payload.name,
                ]}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Tỷ lệ backlink chưa index là {notIndexedPercentage}%, quá
            cao (ngưỡng an toàn: &lt;30%). Điều này có thể ảnh hưởng đến hiệu quả SEO. Khuyến nghị:
            Sử dụng các phương pháp như ping URL, xây dựng liên kết tầng 2, hoặc kiểm tra lý do
            tại sao các backlink chưa được index.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indexStatusDistribution.map((status, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(status.name === "Đã Index" ? "indexed" : "not-indexed")}
                <p className="text-sm font-medium">{status.name}</p>
              </div>
              <p className="text-2xl font-bold">{status.value}%</p>
              <p className="text-xs text-muted-foreground">
                {status.count} backlinks
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tình trạng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="indexed">Đã Index</SelectItem>
                <SelectItem value="not-indexed">Chưa Index</SelectItem>
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

      {/* Backlinks Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh sách Backlink Chưa Index
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tình trạng</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Lần kiểm tra cuối</TableHead>
                <TableHead>Lý do</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBacklinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBacklinks.map((link, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      link.indexStatus === "not-indexed" ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
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
                      <Badge variant={link.dr > 50 ? "default" : "secondary"}>
                        {link.dr}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {link.createdDate}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {link.lastChecked}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {link.reason || "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              Chi tiết Tình Trạng Index
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về tình trạng index của backlink
            </DialogDescription>
          </DialogHeader>
          {selectedLink && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Domain</p>
                  <p className="font-medium">{selectedLink.domain}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">DR</p>
                  <p className="font-medium">{selectedLink.dr}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tình trạng</p>
                  {getStatusBadge(selectedLink.indexStatus)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ngày tạo</p>
                  <p className="font-medium">{selectedLink.createdDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lần kiểm tra cuối</p>
                  <p className="font-medium">{selectedLink.lastChecked}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Traffic</p>
                  <p className="font-medium">
                    {selectedLink.traffic >= 1000000
                      ? `${(selectedLink.traffic / 1000000).toFixed(1)}M`
                      : selectedLink.traffic >= 1000
                      ? `${(selectedLink.traffic / 1000).toFixed(1)}K`
                      : selectedLink.traffic.toLocaleString()}
                  </p>
                </div>
              </div>
              {selectedLink.reason && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Lý do</p>
                  <p className="text-sm">{selectedLink.reason}</p>
                </div>
              )}
              {selectedLink.suggestion && (
                <Alert variant={selectedLink.indexStatus === "not-indexed" ? "destructive" : "default"}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Khuyến nghị:</strong> {selectedLink.suggestion}
                  </AlertDescription>
                </Alert>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Đóng
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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

