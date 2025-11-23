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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ExternalLink, TrendingDown, TrendingUp } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DomainSource {
  domain: string;
  dr: number;
  backlinks: number;
  ownedBy: "you" | "competitor1" | "competitor2" | "competitor3" | "competitor4" | "competitor5" | "competitor6" | "competitor7" | "competitor8" | "competitor9" | "competitor10" | "shared";
  traffic: number;
}

export function BacklinkRDComparison() {
  const [drFilter, setDrFilter] = useState<string>("all");
  const [ownedByFilter, setOwnedByFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Comparison data
  const comparisonData = [
    {
      name: "Website của bạn",
      backlinks: 1850,
      referringDomains: 250,
      highDRBacklinks: 680,
    },
    {
      name: "Đối thủ 1",
      backlinks: 3200,
      referringDomains: 420,
      highDRBacklinks: 1280,
    },
    {
      name: "Đối thủ 2",
      backlinks: 2800,
      referringDomains: 380,
      highDRBacklinks: 1120,
    },
    {
      name: "Đối thủ 3",
      backlinks: 2400,
      referringDomains: 320,
      highDRBacklinks: 960,
    },
    {
      name: "Đối thủ 4",
      backlinks: 2600,
      referringDomains: 340,
      highDRBacklinks: 1040,
    },
    {
      name: "Đối thủ 5",
      backlinks: 3000,
      referringDomains: 400,
      highDRBacklinks: 1200,
    },
    {
      name: "Đối thủ 6",
      backlinks: 2750,
      referringDomains: 365,
      highDRBacklinks: 1100,
    },
    {
      name: "Đối thủ 7",
      backlinks: 2550,
      referringDomains: 335,
      highDRBacklinks: 1020,
    },
    {
      name: "Đối thủ 8",
      backlinks: 2900,
      referringDomains: 390,
      highDRBacklinks: 1160,
    },
    {
      name: "Đối thủ 9",
      backlinks: 2650,
      referringDomains: 355,
      highDRBacklinks: 1060,
    },
    {
      name: "Đối thủ 10",
      backlinks: 2500,
      referringDomains: 330,
      highDRBacklinks: 1000,
    },
  ];

  // Domain sources data
  const domainSources: DomainSource[] = [
    {
      domain: "tech-news-portal.com",
      dr: 68,
      backlinks: 12,
      ownedBy: "shared",
      traffic: 450000,
    },
    {
      domain: "competitor1-exclusive.com",
      dr: 75,
      backlinks: 8,
      ownedBy: "competitor1",
      traffic: 320000,
    },
    {
      domain: "industry-blog.com",
      dr: 55,
      backlinks: 15,
      ownedBy: "you",
      traffic: 280000,
    },
    {
      domain: "competitor2-exclusive.com",
      dr: 62,
      backlinks: 10,
      ownedBy: "competitor2",
      traffic: 210000,
    },
    {
      domain: "shared-domain.com",
      dr: 80,
      backlinks: 20,
      ownedBy: "shared",
      traffic: 500000,
    },
  ];

  // Filter domains
  const filteredDomains = domainSources.filter((domain) => {
    if (drFilter === "high" && domain.dr < 30) return false;
    if (drFilter === "low" && domain.dr >= 30) return false;
    if (ownedByFilter !== "all" && domain.ownedBy !== ownedByFilter) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDomains.length / pageSize);
  const paginatedDomains = filteredDomains.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const yourBacklinks = comparisonData[0].backlinks;
  const competitors = comparisonData.slice(1);
  const avgCompetitorBacklinks = competitors.reduce((sum, c) => sum + c.backlinks, 0) / competitors.length;
  const yourRD = comparisonData[0].referringDomains;
  const avgCompetitorRD = competitors.reduce((sum, c) => sum + c.referringDomains, 0) / competitors.length;
  const backlinkGap = avgCompetitorBacklinks - yourBacklinks;
  const rdGap = avgCompetitorRD - yourRD;
  const isWarning = backlinkGap > 500 || rdGap > 50;

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
            <strong>Cảnh báo:</strong> Số lượng backlink hoặc referring domains của website thấp hơn
            đối thủ đáng kể. Website của bạn thiếu khoảng {Math.round(backlinkGap)} backlinks và{" "}
            {Math.round(rdGap)} referring domains so với trung bình đối thủ. Khuyến nghị: Tăng cường
            xây dựng backlink và mở rộng referring domains.
          </AlertDescription>
        </Alert>
      )}

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Số Lượng Backlinks
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Bar dataKey="backlinks" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Referring Domains
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Bar dataKey="referringDomains" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Backlinks của bạn</p>
            <p className="text-2xl font-bold">{yourBacklinks.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-xs">
              {backlinkGap > 0 ? (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">-{Math.round(backlinkGap)} vs đối thủ</span>
                </>
              ) : (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{Math.abs(Math.round(backlinkGap))} vs đối thủ</span>
                </>
              )}
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">RD của bạn</p>
            <p className="text-2xl font-bold">{yourRD.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-xs">
              {rdGap > 0 ? (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">-{Math.round(rdGap)} vs đối thủ</span>
                </>
              ) : (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{Math.abs(Math.round(rdGap))} vs đối thủ</span>
                </>
              )}
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">High DR Backlinks</p>
            <p className="text-2xl font-bold">{comparisonData[0].highDRBacklinks.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              {((comparisonData[0].highDRBacklinks / yourBacklinks) * 100).toFixed(1)}% tổng backlinks
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Avg Competitor</p>
            <p className="text-2xl font-bold">{Math.round(avgCompetitorBacklinks).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Backlinks</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={drFilter} onValueChange={setDrFilter}>
              <SelectTrigger>
                <SelectValue placeholder="DR Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả DR</SelectItem>
                <SelectItem value="high">DR ≥ 30</SelectItem>
                <SelectItem value="low">DR &lt; 30</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 min-w-[150px]">
            <Select value={ownedByFilter} onValueChange={setOwnedByFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Sở hữu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="you">Bạn có</SelectItem>
                <SelectItem value="competitor1">Đối thủ 1</SelectItem>
                <SelectItem value="competitor2">Đối thủ 2</SelectItem>
                <SelectItem value="competitor3">Đối thủ 3</SelectItem>
                <SelectItem value="competitor4">Đối thủ 4</SelectItem>
                <SelectItem value="competitor5">Đối thủ 5</SelectItem>
                <SelectItem value="competitor6">Đối thủ 6</SelectItem>
                <SelectItem value="competitor7">Đối thủ 7</SelectItem>
                <SelectItem value="competitor8">Đối thủ 8</SelectItem>
                <SelectItem value="competitor9">Đối thủ 9</SelectItem>
                <SelectItem value="competitor10">Đối thủ 10</SelectItem>
                <SelectItem value="shared">Chung</SelectItem>
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

      {/* Domain Sources Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh Sách Domain Nguồn Quan Trọng
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Backlinks</TableHead>
                <TableHead>Sở hữu</TableHead>
                <TableHead>Traffic</TableHead>
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
                    <TableCell className="font-medium">{domain.domain}</TableCell>
                    <TableCell>
                      <Badge variant={domain.dr > 50 ? "default" : "secondary"}>{domain.dr}</Badge>
                    </TableCell>
                    <TableCell>{domain.backlinks}</TableCell>
                    <TableCell>{getOwnedByBadge(domain.ownedBy)}</TableCell>
                    <TableCell>
                      {domain.traffic >= 1000000
                        ? `${(domain.traffic / 1000000).toFixed(1)}M`
                        : domain.traffic >= 1000
                        ? `${(domain.traffic / 1000).toFixed(1)}K`
                        : domain.traffic.toLocaleString()}
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

