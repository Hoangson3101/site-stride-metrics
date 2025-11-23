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
import { AlertTriangle, FileText, Layout, ExternalLink, Home } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface LinkByPlacement {
  sourceUrl: string;
  domain: string;
  placement: "content" | "sidebar" | "footer" | "header";
  dr: number;
  traffic: number;
  targetUrl: string;
  linkType: string;
}

export function LinkPlacementAnalysis() {
  const [placementFilter, setPlacementFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Placement Distribution
  const placementDistribution = [
    { name: "Content", value: 70, count: 1324, color: "hsl(var(--primary))" },
    { name: "Sidebar", value: 18, count: 341, color: "hsl(var(--warning))" },
    { name: "Footer", value: 10, count: 189, color: "hsl(var(--destructive))" },
    { name: "Header", value: 2, count: 38, color: "hsl(var(--secondary))" },
  ];

  // Links Data
  const links: LinkByPlacement[] = [
    {
      sourceUrl: "https://techcrunch.com/article",
      domain: "techcrunch.com",
      placement: "content",
      dr: 92,
      traffic: 45000000,
      targetUrl: "https://yoursite.com/product",
      linkType: "dofollow",
    },
    {
      sourceUrl: "https://blog.example.com/article",
      domain: "blog.example.com",
      placement: "content",
      dr: 45,
      traffic: 12000,
      targetUrl: "https://yoursite.com/page",
      linkType: "dofollow",
    },
    {
      sourceUrl: "https://forum.example.com/sidebar",
      domain: "forum.example.com",
      placement: "sidebar",
      dr: 25,
      traffic: 5000,
      targetUrl: "https://yoursite.com",
      linkType: "dofollow",
    },
    {
      sourceUrl: "https://directory.com/footer",
      domain: "directory.com",
      placement: "footer",
      dr: 35,
      traffic: 8000,
      targetUrl: "https://yoursite.com",
      linkType: "dofollow",
    },
    {
      sourceUrl: "https://partner-site.com",
      domain: "partner-site.com",
      placement: "header",
      dr: 68,
      traffic: 25000,
      targetUrl: "https://yoursite.com",
      linkType: "dofollow",
    },
  ];

  // Filter links
  const filteredLinks = links.filter((link) => {
    if (placementFilter === "all") return true;
    return link.placement === placementFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLinks.length / pageSize);
  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const sidebarFooterPercentage = placementDistribution[1].value + placementDistribution[2].value;
  const isWarning = sidebarFooterPercentage > 40;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--warning))",
    "hsl(var(--destructive))",
    "hsl(var(--secondary))",
  ];

  const getPlacementBadge = (placement: string) => {
    switch (placement) {
      case "content":
        return <Badge className="bg-green-500">Content</Badge>;
      case "sidebar":
        return <Badge className="bg-yellow-500">Sidebar</Badge>;
      case "footer":
        return <Badge variant="destructive">Footer</Badge>;
      case "header":
        return <Badge className="bg-blue-500">Header</Badge>;
      default:
        return <Badge variant="outline">{placement}</Badge>;
    }
  };

  const getPlacementIcon = (placement: string) => {
    switch (placement) {
      case "content":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "sidebar":
        return <Layout className="h-4 w-4 text-yellow-500" />;
      case "footer":
        return <Layout className="h-4 w-4 text-red-500" />;
      case "header":
        return <Home className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân bố Vị trí Backlink
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={placementDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {placementDistribution.map((entry, index) => (
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
            <BarChart data={placementDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={80}
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
            <strong>Cảnh báo:</strong> Tỷ lệ backlink từ sidebar/footer là {sidebarFooterPercentage}%,
            quá cao. Hồ sơ có thể thiếu tính tự nhiên. Gợi ý: Tăng tỷ lệ backlink từ nội dung bài
            viết (content) để cải thiện chất lượng và tính tự nhiên của hồ sơ backlink.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {placementDistribution.map((placement, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getPlacementIcon(placement.name.toLowerCase())}
                <p className="text-sm font-medium">{placement.name}</p>
              </div>
              <p className="text-2xl font-bold">{placement.value}%</p>
              <p className="text-xs text-muted-foreground">
                {placement.count} backlinks
              </p>
              <p className="text-xs text-muted-foreground">
                {placement.name === "Content"
                  ? "Giá trị SEO cao nhất"
                  : placement.name === "Sidebar" || placement.name === "Footer"
                  ? "Giá trị thấp hơn"
                  : "Giá trị trung bình"}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Links Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Danh sách Backlink theo Vị trí
          </h3>
          <div className="flex items-center gap-2">
            <Select value={placementFilter} onValueChange={setPlacementFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vị trí</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="sidebar">Sidebar</SelectItem>
                <SelectItem value="footer">Footer</SelectItem>
                <SelectItem value="header">Header</SelectItem>
              </SelectContent>
            </Select>
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

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vị trí</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Loại link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLinks.map((link, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPlacementIcon(link.placement)}
                        {getPlacementBadge(link.placement)}
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
                    <TableCell>
                      {link.traffic >= 1000000
                        ? `${(link.traffic / 1000000).toFixed(1)}M`
                        : link.traffic >= 1000
                        ? `${(link.traffic / 1000).toFixed(1)}K`
                        : link.traffic.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{link.linkType}</Badge>
                    </TableCell>
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

