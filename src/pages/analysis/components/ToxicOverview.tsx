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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Shield, CheckCircle, ExternalLink } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ToxicBacklink {
  sourceUrl: string;
  domain: string;
  toxicLevel: "toxic" | "low-risk" | "safe";
  dr: number;
  traffic: number;
  reason: string;
  category: string;
}

export function ToxicOverview() {
  const [selectedLink, setSelectedLink] = useState<ToxicBacklink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toxicFilter, setToxicFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Toxic Distribution
  const toxicDistribution = [
    { name: "Toxic", value: 8, count: 151, color: "hsl(var(--destructive))" },
    { name: "Low-risk", value: 12, count: 227, color: "hsl(var(--warning))" },
    { name: "Safe", value: 80, count: 1513, color: "hsl(var(--primary))" },
  ];

  // Backlinks Data
  const backlinks: ToxicBacklink[] = [
    {
      sourceUrl: "https://spam-casino.com/link",
      domain: "spam-casino.com",
      toxicLevel: "toxic",
      dr: 15,
      traffic: 500,
      reason: "Domain bị phạt hoặc có dấu hiệu spam",
      category: "Gambling/Spam",
    },
    {
      sourceUrl: "https://link-farm.net/article",
      domain: "link-farm.net",
      toxicLevel: "toxic",
      dr: 8,
      traffic: 200,
      reason: "Link farm - Website chỉ dùng để xây dựng backlink",
      category: "Link Farm",
    },
    {
      sourceUrl: "https://low-quality-blog.com/post",
      domain: "low-quality-blog.com",
      toxicLevel: "low-risk",
      dr: 25,
      traffic: 2000,
      reason: "Domain có mức độ uy tín thấp nhưng không phải spam",
      category: "Low Quality",
    },
    {
      sourceUrl: "https://authority-site.com/article",
      domain: "authority-site.com",
      toxicLevel: "safe",
      dr: 68,
      traffic: 45000,
      reason: "Domain uy tín, không có dấu hiệu độc hại",
      category: "Authority",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = backlinks.filter((link) => {
    if (toxicFilter === "all") return true;
    return link.toxicLevel === toxicFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toxicPercentage = toxicDistribution[0].value;
  const isWarning = toxicPercentage > 10;

  const COLORS = [
    "hsl(var(--destructive))",
    "hsl(var(--warning))",
    "hsl(var(--primary))",
  ];

  const getToxicBadge = (level: string) => {
    switch (level) {
      case "toxic":
        return <Badge variant="destructive">Toxic</Badge>;
      case "low-risk":
        return <Badge className="bg-yellow-500">Low-risk</Badge>;
      case "safe":
        return <Badge className="bg-green-500">Safe</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getToxicIcon = (level: string) => {
    switch (level) {
      case "toxic":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "low-risk":
        return <Shield className="h-4 w-4 text-yellow-500" />;
      case "safe":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleViewDetails = (link: ToxicBacklink) => {
    setSelectedLink(link);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân loại Backlink Độc Hại
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={toxicDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {toxicDistribution.map((entry, index) => (
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
            <BarChart data={toxicDistribution}>
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
            <strong>Cảnh báo:</strong> Tỷ lệ backlink độc hại là {toxicPercentage}%, vượt quá
            ngưỡng cho phép (10%). Điều này có thể ảnh hưởng nghiêm trọng đến thứ hạng SEO. Khuyến
            nghị: Loại bỏ hoặc disavow các backlink độc hại ngay lập tức để bảo vệ hồ sơ backlink
            của website.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {toxicDistribution.map((item, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getToxicIcon(item.name.toLowerCase().includes("toxic") ? "toxic" : item.name.toLowerCase().includes("low") ? "low-risk" : "safe")}
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
            <Select value={toxicFilter} onValueChange={setToxicFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Mức độ độc hại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="toxic">Toxic</SelectItem>
                <SelectItem value="low-risk">Low-risk</SelectItem>
                <SelectItem value="safe">Safe</SelectItem>
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
          Danh sách Backlink Độc Hại
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mức độ</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Lý do</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBacklinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBacklinks.map((link, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      link.toxicLevel === "toxic" ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getToxicIcon(link.toxicLevel)}
                        {getToxicBadge(link.toxicLevel)}
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
                      <Badge variant="outline">{link.category}</Badge>
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

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Chi tiết Backlink Độc Hại
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về backlink độc hại và khuyến nghị xử lý
            </DialogDescription>
          </DialogHeader>
          {selectedLink && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Domain</p>
                  <p className="font-medium">{selectedLink.domain}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">DR</p>
                  <p className="font-medium">{selectedLink.dr}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mức độ</p>
                  {getToxicBadge(selectedLink.toxicLevel)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{selectedLink.category}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Lý do</p>
                <p className="text-sm">{selectedLink.reason}</p>
              </div>
              {selectedLink.toxicLevel === "toxic" && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Khuyến nghị:</strong> Backlink này có mức độ độc hại cao. Nên loại bỏ
                    hoặc disavow ngay lập tức để bảo vệ hồ sơ backlink của website.
                  </AlertDescription>
                </Alert>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Đóng
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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

