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
import { AlertTriangle, Hash, ExternalLink, Shield } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface OverOptimizedBacklink {
  anchorText: string;
  exactMatchPercentage: number;
  sourceUrl: string;
  domain: string;
  dr: number;
  traffic: number;
  backlinks: number;
  targetUrl: string;
  recommendation: string;
}

export function OverOptimizedWarnings() {
  const [selectedBacklink, setSelectedBacklink] = useState<OverOptimizedBacklink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Over-optimized Backlinks
  const overOptimizedBacklinks: OverOptimizedBacklink[] = [
    {
      anchorText: "seo tool",
      exactMatchPercentage: 4.5,
      sourceUrl: "https://directory.com/listing",
      domain: "directory.com",
      dr: 35,
      traffic: 5000,
      backlinks: 85,
      targetUrl: "https://yoursite.com/product",
      recommendation: "Thay đổi anchor text thành 'YourBrand' hoặc 'click here' để giảm tỷ lệ exact-match.",
    },
    {
      anchorText: "best seo software",
      exactMatchPercentage: 2.4,
      sourceUrl: "https://review-site.com/review",
      domain: "review-site.com",
      dr: 42,
      traffic: 8000,
      backlinks: 45,
      targetUrl: "https://yoursite.com/product",
      recommendation: "Sử dụng anchor text 'YourBrand software' hoặc 'read more' thay vì exact-match.",
    },
    {
      anchorText: "seo analyzer",
      exactMatchPercentage: 1.8,
      sourceUrl: "https://blog.example.com/article",
      domain: "blog.example.com",
      dr: 45,
      traffic: 12000,
      backlinks: 34,
      targetUrl: "https://yoursite.com/features",
      recommendation: "Đa dạng hóa anchor text với branded và generic để tránh over-optimization.",
    },
    {
      anchorText: "backlink checker",
      exactMatchPercentage: 1.2,
      sourceUrl: "https://tools-site.com/tool",
      domain: "tools-site.com",
      dr: 38,
      traffic: 6000,
      backlinks: 23,
      targetUrl: "https://yoursite.com/tools",
      recommendation: "Giảm số lượng backlink với anchor exact-match này, thay bằng branded anchor.",
    },
  ];

  const totalExactMatch = overOptimizedBacklinks.reduce((sum, link) => sum + link.exactMatchPercentage, 0);
  const isWarning = totalExactMatch > 5;

  // Pagination
  const totalPages = Math.ceil(overOptimizedBacklinks.length / pageSize);
  const paginatedBacklinks = overOptimizedBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleViewDetails = (backlink: OverOptimizedBacklink) => {
    setSelectedBacklink(backlink);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Summary Alert */}
      <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800 dark:text-red-200">
          <strong>Cảnh báo Over-optimization:</strong> Tổng tỷ lệ anchor exact-match là{" "}
          {totalExactMatch.toFixed(1)}%, vượt quá ngưỡng an toàn (5%). Phát hiện{" "}
          {overOptimizedBacklinks.length} backlink có tỷ lệ exact-match cao. Khuyến nghị: Giảm tỷ
          lệ exact-match xuống dưới 5% để tránh bị Google phạt.
        </AlertDescription>
      </Alert>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng tỷ lệ Exact-match</p>
            <p className="text-2xl font-bold text-red-500">{totalExactMatch.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">Ngưỡng an toàn: &lt; 5%</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Số backlink cảnh báo</p>
            <p className="text-2xl font-bold">{overOptimizedBacklinks.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng backlinks exact-match</p>
            <p className="text-2xl font-bold">
              {overOptimizedBacklinks.reduce((sum, link) => sum + link.backlinks, 0)}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-yellow-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Cần giảm</p>
            <p className="text-2xl font-bold text-yellow-500">
              {(totalExactMatch - 5).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">Để đạt ngưỡng an toàn</p>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-4 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Khuyến nghị Điều chỉnh
        </h3>
        <ul className="space-y-2 text-sm opacity-90">
          <li>• Bổ sung thêm anchor thương hiệu (branded) như "YourBrand", "YourBrand SEO"</li>
          <li>• Tăng tỷ lệ generic anchor như "click here", "read more", "visit website"</li>
          <li>• Sử dụng naked URL anchor: "https://yoursite.com"</li>
          <li>• Giảm số lượng backlink với anchor exact-match, thay bằng partial-match</li>
          <li>• Tập trung build link với anchor đa dạng thay vì từ khóa chính xác</li>
        </ul>
      </Card>

      {/* Backlinks Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Danh sách Backlink với Anchor Exact-match Cao
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
                <TableHead>Tỷ lệ Exact-match</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Backlinks</TableHead>
                <TableHead>URL đích</TableHead>
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
                    className="hover:bg-muted/50 bg-red-50/50 dark:bg-red-950/20"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span>{link.anchorText}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">{link.exactMatchPercentage}%</Badge>
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
                    <TableCell>{link.backlinks}</TableCell>
                    <TableCell>
                      <a
                        href={link.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        {link.targetUrl}
                      </a>
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
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Chi tiết Backlink Over-optimized
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về backlink có tỷ lệ exact-match cao và khuyến nghị điều chỉnh
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
                  <p className="text-sm text-muted-foreground">Tỷ lệ Exact-match</p>
                  <Badge variant="destructive">{selectedBacklink.exactMatchPercentage}%</Badge>
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
                  <p className="text-sm text-muted-foreground">Traffic</p>
                  <p className="font-medium">
                    {selectedBacklink.traffic >= 1000000
                      ? `${(selectedBacklink.traffic / 1000000).toFixed(1)}M`
                      : selectedBacklink.traffic >= 1000
                      ? `${(selectedBacklink.traffic / 1000).toFixed(1)}K`
                      : selectedBacklink.traffic.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Backlinks</p>
                  <p className="font-medium">{selectedBacklink.backlinks}</p>
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

