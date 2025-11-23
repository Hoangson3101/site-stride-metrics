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
  PieChart,
  Pie,
  Cell,
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
import { AlertTriangle, DollarSign, Users, ExternalLink } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SponsoredUGCLink {
  sourceUrl: string;
  domain: string;
  linkType: "sponsored" | "ugc";
  dr: number;
  traffic: number;
  targetUrl: string;
  placement: string;
  reason: string;
}

export function SponsoredUGCDetailed() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Sponsored vs UGC Distribution
  const sponsoredUGCDistribution = [
    { name: "Sponsored", value: 1, count: 19, color: "hsl(var(--warning))" },
    { name: "UGC", value: 3, count: 57, color: "hsl(var(--accent))" },
  ];

  // Links Data
  const links: SponsoredUGCLink[] = [
    {
      sourceUrl: "https://ad-network.com/banner",
      domain: "ad-network.com",
      linkType: "sponsored",
      dr: 35,
      traffic: 8000,
      targetUrl: "https://yoursite.com",
      placement: "Banner",
      reason: "Link quảng cáo trả phí",
    },
    {
      sourceUrl: "https://sponsor-site.com/article",
      domain: "sponsor-site.com",
      linkType: "sponsored",
      dr: 42,
      traffic: 12000,
      targetUrl: "https://yoursite.com/product",
      placement: "Content",
      reason: "Bài viết tài trợ",
    },
    {
      sourceUrl: "https://forum.example.com/thread",
      domain: "forum.example.com",
      linkType: "ugc",
      dr: 25,
      traffic: 5000,
      targetUrl: "https://yoursite.com",
      placement: "Comment",
      reason: "Bình luận người dùng",
    },
    {
      sourceUrl: "https://blog.example.com/article#comment-123",
      domain: "blog.example.com",
      linkType: "ugc",
      dr: 45,
      traffic: 12000,
      targetUrl: "https://yoursite.com/page",
      placement: "Comment",
      reason: "Bình luận trong bài viết",
    },
  ];

  // Filter links
  const filteredLinks = links.filter((link) => {
    if (typeFilter === "all") return true;
    return link.linkType === typeFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLinks.length / pageSize);
  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const sponsoredPercentage = sponsoredUGCDistribution[0].value;
  const ugcPercentage = sponsoredUGCDistribution[1].value;
  const isWarning = sponsoredPercentage > 20 || ugcPercentage < 2;

  const COLORS = ["hsl(var(--warning))", "hsl(var(--accent))"];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "sponsored":
        return <Badge className="bg-yellow-500">Sponsored</Badge>;
      case "ugc":
        return <Badge className="bg-purple-500">UGC</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sponsored":
        return <DollarSign className="h-4 w-4 text-yellow-500" />;
      case "ugc":
        return <Users className="h-4 w-4 text-purple-500" />;
      default:
        return <ExternalLink className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Tỷ lệ Sponsored vs UGC
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sponsoredUGCDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sponsoredUGCDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value}% (${props.payload.count} backlinks)`,
                  props.payload.name,
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So sánh Số lượng
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sponsoredUGCDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
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
                  `${props.payload.count} backlinks (${value}%)`,
                  props.payload.name,
                ]}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong>{" "}
            {sponsoredPercentage > 20 && (
              <>Tỷ lệ backlink sponsored là {sponsoredPercentage}%, quá cao (ngưỡng an toàn: &lt;20%). </>
            )}
            {ugcPercentage < 2 && (
              <>Tỷ lệ backlink UGC là {ugcPercentage}%, quá thấp. </>
            )}
            Điều này có thể làm mất tự nhiên trong hồ sơ backlink. Gợi ý:{" "}
            {sponsoredPercentage > 20 && "Giảm tỷ lệ link trả phí, "}
            {ugcPercentage < 2 && "Tăng tỷ lệ link UGC từ bình luận và forum, "}
            tăng tỷ lệ link tự nhiên từ nội dung bài viết.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-surface shadow-soft border-yellow-500/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-500" />
              <p className="text-sm font-medium">Sponsored</p>
            </div>
            <p className="text-2xl font-bold text-yellow-500">
              {sponsoredUGCDistribution[0].value}%
            </p>
            <p className="text-xs text-muted-foreground">
              {sponsoredUGCDistribution[0].count} backlinks
            </p>
            <p className="text-xs text-muted-foreground">
              Link quảng cáo trả phí
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-purple-500/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              <p className="text-sm font-medium">UGC</p>
            </div>
            <p className="text-2xl font-bold text-purple-500">
              {sponsoredUGCDistribution[1].value}%
            </p>
            <p className="text-xs text-muted-foreground">
              {sponsoredUGCDistribution[1].count} backlinks
            </p>
            <p className="text-xs text-muted-foreground">
              User-Generated Content
            </p>
          </div>
        </Card>
      </div>

      {/* Links Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Danh sách Backlink Sponsored và UGC
          </h3>
          <div className="flex items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="sponsored">Sponsored</SelectItem>
                <SelectItem value="ugc">UGC</SelectItem>
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
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Lý do</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLinks.map((link, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(link.linkType)}
                        {getTypeBadge(link.linkType)}
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
                    <TableCell>
                      <Badge variant="outline">{link.placement}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {link.reason}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log("View details", link.sourceUrl)}
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

