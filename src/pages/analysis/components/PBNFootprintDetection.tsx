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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Network, ExternalLink, Shield } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PBNBacklink {
  sourceUrl: string;
  domain: string;
  cluster: string;
  sharedIP: string;
  sharedGA?: string;
  sharedWhois?: string;
  footprint: string[];
  dr: number;
  risk: "high" | "medium" | "low";
}

export function PBNFootprintDetection() {
  const [clusterFilter, setClusterFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // PBN Clusters
  const pbnClusters = [
    {
      cluster: "Cluster #1",
      domains: 8,
      sharedIP: "185.xxx.xxx.1",
      sharedGA: "UA-12345-*",
      sharedWhois: "Same registrar",
      risk: "high" as const,
    },
    {
      cluster: "Cluster #2",
      domains: 5,
      sharedIP: "192.xxx.xxx.5",
      sharedGA: "UA-67890-*",
      risk: "high" as const,
    },
    {
      cluster: "Cluster #3",
      domains: 3,
      sharedIP: "Various",
      sharedGA: "UA-11111-*",
      risk: "medium" as const,
    },
  ];

  // PBN Backlinks Data
  const pbnBacklinks: PBNBacklink[] = [
    {
      sourceUrl: "https://pbn-site1.com/article",
      domain: "pbn-site1.com",
      cluster: "Cluster #1",
      sharedIP: "185.xxx.xxx.1",
      sharedGA: "UA-12345-*",
      footprint: ["Trùng IP Class-C", "Trùng GA ID"],
      dr: 35,
      risk: "high",
    },
    {
      sourceUrl: "https://pbn-site2.com/post",
      domain: "pbn-site2.com",
      cluster: "Cluster #1",
      sharedIP: "185.xxx.xxx.1",
      sharedGA: "UA-12345-*",
      sharedWhois: "Same registrar",
      footprint: ["Trùng IP Class-C", "Trùng GA ID", "Trùng WHOIS"],
      dr: 28,
      risk: "high",
    },
    {
      sourceUrl: "https://pbn-site3.com/article",
      domain: "pbn-site3.com",
      cluster: "Cluster #2",
      sharedIP: "192.xxx.xxx.5",
      sharedGA: "UA-67890-*",
      footprint: ["Trùng IP Class-C", "Trùng GA ID"],
      dr: 42,
      risk: "high",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = pbnBacklinks.filter((link) => {
    if (clusterFilter === "all") return true;
    return link.cluster === clusterFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const highRiskCount = pbnBacklinks.filter((l) => l.risk === "high").length;
  const isWarning = highRiskCount > 0;

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Phát hiện {highRiskCount} backlink có dấu hiệu footprint
            PBN (Private Blog Network). PBN là hình thức thao túng SEO mà Google rất cảnh giác.
            Khuyến nghị: Xem xét loại bỏ hoặc disavow các backlink từ PBN để tránh bị Google phạt.
          </AlertDescription>
        </Alert>
      )}

      {/* PBN Clusters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pbnClusters.map((cluster, idx) => (
          <Card key={idx} className="p-4 bg-surface shadow-soft border-red-500/20">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Network className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">{cluster.cluster}</p>
                </div>
                <Badge variant="destructive">{cluster.risk}</Badge>
              </div>
              <p className="text-2xl font-bold">{cluster.domains} domains</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Shared IP: {cluster.sharedIP}</p>
                {cluster.sharedGA && <p>• Shared GA: {cluster.sharedGA}</p>}
                {cluster.sharedWhois && <p>• Shared WHOIS: {cluster.sharedWhois}</p>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng PBN Backlinks</p>
            <p className="text-2xl font-bold">{pbnBacklinks.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">High Risk</p>
            <p className="text-2xl font-bold text-red-500">{highRiskCount}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">PBN Clusters</p>
            <p className="text-2xl font-bold">{pbnClusters.length}</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={clusterFilter} onValueChange={setClusterFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Cluster" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả clusters</SelectItem>
                {pbnClusters.map((cluster) => (
                  <SelectItem key={cluster.cluster} value={cluster.cluster}>
                    {cluster.cluster}
                  </SelectItem>
                ))}
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

      {/* PBN Backlinks Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh sách Backlink Từ PBN
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cluster</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Shared IP</TableHead>
                <TableHead>Footprint</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBacklinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink PBN nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBacklinks.map((link, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      link.risk === "high" ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <TableCell>
                      <Badge variant="outline">{link.cluster}</Badge>
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
                    <TableCell className="text-sm text-muted-foreground">
                      {link.sharedIP}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {link.footprint.map((fp, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {fp}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={link.dr > 50 ? "default" : "secondary"}>
                        {link.dr}
                      </Badge>
                    </TableCell>
                    <TableCell>{getRiskBadge(link.risk)}</TableCell>
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

