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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Hash, ExternalLink, Shield, Ban } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SpamAnchorBacklink {
  anchorText: string;
  keywordDensity: number;
  spamScore: number;
  sourceUrl: string;
  domain: string;
  dr: number;
  traffic: number;
  backlinks: number;
  targetUrl: string;
  keywords: string[];
  recommendation: string;
}

export function SpamAnchorWarnings() {
  const [selectedBacklink, setSelectedBacklink] = useState<SpamAnchorBacklink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Spam Anchor Backlinks
  const spamAnchorBacklinks: SpamAnchorBacklink[] = [
    {
      anchorText: "mua điện thoại giá rẻ tốt nhất uy tín",
      keywordDensity: 85,
      spamScore: 92,
      sourceUrl: "https://spam-site.com/article",
      domain: "spam-site.com",
      dr: 8,
      traffic: 200,
      backlinks: 12,
      targetUrl: "https://yoursite.com/product",
      keywords: ["mua", "điện thoại", "giá rẻ", "tốt nhất", "uy tín"],
      recommendation: "Anchor text chứa quá nhiều từ khóa SEO cạnh tranh, dấu hiệu spam rõ ràng. Cần thay đổi ngay lập tức thành anchor text tự nhiên hơn như 'YourBrand' hoặc 'sản phẩm của chúng tôi'.",
    },
    {
      anchorText: "seo tool best software top rated",
      keywordDensity: 75,
      spamScore: 88,
      sourceUrl: "https://link-farm.com/listing",
      domain: "link-farm.com",
      dr: 12,
      traffic: 500,
      backlinks: 8,
      targetUrl: "https://yoursite.com/product/seo-tool",
      keywords: ["seo", "tool", "best", "software", "top", "rated"],
      recommendation: "Anchor text chứa nhiều từ khóa cạnh tranh lặp lại. Nên thay đổi thành 'YourBrand SEO Tool' hoặc 'click here'.",
    },
    {
      anchorText: "backlink checker analyzer tool free",
      keywordDensity: 70,
      spamScore: 82,
      sourceUrl: "https://directory-spam.com/directory",
      domain: "directory-spam.com",
      dr: 15,
      traffic: 800,
      backlinks: 15,
      targetUrl: "https://yoursite.com/tools",
      keywords: ["backlink", "checker", "analyzer", "tool", "free"],
      recommendation: "Anchor text có dấu hiệu spam do chứa quá nhiều từ khóa. Cần điều chỉnh để tự nhiên hơn.",
    },
  ];

  const highSpamCount = spamAnchorBacklinks.filter((l) => l.spamScore >= 80).length;
  const avgSpamScore =
    spamAnchorBacklinks.reduce((sum, l) => sum + l.spamScore, 0) / spamAnchorBacklinks.length;

  // Pagination
  const totalPages = Math.ceil(spamAnchorBacklinks.length / pageSize);
  const paginatedBacklinks = spamAnchorBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleViewDetails = (backlink: SpamAnchorBacklink) => {
    setSelectedBacklink(backlink);
    setIsDialogOpen(true);
  };

  const getSpamBadge = (score: number) => {
    if (score >= 80) return <Badge variant="destructive">High Spam</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-500">Medium Spam</Badge>;
    return <Badge variant="outline">Low Spam</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Summary Alert */}
      <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800 dark:text-red-200">
          <strong>Cảnh báo Anchor Text Spam:</strong> Phát hiện {spamAnchorBacklinks.length}{" "}
          backlink có dấu hiệu spam anchor text (chứa quá nhiều từ khóa SEO cạnh tranh). Điểm spam
          trung bình: {avgSpamScore.toFixed(1)}/100. Những backlink này có thể bị Google phạt.
          Khuyến nghị: Thay đổi anchor text ngay lập tức để tránh bị phạt.
        </AlertDescription>
      </Alert>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng backlink spam</p>
            <p className="text-2xl font-bold">{spamAnchorBacklinks.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mức độ cao (≥80)</p>
            <p className="text-2xl font-bold text-red-500">{highSpamCount}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Điểm spam trung bình</p>
            <p className="text-2xl font-bold">{avgSpamScore.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">/ 100</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng backlinks</p>
            <p className="text-2xl font-bold">
              {spamAnchorBacklinks.reduce((sum, link) => sum + link.backlinks, 0)}
            </p>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-4 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Khuyến nghị Xử lý Anchor Text Spam
        </h3>
        <ul className="space-y-2 text-sm opacity-90">
          <li>• Thay đổi anchor text chứa nhiều từ khóa thành anchor text tự nhiên hơn</li>
          <li>• Sử dụng branded anchor như "YourBrand" thay vì từ khóa dài</li>
          <li>• Sử dụng generic anchor như "click here", "read more"</li>
          <li>• Tránh lặp lại từ khóa trong cùng một anchor text</li>
          <li>• Liên hệ domain nguồn để yêu cầu thay đổi anchor text nếu có thể</li>
        </ul>
      </Card>

      {/* Backlinks Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Danh sách Backlink với Anchor Text Spam
          </h3>
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

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anchor Text</TableHead>
                <TableHead>Điểm spam</TableHead>
                <TableHead>Tỷ lệ từ khóa</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Backlinks</TableHead>
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
                    className="hover:bg-muted/50 bg-red-50/50 dark:bg-red-950/20"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span className="max-w-xs truncate">{link.anchorText}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getSpamBadge(link.spamScore)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{link.keywordDensity}%</Badge>
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
                      <Badge variant="destructive">{link.dr}</Badge>
                    </TableCell>
                    <TableCell>{link.backlinks}</TableCell>
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
              <Ban className="h-5 w-5 text-red-500" />
              Chi tiết Anchor Text Spam
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về backlink có anchor text spam và khuyến nghị xử lý
            </DialogDescription>
          </DialogHeader>
          {selectedBacklink && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Anchor Text</p>
                  <p className="font-medium">{selectedBacklink.anchorText}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Điểm spam</p>
                  {getSpamBadge(selectedBacklink.spamScore)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tỷ lệ từ khóa</p>
                  <p className="font-medium">{selectedBacklink.keywordDensity}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Domain</p>
                  <p className="font-medium">{selectedBacklink.domain}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">DR</p>
                  <p className="font-medium">{selectedBacklink.dr}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Backlinks</p>
                  <p className="font-medium">{selectedBacklink.backlinks}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Từ khóa phát hiện:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedBacklink.keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              <Alert variant="destructive">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Khuyến nghị:</strong> {selectedBacklink.recommendation}
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

