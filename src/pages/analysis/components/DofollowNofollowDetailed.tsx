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
import { AlertTriangle, CheckCircle, Link as LinkIcon, ExternalLink } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DofollowNofollowLink {
  sourceUrl: string;
  domain: string;
  linkType: "dofollow" | "nofollow";
  dr: number;
  traffic: number;
  targetUrl: string;
  placement: string;
  anchorText: string;
  contextual: boolean;
}

export function DofollowNofollowDetailed() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Dofollow vs Nofollow Distribution
  const dofollowNofollowDistribution = [
    { name: "Dofollow", value: 78, count: 1476, color: "hsl(var(--primary))" },
    { name: "Nofollow", value: 22, count: 416, color: "hsl(var(--secondary))" },
  ];

  // Links Data
  const links: DofollowNofollowLink[] = [
    {
      sourceUrl: "https://techcrunch.com/article",
      domain: "techcrunch.com",
      linkType: "dofollow",
      dr: 92,
      traffic: 45000000,
      targetUrl: "https://yoursite.com/product",
      placement: "Content",
      anchorText: "best product",
      contextual: true,
    },
    {
      sourceUrl: "https://medium.com/post",
      domain: "medium.com",
      linkType: "dofollow",
      dr: 96,
      traffic: 180000000,
      targetUrl: "https://yoursite.com/blog",
      placement: "Content",
      anchorText: "read more",
      contextual: true,
    },
    {
      sourceUrl: "https://blog.example.com/article",
      domain: "blog.example.com",
      linkType: "nofollow",
      dr: 45,
      traffic: 12000,
      targetUrl: "https://yoursite.com/page",
      placement: "Content",
      anchorText: "click here",
      contextual: true,
    },
    {
      sourceUrl: "https://news-site.com/news",
      domain: "news-site.com",
      linkType: "nofollow",
      dr: 68,
      traffic: 25000,
      targetUrl: "https://yoursite.com",
      placement: "Sidebar",
      anchorText: "visit website",
      contextual: false,
    },
    {
      sourceUrl: "https://social-media.com/post",
      domain: "social-media.com",
      linkType: "nofollow",
      dr: 88,
      traffic: 50000000,
      targetUrl: "https://yoursite.com",
      placement: "Content",
      anchorText: "check this out",
      contextual: true,
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

  const dofollowPercentage = dofollowNofollowDistribution[0].value;
  const isWarning = dofollowPercentage > 90 || dofollowPercentage < 60;

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))"];

  const getTypeBadge = (type: string) => {
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
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Tỷ lệ Dofollow và Nofollow
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dofollowNofollowDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {dofollowNofollowDistribution.map((entry, index) => (
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
            <BarChart data={dofollowNofollowDistribution}>
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
            {dofollowPercentage > 90 ? (
              <>
                Tỷ lệ dofollow quá cao ({dofollowPercentage}%) có thể bị Google coi là không tự nhiên.
                Cần bổ sung thêm backlink nofollow từ các nguồn tự nhiên để cân bằng tỷ lệ.
              </>
            ) : (
              <>
                Tỷ lệ dofollow quá thấp ({dofollowPercentage}%) so với chuẩn ngành (60-90%). Cần
                tăng tỷ lệ dofollow từ các nguồn uy tín để cải thiện giá trị SEO.
              </>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-surface shadow-soft border-green-500/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <p className="text-sm font-medium">Dofollow</p>
            </div>
            <p className="text-2xl font-bold text-green-500">{dofollowPercentage}%</p>
            <p className="text-xs text-muted-foreground">
              {dofollowNofollowDistribution[0].count} backlinks
            </p>
            <p className="text-xs text-muted-foreground">
              Truyền PageRank, giúp cải thiện SEO
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-blue-500/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-blue-500" />
              <p className="text-sm font-medium">Nofollow</p>
            </div>
            <p className="text-2xl font-bold text-blue-500">
              {dofollowNofollowDistribution[1].value}%
            </p>
            <p className="text-xs text-muted-foreground">
              {dofollowNofollowDistribution[1].count} backlinks
            </p>
            <p className="text-xs text-muted-foreground">
              Không truyền PageRank, có giá trị traffic và đa dạng
            </p>
          </div>
        </Card>
      </div>

      {/* Links Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Danh sách Backlink Dofollow và Nofollow
          </h3>
          <div className="flex items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="dofollow">Dofollow</SelectItem>
                <SelectItem value="nofollow">Nofollow</SelectItem>
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
                <TableHead>Anchor Text</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Contextual</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLinks.map((link, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell>{getTypeBadge(link.linkType)}</TableCell>
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
                    <TableCell className="text-sm text-muted-foreground">
                      {link.anchorText}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{link.placement}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={link.contextual ? "default" : "secondary"}>
                        {link.contextual ? "Yes" : "No"}
                      </Badge>
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

