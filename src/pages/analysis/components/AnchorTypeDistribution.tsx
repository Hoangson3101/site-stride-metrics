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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Hash, ExternalLink, Type, Link as LinkIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AnchorByType {
  anchorText: string;
  type: "branded" | "naked" | "generic" | "partial" | "exact";
  count: number;
  percentage: number;
  sourceUrl: string;
  domain: string;
  dr: number;
  traffic: number;
  dofollow: number;
  nofollow: number;
}

export function AnchorTypeDistribution() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Type Distribution Data
  const typeDistribution = [
    { name: "Branded", value: 32, count: 605, color: "hsl(var(--primary))" },
    { name: "Naked URL", value: 28, count: 529, color: "hsl(var(--secondary))" },
    { name: "Generic", value: 22, count: 416, color: "hsl(var(--accent))" },
    { name: "Partial-match", value: 8.5, count: 161, color: "hsl(var(--warning))" },
    { name: "Exact-match", value: 9.5, count: 180, color: "hsl(var(--destructive))" },
  ];

  // Anchors by Type
  const anchorsByType: AnchorByType[] = [
    {
      anchorText: "YourBrand",
      type: "branded",
      count: 145,
      percentage: 7.7,
      sourceUrl: "https://techcrunch.com/article",
      domain: "techcrunch.com",
      dr: 92,
      traffic: 45000000,
      dofollow: 120,
      nofollow: 25,
    },
    {
      anchorText: "YourBrand SEO",
      type: "branded",
      count: 98,
      percentage: 5.2,
      sourceUrl: "https://medium.com/post",
      domain: "medium.com",
      dr: 96,
      traffic: 180000000,
      dofollow: 85,
      nofollow: 13,
    },
    {
      anchorText: "https://yoursite.com",
      type: "naked",
      count: 129,
      percentage: 6.8,
      sourceUrl: "https://blog.example.com/article",
      domain: "blog.example.com",
      dr: 45,
      traffic: 12000,
      dofollow: 95,
      nofollow: 34,
    },
    {
      anchorText: "click here",
      type: "generic",
      count: 98,
      percentage: 5.2,
      sourceUrl: "https://news-site.com/news",
      domain: "news-site.com",
      dr: 68,
      traffic: 25000,
      dofollow: 65,
      nofollow: 33,
    },
    {
      anchorText: "seo tool",
      type: "exact",
      count: 85,
      percentage: 4.5,
      sourceUrl: "https://directory.com/listing",
      domain: "directory.com",
      dr: 35,
      traffic: 5000,
      dofollow: 70,
      nofollow: 15,
    },
    {
      anchorText: "best seo software",
      type: "exact",
      count: 45,
      percentage: 2.4,
      sourceUrl: "https://review-site.com/review",
      domain: "review-site.com",
      dr: 42,
      traffic: 8000,
      dofollow: 38,
      nofollow: 7,
    },
  ];

  // Filter anchors
  const filteredAnchors = anchorsByType.filter((anchor) => {
    if (typeFilter === "all") return true;
    return anchor.type === typeFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAnchors.length / pageSize);
  const paginatedAnchors = filteredAnchors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const exactMatchPercentage = typeDistribution[4].value;
  const isWarning = exactMatchPercentage > 5;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
    "hsl(var(--destructive))",
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "branded":
        return <Badge className="bg-blue-500">Branded</Badge>;
      case "naked":
        return <Badge className="bg-green-500">Naked URL</Badge>;
      case "generic":
        return <Badge className="bg-purple-500">Generic</Badge>;
      case "partial":
        return <Badge className="bg-yellow-500">Partial-match</Badge>;
      case "exact":
        return <Badge variant="destructive">Exact-match</Badge>;
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
            Phân loại Tỷ lệ Anchor Text
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, value }) => `${name}\n${value}%`}
                outerRadius={140}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {typeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                  fontSize: "14px",
                  padding: "12px",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value}% (${props.payload.count} backlinks)`,
                  props.payload.name,
                ]}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "14px", paddingTop: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So sánh Tỷ lệ Anchor Text
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={typeDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                label={{ value: "Tỷ lệ (%)", angle: -90, position: "insideLeft", style: { textAnchor: "middle", fontSize: 12 } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                  fontSize: "14px",
                  padding: "12px",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value}% (${props.payload.count} backlinks)`,
                  props.payload.name,
                ]}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--primary))" 
                radius={[8, 8, 0, 0]}
                label={{ position: "top", fill: "hsl(var(--foreground))", fontSize: 12 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Tỷ lệ anchor text chính xác (exact-match) là{" "}
            {exactMatchPercentage}%, quá cao so với ngưỡng an toàn (dưới 5%). Điều này cho thấy
            hồ sơ backlink đang bị tối ưu hóa quá mức. Khuyến nghị: Giảm tỷ lệ exact-match xuống
            dưới 5% bằng cách tăng tỷ lệ branded và generic anchor text để duy trì sự tự nhiên.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {typeDistribution.map((type, idx) => (
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

      {/* Anchors Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Chi tiết Anchor Text theo Loại
          </h3>
          <div className="flex items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="branded">Branded</SelectItem>
                <SelectItem value="naked">Naked URL</SelectItem>
                <SelectItem value="generic">Generic</SelectItem>
                <SelectItem value="partial">Partial-match</SelectItem>
                <SelectItem value="exact">Exact-match</SelectItem>
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
                <TableHead>Anchor Text</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Tỷ lệ</TableHead>
                <TableHead>Domain nguồn</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Dofollow/Nofollow</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAnchors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy anchor text nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedAnchors.map((anchor, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span>{anchor.anchorText}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(anchor.type)}</TableCell>
                    <TableCell>{anchor.count}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${Math.min(anchor.percentage * 10, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm">{anchor.percentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={anchor.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        {anchor.domain}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge variant={anchor.dr > 50 ? "default" : "secondary"}>
                        {anchor.dr}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {anchor.traffic >= 1000000
                        ? `${(anchor.traffic / 1000000).toFixed(1)}M`
                        : anchor.traffic >= 1000
                        ? `${(anchor.traffic / 1000).toFixed(1)}K`
                        : anchor.traffic.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-green-500">{anchor.dofollow}</span>
                        <span className="text-muted-foreground">/</span>
                        <span className="text-orange-500">{anchor.nofollow}</span>
                      </div>
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

