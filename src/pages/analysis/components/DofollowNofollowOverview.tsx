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
import { AlertTriangle, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { BenchmarkDofollowComparison } from "./BenchmarkDofollowComparison";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Backlink {
  url: string;
  domain: string;
  linkType: "dofollow" | "nofollow" | "ugc" | "sponsored";
  dr: number;
  date: string;
}

export function DofollowNofollowOverview() {
  const [linkTypeFilter, setLinkTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Distribution data
  const distributionData = [
    { name: "Dofollow", value: 75, count: 1387, color: "hsl(var(--primary))" },
    { name: "Nofollow", value: 22, count: 407, color: "hsl(var(--secondary))" },
    { name: "UGC", value: 2, count: 37, color: "hsl(var(--accent))" },
    { name: "Sponsored", value: 1, count: 19, color: "hsl(var(--warning))" },
  ];

  // Backlinks data
  const backlinks: Backlink[] = [
    {
      url: "https://tech-news.com/article",
      domain: "tech-news.com",
      linkType: "dofollow",
      dr: 68,
      date: "2024-10-15",
    },
    {
      url: "https://blog.com/review",
      domain: "blog.com",
      linkType: "nofollow",
      dr: 45,
      date: "2024-10-20",
    },
    {
      url: "https://forum.com/thread",
      domain: "forum.com",
      linkType: "ugc",
      dr: 30,
      date: "2024-10-25",
    },
    {
      url: "https://sponsored-site.com/ad",
      domain: "sponsored-site.com",
      linkType: "sponsored",
      dr: 25,
      date: "2024-11-01",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = backlinks.filter((link) => {
    if (linkTypeFilter === "all") return true;
    return link.linkType === linkTypeFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const dofollowRatio = distributionData.find((d) => d.name === "Dofollow")?.value || 0;
  const nofollowRatio = distributionData.find((d) => d.name === "Nofollow")?.value || 0;
  const isWarning = dofollowRatio > 90 || dofollowRatio < 50 || nofollowRatio > 50;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
  ];

  const getLinkTypeBadge = (type: string) => {
    switch (type) {
      case "dofollow":
        return <Badge className="bg-green-500">Dofollow</Badge>;
      case "nofollow":
        return <Badge className="bg-blue-500">Nofollow</Badge>;
      case "ugc":
        return <Badge className="bg-yellow-500">UGC</Badge>;
      case "sponsored":
        return <Badge className="bg-red-500">Sponsored</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tỷ lệ dofollow ({dofollowRatio}%) hoặc nofollow ({nofollowRatio}%){" "}
            {dofollowRatio > 90
              ? "quá cao. Tỷ lệ dofollow > 90% có thể bị Google coi là không tự nhiên."
              : dofollowRatio < 50
              ? "quá thấp. Tỷ lệ dofollow < 50% có thể ảnh hưởng đến SEO."
              : "không hợp lý. Khuyến nghị: Cân bằng tỷ lệ dofollow/nofollow để đảm bảo tính tự nhiên."}
          </AlertDescription>
        </Alert>
      )}

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân Bổ Tỷ Lệ Dofollow/Nofollow
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
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
                  `${value}% (${props.payload.count} links)`,
                  props.payload.name,
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Số Lượng
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={100}
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
                  `${props.payload.count} links (${value}%)`,
                  props.payload.name,
                ]}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {distributionData.map((item, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {item.name === "Dofollow" ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : item.name === "Nofollow" ? (
                  <XCircle className="h-4 w-4 text-blue-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                )}
                <p className="text-sm font-medium">{item.name}</p>
              </div>
              <p className="text-2xl font-bold">{item.value}%</p>
              <p className="text-xs text-muted-foreground">
                {item.count.toLocaleString()} links
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={linkTypeFilter} onValueChange={setLinkTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại link" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="dofollow">Dofollow</SelectItem>
                <SelectItem value="nofollow">Nofollow</SelectItem>
                <SelectItem value="ugc">UGC</SelectItem>
                <SelectItem value="sponsored">Sponsored</SelectItem>
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
          Danh Sách Backlink
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Loại link</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Ngày</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBacklinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBacklinks.map((link, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
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
                    <TableCell className="text-sm text-muted-foreground">{link.date}</TableCell>
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

      {/* Benchmark Comparison Section */}
      <div className="mt-8 pt-8 border-t">
        <h2 className="text-2xl font-bold text-foreground mb-6">So Sánh Với Benchmark SERP Top 10</h2>
        <BenchmarkDofollowComparison />
      </div>
    </div>
  );
}
