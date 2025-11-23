import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Download, AlertTriangle, Shield, ExternalLink, Ban } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DisavowBacklink {
  id: number;
  sourceUrl: string;
  domain: string;
  toxicType: "toxic" | "spam" | "pbn" | "negative-seo" | "outbound-bad";
  reason: string;
  action: "disavow" | "remove" | "monitor";
  dr: number;
  priority: "high" | "medium" | "low";
}

export function DisavowRecommendations() {
  const [selectedLinks, setSelectedLinks] = useState<number[]>([]);
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Disavow Backlinks Data
  const disavowBacklinks: DisavowBacklink[] = [
    {
      id: 1,
      sourceUrl: "https://spam-casino.com/link",
      domain: "spam-casino.com",
      toxicType: "toxic",
      reason: "Domain bị phạt hoặc có dấu hiệu spam",
      action: "disavow",
      dr: 15,
      priority: "high",
    },
    {
      id: 2,
      sourceUrl: "https://link-farm.net/article",
      domain: "link-farm.net",
      toxicType: "spam",
      reason: "Link farm - Website chỉ dùng để xây dựng backlink",
      action: "disavow",
      dr: 8,
      priority: "high",
    },
    {
      id: 3,
      sourceUrl: "https://pbn-site1.com/article",
      domain: "pbn-site1.com",
      toxicType: "pbn",
      reason: "Footprint PBN - Trùng IP Class-C và GA ID",
      action: "disavow",
      dr: 35,
      priority: "high",
    },
    {
      id: 4,
      sourceUrl: "https://casino-spam.xyz/link",
      domain: "casino-spam.xyz",
      toxicType: "negative-seo",
      reason: "Backlink từ domain không liên quan, có dấu hiệu Negative SEO",
      action: "disavow",
      dr: 8,
      priority: "high",
    },
    {
      id: 5,
      sourceUrl: "https://low-quality-site.com/post",
      domain: "low-quality-site.com",
      toxicType: "outbound-bad",
      reason: "Domain có outbound links không uy tín quá cao (43.8%)",
      action: "disavow",
      dr: 28,
      priority: "medium",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = disavowBacklinks.filter((link) => {
    if (actionFilter === "all") return true;
    return link.action === actionFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleLink = (id: number) => {
    setSelectedLinks((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const exportDisavow = () => {
    const selected = disavowBacklinks.filter((d) => selectedLinks.includes(d.id));
    const disavowText = selected.map((d) => `domain:${d.domain}`).join("\n");
    console.log("Export Disavow List:\n", disavowText);
    alert(`Exported ${selected.length} domains to disavow file`);
  };

  const getToxicBadge = (type: string) => {
    switch (type) {
      case "toxic":
        return <Badge variant="destructive">Toxic</Badge>;
      case "spam":
        return <Badge variant="destructive">Spam</Badge>;
      case "pbn":
        return <Badge variant="destructive">PBN</Badge>;
      case "negative-seo":
        return <Badge variant="destructive">Negative SEO</Badge>;
      case "outbound-bad":
        return <Badge className="bg-yellow-500">Outbound Bad</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "disavow":
        return <Badge variant="destructive">Disavow</Badge>;
      case "remove":
        return <Badge className="bg-red-500">Loại bỏ</Badge>;
      case "monitor":
        return <Badge variant="outline">Monitor</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Cao</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Trung bình</Badge>;
      case "low":
        return <Badge variant="outline">Thấp</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng cần xử lý</p>
            <p className="text-2xl font-bold">{disavowBacklinks.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Cần Disavow</p>
            <p className="text-2xl font-bold text-red-500">
              {disavowBacklinks.filter((l) => l.action === "disavow").length}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-yellow-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Cần Loại bỏ</p>
            <p className="text-2xl font-bold text-yellow-500">
              {disavowBacklinks.filter((l) => l.action === "remove").length}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Đã chọn</p>
            <p className="text-2xl font-bold">{selectedLinks.length}</p>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Đề Xuất Hành Động
        </h3>
        <div className="space-y-3 text-sm opacity-90">
          <p>
            Dưới đây là danh sách các backlink độc hại hoặc có rủi ro cần được xử lý. Hãy chọn các
            backlink cần disavow và tải về file Disavow để upload lên Google Search Console.
          </p>
          <div>
            <p className="font-semibold mb-2">Các hành động khuyến nghị:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>
                <strong>Disavow:</strong> Sử dụng công cụ Disavow của Google để loại bỏ các backlink
                từ domain spam, PBN, hoặc Negative SEO
              </li>
              <li>
                <strong>Loại bỏ:</strong> Liên hệ với webmaster để yêu cầu gỡ link từ các trang có
                outbound links xấu hoặc từ các trang bị Google phạt
              </li>
              <li>
                <strong>Monitor:</strong> Theo dõi các backlink có mức độ rủi ro thấp hơn
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Action Bar */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả hành động</SelectItem>
                <SelectItem value="disavow">Disavow</SelectItem>
                <SelectItem value="remove">Loại bỏ</SelectItem>
                <SelectItem value="monitor">Monitor</SelectItem>
              </SelectContent>
            </Select>
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
          <Button
            variant="destructive"
            size="sm"
            onClick={exportDisavow}
            disabled={selectedLinks.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Disavow ({selectedLinks.length})
          </Button>
        </div>
      </Card>

      {/* Disavow Backlinks Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh sách Backlink Cần Xử Lý
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Lý do</TableHead>
                <TableHead>Hành động</TableHead>
                <TableHead>Ưu tiên</TableHead>
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
                paginatedBacklinks.map((link) => (
                  <TableRow
                    key={link.id}
                    className={`hover:bg-muted/50 ${
                      link.priority === "high" ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedLinks.includes(link.id)}
                        onCheckedChange={() => toggleLink(link.id)}
                      />
                    </TableCell>
                    <TableCell>{getToxicBadge(link.toxicType)}</TableCell>
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
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {link.reason}
                    </TableCell>
                    <TableCell>{getActionBadge(link.action)}</TableCell>
                    <TableCell>{getPriorityBadge(link.priority)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Warning Alert */}
      <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800 dark:text-red-200">
          <strong>Cảnh báo hành động cần thiết:</strong> Có {disavowBacklinks.filter((l) => l.priority === "high").length} backlink
          có mức độ ưu tiên cao cần được xử lý ngay lập tức. Hãy tạo file Disavow và upload lên
          Google Search Console để bảo vệ hồ sơ backlink của website.
        </AlertDescription>
      </Alert>

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

