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
import { AlertTriangle, Target, ExternalLink, FileText } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TopicRelevanceBacklink {
  sourceUrl: string;
  domain: string;
  sourceTopic: string;
  targetTopic: string;
  relevance: "high" | "moderate" | "low";
  relevanceScore: number;
  dr: number;
  traffic: number;
  targetUrl: string;
  reason: string;
}

export function TopicRelevanceAnalysis() {
  const [relevanceFilter, setRelevanceFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Topic Relevance Distribution
  const topicRelevanceDistribution = [
    { name: "Cùng chủ đề", value: 58, count: 1098, color: "hsl(var(--primary))" },
    { name: "Ngành gần", value: 20, count: 379, color: "hsl(var(--warning))" },
    { name: "Không liên quan", value: 22, count: 416, color: "hsl(var(--destructive))" },
  ];

  // Backlinks Data
  const backlinks: TopicRelevanceBacklink[] = [
    {
      sourceUrl: "https://seo-industry-blog.com/article",
      domain: "seo-industry-blog.com",
      sourceTopic: "Marketing/SEO",
      targetTopic: "SEO Tools",
      relevance: "high",
      relevanceScore: 92,
      dr: 68,
      traffic: 45000,
      targetUrl: "https://yoursite.com/product",
      reason: "Cùng chủ đề Marketing và SEO",
    },
    {
      sourceUrl: "https://tech-news-portal.com/review",
      domain: "tech-news-portal.com",
      sourceTopic: "Technology",
      targetTopic: "SEO Tools",
      relevance: "high",
      relevanceScore: 85,
      dr: 72,
      traffic: 120000,
      targetUrl: "https://yoursite.com/features",
      reason: "Cùng ngành công nghệ, liên quan đến tools",
    },
    {
      sourceUrl: "https://digital-marketing-forum.com/discussion",
      domain: "digital-marketing-forum.com",
      sourceTopic: "Marketing",
      targetTopic: "SEO Tools",
      relevance: "moderate",
      relevanceScore: 65,
      dr: 45,
      traffic: 15000,
      targetUrl: "https://yoursite.com/blog",
      reason: "Chủ đề tương tự nhưng không hoàn toàn khớp",
    },
    {
      sourceUrl: "https://general-business-directory.com/listing",
      domain: "general-business-directory.com",
      sourceTopic: "Business",
      targetTopic: "SEO Tools",
      relevance: "moderate",
      relevanceScore: 45,
      dr: 35,
      traffic: 8000,
      targetUrl: "https://yoursite.com",
      reason: "Ngành gần nhưng không cùng chủ đề cụ thể",
    },
    {
      sourceUrl: "https://cooking-recipes-blog.com/sidebar",
      domain: "cooking-recipes-blog.com",
      sourceTopic: "Food",
      targetTopic: "SEO Tools",
      relevance: "low",
      relevanceScore: 15,
      dr: 28,
      traffic: 5000,
      targetUrl: "https://yoursite.com",
      reason: "Chủ đề hoàn toàn khác biệt (Food vs SEO Tools)",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = backlinks.filter((link) => {
    if (relevanceFilter === "all") return true;
    if (relevanceFilter === "high" && link.relevance === "high") return true;
    if (relevanceFilter === "moderate" && link.relevance === "moderate") return true;
    if (relevanceFilter === "low" && link.relevance === "low") return true;
    return false;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const lowRelevanceCount = backlinks.filter((l) => l.relevance === "low").length;
  const isWarning = lowRelevanceCount > backlinks.length * 0.3;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--warning))",
    "hsl(var(--destructive))",
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
            Phân loại Chủ Đề Liên Quan
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topicRelevanceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {topicRelevanceDistribution.map((entry, index) => (
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
            <BarChart data={topicRelevanceDistribution}>
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
            <strong>Cảnh báo:</strong> Phát hiện quá nhiều backlink từ các nguồn không liên quan
            ({lowRelevanceCount} backlink). Điều này có thể ảnh hưởng đến tính tự nhiên và hiệu quả
            của hồ sơ backlink. Gợi ý: Bổ sung backlink từ các nguồn phù hợp hơn, tăng tỷ lệ backlink
            từ các domain cùng chủ đề hoặc ngành gần.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topicRelevanceDistribution.map((topic, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <p className="text-sm font-medium">{topic.name}</p>
              <p className="text-2xl font-bold">{topic.value}%</p>
              <p className="text-xs text-muted-foreground">
                {topic.count} backlinks
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Backlinks Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Danh sách Backlink Không Liên Quan
          </h3>
          <div className="flex items-center gap-2">
            <Select value={relevanceFilter} onValueChange={setRelevanceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả mức độ</SelectItem>
                <SelectItem value="high">Cùng chủ đề</SelectItem>
                <SelectItem value="moderate">Ngành gần</SelectItem>
                <SelectItem value="low">Không liên quan</SelectItem>
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
                <TableHead>Mức độ</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Chủ đề nguồn</TableHead>
                <TableHead>Chủ đề đích</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Điểm liên quan</TableHead>
                <TableHead>Lý do</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBacklinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBacklinks.map((link, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      link.relevance === "low" ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <TableCell>{getRelevanceBadge(link.relevance)}</TableCell>
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
                      <Badge variant="outline">{link.sourceTopic}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{link.targetTopic}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={link.dr > 50 ? "default" : "secondary"}>
                        {link.dr}
                      </Badge>
                    </TableCell>
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
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {link.reason}
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

