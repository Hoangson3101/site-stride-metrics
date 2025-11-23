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
import { AlertTriangle, ExternalLink, Calendar, Lightbulb, CheckCircle } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Tier2Suggestion {
  sourceUrl: string;
  domain: string;
  dr: number;
  traffic: number;
  createdDate: string;
  daysNotIndexed: number;
  tier2Status: "recommended" | "optional" | "in-progress";
  tier2Links: number;
  suggestion: string;
}

export function Tier2Suggestions() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Unindexed Links with Tier 2 Suggestions
  const suggestions: Tier2Suggestion[] = [
    {
      sourceUrl: "https://quality-blog.com/new-article",
      domain: "quality-blog.com",
      dr: 45,
      traffic: 12000,
      createdDate: "2024-10-15",
      daysNotIndexed: 36,
      tier2Status: "recommended",
      tier2Links: 0,
      suggestion: "Xây dựng 5-10 tier 2 links từ social bookmarks và web 2.0",
    },
    {
      sourceUrl: "https://news-portal.com/press-release",
      domain: "news-portal.com",
      dr: 52,
      traffic: 25000,
      createdDate: "2024-10-20",
      daysNotIndexed: 31,
      tier2Status: "recommended",
      tier2Links: 0,
      suggestion: "Tạo tier 2 links từ forum và social signals",
    },
    {
      sourceUrl: "https://forum-site.com/thread",
      domain: "forum-site.com",
      dr: 28,
      traffic: 5000,
      createdDate: "2024-11-01",
      daysNotIndexed: 19,
      tier2Status: "optional",
      tier2Links: 2,
      suggestion: "Có thể chờ thêm hoặc tạo 3-5 tier 2 links",
    },
    {
      sourceUrl: "https://blog-example.com/article",
      domain: "blog-example.com",
      dr: 38,
      traffic: 8000,
      createdDate: "2024-10-25",
      daysNotIndexed: 26,
      tier2Status: "in-progress",
      tier2Links: 5,
      suggestion: "Đang xây dựng tier 2 links, theo dõi tiến trình",
    },
  ];

  // Filter suggestions
  const filteredSuggestions = suggestions.filter((suggestion) => {
    if (statusFilter === "all") return true;
    return suggestion.tier2Status === statusFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSuggestions.length / pageSize);
  const paginatedSuggestions = filteredSuggestions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const recommendedCount = suggestions.filter((s) => s.tier2Status === "recommended").length;
  const isWarning = recommendedCount > 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "recommended":
        return <Badge className="bg-red-500">Đề xuất</Badge>;
      case "optional":
        return <Badge className="bg-yellow-500">Tùy chọn</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">Đang thực hiện</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Có {recommendedCount} backlink quan trọng (DR &gt; 40) chưa
            được index sau 30+ ngày. Gợi ý: Xuất danh sách này để làm chiến dịch Tier 2 link
            building - tạo backlink trỏ đến các backlink tier 1 này từ social bookmarks, web 2.0,
            social signals để tăng khả năng được Google crawl và index.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng chưa index</p>
            <p className="text-2xl font-bold">{suggestions.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Đề xuất Tier 2</p>
            <p className="text-2xl font-bold text-red-500">{recommendedCount}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-yellow-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tùy chọn</p>
            <p className="text-2xl font-bold text-yellow-500">
              {suggestions.filter((s) => s.tier2Status === "optional").length}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-blue-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Đang thực hiện</p>
            <p className="text-2xl font-bold text-blue-500">
              {suggestions.filter((s) => s.tier2Status === "in-progress").length}
            </p>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Gợi ý Tier 2 Link Building
        </h3>
        <div className="space-y-3 text-sm opacity-90">
          <p>
            Có {recommendedCount} backlink chất lượng cao (DR &gt; 40) chưa được index sau 30+ ngày.
          </p>
          <div>
            <p className="font-semibold mb-2">Chiến lược Tier 2:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Social Bookmarks: Reddit, Digg, StumbleUpon, Delicious</li>
              <li>Web 2.0: Medium, Tumblr, Blogger, WordPress.com</li>
              <li>Social Signals: Twitter, Facebook, LinkedIn shares</li>
              <li>Forum Links: Tạo backlink từ các forum liên quan</li>
              <li>Ping Services: Ping URL để thông báo cho Google</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="recommended">Đề xuất</SelectItem>
                <SelectItem value="optional">Tùy chọn</SelectItem>
                <SelectItem value="in-progress">Đang thực hiện</SelectItem>
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

      {/* Suggestions Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh sách Backlink Chưa Index và Gợi ý Tier 2
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Chưa index (ngày)</TableHead>
                <TableHead>Tier 2 Links</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Gợi ý</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSuggestions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedSuggestions.map((suggestion, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      suggestion.tier2Status === "recommended" ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <TableCell>
                      <a
                        href={suggestion.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 max-w-xs truncate"
                      >
                        {suggestion.sourceUrl}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell className="font-medium">{suggestion.domain}</TableCell>
                    <TableCell>
                      <Badge variant={suggestion.dr > 50 ? "default" : "secondary"}>
                        {suggestion.dr}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {suggestion.createdDate}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          suggestion.daysNotIndexed > 30
                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }
                      >
                        {suggestion.daysNotIndexed} ngày
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {suggestion.tier2Links > 0 ? (
                        <Badge className="bg-green-500">{suggestion.tier2Links} links</Badge>
                      ) : (
                        <Badge variant="outline">0 links</Badge>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(suggestion.tier2Status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {suggestion.suggestion}
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

