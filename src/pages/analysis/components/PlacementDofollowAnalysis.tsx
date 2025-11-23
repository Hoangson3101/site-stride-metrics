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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ExternalLink, FileText, Layout } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PlacementBacklink {
  url: string;
  domain: string;
  placement: "content" | "sidebar" | "footer" | "header";
  linkType: "dofollow" | "nofollow";
  dr: number;
  date: string;
}

export function PlacementDofollowAnalysis() {
  const [placementFilter, setPlacementFilter] = useState<string>("all");
  const [linkTypeFilter, setLinkTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Placement distribution
  const placementDistribution = [
    {
      placement: "Content",
      dofollow: 65,
      nofollow: 15,
      total: 80,
      color: "hsl(var(--primary))",
    },
    {
      placement: "Sidebar",
      dofollow: 8,
      nofollow: 12,
      total: 20,
      color: "hsl(var(--secondary))",
    },
    {
      placement: "Footer",
      dofollow: 2,
      nofollow: 8,
      total: 10,
      color: "hsl(var(--accent))",
    },
    {
      placement: "Header",
      dofollow: 0,
      nofollow: 0,
      total: 0,
      color: "hsl(var(--warning))",
    },
  ];

  // Backlinks data
  const placementBacklinks: PlacementBacklink[] = [
    {
      url: "https://blog.com/article",
      domain: "blog.com",
      placement: "content",
      linkType: "dofollow",
      dr: 68,
      date: "2024-10-15",
    },
    {
      url: "https://news.com/sidebar",
      domain: "news.com",
      placement: "sidebar",
      linkType: "nofollow",
      dr: 45,
      date: "2024-10-20",
    },
    {
      url: "https://site.com/footer",
      domain: "site.com",
      placement: "footer",
      linkType: "nofollow",
      dr: 30,
      date: "2024-10-25",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = placementBacklinks.filter((link) => {
    if (placementFilter !== "all" && link.placement !== placementFilter) return false;
    if (linkTypeFilter !== "all" && link.linkType !== linkTypeFilter) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const sidebarFooterRatio =
    (placementDistribution.find((p) => p.placement === "Sidebar")?.total || 0) +
    (placementDistribution.find((p) => p.placement === "Footer")?.total || 0);
  const contentRatio = placementDistribution.find((p) => p.placement === "Content")?.total || 0;
  const isWarning = sidebarFooterRatio > 40 || contentRatio < 50;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
  ];

  const getPlacementBadge = (placement: string) => {
    switch (placement) {
      case "content":
        return (
          <Badge className="bg-green-500">
            <FileText className="h-3 w-3 mr-1" />
            Content
          </Badge>
        );
      case "sidebar":
        return (
          <Badge className="bg-yellow-500">
            <Layout className="h-3 w-3 mr-1" />
            Sidebar
          </Badge>
        );
      case "footer":
        return <Badge className="bg-purple-500">Footer</Badge>;
      case "header":
        return <Badge variant="outline">Header</Badge>;
      default:
        return <Badge variant="outline">{placement}</Badge>;
    }
  };

  const getLinkTypeBadge = (type: string) => {
    switch (type) {
      case "dofollow":
        return <Badge className="bg-green-500">Dofollow</Badge>;
      case "nofollow":
        return <Badge className="bg-blue-500">Nofollow</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tỷ lệ backlink từ sidebar/footer ({sidebarFooterRatio}%) quá cao
            hoặc tỷ lệ backlink từ content ({contentRatio}%) quá thấp. Điều này có thể cho thấy hồ sơ
            backlink thiếu tính tự nhiên. Khuyến nghị: Tăng tỷ lệ backlink từ nội dung bài viết và
            giảm tỷ lệ backlink từ sidebar/footer.
          </AlertDescription>
        </Alert>
      )}

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân Bổ Dofollow/Nofollow Theo Vị Trí
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={placementDistribution.filter((p) => p.total > 0)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="placement"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) => [`${value}%`, "Tỷ lệ"]}
              />
              <Legend />
              <Bar dataKey="dofollow" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Dofollow" />
              <Bar dataKey="nofollow" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} name="Nofollow" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Tổng Số Backlink Theo Vị Trí
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={placementDistribution.filter((p) => p.total > 0).map((p) => ({ name: p.placement, value: p.total }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {placementDistribution
                  .filter((p) => p.total > 0)
                  .map((entry, index) => (
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
                formatter={(value: number) => [`${value}%`, "Tỷ lệ"]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {placementDistribution.map((item, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{item.placement}</p>
              <p className="text-2xl font-bold">{item.total}%</p>
              <div className="flex gap-2 text-xs">
                <span className="text-green-500">DF: {item.dofollow}%</span>
                <span className="text-blue-500">NF: {item.nofollow}%</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={placementFilter} onValueChange={setPlacementFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Vị trí" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vị trí</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="sidebar">Sidebar</SelectItem>
                <SelectItem value="footer">Footer</SelectItem>
                <SelectItem value="header">Header</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 min-w-[150px]">
            <Select value={linkTypeFilter} onValueChange={setLinkTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại link" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="dofollow">Dofollow</SelectItem>
                <SelectItem value="nofollow">Nofollow</SelectItem>
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
          Danh Sách Backlink Theo Vị Trí
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Loại link</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Ngày</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBacklinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBacklinks.map((link, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 max-w-xs truncate"
                      >
                        {link.url}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell className="font-medium">{link.domain}</TableCell>
                    <TableCell>{getPlacementBadge(link.placement)}</TableCell>
                    <TableCell>{getLinkTypeBadge(link.linkType)}</TableCell>
                    <TableCell>
                      <Badge variant={link.dr > 50 ? "default" : "secondary"}>{link.dr}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{link.date}</TableCell>
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

