import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, ExternalLink, Shield, Activity, CheckCircle, XCircle, Filter } from "lucide-react";
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
  traffic: number;
  backlinks: number;
  linkType: "contextual" | "profile" | "comment" | "other";
  indexStatus: "indexed" | "deindexed" | "unknown";
  category: string;
  quality: "high" | "medium" | "low";
}

export function DomainAnalysis() {
  const [searchTerm, setSearchTerm] = useState("");
  const [drRange, setDrRange] = useState([0, 100]);
  const [trafficRange, setTrafficRange] = useState([0, 100000000]);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [qualityFilter, setQualityFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortBy, setSortBy] = useState<{ field: string; direction: "asc" | "desc" }>({
    field: "dr",
    direction: "desc",
  });

  // Domain Sources Data
  const domainSources: DomainSource[] = [
    {
      domain: "techcrunch.com",
      dr: 92,
      traffic: 45000000,
      backlinks: 3,
      linkType: "contextual",
      indexStatus: "indexed",
      category: "Báo/Media",
      quality: "high",
    },
    {
      domain: "forbes.com",
      dr: 94,
      traffic: 150000000,
      backlinks: 2,
      linkType: "contextual",
      indexStatus: "indexed",
      category: "Báo/Media",
      quality: "high",
    },
    {
      domain: "medium.com",
      dr: 96,
      traffic: 180000000,
      backlinks: 12,
      linkType: "contextual",
      indexStatus: "indexed",
      category: "Blog Platform",
      quality: "high",
    },
    {
      domain: "forum.example.com",
      dr: 25,
      traffic: 5000,
      backlinks: 8,
      linkType: "profile",
      indexStatus: "indexed",
      category: "Forum",
      quality: "low",
    },
    {
      domain: "blog.example.com",
      dr: 35,
      traffic: 12000,
      backlinks: 5,
      linkType: "comment",
      indexStatus: "indexed",
      category: "Blog",
      quality: "medium",
    },
    {
      domain: "spammy-site.xyz",
      dr: 5,
      traffic: 0,
      backlinks: 15,
      linkType: "other",
      indexStatus: "deindexed",
      category: "Unknown",
      quality: "low",
    },
  ];

  // Filter domains
  const filteredDomains = domainSources.filter((domain) => {
    if (searchTerm && !domain.domain.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (domain.dr < drRange[0] || domain.dr > drRange[1]) {
      return false;
    }
    if (domain.traffic < trafficRange[0] || domain.traffic > trafficRange[1]) {
      return false;
    }
    if (typeFilter !== "all" && domain.linkType !== typeFilter) {
      return false;
    }
    if (qualityFilter !== "all" && domain.quality !== qualityFilter) {
      return false;
    }
    return true;
  });

  // Sort domains
  const sortedDomains = [...filteredDomains].sort((a, b) => {
    let aVal: any = a[sortBy.field as keyof DomainSource];
    let bVal: any = b[sortBy.field as keyof DomainSource];

    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (sortBy.direction === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedDomains.length / pageSize);
  const paginatedDomains = sortedDomains.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case "high":
        return <Badge className="bg-green-500">Cao</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Trung bình</Badge>;
      case "low":
        return <Badge variant="destructive">Thấp</Badge>;
      default:
        return <Badge variant="outline">{quality}</Badge>;
    }
  };

  const getIndexStatusIcon = (status: string) => {
    switch (status) {
      case "indexed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "deindexed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLinkTypeBadge = (type: string) => {
    switch (type) {
      case "contextual":
        return <Badge className="bg-blue-500">Content</Badge>;
      case "profile":
        return <Badge className="bg-yellow-500">Profile</Badge>;
      case "comment":
        return <Badge className="bg-orange-500">Comment</Badge>;
      default:
        return <Badge variant="outline">Khác</Badge>;
    }
  };

  const handleSort = (field: string) => {
    setSortBy({
      field,
      direction: sortBy.field === field && sortBy.direction === "desc" ? "asc" : "desc",
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 space-y-2">
              <Label className="text-sm">Tìm kiếm domain</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="domain.com"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Filter Toggle Button */}
            <div className="flex items-end">
              <Button
                variant="outline"
                size="default"
                onClick={() => setShowFilters(!showFilters)}
                className="h-10"
              >
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc
              </Button>
            </div>
          </div>

          {/* Collapsible Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              {/* DR Range */}
              <div className="space-y-2">
                <Label className="text-sm">DR Range: {drRange[0]} - {drRange[1]}</Label>
                <Slider
                  value={drRange}
                  onValueChange={setDrRange}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <Label className="text-sm">Loại backlink</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="contextual">Content</SelectItem>
                    <SelectItem value="profile">Profile</SelectItem>
                    <SelectItem value="comment">Comment</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quality Filter */}
              <div className="space-y-2">
                <Label className="text-sm">Chất lượng</Label>
                <Select value={qualityFilter} onValueChange={setQualityFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="high">Cao</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="low">Thấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Hiển thị {paginatedDomains.length} / {filteredDomains.length} domain
        </p>
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

      {/* Domains Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Phân tích các Domain Tạo Backlink
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("domain")}
                >
                  Domain
                  {sortBy.field === "domain" && (
                    <span className="ml-1">{sortBy.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("dr")}
                >
                  DR
                  {sortBy.field === "dr" && (
                    <span className="ml-1">{sortBy.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("traffic")}
                >
                  Traffic / tháng
                  {sortBy.field === "traffic" && (
                    <span className="ml-1">{sortBy.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("backlinks")}
                >
                  Backlinks
                  {sortBy.field === "backlinks" && (
                    <span className="ml-1">{sortBy.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead>Loại backlink</TableHead>
                <TableHead>Trạng thái Index</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Chất lượng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDomains.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy domain nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedDomains.map((domain, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
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
                      <Badge variant={domain.dr > 50 ? "default" : "secondary"}>
                        {domain.dr}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {domain.traffic >= 1000000
                        ? `${(domain.traffic / 1000000).toFixed(1)}M`
                        : domain.traffic >= 1000
                        ? `${(domain.traffic / 1000).toFixed(1)}K`
                        : domain.traffic.toLocaleString()}
                    </TableCell>
                    <TableCell>{domain.backlinks}</TableCell>
                    <TableCell>{getLinkTypeBadge(domain.linkType)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getIndexStatusIcon(domain.indexStatus)}
                        <span className="text-sm">
                          {domain.indexStatus === "indexed" ? "Đã index" : 
                           domain.indexStatus === "deindexed" ? "Đã gỡ index" : "Không xác định"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{domain.category}</Badge>
                    </TableCell>
                    <TableCell>{getQualityBadge(domain.quality)}</TableCell>
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

