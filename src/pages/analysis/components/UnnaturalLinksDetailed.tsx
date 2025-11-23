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
import { AlertTriangle, ExternalLink, Shield, Ban } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface UnnaturalLink {
  sourceUrl: string;
  domain: string;
  warningType: "sidebar-footer" | "sponsored-high" | "single-domain" | "sitewide";
  severity: "high" | "medium" | "low";
  reason: string;
  recommendation: string;
  dr: number;
  traffic: number;
  backlinks: number;
  placement: string;
}

export function UnnaturalLinksDetailed() {
  const [selectedLink, setSelectedLink] = useState<UnnaturalLink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Unnatural Links
  const unnaturalLinks: UnnaturalLink[] = [
    {
      sourceUrl: "https://directory.com/footer",
      domain: "directory.com",
      warningType: "sidebar-footer",
      severity: "high",
      reason: "Quá nhiều backlink từ footer (10% tổng backlink)",
      recommendation: "Giảm số lượng backlink từ footer, tăng backlink từ nội dung bài viết",
      dr: 35,
      traffic: 8000,
      backlinks: 189,
      placement: "Footer",
    },
    {
      sourceUrl: "https://ad-network.com/banner",
      domain: "ad-network.com",
      warningType: "sponsored-high",
      severity: "high",
      reason: "Tỷ lệ backlink sponsored quá cao từ domain chất lượng thấp",
      recommendation: "Giảm tỷ lệ link trả phí, tăng link tự nhiên từ nội dung",
      dr: 35,
      traffic: 8000,
      backlinks: 19,
      placement: "Banner",
    },
    {
      sourceUrl: "https://single-domain.com",
      domain: "single-domain.com",
      warningType: "single-domain",
      severity: "medium",
      reason: "Quá nhiều backlink từ một domain duy nhất (85 backlinks)",
      recommendation: "Đa dạng hóa nguồn backlink, giảm phụ thuộc vào một domain",
      dr: 42,
      traffic: 12000,
      backlinks: 85,
      placement: "Content",
    },
    {
      sourceUrl: "https://sitewide-link.com",
      domain: "sitewide-link.com",
      warningType: "sitewide",
      severity: "medium",
      reason: "Backlink sitewide xuất hiện trên quá nhiều trang (18% tổng backlink)",
      recommendation: "Rà soát lại để tránh footprint mua link, giảm backlink sitewide",
      dr: 38,
      traffic: 6000,
      backlinks: 341,
      placement: "Sidebar",
    },
  ];

  // Filter links
  const filteredLinks = unnaturalLinks.filter((link) => {
    if (severityFilter !== "all" && link.severity !== severityFilter) {
      return false;
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLinks.length / pageSize);
  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getWarningTypeBadge = (type: string) => {
    switch (type) {
      case "sidebar-footer":
        return <Badge variant="destructive">Sidebar/Footer</Badge>;
      case "sponsored-high":
        return <Badge variant="destructive">Sponsored High</Badge>;
      case "single-domain":
        return <Badge className="bg-yellow-500">Single Domain</Badge>;
      case "sitewide":
        return <Badge className="bg-yellow-500">Sitewide</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const handleViewDetails = (link: UnnaturalLink) => {
    setSelectedLink(link);
    setIsDialogOpen(true);
  };

  const highSeverityCount = filteredLinks.filter((l) => l.severity === "high").length;

  return (
    <div className="space-y-6">
      {/* Summary Alert */}
      {highSeverityCount > 0 && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo nghiêm trọng:</strong> Phát hiện {highSeverityCount} backlink có mức
            độ nguy hiểm cao trong tổng số {filteredLinks.length} cảnh báo. Những backlink này có
            thể bị Google phạt hoặc đánh giá thấp. Khuyến nghị xử lý ngay lập tức.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng cảnh báo</p>
            <p className="text-2xl font-bold">{filteredLinks.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mức độ cao</p>
            <p className="text-2xl font-bold text-red-500">{highSeverityCount}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mức độ trung bình</p>
            <p className="text-2xl font-bold text-yellow-500">
              {filteredLinks.filter((l) => l.severity === "medium").length}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mức độ thấp</p>
            <p className="text-2xl font-bold text-gray-500">
              {filteredLinks.filter((l) => l.severity === "low").length}
            </p>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-4 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Khuyến nghị Điều chỉnh Chiến lược Backlink
        </h3>
        <ul className="space-y-2 text-sm opacity-90">
          <li>• Thêm backlink từ nội dung bài viết (content) thay vì sidebar/footer</li>
          <li>• Giảm tỷ lệ backlink từ sidebar/footer xuống dưới 30%</li>
          <li>• Giảm tỷ lệ backlink sponsored xuống dưới 20%</li>
          <li>• Đa dạng hóa nguồn backlink, tránh phụ thuộc vào một domain</li>
          <li>• Rà soát và giảm backlink sitewide để tránh footprint mua link</li>
        </ul>
      </Card>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Mức độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả mức độ</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
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

      {/* Links Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh sách Backlink Không Tự Nhiên
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại cảnh báo</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Backlinks</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Mức độ</TableHead>
                <TableHead>Lý do</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy cảnh báo nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLinks.map((link, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      link.severity === "high" ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <TableCell>{getWarningTypeBadge(link.warningType)}</TableCell>
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
                    <TableCell>{link.backlinks}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{link.placement}</Badge>
                    </TableCell>
                    <TableCell>{getSeverityBadge(link.severity)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {link.reason}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(link)}
                      >
                        Chi tiết
                      </Button>
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
              <Ban className="h-5 w-5 text-red-500" />
              Chi tiết Backlink Không Tự Nhiên
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về backlink không tự nhiên và khuyến nghị xử lý
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
                  <p className="text-sm text-muted-foreground">Backlinks</p>
                  <p className="font-medium">{selectedLink.backlinks}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vị trí</p>
                  <p className="font-medium">{selectedLink.placement}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mức độ</p>
                  {getSeverityBadge(selectedLink.severity)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loại cảnh báo</p>
                  {getWarningTypeBadge(selectedLink.warningType)}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Lý do</p>
                <p className="text-sm">{selectedLink.reason}</p>
              </div>
              <Alert variant={selectedLink.severity === "high" ? "destructive" : "default"}>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Khuyến nghị:</strong> {selectedLink.recommendation}
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

