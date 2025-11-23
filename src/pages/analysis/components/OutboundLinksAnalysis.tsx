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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, ExternalLink, Shield, Ban } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface OutboundLinkDomain {
  domain: string;
  dr: number;
  traffic: number;
  totalOutboundLinks: number;
  spamOutboundLinks: number;
  spamPercentage: number;
  backlinks: number;
  outboundLinkTypes: {
    spam: number;
    gambling: number;
    adult: number;
    pharmaceutical: number;
    other: number;
  };
  status: "safe" | "warning" | "danger";
}

export function OutboundLinksAnalysis() {
  const [selectedDomain, setSelectedDomain] = useState<OutboundLinkDomain | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Outbound Links Summary
  const outboundSummary = [
    { name: "An toàn", value: 72, count: 1361, color: "hsl(var(--primary))" },
    { name: "Cảnh báo", value: 20, count: 379, color: "hsl(var(--warning))" },
    { name: "Nguy hiểm", value: 8, count: 151, color: "hsl(var(--destructive))" },
  ];

  // Domains Data
  const domains: OutboundLinkDomain[] = [
    {
      domain: "authority-blog.com",
      dr: 68,
      traffic: 45000,
      totalOutboundLinks: 150,
      spamOutboundLinks: 5,
      spamPercentage: 3.3,
      backlinks: 12,
      outboundLinkTypes: {
        spam: 2,
        gambling: 0,
        adult: 0,
        pharmaceutical: 1,
        other: 2,
      },
      status: "safe",
    },
    {
      domain: "tech-news-site.com",
      dr: 72,
      traffic: 120000,
      totalOutboundLinks: 200,
      spamOutboundLinks: 15,
      spamPercentage: 7.5,
      backlinks: 8,
      outboundLinkTypes: {
        spam: 8,
        gambling: 2,
        adult: 0,
        pharmaceutical: 3,
        other: 2,
      },
      status: "warning",
    },
    {
      domain: "low-quality-site.com",
      dr: 28,
      traffic: 5000,
      totalOutboundLinks: 80,
      spamOutboundLinks: 35,
      spamPercentage: 43.8,
      backlinks: 3,
      outboundLinkTypes: {
        spam: 15,
        gambling: 10,
        adult: 5,
        pharmaceutical: 3,
        other: 2,
      },
      status: "danger",
    },
    {
      domain: "directory-site.com",
      dr: 35,
      traffic: 8000,
      totalOutboundLinks: 120,
      spamOutboundLinks: 25,
      spamPercentage: 20.8,
      backlinks: 5,
      outboundLinkTypes: {
        spam: 12,
        gambling: 5,
        adult: 3,
        pharmaceutical: 2,
        other: 3,
      },
      status: "warning",
    },
  ];

  // Filter domains
  const filteredDomains = domains.filter((domain) => {
    if (statusFilter === "all") return true;
    return domain.status === statusFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDomains.length / pageSize);
  const paginatedDomains = filteredDomains.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const dangerCount = domains.filter((d) => d.status === "danger").length;
  const isWarning = dangerCount > 0 || domains.some((d) => d.spamPercentage > 30);

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--warning))",
    "hsl(var(--destructive))",
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "safe":
        return <Badge className="bg-green-500">An toàn</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500">Cảnh báo</Badge>;
      case "danger":
        return <Badge variant="destructive">Nguy hiểm</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewDetails = (domain: OutboundLinkDomain) => {
    setSelectedDomain(domain);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân bố Trạng thái Outbound Links
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={outboundSummary}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {outboundSummary.map((entry, index) => (
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
                  `${value}% (${props.payload.count} domains)`,
                  props.payload.name,
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Số lượng Domain theo Trạng thái
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={outboundSummary}>
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
                  `${props.payload.count} domains (${value}%)`,
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
            <strong>Cảnh báo:</strong> Phát hiện {dangerCount} domain có tỷ lệ outbound links không
            uy tín quá cao (spam, cờ bạc, thuốc giả). Những domain này có thể ảnh hưởng xấu đến độ
            tin cậy của backlink. Khuyến nghị: Không sử dụng các backlink từ những nguồn này, hoặc
            xem xét disavow nếu đã có backlink từ các domain này.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {outboundSummary.map((item, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-2xl font-bold">{item.value}%</p>
              <p className="text-xs text-muted-foreground">
                {item.count} domains
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="safe">An toàn</SelectItem>
                <SelectItem value="warning">Cảnh báo</SelectItem>
                <SelectItem value="danger">Nguy hiểm</SelectItem>
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

      {/* Domains Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Phân tích Outbound Links của Domain Nguồn
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Tổng Outbound Links</TableHead>
                <TableHead>Spam Links</TableHead>
                <TableHead>Tỷ lệ Spam</TableHead>
                <TableHead>Backlinks</TableHead>
                <TableHead>Trạng thái</TableHead>
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
                      domain.status === "danger" ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <TableCell className="font-medium">{domain.domain}</TableCell>
                    <TableCell>
                      <Badge variant={domain.dr > 50 ? "default" : "secondary"}>
                        {domain.dr}
                      </Badge>
                    </TableCell>
                    <TableCell>{domain.totalOutboundLinks}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{domain.spamOutboundLinks}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          domain.spamPercentage > 30
                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                            : domain.spamPercentage > 10
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            : "bg-green-500/10 text-green-500 border-green-500/20"
                        }
                      >
                        {domain.spamPercentage.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>{domain.backlinks}</TableCell>
                    <TableCell>{getStatusBadge(domain.status)}</TableCell>
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
              <Shield className="h-5 w-5 text-blue-500" />
              Chi tiết Outbound Links
            </DialogTitle>
            <DialogDescription>
              Phân tích chi tiết outbound links của domain nguồn
            </DialogDescription>
          </DialogHeader>
          {selectedDomain && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Domain</p>
                  <p className="font-medium">{selectedDomain.domain}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">DR</p>
                  <p className="font-medium">{selectedDomain.dr}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tổng Outbound Links</p>
                  <p className="font-medium">{selectedDomain.totalOutboundLinks}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Spam Links</p>
                  <p className="font-medium text-red-500">{selectedDomain.spamOutboundLinks}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tỷ lệ Spam</p>
                  <p className="font-medium">{selectedDomain.spamPercentage.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trạng thái</p>
                  {getStatusBadge(selectedDomain.status)}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Phân loại Outbound Links</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted p-2 rounded">
                    <p className="text-xs text-muted-foreground">Spam</p>
                    <p className="font-medium">{selectedDomain.outboundLinkTypes.spam}</p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="text-xs text-muted-foreground">Cờ bạc</p>
                    <p className="font-medium">{selectedDomain.outboundLinkTypes.gambling}</p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="text-xs text-muted-foreground">Adult</p>
                    <p className="font-medium">{selectedDomain.outboundLinkTypes.adult}</p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="text-xs text-muted-foreground">Pharmaceutical</p>
                    <p className="font-medium">{selectedDomain.outboundLinkTypes.pharmaceutical}</p>
                  </div>
                </div>
              </div>
              {selectedDomain.status === "danger" && (
                <Alert variant="destructive">
                  <Ban className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Khuyến nghị:</strong> Domain này có tỷ lệ outbound links không uy tín
                    quá cao. Không nên sử dụng backlink từ domain này. Nếu đã có backlink, nên xem
                    xét disavow.
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

