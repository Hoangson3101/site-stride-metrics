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
import { AlertTriangle, CheckCircle, ExternalLink, Link as LinkIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface LinkByType {
  sourceUrl: string;
  domain: string;
  linkType: "dofollow" | "nofollow" | "ugc" | "sponsored";
  dr: number;
  traffic: number;
  targetUrl: string;
  placement: string;
}

export function LinkTypesOverview() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Link Types Distribution Data
  const linkTypesDistribution = [
    { name: "Dofollow", value: 78, count: 1476, color: "hsl(var(--primary))" },
    { name: "Nofollow", value: 18, count: 341, color: "hsl(var(--secondary))" },
    { name: "UGC", value: 3, count: 57, color: "hsl(var(--accent))" },
    { name: "Sponsored", value: 1, count: 19, color: "hsl(var(--warning))" },
  ];

  // Links by Type
  const linksByType: LinkByType[] = [
    {
      sourceUrl: "https://techcrunch.com/article",
      domain: "techcrunch.com",
      linkType: "dofollow",
      dr: 92,
      traffic: 45000000,
      targetUrl: "https://yoursite.com/product",
      placement: "Content",
    },
    {
      sourceUrl: "https://medium.com/post",
      domain: "medium.com",
      linkType: "dofollow",
      dr: 96,
      traffic: 180000000,
      targetUrl: "https://yoursite.com/blog",
      placement: "Content",
    },
    {
      sourceUrl: "https://blog.example.com/article",
      domain: "blog.example.com",
      linkType: "nofollow",
      dr: 45,
      traffic: 12000,
      targetUrl: "https://yoursite.com/page",
      placement: "Content",
    },
    {
      sourceUrl: "https://forum.example.com/thread",
      domain: "forum.example.com",
      linkType: "ugc",
      dr: 25,
      traffic: 5000,
      targetUrl: "https://yoursite.com",
      placement: "Comment",
    },
    {
      sourceUrl: "https://ad-network.com/banner",
      domain: "ad-network.com",
      linkType: "sponsored",
      dr: 35,
      traffic: 8000,
      targetUrl: "https://yoursite.com",
      placement: "Banner",
    },
  ];

  // Filter links
  const filteredLinks = linksByType.filter((link) => {
    if (typeFilter === "all") return true;
    return link.linkType === typeFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLinks.length / pageSize);
  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const sponsoredPercentage = linkTypesDistribution[3].value;
  const ugcPercentage = linkTypesDistribution[2].value;
  const isWarning = sponsoredPercentage > 20 || ugcPercentage > 10;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "dofollow":
        return <Badge className="bg-green-500">Dofollow</Badge>;
      case "nofollow":
        return <Badge className="bg-blue-500">Nofollow</Badge>;
      case "ugc":
        return <Badge className="bg-purple-500">UGC</Badge>;
      case "sponsored":
        return <Badge className="bg-yellow-500">Sponsored</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "dofollow":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "nofollow":
        return <LinkIcon className="h-4 w-4 text-blue-500" />;
      case "ugc":
        return <ExternalLink className="h-4 w-4 text-purple-500" />;
      case "sponsored":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <LinkIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Tỷ lệ Các Loại Link
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={linkTypesDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {linkTypesDistribution.map((entry, index) => (
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
            Số lượng Backlink theo Loại
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={linkTypesDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={80}
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
            {ugcPercentage > 10 && (
              <>Tỷ lệ backlink UGC là {ugcPercentage}%, quá cao (ngưỡng an toàn: &lt;10%). </>
            )}
            Điều này có thể khiến Google coi hồ sơ backlink là không tự nhiên. Gợi ý: Cần cân bằng
            tỷ lệ link tự nhiên hơn, giảm tỷ lệ sponsored và UGC, tăng tỷ lệ dofollow từ nội dung
            tự nhiên.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {linkTypesDistribution.map((type, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[idx] }}
                />
                <p className="text-sm font-medium">{type.name}</p>
              </div>
              <p className="text-2xl font-bold">{type.value}%</p>
              <p className="text-xs text-muted-foreground">
                {type.count} backlinks
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Links Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Chi tiết Backlink theo Loại
          </h3>
          <div className="flex items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="dofollow">Dofollow</SelectItem>
                <SelectItem value="nofollow">Nofollow</SelectItem>
                <SelectItem value="ugc">UGC</SelectItem>
                <SelectItem value="sponsored">Sponsored</SelectItem>
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
                <TableHead>URL đích</TableHead>
                <TableHead>Vị trí</TableHead>
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
                      <a
                        href={link.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm max-w-xs truncate block"
                      >
                        {link.targetUrl}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{link.placement}</Badge>
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

