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
import { AlertTriangle, Award, ExternalLink, FileText, Users, MessageSquare } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BrandMention {
  source: string;
  sourceType: "news" | "blog" | "social" | "forum";
  hasLink: boolean;
  authority: number;
  mentionText: string;
  date: string;
  url: string;
}

export function BrandMentionsAnalysis() {
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [linkFilter, setLinkFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Brand Mentions Distribution by Source
  const mentionSourcesDistribution = [
    { name: "Báo chí", value: 45, count: 56, color: "hsl(var(--primary))" },
    { name: "Blog", value: 30, count: 37, color: "hsl(var(--secondary))" },
    { name: "Mạng xã hội", value: 15, count: 19, color: "hsl(var(--accent))" },
    { name: "Forum", value: 10, count: 12, color: "hsl(var(--warning))" },
  ];

  // Brand Mentions Data
  const brandMentions: BrandMention[] = [
    {
      source: "tech-news-portal.com",
      sourceType: "news",
      hasLink: true,
      authority: 68,
      mentionText: "Thương hiệu XYZ được đề cập trong bài viết về công nghệ",
      date: "2024-10-15",
      url: "https://tech-news-portal.com/article",
    },
    {
      source: "industry-blog.com",
      sourceType: "blog",
      hasLink: true,
      authority: 45,
      mentionText: "Review về sản phẩm của thương hiệu XYZ",
      date: "2024-10-20",
      url: "https://industry-blog.com/review",
    },
    {
      source: "twitter.com/user/status",
      sourceType: "social",
      hasLink: false,
      authority: 25,
      mentionText: "Tweet đề cập đến thương hiệu XYZ",
      date: "2024-11-01",
      url: "https://twitter.com/user/status",
    },
    {
      source: "digital-forum.com/thread",
      sourceType: "forum",
      hasLink: false,
      authority: 38,
      mentionText: "Thảo luận về thương hiệu XYZ trên forum",
      date: "2024-10-25",
      url: "https://digital-forum.com/thread",
    },
    {
      source: "major-news.com/article",
      sourceType: "news",
      hasLink: true,
      authority: 85,
      mentionText: "Thương hiệu XYZ được nhắc đến trong bài báo lớn",
      date: "2024-11-05",
      url: "https://major-news.com/article",
    },
  ];

  // Filter mentions
  const filteredMentions = brandMentions.filter((mention) => {
    if (sourceFilter !== "all" && mention.sourceType !== sourceFilter) return false;
    if (linkFilter === "with-link" && !mention.hasLink) return false;
    if (linkFilter === "without-link" && mention.hasLink) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMentions.length / pageSize);
  const paginatedMentions = filteredMentions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const mentionsWithoutLink = brandMentions.filter((m) => !m.hasLink).length;
  const authoritativeMentions = brandMentions.filter((m) => m.authority >= 60).length;
  const isWarning = authoritativeMentions < brandMentions.length * 0.3;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
  ];

  const getSourceBadge = (type: string) => {
    switch (type) {
      case "news":
        return <Badge className="bg-blue-500">Báo chí</Badge>;
      case "blog":
        return <Badge className="bg-green-500">Blog</Badge>;
      case "social":
        return <Badge className="bg-purple-500">Mạng xã hội</Badge>;
      case "forum":
        return <Badge className="bg-yellow-500">Forum</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "news":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "blog":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "social":
        return <Users className="h-4 w-4 text-purple-500" />;
      case "forum":
        return <MessageSquare className="h-4 w-4 text-yellow-500" />;
      default:
        return <Award className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân bố Brand Mentions theo Nguồn
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mentionSourcesDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {mentionSourcesDistribution.map((entry, index) => (
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
                  `${value}% (${props.payload.count} mentions)`,
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
            <BarChart data={mentionSourcesDistribution}>
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
                  `${props.payload.count} mentions (${value}%)`,
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
            <strong>Cảnh báo:</strong> Thương hiệu thiếu sự hiện diện trên các nền tảng uy tín. Chỉ
            có {authoritativeMentions} brand mentions từ các nguồn uy tín (authority ≥60). Gợi ý:
            Tăng cường sự nhắc đến thương hiệu trên các báo chí lớn hoặc các blog chuyên ngành để
            cải thiện brand authority.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng Mentions</p>
            <p className="text-2xl font-bold">{brandMentions.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-green-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Có Link</p>
            <p className="text-2xl font-bold text-green-500">
              {brandMentions.filter((m) => m.hasLink).length}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-yellow-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Không có Link</p>
            <p className="text-2xl font-bold text-yellow-500">{mentionsWithoutLink}</p>
            <p className="text-xs text-muted-foreground">Cơ hội outreach</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-blue-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Uy tín cao</p>
            <p className="text-2xl font-bold text-blue-500">{authoritativeMentions}</p>
            <p className="text-xs text-muted-foreground">Authority ≥60</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại nguồn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả nguồn</SelectItem>
                <SelectItem value="news">Báo chí</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="social">Mạng xã hội</SelectItem>
                <SelectItem value="forum">Forum</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 min-w-[150px]">
            <Select value={linkFilter} onValueChange={setLinkFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Có link" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="with-link">Có link</SelectItem>
                <SelectItem value="without-link">Không có link</SelectItem>
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

      {/* Mentions Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh sách Brand Mentions
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nguồn</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Có link</TableHead>
                <TableHead>Authority</TableHead>
                <TableHead>Nội dung đề cập</TableHead>
                <TableHead>Ngày</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMentions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy mention nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedMentions.map((mention, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{mention.source}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getSourceIcon(mention.sourceType)}
                        {getSourceBadge(mention.sourceType)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={mention.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 max-w-xs truncate"
                      >
                        {mention.url}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell>
                      {mention.hasLink ? (
                        <Badge className="bg-green-500">Có</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                          Không
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={mention.authority > 60 ? "default" : "secondary"}>
                        {mention.authority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {mention.mentionText}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {mention.date}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Recommendations */}
      {mentionsWithoutLink > 0 && (
        <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Cơ Hội Outreach
          </h3>
          <p className="text-sm opacity-90">
            Có {mentionsWithoutLink} brand mentions không có link. Đây là cơ hội tốt để thực hiện
            chiến dịch outreach và xin thêm backlink từ các mentions này. Liên hệ với các tác giả
            hoặc webmaster để yêu cầu thêm link vào các đề cập thương hiệu.
          </p>
        </Card>
      )}

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

