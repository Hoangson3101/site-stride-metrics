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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Brain, ExternalLink, FileText } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SemanticBacklink {
  sourceUrl: string;
  domain: string;
  anchorText: string;
  targetUrl: string;
  targetPageContent: string;
  semanticScore: number;
  dr: number;
  traffic: number;
  reason: string;
  suggestion: string;
}

export function SemanticRelevance() {
  const [selectedLink, setSelectedLink] = useState<SemanticBacklink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [scoreFilter, setScoreFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Semantic Score Distribution
  const semanticScoreDistribution = [
    { range: "80-100", count: 892, label: "Rất liên quan" },
    { range: "50-79", count: 567, label: "Liên quan" },
    { range: "30-49", count: 234, label: "Ít liên quan" },
    { range: "0-29", count: 200, label: "Không liên quan" },
  ];

  // Backlinks Data
  const backlinks: SemanticBacklink[] = [
    {
      sourceUrl: "https://seo-blog.com/article",
      domain: "seo-blog.com",
      anchorText: "best SEO tools",
      targetUrl: "https://yoursite.com/seo-tools",
      targetPageContent: "SEO Tools, Keyword Research, Backlink Analysis",
      semanticScore: 92,
      dr: 68,
      traffic: 45000,
      reason: "Anchor text và nội dung trang đích hoàn toàn phù hợp",
      suggestion: "Giữ nguyên anchor text, đây là backlink chất lượng cao",
    },
    {
      sourceUrl: "https://tech-news.com/review",
      domain: "tech-news.com",
      anchorText: "digital marketing software",
      targetUrl: "https://yoursite.com/seo-tools",
      targetPageContent: "SEO Tools, Keyword Research, Backlink Analysis",
      semanticScore: 75,
      dr: 72,
      traffic: 120000,
      reason: "Anchor text liên quan nhưng không hoàn toàn khớp với nội dung",
      suggestion: "Có thể thay đổi anchor text thành 'SEO software' để phù hợp hơn",
    },
    {
      sourceUrl: "https://general-blog.com/post",
      domain: "general-blog.com",
      anchorText: "click here",
      targetUrl: "https://yoursite.com/seo-tools",
      targetPageContent: "SEO Tools, Keyword Research, Backlink Analysis",
      semanticScore: 35,
      dr: 45,
      traffic: 15000,
      reason: "Anchor text generic không liên quan đến nội dung trang đích",
      suggestion: "Thay đổi anchor text thành 'SEO tools' hoặc 'keyword research tools'",
    },
    {
      sourceUrl: "https://unrelated-site.com/article",
      domain: "unrelated-site.com",
      anchorText: "cooking recipes",
      targetUrl: "https://yoursite.com/seo-tools",
      targetPageContent: "SEO Tools, Keyword Research, Backlink Analysis",
      semanticScore: 15,
      dr: 28,
      traffic: 5000,
      reason: "Anchor text hoàn toàn không liên quan đến nội dung trang đích",
      suggestion: "Cần thay đổi anchor text hoặc tìm nguồn backlink có nội dung phù hợp hơn",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = backlinks.filter((link) => {
    if (scoreFilter === "all") return true;
    if (scoreFilter === "high" && link.semanticScore >= 70) return true;
    if (scoreFilter === "medium" && link.semanticScore >= 50 && link.semanticScore < 70) return true;
    if (scoreFilter === "low" && link.semanticScore < 50) return true;
    return false;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const lowScoreCount = backlinks.filter((l) => l.semanticScore < 50).length;
  const isWarning = lowScoreCount > backlinks.length * 0.3;

  const getScoreBadge = (score: number) => {
    if (score >= 70) {
      return <Badge className="bg-green-500">Rất liên quan</Badge>;
    } else if (score >= 50) {
      return <Badge className="bg-yellow-500">Liên quan</Badge>;
    } else if (score >= 30) {
      return <Badge className="bg-orange-500">Ít liên quan</Badge>;
    } else {
      return <Badge variant="destructive">Không liên quan</Badge>;
    }
  };

  const handleViewDetails = (link: SemanticBacklink) => {
    setSelectedLink(link);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Distribution Chart */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Phân bố Semantic Score
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={semanticScoreDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="range"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
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
                `${value} backlinks (${props.payload.label})`,
                "Số lượng",
              ]}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Phát hiện {lowScoreCount} backlink có mức độ liên quan ngữ
            nghĩa thấp (semantic score &lt;50). Điều này có thể ảnh hưởng đến giá trị SEO của
            backlink. Gợi ý: Cần điều chỉnh anchor text hoặc tìm kiếm các nguồn backlink có nội
            dung phù hợp hơn.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {semanticScoreDistribution.map((item, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-2xl font-bold">{item.count}</p>
              <p className="text-xs text-muted-foreground">Score: {item.range}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={scoreFilter} onValueChange={setScoreFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Mức độ liên quan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="high">Rất liên quan (≥70)</SelectItem>
                <SelectItem value="medium">Liên quan (50-69)</SelectItem>
                <SelectItem value="low">Ít liên quan (&lt;50)</SelectItem>
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
          Danh sách Backlink theo Semantic Score
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Anchor Text</TableHead>
                <TableHead>URL đích</TableHead>
                <TableHead>Semantic Score</TableHead>
                <TableHead>DR</TableHead>
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
                      link.semanticScore < 50 ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
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
                    <TableCell className="font-medium">{link.anchorText}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {link.targetUrl}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            link.semanticScore >= 70
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : link.semanticScore >= 50
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              : "bg-red-500/10 text-red-500 border-red-500/20"
                          }
                        >
                          {link.semanticScore}
                        </Badge>
                        {getScoreBadge(link.semanticScore)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={link.dr > 50 ? "default" : "secondary"}>
                        {link.dr}
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

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-500" />
              Chi tiết Semantic Relevance
            </DialogTitle>
            <DialogDescription>
              Phân tích chi tiết mức độ liên quan ngữ nghĩa giữa anchor text và nội dung trang đích
            </DialogDescription>
          </DialogHeader>
          {selectedLink && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Domain</p>
                  <p className="font-medium">{selectedLink.domain}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">DR</p>
                  <p className="font-medium">{selectedLink.dr}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Anchor Text</p>
                  <p className="font-medium">{selectedLink.anchorText}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Semantic Score</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        selectedLink.semanticScore >= 70
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : selectedLink.semanticScore >= 50
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : "bg-red-500/10 text-red-500 border-red-500/20"
                      }
                    >
                      {selectedLink.semanticScore}/100
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Nội dung trang đích</p>
                <p className="text-sm bg-muted p-2 rounded">{selectedLink.targetPageContent}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Lý do</p>
                <p className="text-sm">{selectedLink.reason}</p>
              </div>
              <Alert variant={selectedLink.semanticScore < 50 ? "destructive" : "default"}>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>Gợi ý cải thiện:</strong> {selectedLink.suggestion}
                </AlertDescription>
              </Alert>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Đóng
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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

