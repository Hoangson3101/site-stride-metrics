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
import { AlertTriangle, Target, ExternalLink, TrendingUp } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TopicalBacklink {
  sourceUrl: string;
  domain: string;
  topic: string;
  relevance: "high" | "moderate" | "low";
  relevanceScore: number;
  dr: number;
  traffic: number;
  targetUrl: string;
}

export function TopicalRelevance() {
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [relevanceFilter, setRelevanceFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Topic Distribution
  const topicDistribution = [
    { name: "Marketing/SEO", value: 35, count: 663, color: "hsl(var(--primary))" },
    { name: "Technology", value: 23, count: 436, color: "hsl(var(--secondary))" },
    { name: "Business", value: 15, count: 284, color: "hsl(var(--accent))" },
    { name: "Digital Tools", value: 12, count: 227, color: "hsl(var(--warning))" },
    { name: "Other", value: 15, count: 284, color: "hsl(var(--muted))" },
  ];

  // Topical Relevance Distribution
  const topicalRelevanceDistribution = [
    { name: "Cùng chủ đề", value: 58, count: 1098, color: "hsl(var(--primary))" },
    { name: "Ngành gần", value: 20, count: 379, color: "hsl(var(--warning))" },
    { name: "Không liên quan", value: 22, count: 416, color: "hsl(var(--destructive))" },
  ];

  // Backlinks Data
  const backlinks: TopicalBacklink[] = [
    {
      sourceUrl: "https://seo-industry-blog.com/article",
      domain: "seo-industry-blog.com",
      topic: "Marketing/SEO",
      relevance: "high",
      relevanceScore: 92,
      dr: 68,
      traffic: 45000,
      targetUrl: "https://yoursite.com/product",
    },
    {
      sourceUrl: "https://tech-news-portal.com/review",
      domain: "tech-news-portal.com",
      topic: "Technology",
      relevance: "high",
      relevanceScore: 85,
      dr: 72,
      traffic: 120000,
      targetUrl: "https://yoursite.com/features",
    },
    {
      sourceUrl: "https://digital-marketing-forum.com/discussion",
      domain: "digital-marketing-forum.com",
      topic: "Marketing/SEO",
      relevance: "high",
      relevanceScore: 88,
      dr: 45,
      traffic: 15000,
      targetUrl: "https://yoursite.com/blog",
    },
    {
      sourceUrl: "https://business-directory.com/listing",
      domain: "business-directory.com",
      topic: "Business",
      relevance: "moderate",
      relevanceScore: 65,
      dr: 35,
      traffic: 8000,
      targetUrl: "https://yoursite.com",
    },
    {
      sourceUrl: "https://cooking-blog.com/sidebar",
      domain: "cooking-blog.com",
      topic: "Food",
      relevance: "low",
      relevanceScore: 15,
      dr: 28,
      traffic: 5000,
      targetUrl: "https://yoursite.com",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = backlinks.filter((link) => {
    if (topicFilter !== "all" && link.topic !== topicFilter) return false;
    if (relevanceFilter !== "all" && link.relevance !== relevanceFilter) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const lowRelevancePercentage = topicalRelevanceDistribution[2].value;
  const isWarning = lowRelevancePercentage > 30;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
    "hsl(var(--muted))",
  ];

  const getRelevanceBadge = (relevance: string) => {
    switch (relevance) {
      case "high":
        return <Badge className="bg-green-500">Cùng chủ đề</Badge>;
      case "moderate":
        return <Badge className="bg-yellow-500">Ngành gần</Badge>;
      case "low":
        return <Badge variant="destructive">Không liên quan</Badge>;
      default:
        return <Badge variant="outline">{relevance}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân loại Website theo Chủ Đề
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topicDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {topicDistribution.map((entry, index) => (
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
            Tỷ Lệ Liên Kết Từ Các Website Cùng Chủ Đề
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicalRelevanceDistribution}>
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
            <strong>Cảnh báo:</strong> Tỷ lệ backlink từ các website cùng chủ đề quá thấp ({100 -
            lowRelevancePercentage}%). Điều này có thể ảnh hưởng đến topical authority của website.
            Gợi ý: Tăng cường xây dựng backlink từ các nguồn có chủ đề tương tự, tập trung vào các
            domain cùng ngành hoặc lĩnh vực.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topicalRelevanceDistribution.map((item, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-2xl font-bold">{item.value}%</p>
              <p className="text-xs text-muted-foreground">
                {item.count} backlinks
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Chủ đề" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả chủ đề</SelectItem>
                <SelectItem value="Marketing/SEO">Marketing/SEO</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Digital Tools">Digital Tools</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 min-w-[150px]">
            <Select value={relevanceFilter} onValueChange={setRelevanceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Mức độ liên quan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả mức độ</SelectItem>
                <SelectItem value="high">Cùng chủ đề</SelectItem>
                <SelectItem value="moderate">Ngành gần</SelectItem>
                <SelectItem value="low">Không liên quan</SelectItem>
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
          Danh sách Backlink Có Chủ Đề Tương Tự
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Chủ đề</TableHead>
                <TableHead>Mức độ liên quan</TableHead>
                <TableHead>Điểm liên quan</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
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
                  <TableRow key={idx} className="hover:bg-muted/50">
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
                      <Badge variant="outline">{link.topic}</Badge>
                    </TableCell>
                    <TableCell>{getRelevanceBadge(link.relevance)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          link.relevanceScore >= 70
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : link.relevanceScore >= 50
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                        }
                      >
                        {link.relevanceScore}
                      </Badge>
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

