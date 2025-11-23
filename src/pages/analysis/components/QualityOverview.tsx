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
import { AlertCircle, ExternalLink, Shield } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface HighQualityDomain {
  domain: string;
  dr: number;
  backlinks: number;
  traffic: number;
  category: string;
}

export function QualityOverview() {
  const [drFilter, setDrFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // DR Distribution Data
  const drDistribution = [
    { range: "DR > 30", count: 45, percentage: 18, color: "#3b82f6" },
    { range: "DR ≤ 30", count: 205, percentage: 82, color: "#f59e0b" },
  ];

  const drDetailedDistribution = [
    { range: "0-10", count: 85, percentage: 34 },
    { range: "10-20", count: 65, percentage: 26 },
    { range: "20-30", count: 55, percentage: 22 },
    { range: "30-50", count: 35, percentage: 14 },
    { range: "50+", count: 10, percentage: 4 },
  ];

  // High Quality Domains
  const highQualityDomains: HighQualityDomain[] = [
    {
      domain: "techcrunch.com",
      dr: 92,
      backlinks: 3,
      traffic: 45000000,
      category: "Báo/Media",
    },
    {
      domain: "forbes.com",
      dr: 94,
      backlinks: 2,
      traffic: 150000000,
      category: "Báo/Media",
    },
    {
      domain: "medium.com",
      dr: 96,
      backlinks: 12,
      traffic: 180000000,
      category: "Blog Platform",
    },
    {
      domain: "wired.com",
      dr: 88,
      backlinks: 1,
      traffic: 25000000,
      category: "Báo/Media",
    },
    {
      domain: "theverge.com",
      dr: 85,
      backlinks: 2,
      traffic: 18000000,
      category: "Báo/Media",
    },
    {
      domain: "mashable.com",
      dr: 82,
      backlinks: 4,
      traffic: 12000000,
      category: "Báo/Media",
    },
    {
      domain: "engadget.com",
      dr: 80,
      backlinks: 1,
      traffic: 8000000,
      category: "Báo/Media",
    },
    {
      domain: "arstechnica.com",
      dr: 78,
      backlinks: 3,
      traffic: 6000000,
      category: "Báo/Media",
    },
  ];

  // Filter domains
  const filteredDomains = highQualityDomains.filter((domain) => {
    if (drFilter === "high" && domain.dr <= 30) return false;
    if (drFilter === "low" && domain.dr > 30) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDomains.length / pageSize);
  const paginatedDomains = filteredDomains.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const lowDrPercentage = drDistribution[1].percentage;
  const isWarning = lowDrPercentage > 70;

  const COLORS = ["#3b82f6", "#f59e0b"]; // Blue and Orange - không dùng trắng/xám

  return (
    <div className="space-y-6">
      {/* Quality Overview Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân bố Backlink theo DR
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={drDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ range, percentage }) => `${range}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {drDistribution.map((entry, index) => (
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
                  `${value} backlink (${props.payload.percentage}%)`,
                  props.payload.range,
                ]}
              />
              <Legend 
                formatter={(value) => {
                  const entry = drDistribution.find(d => d.range === value);
                  return entry ? `${value}: ${entry.percentage}%` : value;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân bố chi tiết theo DR Range
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={drDetailedDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="range"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                label={{ value: "Khoảng DR", position: "insideBottom", offset: -5 }}
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
                  `${value} backlink (${props.payload.percentage}%)`,
                  "Số lượng",
                ]}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Tỷ lệ backlink từ các domain có DR thấp (≤30) là{" "}
            {lowDrPercentage}%, vượt quá ngưỡng an toàn (70%). Điều này có thể ảnh hưởng xấu đến
            hồ sơ SEO. Gợi ý: Tăng tỷ lệ link từ các domain có DR trên 30, đặc biệt là các domain
            có DR 30-70 và traffic thực tế &gt; 5K/tháng.
          </AlertDescription>
        </Alert>
      )}

      {/* High Quality Domains List */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Danh sách Backlink từ Domain Uy Tín (DR &gt; 30)
          </h3>
          <div className="flex items-center gap-2">
            <Select value={drFilter} onValueChange={setDrFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="high">DR &gt; 30</SelectItem>
                <SelectItem value="low">DR ≤ 30</SelectItem>
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
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Backlinks</TableHead>
                <TableHead>Traffic / tháng</TableHead>
                <TableHead>Danh mục</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDomains.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy domain nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedDomains.map((domain, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>{domain.domain}</span>
                        <a
                          href={`https://${domain.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={domain.dr > 50 ? "default" : "secondary"}
                        className={domain.dr > 50 ? "bg-green-500" : ""}
                      >
                        {domain.dr}
                      </Badge>
                    </TableCell>
                    <TableCell>{domain.backlinks}</TableCell>
                    <TableCell>
                      {domain.traffic >= 1000000
                        ? `${(domain.traffic / 1000000).toFixed(1)}M`
                        : domain.traffic >= 1000
                        ? `${(domain.traffic / 1000).toFixed(1)}K`
                        : domain.traffic.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{domain.category}</Badge>
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

