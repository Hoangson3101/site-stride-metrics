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
import { AlertTriangle, ExternalLink, Shield, XCircle } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface UnnaturalLink {
  url: string;
  domain: string;
  linkType: "dofollow" | "nofollow";
  dr: number;
  reason: string;
  severity: "high" | "medium" | "low";
  recommendation: string;
  date: string;
}

export function UnnaturalLinksWarning() {
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Unnatural links data
  const unnaturalLinks: UnnaturalLink[] = [
    {
      url: "https://low-quality-site.com/article",
      domain: "low-quality-site.com",
      linkType: "dofollow",
      dr: 15,
      reason: "Quá nhiều dofollow từ domain ít uy tín (DR < 30)",
      severity: "high",
      recommendation: "Giảm tỷ lệ dofollow từ domain này hoặc yêu cầu chuyển sang nofollow",
      date: "2024-10-15",
    },
    {
      url: "https://spam-site.com/link",
      domain: "spam-site.com",
      linkType: "dofollow",
      dr: 8,
      reason: "Backlink dofollow từ domain có dấu hiệu spam",
      severity: "high",
      recommendation: "Disavow hoặc yêu cầu gỡ link",
      date: "2024-10-20",
    },
    {
      url: "https://suspicious-site.com/page",
      domain: "suspicious-site.com",
      linkType: "dofollow",
      dr: 25,
      reason: "Tỷ lệ dofollow quá cao từ domain có DR thấp",
      severity: "medium",
      recommendation: "Cân bằng tỷ lệ dofollow/nofollow từ domain này",
      date: "2024-10-25",
    },
    {
      url: "https://link-farm.com/backlink",
      domain: "link-farm.com",
      linkType: "dofollow",
      dr: 12,
      reason: "Backlink từ link farm, tỷ lệ dofollow không tự nhiên",
      severity: "high",
      recommendation: "Disavow ngay lập tức",
      date: "2024-11-01",
    },
  ];

  // Filter links
  const filteredLinks = unnaturalLinks.filter((link) => {
    if (severityFilter === "all") return true;
    return link.severity === severityFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLinks.length / pageSize);
  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const highSeverityCount = unnaturalLinks.filter((l) => l.severity === "high").length;
  const mediumSeverityCount = unnaturalLinks.filter((l) => l.severity === "medium").length;
  const lowSeverityCount = unnaturalLinks.filter((l) => l.severity === "low").length;

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

  const getLinkTypeBadge = (type: string) => {
    switch (type) {
      case "dofollow":
        return <Badge className="bg-green-500">Dofollow</Badge>;
      case "nofollow":
        return <Badge className="bg-blue-500">Nofollow</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {highSeverityCount > 0 && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo nghiêm trọng:</strong> Phát hiện {highSeverityCount} backlink có mức độ nguy
            hiểm cao. Những backlink này có thể ảnh hưởng xấu đến hồ sơ backlink và thứ hạng SEO. Khuyến
            nghị: Xử lý ngay lập tức bằng cách disavow hoặc yêu cầu gỡ link.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng cảnh báo</p>
            <p className="text-2xl font-bold">{unnaturalLinks.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mức độ cao</p>
            <p className="text-2xl font-bold text-red-500">{highSeverityCount}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-yellow-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mức độ trung bình</p>
            <p className="text-2xl font-bold text-yellow-500">{mediumSeverityCount}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-blue-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mức độ thấp</p>
            <p className="text-2xl font-bold text-blue-500">{lowSeverityCount}</p>
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

      {/* Unnatural Links Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh Sách Backlink Không Tự Nhiên
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Loại link</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Lý do</TableHead>
                <TableHead>Mức độ</TableHead>
                <TableHead>Khuyến nghị</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLinks.map((link, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      link.severity === "high"
                        ? "bg-red-50/50 dark:bg-red-950/20"
                        : link.severity === "medium"
                        ? "bg-yellow-50/50 dark:bg-yellow-950/20"
                        : ""
                    }`}
                  >
                    <TableCell>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 max-w-xs truncate"
                      >
                        {link.url}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell className="font-medium">{link.domain}</TableCell>
                    <TableCell>{getLinkTypeBadge(link.linkType)}</TableCell>
                    <TableCell>
                      <Badge variant={link.dr > 50 ? "default" : "secondary"}>{link.dr}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {link.reason}
                    </TableCell>
                    <TableCell>{getSeverityBadge(link.severity)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {link.recommendation}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Recommendations */}
      {highSeverityCount > 0 && (
        <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            Hành Động Khẩn Cấp
          </h3>
          <div className="space-y-3 text-sm opacity-90">
            <p>
              Phát hiện {highSeverityCount} backlink có mức độ nguy hiểm cao. Các backlink này cần được
              xử lý ngay lập tức:
            </p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Disavow các backlink từ link farm hoặc domain spam</li>
              <li>Liên hệ với webmaster để yêu cầu gỡ link từ các domain kém chất lượng</li>
              <li>Giảm tỷ lệ dofollow từ các domain ít uy tín</li>
              <li>Theo dõi và kiểm tra định kỳ để phát hiện các backlink không tự nhiên mới</li>
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

