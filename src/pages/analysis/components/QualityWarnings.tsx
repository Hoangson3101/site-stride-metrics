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
  AlertTriangle,
  ExternalLink,
  XCircle,
  Shield,
  FileWarning,
  Ban,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface LowQualityBacklink {
  sourceUrl: string;
  domain: string;
  dr: number;
  traffic: number;
  warningType: "penalized" | "spam" | "link-farm" | "toxic" | "deindexed";
  severity: "high" | "medium" | "low";
  reason: string;
  recommendation: string;
  backlinks: number;
  firstSeen: string;
  lastSeen: string;
}

export function QualityWarnings() {
  const [selectedWarning, setSelectedWarning] = useState<LowQualityBacklink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Low Quality Backlinks
  const lowQualityBacklinks: LowQualityBacklink[] = [
    {
      sourceUrl: "https://link-farm1.info/directory",
      domain: "link-farm1.info",
      dr: 8,
      traffic: 0,
      warningType: "link-farm",
      severity: "high",
      reason: "Domain được xác định là link farm, chứa hàng nghìn link không tự nhiên",
      recommendation: "Disavow ngay lập tức. Domain này có thể gây hại cho hồ sơ SEO.",
      backlinks: 22,
      firstSeen: "2024-06-10",
      lastSeen: "2024-10-15",
    },
    {
      sourceUrl: "https://spam-site2.xyz/article",
      domain: "spam-site2.xyz",
      dr: 5,
      traffic: 0,
      warningType: "spam",
      severity: "high",
      reason: "Domain chứa nội dung spam, đã bị Google phạt",
      recommendation: "Disavow và liên hệ để gỡ bỏ link nếu có thể.",
      backlinks: 15,
      firstSeen: "2024-07-20",
      lastSeen: "2024-09-05",
    },
    {
      sourceUrl: "https://toxic-site3.net/review",
      domain: "toxic-site3.net",
      dr: 12,
      traffic: 500,
      warningType: "toxic",
      severity: "medium",
      reason: "Domain có dấu hiệu toxic, link out đến nhiều site bị phạt",
      recommendation: "Theo dõi và xem xét disavow nếu tình trạng không cải thiện.",
      backlinks: 8,
      firstSeen: "2024-08-15",
      lastSeen: "2024-10-10",
    },
    {
      sourceUrl: "https://penalized-site4.com/blog",
      domain: "penalized-site4.com",
      dr: 15,
      traffic: 0,
      warningType: "penalized",
      severity: "high",
      reason: "Domain đã bị Google phạt do vi phạm nguyên tắc SEO",
      recommendation: "Disavow ngay lập tức để tránh ảnh hưởng xấu.",
      backlinks: 12,
      firstSeen: "2024-05-10",
      lastSeen: "2024-08-20",
    },
    {
      sourceUrl: "https://deindexed-site5.org/page",
      domain: "deindexed-site5.org",
      dr: 10,
      traffic: 0,
      warningType: "deindexed",
      severity: "medium",
      reason: "Domain đã bị Google de-index, không còn xuất hiện trong kết quả tìm kiếm",
      recommendation: "Xem xét disavow nếu domain không còn hoạt động.",
      backlinks: 5,
      firstSeen: "2024-04-05",
      lastSeen: "2024-07-15",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = lowQualityBacklinks.filter((link) => {
    if (severityFilter !== "all" && link.severity !== severityFilter) {
      return false;
    }
    if (typeFilter !== "all" && link.warningType !== typeFilter) {
      return false;
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">Cao</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Trung bình</Badge>;
      case "low":
        return <Badge variant="outline">Thấp</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getWarningTypeBadge = (type: string) => {
    switch (type) {
      case "penalized":
        return <Badge variant="destructive" className="flex items-center gap-1">
          <Ban className="h-3 w-3" />
          Bị phạt
        </Badge>;
      case "spam":
        return <Badge variant="destructive" className="flex items-center gap-1">
          <FileWarning className="h-3 w-3" />
          Spam
        </Badge>;
      case "link-farm":
        return <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Link Farm
        </Badge>;
      case "toxic":
        return <Badge className="bg-yellow-500 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Độc hại
        </Badge>;
      case "deindexed":
        return <Badge className="bg-orange-500 flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Đã gỡ index
        </Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getWarningIcon = (type: string) => {
    switch (type) {
      case "penalized":
      case "spam":
      case "link-farm":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "toxic":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "deindexed":
        return <Ban className="h-5 w-5 text-orange-500" />;
      default:
        return <FileWarning className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleViewDetails = (backlink: LowQualityBacklink) => {
    setSelectedWarning(backlink);
    setIsDialogOpen(true);
  };

  const highSeverityCount = filteredBacklinks.filter((l) => l.severity === "high").length;
  const totalWarnings = filteredBacklinks.length;

  return (
    <div className="space-y-6">
      {/* Summary Alert */}
      {highSeverityCount > 0 && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo nghiêm trọng:</strong> Phát hiện {highSeverityCount} backlink có mức độ
            nguy hiểm cao trong tổng số {totalWarnings} cảnh báo. Những backlink này có thể ảnh hưởng
            xấu đến hồ sơ SEO. Khuyến nghị xử lý ngay lập tức.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng cảnh báo</p>
            <p className="text-2xl font-bold">{totalWarnings}</p>
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
              {filteredBacklinks.filter((l) => l.severity === "medium").length}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mức độ thấp</p>
            <p className="text-2xl font-bold text-gray-500">
              {filteredBacklinks.filter((l) => l.severity === "low").length}
            </p>
          </div>
        </Card>
      </div>

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
                <SelectItem value="high">Cao</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="low">Thấp</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 min-w-[150px]">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại cảnh báo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="penalized">Bị phạt</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="link-farm">Link Farm</SelectItem>
                <SelectItem value="toxic">Độc hại</SelectItem>
                <SelectItem value="deindexed">Đã gỡ index</SelectItem>
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

      {/* Warnings Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh sách Backlink Kém Chất Lượng
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại cảnh báo</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Backlinks</TableHead>
                <TableHead>Mức độ</TableHead>
                <TableHead>Lý do</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBacklinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy cảnh báo nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBacklinks.map((link, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      link.severity === "high" ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getWarningIcon(link.warningType)}
                        {getWarningTypeBadge(link.warningType)}
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
                      <Badge variant="destructive">{link.dr}</Badge>
                    </TableCell>
                    <TableCell>
                      {link.traffic > 0 ? (
                        link.traffic.toLocaleString()
                      ) : (
                        <span className="text-destructive">0</span>
                      )}
                    </TableCell>
                    <TableCell>{link.backlinks}</TableCell>
                    <TableCell>{getSeverityBadge(link.severity)}</TableCell>
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
              {selectedWarning && getWarningIcon(selectedWarning.warningType)}
              Chi tiết Cảnh báo Backlink
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về backlink kém chất lượng và khuyến nghị xử lý
            </DialogDescription>
          </DialogHeader>
          {selectedWarning && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Domain</p>
                  <p className="font-medium">{selectedWarning.domain}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">DR</p>
                  <p className="font-medium">{selectedWarning.dr}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Traffic</p>
                  <p className="font-medium">
                    {selectedWarning.traffic > 0
                      ? selectedWarning.traffic.toLocaleString()
                      : "0"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Backlinks</p>
                  <p className="font-medium">{selectedWarning.backlinks}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mức độ</p>
                  {getSeverityBadge(selectedWarning.severity)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loại cảnh báo</p>
                  {getWarningTypeBadge(selectedWarning.warningType)}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Lý do</p>
                <p className="text-sm">{selectedWarning.reason}</p>
              </div>
              <Alert variant={selectedWarning.severity === "high" ? "destructive" : "default"}>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Khuyến nghị:</strong> {selectedWarning.recommendation}
                </AlertDescription>
              </Alert>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Đóng
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    console.log("Disavow", selectedWarning.domain);
                    setIsDialogOpen(false);
                  }}
                >
                  Disavow Domain
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

