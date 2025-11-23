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
import { AlertTriangle, Shield, ExternalLink, Calendar } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface StabilityBacklink {
  sourceUrl: string;
  domain: string;
  stability: "stable" | "unstable";
  stabilityScore: number;
  dr: number;
  traffic: number;
  age: string;
  riskFactors: string[];
  reason: string;
}

export function BacklinkStability() {
  const [stabilityFilter, setStabilityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Stability Distribution
  const stabilityDistribution = [
    { name: "Ổn định", value: 68, count: 1287, color: "hsl(var(--primary))" },
    { name: "Không ổn định", value: 32, count: 606, color: "hsl(var(--destructive))" },
  ];

  // Backlinks Data
  const backlinks: StabilityBacklink[] = [
    {
      sourceUrl: "https://stable-blog.com/article",
      domain: "stable-blog.com",
      stability: "stable",
      stabilityScore: 95,
      dr: 68,
      traffic: 45000,
      age: "18 tháng",
      riskFactors: [],
      reason: "Backlink ổn định, tồn tại lâu dài",
    },
    {
      sourceUrl: "https://unstable-site.com/post",
      domain: "unstable-site.com",
      stability: "unstable",
      stabilityScore: 35,
      dr: 28,
      traffic: 5000,
      age: "2 tháng",
      riskFactors: ["Trang nguồn có thể bị xóa", "Website không ổn định"],
      reason: "Trang nguồn có dấu hiệu không ổn định, có thể bị Google de-index",
    },
    {
      sourceUrl: "https://news-site.com/article",
      domain: "news-site.com",
      stability: "stable",
      stabilityScore: 88,
      dr: 72,
      traffic: 120000,
      age: "12 tháng",
      riskFactors: [],
      reason: "Backlink từ domain uy tín, ổn định",
    },
    {
      sourceUrl: "https://temp-blog.com/post",
      domain: "temp-blog.com",
      stability: "unstable",
      stabilityScore: 25,
      dr: 35,
      traffic: 8000,
      age: "1 tháng",
      riskFactors: ["Website mới", "Chưa được index", "Có thể bị xóa"],
      reason: "Website mới, chưa ổn định, có nguy cơ mất backlink",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = backlinks.filter((link) => {
    if (stabilityFilter === "all") return true;
    return link.stability === stabilityFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const unstablePercentage = stabilityDistribution[1].value;
  const isWarning = unstablePercentage > 40;

  const COLORS = ["hsl(var(--primary))", "hsl(var(--destructive))"];

  const getStabilityBadge = (stability: string) => {
    switch (stability) {
      case "stable":
        return <Badge className="bg-green-500">Ổn định</Badge>;
      case "unstable":
        return <Badge variant="destructive">Không ổn định</Badge>;
      default:
        return <Badge variant="outline">{stability}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân bố Độ Ổn Định Backlink
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stabilityDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stabilityDistribution.map((entry, index) => (
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
            <BarChart data={stabilityDistribution}>
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
            <strong>Cảnh báo:</strong> Tỷ lệ backlink không ổn định là {unstablePercentage}%, quá
            cao (ngưỡng an toàn: &lt;40%). Điều này có thể ảnh hưởng đến hiệu quả SEO dài hạn.
            Gợi ý: Cải thiện chiến lược backlink, tập trung vào các nguồn ổn định và lâu dài, tránh
            các backlink từ các website không ổn định hoặc có nguy cơ bị xóa.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stabilityDistribution.map((item, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">{item.name}</p>
              </div>
              <p className="text-2xl font-bold">{item.value}%</p>
              <p className="text-xs text-muted-foreground">
                {item.count} backlinks
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={stabilityFilter} onValueChange={setStabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Độ ổn định" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="stable">Ổn định</SelectItem>
                <SelectItem value="unstable">Không ổn định</SelectItem>
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
          Danh sách Backlink Không Ổn Định
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Độ ổn định</TableHead>
                <TableHead>Điểm ổn định</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Tuổi đời</TableHead>
                <TableHead>Yếu tố rủi ro</TableHead>
                <TableHead>Lý do</TableHead>
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
                paginatedBacklinks.map((link, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      link.stability === "unstable" ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
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
                    <TableCell>{getStabilityBadge(link.stability)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          link.stabilityScore >= 70
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                        }
                      >
                        {link.stabilityScore}/100
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={link.dr > 50 ? "default" : "secondary"}>
                        {link.dr}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{link.age}</Badge>
                    </TableCell>
                    <TableCell>
                      {link.riskFactors.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {link.riskFactors.map((factor, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {link.reason}
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

