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
import { AlertTriangle, ExternalLink } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AnchorTextDistribution {
  type: string;
  yourWebsite: number;
  competitor1: number;
  competitor2: number;
  competitor3: number;
  competitor4: number;
  competitor5: number;
  competitor6: number;
  competitor7: number;
  competitor8: number;
  competitor9: number;
  competitor10: number;
}

interface BacklinkWithAnchor {
  url: string;
  anchorText: string;
  anchorType: "branded" | "generic" | "exact-match" | "partial-match" | "naked-url";
  domain: string;
  dr: number;
  ownedBy: "you" | "competitor1" | "competitor2" | "competitor3" | "competitor4" | "competitor5" | "competitor6" | "competitor7" | "competitor8" | "competitor9" | "competitor10" | "shared";
}

export function AnchorTextComparison() {
  const [anchorFilter, setAnchorFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Anchor Text Distribution Data
  const anchorDistribution: AnchorTextDistribution[] = [
    { type: "Branded", yourWebsite: 45, competitor1: 50, competitor2: 48, competitor3: 52, competitor4: 49, competitor5: 51, competitor6: 47, competitor7: 53, competitor8: 48, competitor9: 50, competitor10: 46 },
    { type: "Generic", yourWebsite: 25, competitor1: 20, competitor2: 22, competitor3: 18, competitor4: 21, competitor5: 19, competitor6: 23, competitor7: 17, competitor8: 20, competitor9: 22, competitor10: 24 },
    { type: "Exact-match", yourWebsite: 8, competitor1: 5, competitor2: 6, competitor3: 4, competitor4: 5, competitor5: 6, competitor6: 4, competitor7: 5, competitor8: 6, competitor9: 4, competitor10: 5 },
    { type: "Partial-match", yourWebsite: 15, competitor1: 18, competitor2: 17, competitor3: 20, competitor4: 19, competitor5: 18, competitor6: 16, competitor7: 19, competitor8: 17, competitor9: 18, competitor10: 19 },
    { type: "Naked URL", yourWebsite: 7, competitor1: 7, competitor2: 7, competitor3: 6, competitor4: 6, competitor5: 6, competitor6: 10, competitor7: 6, competitor8: 9, competitor9: 6, competitor10: 6 },
  ];

  // Backlinks with Anchor Text
  const backlinksWithAnchor: BacklinkWithAnchor[] = [
    {
      url: "https://tech-news.com/article",
      anchorText: "Best SEO Tool",
      anchorType: "exact-match",
      domain: "tech-news.com",
      dr: 68,
      ownedBy: "you",
    },
    {
      url: "https://blog.com/review",
      anchorText: "Click here",
      anchorType: "generic",
      domain: "blog.com",
      dr: 45,
      ownedBy: "competitor1",
    },
    {
      url: "https://news.com/article",
      anchorText: "BrandName",
      anchorType: "branded",
      domain: "news.com",
      dr: 75,
      ownedBy: "shared",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = backlinksWithAnchor.filter((link) => {
    if (anchorFilter === "all") return true;
    return link.anchorType === anchorFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const yourExactMatch = anchorDistribution.find((a) => a.type === "Exact-match")?.yourWebsite || 0;
  const exactMatchData = anchorDistribution.find((a) => a.type === "Exact-match");
  const avgCompetitorExactMatch = exactMatchData
    ? (exactMatchData.competitor1 + exactMatchData.competitor2 + exactMatchData.competitor3 + exactMatchData.competitor4 + exactMatchData.competitor5 + exactMatchData.competitor6 + exactMatchData.competitor7 + exactMatchData.competitor8 + exactMatchData.competitor9 + exactMatchData.competitor10) / 10
    : 0;
  const isWarning = yourExactMatch > 10 || yourExactMatch > avgCompetitorExactMatch * 1.5;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
    "hsl(var(--muted))",
  ];

  const getAnchorBadge = (type: string) => {
    switch (type) {
      case "branded":
        return <Badge className="bg-blue-500">Branded</Badge>;
      case "generic":
        return <Badge className="bg-green-500">Generic</Badge>;
      case "exact-match":
        return <Badge className="bg-red-500">Exact-match</Badge>;
      case "partial-match":
        return <Badge className="bg-yellow-500">Partial-match</Badge>;
      case "naked-url":
        return <Badge className="bg-purple-500">Naked URL</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getOwnedByBadge = (ownedBy: string) => {
    switch (ownedBy) {
      case "you":
        return <Badge className="bg-green-500">Bạn có</Badge>;
      case "competitor1":
        return <Badge className="bg-red-500">Đối thủ 1</Badge>;
      case "competitor2":
        return <Badge className="bg-orange-500">Đối thủ 2</Badge>;
      case "competitor3":
        return <Badge className="bg-yellow-500">Đối thủ 3</Badge>;
      case "competitor4":
        return <Badge className="bg-purple-500">Đối thủ 4</Badge>;
      case "competitor5":
        return <Badge className="bg-pink-500">Đối thủ 5</Badge>;
      case "competitor6":
        return <Badge className="bg-indigo-500">Đối thủ 6</Badge>;
      case "competitor7":
        return <Badge className="bg-teal-500">Đối thủ 7</Badge>;
      case "competitor8":
        return <Badge className="bg-cyan-500">Đối thủ 8</Badge>;
      case "competitor9":
        return <Badge className="bg-amber-500">Đối thủ 9</Badge>;
      case "competitor10":
        return <Badge className="bg-lime-500">Đối thủ 10</Badge>;
      case "shared":
        return <Badge className="bg-blue-500">Chung</Badge>;
      default:
        return <Badge variant="outline">{ownedBy}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tỷ lệ anchor exact-match của website ({yourExactMatch}%) quá cao
            so với đối thủ (trung bình {avgCompetitorExactMatch.toFixed(1)}%). Điều này có thể bị
            Google đánh giá là tối ưu hóa quá mức. Khuyến nghị: Giảm tỷ lệ exact-match và tăng tỷ
            lệ branded/generic anchor để duy trì sự tự nhiên trong hồ sơ backlink.
          </AlertDescription>
        </Alert>
      )}

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Phân Bổ Anchor Text
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={anchorDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="type"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                domain={[0, 60]}
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
              <Bar dataKey="yourWebsite" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Website của bạn" />
              <Bar dataKey="competitor1" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} name="Đối thủ 1" />
              <Bar dataKey="competitor2" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} name="Đối thủ 2" />
              <Bar dataKey="competitor3" fill="hsl(var(--warning))" radius={[8, 8, 0, 0]} name="Đối thủ 3" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân Bổ Anchor Text - Website của bạn
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={anchorDistribution.map((a) => ({ name: a.type, value: a.yourWebsite }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {anchorDistribution.map((entry, index) => (
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {anchorDistribution.map((item, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{item.type}</p>
              <p className="text-2xl font-bold">{item.yourWebsite}%</p>
              <p className="text-xs text-muted-foreground">
                Avg đối thủ:{" "}
                {((item.competitor1 + item.competitor2 + item.competitor3 + item.competitor4 + item.competitor5 + item.competitor6 + item.competitor7 + item.competitor8 + item.competitor9 + item.competitor10) / 10).toFixed(1)}%
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={anchorFilter} onValueChange={setAnchorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại anchor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="branded">Branded</SelectItem>
                <SelectItem value="generic">Generic</SelectItem>
                <SelectItem value="exact-match">Exact-match</SelectItem>
                <SelectItem value="partial-match">Partial-match</SelectItem>
                <SelectItem value="naked-url">Naked URL</SelectItem>
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
          Danh Sách Backlink với Anchor Text
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Anchor Text</TableHead>
                <TableHead>Loại Anchor</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Sở hữu</TableHead>
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
                    <TableCell className="font-medium">{link.anchorText}</TableCell>
                    <TableCell>{getAnchorBadge(link.anchorType)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{link.domain}</TableCell>
                    <TableCell>
                      <Badge variant={link.dr > 50 ? "default" : "secondary"}>{link.dr}</Badge>
                    </TableCell>
                    <TableCell>{getOwnedByBadge(link.ownedBy)}</TableCell>
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

