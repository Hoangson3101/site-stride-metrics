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
import { AlertCircle, Home, FolderTree, FileText, ExternalLink } from "lucide-react";
import { OrphanPageAnalysis } from "./OrphanPageAnalysis";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BacklinkByPlacement {
  sourceUrl: string;
  domain: string;
  placement: "homepage" | "category" | "deep";
  dr: number;
  traffic: number;
  anchorText: string;
  pageType: string;
}

export function LinkPlacement() {
  const [placementFilter, setPlacementFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Placement Distribution Data
  const placementDistribution = [
    { name: "Trang chủ", value: 15, count: 278, color: "#3b82f6" },
    { name: "Danh mục", value: 25, count: 463, color: "#10b981" },
    { name: "Trang con", value: 60, count: 1109, color: "#f59e0b" },
  ];

  // Backlinks by Placement
  const backlinksByPlacement: BacklinkByPlacement[] = [
    {
      sourceUrl: "https://techcrunch.com",
      domain: "techcrunch.com",
      placement: "homepage",
      dr: 92,
      traffic: 45000000,
      anchorText: "featured company",
      pageType: "Homepage",
    },
    {
      sourceUrl: "https://techcrunch.com/startups",
      domain: "techcrunch.com",
      placement: "category",
      dr: 92,
      traffic: 45000000,
      anchorText: "startup news",
      pageType: "Category Page",
    },
    {
      sourceUrl: "https://techcrunch.com/2024/10/15/article-title",
      domain: "techcrunch.com",
      placement: "deep",
      dr: 92,
      traffic: 45000000,
      anchorText: "read more",
      pageType: "Article",
    },
    {
      sourceUrl: "https://medium.com",
      domain: "medium.com",
      placement: "homepage",
      dr: 96,
      traffic: 180000000,
      anchorText: "featured",
      pageType: "Homepage",
    },
    {
      sourceUrl: "https://medium.com/topic/technology",
      domain: "medium.com",
      placement: "category",
      dr: 96,
      traffic: 180000000,
      anchorText: "tech articles",
      pageType: "Topic Page",
    },
    {
      sourceUrl: "https://medium.com/@user/post-123",
      domain: "medium.com",
      placement: "deep",
      dr: 96,
      traffic: 180000000,
      anchorText: "review",
      pageType: "Blog Post",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = backlinksByPlacement.filter((link) => {
    if (placementFilter === "all") return true;
    return link.placement === placementFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const deepPagePercentage = placementDistribution[2].value;
  const isWarning = deepPagePercentage > 70;

  const COLORS = [
    "#3b82f6", // Blue
    "#10b981", // Green
    "#f59e0b", // Orange
  ]; // Không dùng trắng/xám

  const getPlacementIcon = (placement: string) => {
    switch (placement) {
      case "homepage":
        return <Home className="h-4 w-4 text-blue-500" />;
      case "category":
        return <FolderTree className="h-4 w-4 text-green-500" />;
      case "deep":
        return <FileText className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPlacementBadge = (placement: string) => {
    switch (placement) {
      case "homepage":
        return <Badge className="bg-blue-500">Trang chủ</Badge>;
      case "category":
        return <Badge className="bg-green-500">Danh mục</Badge>;
      case "deep":
        return <Badge className="bg-orange-500">Trang con</Badge>;
      default:
        return <Badge variant="outline">{placement}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Placement Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân bố Vị trí Backlink
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={placementDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {placementDistribution.map((entry, index) => (
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
                  `${value}% (${props.payload.count} backlink)`,
                  props.payload.name,
                ]}
              />
              <Legend 
                formatter={(value) => {
                  const entry = placementDistribution.find(d => d.name === value);
                  return entry ? `${value}: ${entry.value}%` : value;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Số lượng Backlink theo Vị trí
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={placementDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                label={{ value: "Vị trí Backlink", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                label={{ value: "Số lượng Backlink", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${props.payload.count} backlink (${value}%)`,
                  props.payload.name,
                ]}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tỷ lệ backlink từ trang con (deep page) là {deepPagePercentage}%,
            quá cao so với tỷ lệ từ trang chủ và trang danh mục. Backlink từ homepage và category page
            thường có giá trị cao hơn. Gợi ý: Tăng số lượng backlink từ trang chủ hoặc các trang danh
            mục để cải thiện chất lượng hồ sơ backlink.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Info */}
      <Card className="p-4 bg-muted/50 border-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {placementDistribution.map((placement, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2">
                {getPlacementIcon(
                  placement.name === "Trang chủ" ? "homepage" :
                  placement.name === "Danh mục" ? "category" :
                  placement.name === "Trang con" ? "deep" : "homepage"
                )}
                <span className="font-medium">{placement.name}</span>
              </div>
              <p className="text-muted-foreground">
                {placement.count} backlink ({placement.value}%)
              </p>
              <p className="text-xs text-muted-foreground">
                {placement.name === "Trang chủ"
                  ? "Giá trị cao nhất"
                  : placement.name === "Danh mục"
                  ? "Giá trị trung bình"
                  : "Giá trị thấp hơn"}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Backlinks List */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Danh sách Backlink theo Vị trí
          </h3>
          <div className="flex items-center gap-2">
            <Select value={placementFilter} onValueChange={setPlacementFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vị trí</SelectItem>
                <SelectItem value="homepage">Trang chủ</SelectItem>
                <SelectItem value="category">Danh mục</SelectItem>
                <SelectItem value="deep">Trang con</SelectItem>
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
                <TableHead>Vị trí</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Loại trang</TableHead>
                <TableHead>Anchor Text</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBacklinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBacklinks.map((link, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPlacementIcon(link.placement)}
                        {getPlacementBadge(link.placement)}
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
                      <Badge variant="outline">{link.pageType}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {link.anchorText}
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

      {/* Orphan Page Analysis Section */}
      <div className="mt-8 pt-8 border-t">
        <h2 className="text-2xl font-bold text-foreground mb-6">Phân Tích Orphan Page (Trang Mồ Côi)</h2>
        <OrphanPageAnalysis />
      </div>
    </div>
  );
}

