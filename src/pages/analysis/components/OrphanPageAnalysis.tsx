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
import { AlertTriangle, Home, FolderTree, FileText, FileX, ExternalLink, TrendingDown } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface OrphanPage {
  sourceUrl: string;
  domain: string;
  dr: number;
  traffic: number;
  internalLinks: number;
  anchorText: string;
  discoveredDate: string;
  pageType: "homepage" | "category" | "deep" | "orphan";
}

export function OrphanPageAnalysis() {
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [drFilter, setDrFilter] = useState<string>("all");
  const [trafficFilter, setTrafficFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dr-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Distribution data - including orphan pages
  const placementDistribution = [
    { name: "Homepage", value: 15, count: 278, color: "hsl(var(--primary))" },
    { name: "Category", value: 25, count: 463, color: "hsl(var(--secondary))" },
    { name: "Deep Page (có internal)", value: 45, count: 833, color: "hsl(var(--accent))" },
    { name: "Orphan Page", value: 15, count: 278, color: "hsl(var(--destructive))" },
  ];

  // Orphan pages data
  const orphanPages: OrphanPage[] = [
    {
      sourceUrl: "https://example-blog.com/orphan-article-1",
      domain: "example-blog.com",
      dr: 42,
      traffic: 5000,
      internalLinks: 0,
      anchorText: "read more",
      discoveredDate: "2024-10-15",
      pageType: "orphan",
    },
    {
      sourceUrl: "https://tech-news.com/old-article-2020",
      domain: "tech-news.com",
      dr: 68,
      traffic: 1200,
      internalLinks: 0,
      anchorText: "tech review",
      discoveredDate: "2024-09-20",
      pageType: "orphan",
    },
    {
      sourceUrl: "https://blog-site.net/archived-post",
      domain: "blog-site.net",
      dr: 35,
      traffic: 800,
      internalLinks: 0,
      anchorText: "learn more",
      discoveredDate: "2024-08-10",
      pageType: "orphan",
    },
    {
      sourceUrl: "https://news-portal.org/removed-from-menu",
      domain: "news-portal.org",
      dr: 55,
      traffic: 2500,
      internalLinks: 0,
      anchorText: "news article",
      discoveredDate: "2024-11-01",
      pageType: "orphan",
    },
    {
      sourceUrl: "https://magazine.com/standalone-page",
      domain: "magazine.com",
      dr: 48,
      traffic: 1500,
      internalLinks: 0,
      anchorText: "featured content",
      discoveredDate: "2024-10-25",
      pageType: "orphan",
    },
  ];

  // Calculate orphan percentage
  const orphanPercentage = placementDistribution.find((d) => d.name === "Orphan Page")?.value || 0;
  const orphanCount = placementDistribution.find((d) => d.name === "Orphan Page")?.count || 0;
  const isWarning = orphanPercentage > 20;

  // Competitor comparison (mock data)
  const competitorOrphan = 8; // Median Top 10
  const orphanGap = orphanPercentage - competitorOrphan;

  // Filter orphan pages
  let filteredOrphanPages = [...orphanPages];
  
  if (domainFilter !== "all") {
    filteredOrphanPages = filteredOrphanPages.filter((page) => page.domain === domainFilter);
  }
  
  if (drFilter !== "all") {
    const [min, max] = drFilter.split("-").map(Number);
    filteredOrphanPages = filteredOrphanPages.filter((page) => page.dr >= min && page.dr <= max);
  }
  
  if (trafficFilter !== "all") {
    const [min, max] = trafficFilter.split("-").map(Number);
    filteredOrphanPages = filteredOrphanPages.filter((page) => page.traffic >= min && page.traffic <= max);
  }

  // Sort orphan pages
  filteredOrphanPages.sort((a, b) => {
    switch (sortBy) {
      case "dr-desc":
        return b.dr - a.dr;
      case "dr-asc":
        return a.dr - b.dr;
      case "traffic-desc":
        return b.traffic - a.traffic;
      case "traffic-asc":
        return a.traffic - b.traffic;
      case "internal-desc":
        return b.internalLinks - a.internalLinks;
      case "internal-asc":
        return a.internalLinks - b.internalLinks;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrphanPages.length / pageSize);
  const paginatedOrphanPages = filteredOrphanPages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Get unique domains for filter
  const uniqueDomains = Array.from(new Set(orphanPages.map((p) => p.domain)));

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--destructive))",
  ];

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Tỷ lệ backlink từ orphan page là {orphanPercentage}%, quá cao (ngưỡng an toàn:
            20%). Backlink từ trang không có internal link thường có giá trị thấp hơn vì ít được Google crawl/index.
            Khuyến nghị: Ưu tiên xây dựng backlink từ homepage và category page (có nhiều internal links).
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tỷ lệ Orphan Page</p>
            <p className={`text-2xl font-bold ${isWarning ? "text-red-500" : ""}`}>
              {orphanPercentage}%
            </p>
            <p className="text-xs text-muted-foreground">{orphanCount} backlinks</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Trung bình Top 10</p>
            <p className="text-2xl font-bold">{competitorOrphan}%</p>
            <p className="text-xs text-muted-foreground">vs Median Top 10</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Gap</p>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <p className="text-2xl font-bold text-red-500">+{orphanGap.toFixed(1)}%</p>
            </div>
            <p className="text-xs text-muted-foreground">Cao hơn đối thủ</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng Orphan Pages</p>
            <p className="text-2xl font-bold">{orphanPages.length}</p>
            <p className="text-xs text-muted-foreground">trang</p>
          </div>
        </Card>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân Bố Vị Trí Trang (Bao Gồm Orphan Page)
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
            Số Lượng Backlink Theo Loại Trang
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
                height={100}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
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

      {/* Orphan Pages Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Danh Sách Orphan Pages
          </h3>
          <div className="flex items-center gap-2">
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
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Internal Links</TableHead>
                <TableHead>Anchor Text</TableHead>
                <TableHead>Ngày phát hiện</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrphanPages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy orphan page nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrphanPages.map((page, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50 bg-red-50/50 dark:bg-red-950/20">
                    <TableCell>
                      <a
                        href={page.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 max-w-xs truncate"
                      >
                        {page.sourceUrl}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell className="font-medium">{page.domain}</TableCell>
                    <TableCell>
                      <Badge variant={page.dr > 50 ? "default" : "secondary"}>{page.dr}</Badge>
                    </TableCell>
                    <TableCell>
                      {page.traffic >= 1000
                        ? `${(page.traffic / 1000).toFixed(1)}K`
                        : page.traffic.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <FileX className="h-3 w-3" />
                        {page.internalLinks}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{page.anchorText}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{page.discoveredDate}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Khuyến Nghị
        </h3>
        <div className="space-y-3 text-sm opacity-90">
          <p>
            Tỷ lệ backlink từ orphan page hiện tại là {orphanPercentage}%, {isWarning ? "quá cao" : "trong ngưỡng an toàn"}.
            Để cải thiện chất lượng hồ sơ backlink:
          </p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>
              <strong>Ưu tiên xây dựng backlink từ homepage và category page</strong> (có nhiều internal links).
              Những trang này thường có giá trị SEO cao hơn.
            </li>
            <li>
              <strong>Nếu có backlink từ orphan page</strong>, nên yêu cầu webmaster thêm internal link trỏ đến trang
              đó để tăng giá trị. Điều này giúp trang được Google crawl/index tốt hơn.
            </li>
            <li>
              <strong>Giảm tỷ lệ orphan page xuống dưới 20%</strong> để đảm bảo hồ sơ backlink tự nhiên và hiệu quả.
            </li>
            <li>
              <strong>So sánh với đối thủ:</strong> Đối thủ trung bình có {competitorOrphan}% orphan page. Bạn cần giảm
              {orphanGap.toFixed(1)}% để đạt mức tương đương.
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

