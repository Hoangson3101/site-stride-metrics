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
import { AlertTriangle, ExternalLink, Shield, TrendingDown } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DomainBacklink {
  domain: string;
  dr: number;
  dofollow: number;
  nofollow: number;
  total: number;
  traffic: number;
  category: "high-authority" | "low-authority";
}

export function DomainTypeAnalysis() {
  const [drFilter, setDrFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Distribution by domain type
  const domainTypeDistribution = [
    {
      category: "High Authority (DR≥30)",
      dofollow: 65,
      nofollow: 20,
      total: 85,
      color: "hsl(var(--primary))",
    },
    {
      category: "Low Authority (DR<30)",
      dofollow: 10,
      nofollow: 5,
      total: 15,
      color: "hsl(var(--secondary))",
    },
  ];

  // Domain backlinks data
  const domainBacklinks: DomainBacklink[] = [
    {
      domain: "tech-news-portal.com",
      dr: 68,
      dofollow: 12,
      nofollow: 3,
      total: 15,
      traffic: 450000,
      category: "high-authority",
    },
    {
      domain: "low-quality-site.com",
      dr: 15,
      dofollow: 8,
      nofollow: 2,
      total: 10,
      traffic: 5000,
      category: "low-authority",
    },
    {
      domain: "authority-blog.com",
      dr: 75,
      dofollow: 20,
      nofollow: 5,
      total: 25,
      traffic: 320000,
      category: "high-authority",
    },
  ];

  // Filter domains
  const filteredDomains = domainBacklinks.filter((domain) => {
    if (drFilter === "high" && domain.category !== "high-authority") return false;
    if (drFilter === "low" && domain.category !== "low-authority") return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDomains.length / pageSize);
  const paginatedDomains = filteredDomains.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const lowAuthorityDofollow = domainTypeDistribution.find((d) => d.category.includes("Low"))?.dofollow || 0;
  const highAuthorityDofollow = domainTypeDistribution.find((d) => d.category.includes("High"))?.dofollow || 0;
  const isWarning = lowAuthorityDofollow > 20;

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))"];

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tỷ lệ backlink dofollow từ các domain ít uy tín ({lowAuthorityDofollow}%)
            quá cao. Điều này có thể ảnh hưởng xấu đến hồ sơ backlink. Khuyến nghị: Tăng cường backlink từ
            các nguồn có độ uy tín cao hơn (DR ≥ 30) và giảm tỷ lệ backlink từ các domain ít uy tín.
          </AlertDescription>
        </Alert>
      )}

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân Bổ Dofollow/Nofollow Theo Loại Domain
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={domainTypeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="category"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={120}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) => [`${value}%`, "Tỷ lệ"]}
              />
              <Legend />
              <Bar dataKey="dofollow" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Dofollow" />
              <Bar dataKey="nofollow" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} name="Nofollow" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Tổng Số Backlink Theo Loại Domain
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={domainTypeDistribution.map((d) => ({ name: d.category, value: d.total }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {domainTypeDistribution.map((entry, index) => (
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
                formatter={(value: number) => [`${value}%`, "Tỷ lệ"]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">High Authority Dofollow</p>
            <p className="text-2xl font-bold text-green-500">{highAuthorityDofollow}%</p>
            <p className="text-xs text-muted-foreground">DR ≥ 30</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Low Authority Dofollow</p>
            <p className={`text-2xl font-bold ${isWarning ? "text-red-500" : "text-yellow-500"}`}>
              {lowAuthorityDofollow}%
            </p>
            <p className="text-xs text-muted-foreground">DR &lt; 30</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">High Authority Total</p>
            <p className="text-2xl font-bold">
              {domainTypeDistribution.find((d) => d.category.includes("High"))?.total || 0}%
            </p>
            <p className="text-xs text-muted-foreground">Tổng backlink từ domain uy tín</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Low Authority Total</p>
            <p className="text-2xl font-bold">
              {domainTypeDistribution.find((d) => d.category.includes("Low"))?.total || 0}%
            </p>
            <p className="text-xs text-muted-foreground">Tổng backlink từ domain ít uy tín</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={drFilter} onValueChange={setDrFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả domain</SelectItem>
                <SelectItem value="high">High Authority (DR≥30)</SelectItem>
                <SelectItem value="low">Low Authority (DR&lt;30)</SelectItem>
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

      {/* Domain Backlinks Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh Sách Backlink Từ Domain Uy Tín
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Dofollow</TableHead>
                <TableHead>Nofollow</TableHead>
                <TableHead>Tổng</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Loại</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDomains.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy domain nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedDomains.map((domain, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      domain.category === "low-authority" ? "bg-yellow-50/50 dark:bg-yellow-950/20" : ""
                    }`}
                  >
                    <TableCell className="font-medium">{domain.domain}</TableCell>
                    <TableCell>
                      <Badge variant={domain.dr > 50 ? "default" : "secondary"}>{domain.dr}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{domain.dofollow}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500">{domain.nofollow}</Badge>
                    </TableCell>
                    <TableCell>{domain.total}</TableCell>
                    <TableCell>
                      {domain.traffic >= 1000000
                        ? `${(domain.traffic / 1000000).toFixed(1)}M`
                        : domain.traffic >= 1000
                        ? `${(domain.traffic / 1000).toFixed(1)}K`
                        : domain.traffic.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {domain.category === "high-authority" ? (
                        <Badge className="bg-green-500">
                          <Shield className="h-3 w-3 mr-1" />
                          High Authority
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          Low Authority
                        </Badge>
                      )}
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

