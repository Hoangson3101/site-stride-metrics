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
import { AlertTriangle, BookOpen, User, ExternalLink, GraduationCap, Globe } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AuthoritativeLink {
  sourceUrl: string;
  source: string;
  sourceType: "wikipedia" | "author-bio" | "edu" | "gov";
  dr: number;
  traffic: number;
  targetUrl: string;
  context: string;
  date: string;
}

export function WikipediaAuthorLinks() {
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Authoritative Links Distribution
  const authoritativeDistribution = [
    { name: "Wikipedia", value: 40, count: 3, color: "hsl(var(--primary))" },
    { name: "Author Bio", value: 30, count: 2, color: "hsl(var(--secondary))" },
    { name: ".edu", value: 20, count: 2, color: "hsl(var(--accent))" },
    { name: ".gov", value: 10, count: 1, color: "hsl(var(--warning))" },
  ];

  // Authoritative Links Data
  const authoritativeLinks: AuthoritativeLink[] = [
    {
      sourceUrl: "https://en.wikipedia.org/wiki/Brand_Name",
      source: "wikipedia.org",
      sourceType: "wikipedia",
      dr: 95,
      traffic: 5000000,
      targetUrl: "https://yoursite.com",
      context: "Đề cập thương hiệu trong bài viết Wikipedia",
      date: "2024-09-15",
    },
    {
      sourceUrl: "https://author-blog.com/about-author",
      source: "author-blog.com",
      sourceType: "author-bio",
      dr: 68,
      traffic: 45000,
      targetUrl: "https://yoursite.com/author",
      context: "Trang tiểu sử tác giả có link về website",
      date: "2024-10-20",
    },
    {
      sourceUrl: "https://university.edu/research/article",
      source: "university.edu",
      sourceType: "edu",
      dr: 88,
      traffic: 120000,
      targetUrl: "https://yoursite.com/research",
      context: "Bài viết nghiên cứu từ trường đại học",
      date: "2024-10-25",
    },
    {
      sourceUrl: "https://government.gov/official-document",
      source: "government.gov",
      sourceType: "gov",
      dr: 92,
      traffic: 80000,
      targetUrl: "https://yoursite.com",
      context: "Tài liệu chính thức từ cơ quan chính phủ",
      date: "2024-11-01",
    },
  ];

  // Filter links
  const filteredLinks = authoritativeLinks.filter((link) => {
    if (sourceFilter === "all") return true;
    return link.sourceType === sourceFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLinks.length / pageSize);
  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalLinks = authoritativeLinks.length;
  const isWarning = totalLinks < 5;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
  ];

  const getSourceBadge = (type: string) => {
    switch (type) {
      case "wikipedia":
        return <Badge className="bg-blue-500">Wikipedia</Badge>;
      case "author-bio":
        return <Badge className="bg-green-500">Author Bio</Badge>;
      case "edu":
        return <Badge className="bg-purple-500">.edu</Badge>;
      case "gov":
        return <Badge className="bg-red-500">.gov</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "wikipedia":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "author-bio":
        return <User className="h-4 w-4 text-green-500" />;
      case "edu":
        return <GraduationCap className="h-4 w-4 text-purple-500" />;
      case "gov":
        return <Globe className="h-4 w-4 text-red-500" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân bố Nguồn Uy Tín
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={authoritativeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {authoritativeDistribution.map((entry, index) => (
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
                  `${value}% (${props.payload.count} links)`,
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
            <BarChart data={authoritativeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={100}
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
                  `${props.payload.count} links (${value}%)`,
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
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Website thiếu các backlink từ các nguồn uy tín như Wikipedia
            hoặc các bài viết "About the Author". Chỉ có {totalLinks} backlink từ các nguồn uy tín
            được phát hiện. Khuyến nghị: Cố gắng có mặt trên các nền tảng uy tín như Wikipedia, các
            trang tiểu sử tác giả trên các blog uy tín, hoặc các trang .edu/.gov để củng cố E-A-T.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {authoritativeDistribution.map((item, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getSourceIcon(item.name.toLowerCase().includes("wikipedia") ? "wikipedia" : item.name.toLowerCase().includes("author") ? "author-bio" : item.name.toLowerCase().includes("edu") ? "edu" : "gov")}
                <p className="text-sm font-medium">{item.name}</p>
              </div>
              <p className="text-2xl font-bold">{item.value}%</p>
              <p className="text-xs text-muted-foreground">
                {item.count} links
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Nguồn uy tín" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả nguồn</SelectItem>
                <SelectItem value="wikipedia">Wikipedia</SelectItem>
                <SelectItem value="author-bio">Author Bio</SelectItem>
                <SelectItem value="edu">.edu</SelectItem>
                <SelectItem value="gov">.gov</SelectItem>
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

      {/* Authoritative Links Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh sách Backlink Từ Wikipedia và Tiểu Sử Tác Giả
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nguồn</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>URL đích</TableHead>
                <TableHead>Ngữ cảnh</TableHead>
                <TableHead>Ngày</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLinks.map((link, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getSourceIcon(link.sourceType)}
                        {getSourceBadge(link.sourceType)}
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
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {link.targetUrl}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {link.context}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {link.date}
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

