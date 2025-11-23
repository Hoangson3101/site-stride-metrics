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
import { AlertTriangle, CheckCircle, Target, XCircle, ExternalLink } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface RelevanceBacklink {
  sourceUrl: string;
  domain: string;
  relevance: "high" | "medium" | "low";
  relevanceScore: number;
  dr: number;
  traffic: number;
  targetUrl: string;
  category: string;
  reason: string;
}

export function RelevanceOverview() {
  const [relevanceFilter, setRelevanceFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Relevance Distribution Data
  const relevanceDistribution = [
    { name: "Liên quan cao", value: 58, count: 1098, color: "hsl(var(--primary))" },
    { name: "Liên quan trung bình", value: 20, count: 379, color: "hsl(var(--warning))" },
    { name: "Liên quan thấp", value: 22, count: 416, color: "hsl(var(--destructive))" },
  ];

  // Backlinks by Relevance
  const backlinksByRelevance: RelevanceBacklink[] = [
    {
      sourceUrl: "https://seo-industry-blog.com/article",
      domain: "seo-industry-blog.com",
      relevance: "high",
      relevanceScore: 92,
      dr: 68,
      traffic: 45000,
      targetUrl: "https://yoursite.com/product",
      category: "Marketing/SEO",
      reason: "Cùng chủ đề Marketing và SEO",
    },
    {
      sourceUrl: "https://tech-news-portal.com/review",
      domain: "tech-news-portal.com",
      relevance: "high",
      relevanceScore: 85,
      dr: 72,
      traffic: 120000,
      targetUrl: "https://yoursite.com/features",
      category: "Technology",
      reason: "Cùng ngành công nghệ",
    },
    {
      sourceUrl: "https://digital-marketing-forum.com/discussion",
      domain: "digital-marketing-forum.com",
      relevance: "medium",
      relevanceScore: 65,
      dr: 45,
      traffic: 15000,
      targetUrl: "https://yoursite.com/blog",
      category: "Marketing",
      reason: "Chủ đề tương tự nhưng không hoàn toàn khớp",
    },
    {
      sourceUrl: "https://general-business-directory.com/listing",
      domain: "general-business-directory.com",
      relevance: "medium",
      relevanceScore: 45,
      dr: 35,
      traffic: 8000,
      targetUrl: "https://yoursite.com",
      category: "Business",
      reason: "Ngành gần nhưng không cùng chủ đề cụ thể",
    },
    {
      sourceUrl: "https://cooking-recipes-blog.com/sidebar",
      domain: "cooking-recipes-blog.com",
      relevance: "low",
      relevanceScore: 15,
      dr: 28,
      traffic: 5000,
      targetUrl: "https://yoursite.com",
      category: "Food",
      reason: "Chủ đề hoàn toàn khác biệt (Food vs SEO)",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = backlinksByRelevance.filter((link) => {
    if (relevanceFilter === "all") return true;
    return link.relevance === relevanceFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const lowRelevancePercentage = relevanceDistribution[2].value;
  const isWarning = lowRelevancePercentage > 30;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--warning))",
    "hsl(var(--destructive))",
  ];

  const getRelevanceBadge = (relevance: string) => {
    switch (relevance) {
      case "high":
        return <Badge className="bg-green-500">Liên quan cao</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Liên quan trung bình</Badge>;
      case "low":
        return <Badge variant="destructive">Liên quan thấp</Badge>;
      default:
        return <Badge variant="outline">{relevance}</Badge>;
    }
  };

  const getRelevanceIcon = (relevance: string) => {
    switch (relevance) {
      case "high":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "medium":
        return <Target className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Target className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân phối Mức Độ Liên Quan
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={relevanceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {relevanceDistribution.map((entry, index) => (
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
            Số lượng Backlink theo Mức Độ Liên Quan
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={relevanceDistribution}>
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
            <strong>Cảnh báo:</strong> Tỷ lệ backlink từ các nguồn không liên quan (liên quan thấp)
            là {lowRelevancePercentage}%, quá cao (ngưỡng an toàn: &lt;30%). Điều này có thể ảnh
            hưởng đến tính tự nhiên và hiệu quả của hồ sơ backlink. Gợi ý: Điều chỉnh chiến lược
            xây dựng liên kết, tăng tỷ lệ backlink từ các nguồn có chủ đề phù hợp hơn.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relevanceDistribution.map((relevance, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getRelevanceIcon(relevance.name.toLowerCase().includes("cao") ? "high" : relevance.name.toLowerCase().includes("trung") ? "medium" : "low")}
                <p className="text-sm font-medium">{relevance.name}</p>
              </div>
              <p className="text-2xl font-bold">{relevance.value}%</p>
              <p className="text-xs text-muted-foreground">
                {relevance.count} backlinks
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Backlinks Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Chi tiết Backlink theo Mức Độ Liên Quan
          </h3>
          <div className="flex items-center gap-2">
            <Select value={relevanceFilter} onValueChange={setRelevanceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả mức độ</SelectItem>
                <SelectItem value="high">Liên quan cao</SelectItem>
                <SelectItem value="medium">Liên quan trung bình</SelectItem>
                <SelectItem value="low">Liên quan thấp</SelectItem>
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
                <TableHead>Chủ đề</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
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
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRelevanceIcon(link.relevance)}
                        {getRelevanceBadge(link.relevance)}
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
                      <Badge variant="outline">{link.category}</Badge>
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

