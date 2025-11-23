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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Hash, ExternalLink, Target, CheckCircle, XCircle } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface RelevanceBacklink {
  anchorText: string;
  targetUrl: string;
  relevanceScore: number;
  sourceUrl: string;
  domain: string;
  dr: number;
  traffic: number;
  reason: string;
  recommendation: string;
}

export function AnchorRelevance() {
  const [relevanceFilter, setRelevanceFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Relevance Backlinks
  const relevanceBacklinks: RelevanceBacklink[] = [
    {
      anchorText: "seo tool",
      targetUrl: "https://yoursite.com/product/seo-tool",
      relevanceScore: 95,
      sourceUrl: "https://techcrunch.com/article",
      domain: "techcrunch.com",
      dr: 92,
      traffic: 45000000,
      reason: "Anchor text khớp hoàn toàn với nội dung trang đích về SEO tool",
      recommendation: "Anchor text phù hợp, không cần thay đổi",
    },
    {
      anchorText: "best seo software",
      targetUrl: "https://yoursite.com/product/seo-tool",
      relevanceScore: 88,
      sourceUrl: "https://review-site.com/review",
      domain: "review-site.com",
      dr: 42,
      traffic: 8000,
      reason: "Anchor text liên quan tốt đến nội dung trang đích",
      recommendation: "Anchor text phù hợp",
    },
    {
      anchorText: "click here",
      targetUrl: "https://yoursite.com/product/seo-tool",
      relevanceScore: 45,
      sourceUrl: "https://blog.example.com/article",
      domain: "blog.example.com",
      dr: 45,
      traffic: 12000,
      reason: "Anchor text generic, không thể hiện rõ nội dung trang đích",
      recommendation: "Nên thay đổi anchor text thành 'seo tool' hoặc 'best seo software'",
    },
    {
      anchorText: "buy phone",
      targetUrl: "https://yoursite.com/product/seo-tool",
      relevanceScore: 15,
      sourceUrl: "https://spam-site.com/article",
      domain: "spam-site.com",
      dr: 12,
      traffic: 500,
      reason: "Anchor text hoàn toàn không liên quan đến nội dung trang đích (SEO tool vs phone)",
      recommendation: "Cần thay đổi anchor text ngay lập tức hoặc gỡ bỏ link",
    },
    {
      anchorText: "YourBrand",
      targetUrl: "https://yoursite.com",
      relevanceScore: 75,
      sourceUrl: "https://news-site.com/news",
      domain: "news-site.com",
      dr: 68,
      traffic: 25000,
      reason: "Anchor text branded, liên quan vừa phải với trang chủ",
      recommendation: "Anchor text phù hợp cho trang chủ",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = relevanceBacklinks.filter((link) => {
    if (relevanceFilter === "all") return true;
    if (relevanceFilter === "high" && link.relevanceScore >= 70) return true;
    if (relevanceFilter === "medium" && link.relevanceScore >= 40 && link.relevanceScore < 70)
      return true;
    if (relevanceFilter === "low" && link.relevanceScore < 40) return true;
    return false;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const lowRelevanceCount = relevanceBacklinks.filter((l) => l.relevanceScore < 40).length;
  const avgRelevance =
    relevanceBacklinks.reduce((sum, l) => sum + l.relevanceScore, 0) /
    relevanceBacklinks.length;

  const getRelevanceBadge = (score: number) => {
    if (score >= 70) return <Badge className="bg-green-500">High</Badge>;
    if (score >= 40) return <Badge className="bg-yellow-500">Medium</Badge>;
    return <Badge variant="destructive">Low</Badge>;
  };

  const getRelevanceIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (score >= 40) return <Target className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Điểm liên quan trung bình</p>
            <p className="text-2xl font-bold">{avgRelevance.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">/ 100</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-green-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Liên quan cao (≥70)</p>
            <p className="text-2xl font-bold text-green-500">
              {relevanceBacklinks.filter((l) => l.relevanceScore >= 70).length}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-yellow-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Liên quan trung bình (40-69)</p>
            <p className="text-2xl font-bold text-yellow-500">
              {relevanceBacklinks.filter((l) => l.relevanceScore >= 40 && l.relevanceScore < 70).length}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Liên quan thấp (&lt;40)</p>
            <p className="text-2xl font-bold text-red-500">{lowRelevanceCount}</p>
          </div>
        </Card>
      </div>

      {/* Warning Alert */}
      {lowRelevanceCount > 0 && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Phát hiện {lowRelevanceCount} backlink có mức độ liên quan
            thấp giữa anchor text và nội dung trang đích. Những backlink này có thể bị Google coi
            là spam. Khuyến nghị: Thay đổi anchor text để phù hợp hơn với nội dung trang đích
            hoặc gỡ bỏ link nếu không thể điều chỉnh.
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[200px]">
            <Select value={relevanceFilter} onValueChange={setRelevanceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Mức độ liên quan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả mức độ</SelectItem>
                <SelectItem value="high">High (≥70)</SelectItem>
                <SelectItem value="medium">Medium (40-69)</SelectItem>
                <SelectItem value="low">Low (&lt;40)</SelectItem>
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
          Phân tích Liên quan Anchor Text và Nội dung Trang Đích
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anchor Text</TableHead>
                <TableHead>URL đích</TableHead>
                <TableHead>Điểm liên quan</TableHead>
                <TableHead>Domain nguồn</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
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
                      link.relevanceScore < 40 ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span>{link.anchorText}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={link.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm max-w-xs truncate block"
                      >
                        {link.targetUrl}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRelevanceIcon(link.relevanceScore)}
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{link.relevanceScore}</span>
                          {getRelevanceBadge(link.relevanceScore)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={link.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        {link.domain}
                        <ExternalLink className="h-3 w-3" />
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

      {/* Info Card */}
      {paginatedBacklinks.some((l) => l.relevanceScore < 40) && (
        <Card className="p-4 bg-muted/50 border-0">
          <div className="space-y-2 text-sm">
            <p className="font-medium">Lưu ý về Backlink không liên quan:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                Backlink có điểm liên quan thấp (&lt;40) có thể bị Google coi là spam hoặc không
                tự nhiên.
            </li>
              <li>
                Nên thay đổi anchor text để phù hợp hơn với nội dung trang đích hoặc gỡ bỏ link
                nếu không thể điều chỉnh.
            </li>
              <li>
                Anchor text generic như "click here" có thể chấp nhận được nhưng không tối ưu cho
                SEO.
            </li>
            </ul>
          </div>
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

