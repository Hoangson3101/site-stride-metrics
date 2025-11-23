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
import { AlertTriangle, Award, Users, FileText, ExternalLink } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BrandSignal {
  source: string;
  type: "brand-mention" | "social-profile" | "authoritative-mention";
  platform: string;
  hasLink: boolean;
  authority: number;
  value: string;
}

export function BrandSignalsOverview() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Brand Signals Distribution
  const brandSignalsDistribution = [
    { name: "Brand Mentions", value: 45, count: 124, color: "hsl(var(--primary))" },
    { name: "Social Media Profiles", value: 30, count: 82, color: "hsl(var(--secondary))" },
    { name: "Authoritative Mentions", value: 25, count: 68, color: "hsl(var(--accent))" },
  ];

  // Brand Signals Data
  const brandSignals: BrandSignal[] = [
    {
      source: "tech-news-portal.com",
      type: "brand-mention",
      platform: "Báo chí",
      hasLink: true,
      authority: 68,
      value: "Đề cập thương hiệu trong bài viết công nghệ",
    },
    {
      source: "facebook.com/mybrand",
      type: "social-profile",
      platform: "Facebook",
      hasLink: true,
      authority: 85,
      value: "Social profile có liên kết về website",
    },
    {
      source: "wikipedia.org/wiki/Brand",
      type: "authoritative-mention",
      platform: "Wikipedia",
      hasLink: true,
      authority: 95,
      value: "Đề cập thương hiệu trên Wikipedia",
    },
    {
      source: "linkedin.com/company/mybrand",
      type: "social-profile",
      platform: "LinkedIn",
      hasLink: true,
      authority: 75,
      value: "LinkedIn company profile",
    },
    {
      source: "industry-blog.com/article",
      type: "brand-mention",
      platform: "Blog",
      hasLink: false,
      authority: 45,
      value: "Đề cập thương hiệu nhưng không có link",
    },
  ];

  // Filter signals
  const filteredSignals = brandSignals.filter((signal) => {
    if (typeFilter === "all") return true;
    return signal.type === typeFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSignals.length / pageSize);
  const paginatedSignals = filteredSignals.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const authoritativeMentions = brandSignals.filter((s) => s.type === "authoritative-mention").length;
  const isWarning = authoritativeMentions < 5;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "brand-mention":
        return <Badge className="bg-blue-500">Brand Mention</Badge>;
      case "social-profile":
        return <Badge className="bg-purple-500">Social Profile</Badge>;
      case "authoritative-mention":
        return <Badge className="bg-green-500">Authoritative</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "brand-mention":
        return <Award className="h-4 w-4 text-blue-500" />;
      case "social-profile":
        return <Users className="h-4 w-4 text-purple-500" />;
      case "authoritative-mention":
        return <FileText className="h-4 w-4 text-green-500" />;
      default:
        return <Award className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân loại Tín Hiệu Thương Hiệu
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={brandSignalsDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {brandSignalsDistribution.map((entry, index) => (
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
                  `${value}% (${props.payload.count} signals)`,
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
            <BarChart data={brandSignalsDistribution}>
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
                  `${props.payload.count} signals (${value}%)`,
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
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Website thiếu tín hiệu thương hiệu trên các nền tảng quan
            trọng. Chỉ có {authoritativeMentions} authoritative mentions được phát hiện. Khuyến nghị:
            Tăng cường sự hiện diện trên các nền tảng uy tín như báo chí lớn, Wikipedia, hoặc các
            blog chuyên ngành để cải thiện E-A-T.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {brandSignalsDistribution.map((item, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getTypeIcon(item.name === "Brand Mentions" ? "brand-mention" : item.name === "Social Media Profiles" ? "social-profile" : "authoritative-mention")}
                <p className="text-sm font-medium">{item.name}</p>
              </div>
              <p className="text-2xl font-bold">{item.value}%</p>
              <p className="text-xs text-muted-foreground">
                {item.count} signals
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại tín hiệu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="brand-mention">Brand Mentions</SelectItem>
                <SelectItem value="social-profile">Social Profiles</SelectItem>
                <SelectItem value="authoritative-mention">Authoritative Mentions</SelectItem>
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

      {/* Signals Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Chi tiết Tín Hiệu Thương Hiệu
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại</TableHead>
                <TableHead>Nguồn</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Có link</TableHead>
                <TableHead>Authority</TableHead>
                <TableHead>Giá trị</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSignals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy tín hiệu nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedSignals.map((signal, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(signal.type)}
                        {getTypeBadge(signal.type)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{signal.source}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{signal.platform}</Badge>
                    </TableCell>
                    <TableCell>
                      {signal.hasLink ? (
                        <Badge className="bg-green-500">Có</Badge>
                      ) : (
                        <Badge variant="outline">Không</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={signal.authority > 60 ? "default" : "secondary"}>
                        {signal.authority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {signal.value}
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

