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
import { AlertTriangle, ExternalLink, Ban } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SpamBacklink {
  sourceUrl: string;
  domain: string;
  spamType: "link-farm" | "spam-site" | "banned-site";
  dr: number;
  traffic: number;
  reason: string;
  indexStatus: string;
}

export function SpamFarmDetection() {
  const [spamFilter, setSpamFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Spam Backlinks Data
  const spamBacklinks: SpamBacklink[] = [
    {
      sourceUrl: "https://link-farm-network.info/article",
      domain: "link-farm-network.info",
      spamType: "link-farm",
      dr: 8,
      traffic: 200,
      reason: "Link farm - Website chỉ dùng để xây dựng backlink",
      indexStatus: "Not indexed",
    },
    {
      sourceUrl: "https://spam-casino-xyz.com/link",
      domain: "spam-casino-xyz.com",
      spamType: "spam-site",
      dr: 15,
      traffic: 500,
      reason: "Website chuyên bán backlink, không có nội dung hữu ích",
      indexStatus: "Not indexed",
    },
    {
      sourceUrl: "https://banned-site.com/article",
      domain: "banned-site.com",
      spamType: "banned-site",
      dr: 5,
      traffic: 0,
      reason: "Website đã bị Google phạt hoặc không được index",
      indexStatus: "Banned",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = spamBacklinks.filter((link) => {
    if (spamFilter === "all") return true;
    return link.spamType === spamFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const spamCount = spamBacklinks.length;
  const isWarning = spamCount > 0;

  const getSpamBadge = (type: string) => {
    switch (type) {
      case "link-farm":
        return <Badge variant="destructive">Link Farm</Badge>;
      case "spam-site":
        return <Badge variant="destructive">Spam Site</Badge>;
      case "banned-site":
        return <Badge variant="destructive">Banned Site</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Phát hiện {spamCount} backlink từ các site spam hoặc link
            farm. Những backlink này có thể làm hại website và ảnh hưởng đến thứ hạng SEO. Khuyến
            nghị: Loại bỏ hoặc disavow các backlink này ngay lập tức.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng Spam Backlinks</p>
            <p className="text-2xl font-bold text-red-500">{spamCount}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Link Farm</p>
            <p className="text-2xl font-bold">
              {spamBacklinks.filter((l) => l.spamType === "link-farm").length}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Spam/Banned Sites</p>
            <p className="text-2xl font-bold">
              {spamBacklinks.filter((l) => l.spamType !== "link-farm").length}
            </p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={spamFilter} onValueChange={setSpamFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại spam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="link-farm">Link Farm</SelectItem>
                <SelectItem value="spam-site">Spam Site</SelectItem>
                <SelectItem value="banned-site">Banned Site</SelectItem>
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

      {/* Spam Backlinks Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh sách Backlink Từ Site Spam/Farm
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Index Status</TableHead>
                <TableHead>Lý do</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBacklinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink spam nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBacklinks.map((link, idx) => (
                  <TableRow
                    key={idx}
                    className="hover:bg-muted/50 bg-red-50/50 dark:bg-red-950/20"
                  >
                    <TableCell>{getSpamBadge(link.spamType)}</TableCell>
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
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                        {link.indexStatus}
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

