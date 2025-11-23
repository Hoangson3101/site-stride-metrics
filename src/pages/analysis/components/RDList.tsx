import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  MoreVertical, 
  ExternalLink, 
  AlertTriangle, 
  Star,
  Filter,
  Download
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RDDomain {
  domain: string;
  dr: number;
  traffic: number;
  backlinks: number;
  firstSeen: string;
  lastSeen: string;
  share: number;
  status: "active" | "new" | "lost";
  category: string;
  flags: {
    toxic?: boolean;
    pbn?: boolean;
    badNeighborhood?: boolean;
    starred?: boolean;
  };
}

interface RDListProps {
  onDomainClick?: (domain: string) => void;
}

export function RDList({ onDomainClick }: RDListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [drRange, setDrRange] = useState([0, 100]);
  const [trafficRange, setTrafficRange] = useState([0, 100000]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showTrafficOnly, setShowTrafficOnly] = useState(false);
  const [minBacklinks, setMinBacklinks] = useState(1);
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<{ field: string; direction: "asc" | "desc" }>({
    field: "backlinks",
    direction: "desc",
  });

  // Mock data
  const allDomains: RDDomain[] = [
    {
      domain: "authority-site1.com",
      dr: 68,
      traffic: 125000,
      backlinks: 85,
      firstSeen: "2024-02-10",
      lastSeen: "2025-10-15",
      share: 4.6,
      status: "active",
      category: "Technology",
      flags: { starred: true },
    },
    {
      domain: "news-portal2.com",
      dr: 55,
      traffic: 89000,
      backlinks: 72,
      firstSeen: "2024-03-15",
      lastSeen: "2025-10-14",
      share: 3.9,
      status: "active",
      category: "News",
      flags: {},
    },
    {
      domain: "blog-platform3.com",
      dr: 42,
      traffic: 45000,
      backlinks: 58,
      firstSeen: "2024-06-20",
      lastSeen: "2025-10-13",
      share: 3.1,
      status: "new",
      category: "Blog",
      flags: {},
    },
    {
      domain: "forum-site4.com",
      dr: 38,
      traffic: 32000,
      backlinks: 45,
      firstSeen: "2024-08-05",
      lastSeen: "2025-09-20",
      share: 2.4,
      status: "active",
      category: "Forum",
      flags: { badNeighborhood: true },
    },
    {
      domain: "directory5.com",
      dr: 32,
      traffic: 15000,
      backlinks: 38,
      firstSeen: "2024-10-12",
      lastSeen: "2025-10-12",
      share: 2.1,
      status: "active",
      category: "Directory",
      flags: {},
    },
    {
      domain: "suspicious-site.com",
      dr: 15,
      traffic: 500,
      backlinks: 25,
      firstSeen: "2024-11-01",
      lastSeen: "2025-08-15",
      share: 1.4,
      status: "lost",
      category: "Unknown",
      flags: { toxic: true, pbn: true },
    },
  ];

  // Filter logic
  const filteredDomains = allDomains.filter((domain) => {
    if (searchTerm && !domain.domain.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (domain.dr < drRange[0] || domain.dr > drRange[1]) {
      return false;
    }
    if (domain.traffic < trafficRange[0] || domain.traffic > trafficRange[1]) {
      return false;
    }
    if (showTrafficOnly && domain.traffic === 0) {
      return false;
    }
    if (domain.backlinks < minBacklinks) {
      return false;
    }
    if (statusFilter !== "all" && domain.status !== statusFilter) {
      return false;
    }
    if (selectedFlags.length > 0) {
      const hasSelectedFlag = selectedFlags.some((flag) => {
        if (flag === "toxic" && domain.flags.toxic) return true;
        if (flag === "pbn" && domain.flags.pbn) return true;
        if (flag === "badNeighborhood" && domain.flags.badNeighborhood) return true;
        if (flag === "starred" && domain.flags.starred) return true;
        return false;
      });
      if (!hasSelectedFlag) return false;
    }
    return true;
  });

  // Sort logic
  const sortedDomains = [...filteredDomains].sort((a, b) => {
    let aVal: any = a[sortBy.field as keyof RDDomain];
    let bVal: any = b[sortBy.field as keyof RDDomain];
    
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Đang hoạt động</Badge>;
      case "new":
        return <Badge variant="default" className="bg-green-500">Mới</Badge>;
      case "lost":
        return <Badge variant="destructive">Mất</Badge>;
      default:
        return <Badge>{status}</Badge>;
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
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="flex-1 space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="domain1.com, blogspot, .edu"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            {/* Filter Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Bộ lọc
            </Button>
            
            {/* Export Button */}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Xuất Excel
            </Button>
          </div>
          
          {/* Advanced Filters - Collapsible */}
          {showFilters && (
            <div className="pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* DR Range */}
                <div className="space-y-2">
                  <Label className="text-sm">Khoảng DR: {drRange[0]} - {drRange[1]}</Label>
                  <Slider
                    value={drRange}
                    onValueChange={setDrRange}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Traffic Range */}
                <div className="space-y-2">
                  <Label className="text-sm">
                    Lưu lượng truy cập: {trafficRange[0].toLocaleString()} - {trafficRange[1].toLocaleString()}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={trafficRange[0]}
                      onChange={(e) => setTrafficRange([Number(e.target.value), trafficRange[1]])}
                      className="w-24"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="number"
                      value={trafficRange[1]}
                      onChange={(e) => setTrafficRange([trafficRange[0], Number(e.target.value)])}
                      className="w-24"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="traffic-only"
                      checked={showTrafficOnly}
                      onCheckedChange={(checked) => setShowTrafficOnly(checked as boolean)}
                    />
                    <Label htmlFor="traffic-only" className="text-xs cursor-pointer">
                      Chỉ hiển thị domain có traffic &gt; 0
                    </Label>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label className="text-sm">Trạng thái</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="new">Chỉ domain mới</SelectItem>
                      <SelectItem value="lost">Chỉ domain mất</SelectItem>
                      <SelectItem value="active">Đang hoạt động</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Min Backlinks */}
                <div className="space-y-2">
                  <Label className="text-sm">Số backlink tối thiểu</Label>
                  <Input
                    type="number"
                    value={minBacklinks}
                    onChange={(e) => setMinBacklinks(Number(e.target.value))}
                    min={1}
                  />
                </div>

                {/* Flags */}
                <div className="space-y-2">
                  <Label className="text-sm">Nhãn / Thẻ</Label>
                  <div className="space-y-2">
                    {[
                      { id: "toxic", label: "Nghi Toxic" },
                      { id: "pbn", label: "Nghi PBN" },
                      { id: "badNeighborhood", label: "Bad Neighborhood" },
                      { id: "starred", label: "Đánh dấu quan trọng" },
                    ].map((flag) => (
                      <div key={flag.id} className="flex items-center gap-2">
                        <Checkbox
                          id={flag.id}
                          checked={selectedFlags.includes(flag.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFlags([...selectedFlags, flag.id]);
                            } else {
                              setSelectedFlags(selectedFlags.filter((f) => f !== flag.id));
                            }
                          }}
                        />
                        <Label htmlFor={flag.id} className="text-xs cursor-pointer">
                          {flag.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Table */}
      <Card className="p-6 bg-surface shadow-medium">
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
                onClick={() => handleSort("traffic")}
              >
                Lưu lượng truy cập / tháng
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
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("status")}
              >
                Trạng thái
                {sortBy.field === "status" && (
                  <span className="ml-1">{sortBy.direction === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("share")}
              >
                Tỷ lệ %
                {sortBy.field === "share" && (
                  <span className="ml-1">{sortBy.direction === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDomains.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Không tìm thấy domain nào theo điều kiện lọc. Hãy nới lỏng filter.
                </TableCell>
              </TableRow>
            ) : (
              paginatedDomains.map((domain, idx) => (
                <TableRow key={idx} className="cursor-pointer hover:bg-muted/50">
                  <TableCell 
                    className="font-medium"
                    onClick={() => onDomainClick?.(domain.domain)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{domain.domain}</span>
                    </div>
                  </TableCell>
                  <TableCell>{domain.traffic.toLocaleString()}</TableCell>
                  <TableCell 
                    className="text-primary cursor-pointer hover:underline"
                    onClick={() => onDomainClick?.(domain.domain)}
                  >
                    {domain.backlinks}
                  </TableCell>
                  <TableCell>{getStatusBadge(domain.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${Math.min(domain.share * 5, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm">{domain.share}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{domain.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onDomainClick?.(domain.domain)}>
                          Xem chi tiết domain
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Xem danh sách backlink
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Đánh dấu bỏ qua (Ignore trong score)
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Thêm vào danh sách Outreach
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Results Info and Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Hiển thị {paginatedDomains.length} / {filteredDomains.length} domain
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={pageSize.toString()} onValueChange={(v) => setPageSize(Number(v))}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10/trang</SelectItem>
                <SelectItem value="25">25/trang</SelectItem>
                <SelectItem value="50">50/trang</SelectItem>
                <SelectItem value="100">100/trang</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
      </div>
    </div>
  );
}

