import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  Cell,
} from "recharts";
import { Download, Star, ExternalLink } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CompetitorDomain {
  domain: string;
  competitors: string[];
  dr: number;
  traffic: number;
  backlinksToCompetitor: number;
  niche: string;
  priority: "Cao" | "Vừa" | "Thấp";
}

export function RDGapCompetitors() {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(["competitor1", "competitor2"]);
  const [showOnlyUnique, setShowOnlyUnique] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortBy, setSortBy] = useState<{ field: string; direction: "asc" | "desc" }>({
    field: "dr",
    direction: "desc",
  });

  // Mock data
  const stats = {
    you: 250,
    competitor1: 420,
    competitor2: 380,
    competitor3: 200,
    competitor4: 350,
    competitor5: 320,
    competitor6: 280,
    competitor7: 260,
    competitor8: 240,
    competitor9: 220,
    competitor10: 200,
    sharedWith1: 80,
    sharedWith2: 70,
    sharedWith3: 50,
    sharedWith4: 60,
    sharedWith5: 55,
    sharedWith6: 45,
    sharedWith7: 40,
    sharedWith8: 35,
    sharedWith9: 30,
    sharedWith10: 25,
    uniqueTo1: 210,
    uniqueTo2: 180,
    uniqueTo3: 100,
    uniqueTo4: 150,
    uniqueTo5: 130,
    uniqueTo6: 120,
    uniqueTo7: 110,
    uniqueTo8: 100,
    uniqueTo9: 90,
    uniqueTo10: 80,
    uniqueToYou: 120,
  };

  // Competitor domains that you don't have
  const competitorDomains: CompetitorDomain[] = [
    {
      domain: "high-authority-site.com",
      competitors: ["competitor1"],
      dr: 75,
      traffic: 200000,
      backlinksToCompetitor: 5,
      niche: "Technology",
      priority: "Cao",
    },
    {
      domain: "news-portal-example.com",
      competitors: ["competitor1", "competitor2"],
      dr: 68,
      traffic: 150000,
      backlinksToCompetitor: 3,
      niche: "News",
      priority: "Cao",
    },
    {
      domain: "blog-platform-example.com",
      competitors: ["competitor2"],
      dr: 55,
      traffic: 95000,
      backlinksToCompetitor: 4,
      niche: "Blog",
      priority: "Vừa",
    },
    {
      domain: "forum-example.com",
      competitors: ["competitor1"],
      dr: 42,
      traffic: 45000,
      backlinksToCompetitor: 2,
      niche: "Forum",
      priority: "Vừa",
    },
    {
      domain: "directory-example.com",
      competitors: ["competitor3"],
      dr: 35,
      traffic: 25000,
      backlinksToCompetitor: 1,
      niche: "Directory",
      priority: "Thấp",
    },
  ];

  // Filter domains based on selected competitors
  const filteredDomains = competitorDomains.filter((domain) => {
    if (showOnlyUnique) {
      return domain.competitors.some((comp) => selectedCompetitors.includes(comp));
    }
    return true;
  });

  // Sort domains
  const sortedDomains = [...filteredDomains].sort((a, b) => {
    let aVal: any = a[sortBy.field as keyof CompetitorDomain];
    let bVal: any = b[sortBy.field as keyof CompetitorDomain];

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

  // Chart data
  const chartData = [
    {
      name: "Bạn",
      shared: stats.sharedWith1,
      unique: stats.uniqueToYou,
    },
    {
      name: "Đối thủ 1",
      shared: stats.sharedWith1,
      unique: stats.uniqueTo1,
    },
    {
      name: "Đối thủ 2",
      shared: stats.sharedWith2,
      unique: stats.uniqueTo2,
    },
    {
      name: "Đối thủ 3",
      shared: stats.sharedWith3,
      unique: stats.uniqueTo3,
    },
    {
      name: "Đối thủ 4",
      shared: stats.sharedWith4,
      unique: stats.uniqueTo4,
    },
    {
      name: "Đối thủ 5",
      shared: stats.sharedWith5,
      unique: stats.uniqueTo5,
    },
    {
      name: "Đối thủ 6",
      shared: stats.sharedWith6,
      unique: stats.uniqueTo6,
    },
    {
      name: "Đối thủ 7",
      shared: stats.sharedWith7,
      unique: stats.uniqueTo7,
    },
    {
      name: "Đối thủ 8",
      shared: stats.sharedWith8,
      unique: stats.uniqueTo8,
    },
    {
      name: "Đối thủ 9",
      shared: stats.sharedWith9,
      unique: stats.uniqueTo9,
    },
    {
      name: "Đối thủ 10",
      shared: stats.sharedWith10,
      unique: stats.uniqueTo10,
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Cao":
        return <Badge className="bg-red-500">Cao</Badge>;
      case "Vừa":
        return <Badge className="bg-yellow-500">Vừa</Badge>;
      case "Thấp":
        return <Badge variant="secondary">Thấp</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getDRColor = (dr: number) => {
    if (dr >= 60) return "text-green-500";
    if (dr >= 40) return "text-yellow-500";
    return "text-muted-foreground";
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
        <div className="flex flex-wrap items-center gap-4">
          <div className="space-y-2 min-w-[200px]">
            <Label className="text-sm">Chọn đối thủ</Label>
            <div className="flex flex-wrap gap-4">
              {[
                { id: "competitor1", name: "Đối thủ 1" },
                { id: "competitor2", name: "Đối thủ 2" },
                { id: "competitor3", name: "Đối thủ 3" },
                { id: "competitor4", name: "Đối thủ 4" },
                { id: "competitor5", name: "Đối thủ 5" },
                { id: "competitor6", name: "Đối thủ 6" },
                { id: "competitor7", name: "Đối thủ 7" },
                { id: "competitor8", name: "Đối thủ 8" },
                { id: "competitor9", name: "Đối thủ 9" },
                { id: "competitor10", name: "Đối thủ 10" },
              ].map((comp) => (
                <div key={comp.id} className="flex items-center gap-2">
                  <Checkbox
                    id={comp.id}
                    checked={selectedCompetitors.includes(comp.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCompetitors([...selectedCompetitors, comp.id]);
                      } else {
                        setSelectedCompetitors(selectedCompetitors.filter((c) => c !== comp.id));
                      }
                    }}
                  />
                  <Label htmlFor={comp.id} className="text-sm cursor-pointer">
                    {comp.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="unique-only"
              checked={showOnlyUnique}
              onCheckedChange={(checked) => setShowOnlyUnique(checked as boolean)}
            />
            <Label htmlFor="unique-only" className="text-sm cursor-pointer">
              Chỉ domain đối thủ có mà mình không có
            </Label>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6 bg-surface shadow-medium">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Domain chỉ bạn có</p>
            <p className="text-3xl font-bold text-green-500">{stats.uniqueToYou}</p>
            <p className="text-xs text-muted-foreground">
              Bạn: {stats.you} RD
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Domain cả hai bên đều có</p>
            <p className="text-3xl font-bold text-primary">{stats.sharedWith1}</p>
            <p className="text-xs text-muted-foreground">
              Chung với Đối thủ 1
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-surface shadow-medium border-2 border-warning">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Domain chỉ đối thủ có (bạn bị thiếu)</p>
            <p className="text-3xl font-bold text-yellow-500">{stats.uniqueTo1}</p>
            <p className="text-xs text-muted-foreground">
              Đối thủ 1: {stats.competitor1} RD
            </p>
          </div>
        </Card>
      </div>

      {/* Comparison Chart */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold mb-4">So sánh RD: RD Chung vs RD Riêng</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
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
                color: "hsl(var(--foreground))"
              }}
            />
            <Legend />
            <Bar dataKey="shared" stackId="a" fill="hsl(var(--primary))" name="RD Chung" />
            <Bar dataKey="unique" stackId="a" fill="hsl(var(--accent))" name="RD Riêng" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Summary Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Tổng quan số liệu</h3>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Website</TableHead>
                <TableHead className="text-right">Tổng RD</TableHead>
                <TableHead className="text-right">RD Chung</TableHead>
                <TableHead className="text-right">RD Riêng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Bạn</TableCell>
                <TableCell className="text-right">{stats.you}</TableCell>
                <TableCell className="text-right">{stats.sharedWith1}</TableCell>
                <TableCell className="text-right text-green-500">{stats.uniqueToYou}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Đối thủ 1</TableCell>
                <TableCell className="text-right">{stats.competitor1}</TableCell>
                <TableCell className="text-right">{stats.sharedWith1}</TableCell>
                <TableCell className="text-right text-yellow-500">{stats.uniqueTo1}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Đối thủ 2</TableCell>
                <TableCell className="text-right">{stats.competitor2}</TableCell>
                <TableCell className="text-right">{stats.sharedWith2}</TableCell>
                <TableCell className="text-right text-yellow-500">{stats.uniqueTo2}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Đối thủ 3</TableCell>
                <TableCell className="text-right">{stats.competitor3}</TableCell>
                <TableCell className="text-right">{stats.sharedWith3}</TableCell>
                <TableCell className="text-right text-yellow-500">{stats.uniqueTo3}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Đối thủ 4</TableCell>
                <TableCell className="text-right">{stats.competitor4}</TableCell>
                <TableCell className="text-right">{stats.sharedWith4}</TableCell>
                <TableCell className="text-right text-yellow-500">{stats.uniqueTo4}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Đối thủ 5</TableCell>
                <TableCell className="text-right">{stats.competitor5}</TableCell>
                <TableCell className="text-right">{stats.sharedWith5}</TableCell>
                <TableCell className="text-right text-yellow-500">{stats.uniqueTo5}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Đối thủ 6</TableCell>
                <TableCell className="text-right">{stats.competitor6}</TableCell>
                <TableCell className="text-right">{stats.sharedWith6}</TableCell>
                <TableCell className="text-right text-yellow-500">{stats.uniqueTo6}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Đối thủ 7</TableCell>
                <TableCell className="text-right">{stats.competitor7}</TableCell>
                <TableCell className="text-right">{stats.sharedWith7}</TableCell>
                <TableCell className="text-right text-yellow-500">{stats.uniqueTo7}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Đối thủ 8</TableCell>
                <TableCell className="text-right">{stats.competitor8}</TableCell>
                <TableCell className="text-right">{stats.sharedWith8}</TableCell>
                <TableCell className="text-right text-yellow-500">{stats.uniqueTo8}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Đối thủ 9</TableCell>
                <TableCell className="text-right">{stats.competitor9}</TableCell>
                <TableCell className="text-right">{stats.sharedWith9}</TableCell>
                <TableCell className="text-right text-yellow-500">{stats.uniqueTo9}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Đối thủ 10</TableCell>
                <TableCell className="text-right">{stats.competitor10}</TableCell>
                <TableCell className="text-right">{stats.sharedWith10}</TableCell>
                <TableCell className="text-right text-yellow-500">{stats.uniqueTo10}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Competitor Domains Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Domain đối thủ có mà bạn chưa có ({filteredDomains.length} domain)
          </h3>
          <div className="flex items-center gap-2">
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
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Xuất Excel
            </Button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
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
                  onClick={() => handleSort("competitors")}
                >
                  Đối thủ đang sở hữu
                  {sortBy.field === "competitors" && (
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
                  Lưu lượng truy cập
                  {sortBy.field === "traffic" && (
                    <span className="ml-1">{sortBy.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead>Số backlink - Đối thủ</TableHead>
                <TableHead>Lĩnh vực / Danh mục</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("priority")}
                >
                  Ưu tiên
                  {sortBy.field === "priority" && (
                    <span className="ml-1">{sortBy.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDomains.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy domain nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedDomains.map((item, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span>{item.domain}</span>
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.competitors.map((comp, i) => {
                          const competitorNames: { [key: string]: string } = {
                            competitor1: "Đối thủ 1",
                            competitor2: "Đối thủ 2",
                            competitor3: "Đối thủ 3",
                            competitor4: "Đối thủ 4",
                            competitor5: "Đối thủ 5",
                            competitor6: "Đối thủ 6",
                            competitor7: "Đối thủ 7",
                            competitor8: "Đối thủ 8",
                            competitor9: "Đối thủ 9",
                            competitor10: "Đối thủ 10",
                          };
                          return (
                            <Badge key={i} variant="outline">
                              {competitorNames[comp] || comp}
                            </Badge>
                          );
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.dr > 50 ? "default" : "secondary"} className={getDRColor(item.dr)}>
                        {item.dr}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.traffic.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        {item.backlinksToCompetitor} backlink đến {(() => {
                          const competitorNames: { [key: string]: string } = {
                            competitor1: "Đối thủ 1",
                            competitor2: "Đối thủ 2",
                            competitor3: "Đối thủ 3",
                            competitor4: "Đối thủ 4",
                            competitor5: "Đối thủ 5",
                            competitor6: "Đối thủ 6",
                            competitor7: "Đối thủ 7",
                            competitor8: "Đối thủ 8",
                            competitor9: "Đối thủ 9",
                            competitor10: "Đối thủ 10",
                          };
                          return competitorNames[item.competitors[0]] || item.competitors[0];
                        })()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.niche}</Badge>
                    </TableCell>
                    <TableCell>{getPriorityBadge(item.priority)}</TableCell>
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

