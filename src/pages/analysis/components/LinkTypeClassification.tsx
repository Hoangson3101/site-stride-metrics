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
import { FileText, User, MessageSquare, ExternalLink } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BacklinkByType {
  sourceUrl: string;
  domain: string;
  type: "contextual" | "profile" | "comment" | "other";
  dr: number;
  traffic: number;
  anchorText: string;
  placement: string;
}

export function LinkTypeClassification() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Type Distribution Data
  const typeDistribution = [
    { name: "Content", value: 68, count: 1258, color: "#3b82f6" },
    { name: "Profile", value: 22, count: 407, color: "#f59e0b" },
    { name: "Comment", value: 8, count: 148, color: "#10b981" },
    { name: "Khác", value: 2, count: 37, color: "#8b5cf6" },
  ];

  // Backlinks by Type
  const backlinksByType: BacklinkByType[] = [
    {
      sourceUrl: "https://techcrunch.com/article-1",
      domain: "techcrunch.com",
      type: "contextual",
      dr: 92,
      traffic: 45000000,
      anchorText: "best product",
      placement: "Content",
    },
    {
      sourceUrl: "https://medium.com/@user/post-1",
      domain: "medium.com",
      type: "contextual",
      dr: 96,
      traffic: 180000000,
      anchorText: "review",
      placement: "Content",
    },
    {
      sourceUrl: "https://forum.example.com/profile/user1",
      domain: "forum.example.com",
      type: "profile",
      dr: 25,
      traffic: 5000,
      anchorText: "website",
      placement: "Profile",
    },
    {
      sourceUrl: "https://blog.example.com/post-1#comment-123",
      domain: "blog.example.com",
      type: "comment",
      dr: 35,
      traffic: 12000,
      anchorText: "check this out",
      placement: "Comment",
    },
    {
      sourceUrl: "https://news.example.com/article-2",
      domain: "news.example.com",
      type: "contextual",
      dr: 78,
      traffic: 8000000,
      anchorText: "read more",
      placement: "Content",
    },
    {
      sourceUrl: "https://directory.example.com/listing",
      domain: "directory.example.com",
      type: "other",
      dr: 15,
      traffic: 2000,
      anchorText: "visit site",
      placement: "Directory",
    },
  ];

  // Filter backlinks
  const filteredBacklinks = backlinksByType.filter((link) => {
    if (typeFilter === "all") return true;
    return link.type === typeFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBacklinks.length / pageSize);
  const paginatedBacklinks = filteredBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const COLORS = [
    "#3b82f6", // Blue
    "#f59e0b", // Orange
    "#10b981", // Green
    "#8b5cf6", // Purple
  ]; // Không dùng trắng/xám

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contextual":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "profile":
        return <User className="h-4 w-4 text-yellow-500" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
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

  return (
    <div className="space-y-6">
      {/* Type Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân loại Backlink theo Loại
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {typeDistribution.map((entry, index) => (
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
                  `${value}% (${props.payload.count} backlink)`,
                  props.payload.name,
                ]}
              />
              <Legend 
                formatter={(value) => {
                  const entry = typeDistribution.find(d => d.name === value);
                  return entry ? `${value}: ${entry.value}%` : value;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Số lượng Backlink theo Loại
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                label={{ value: "Loại Backlink", position: "insideBottom", offset: -5 }}
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
                  `${props.payload.count} backlink (${value}%)`,
                  props.payload.name,
                ]}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Info */}
      <Card className="p-4 bg-muted/50 border-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          {typeDistribution.map((type, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[idx] }}
                />
                <span className="font-medium">{type.name}</span>
              </div>
              <p className="text-muted-foreground">
                {type.count} backlink ({type.value}%)
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Backlinks List */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Danh sách Backlink theo Loại
          </h3>
          <div className="flex items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="contextual">Content</SelectItem>
                <SelectItem value="profile">Profile</SelectItem>
                <SelectItem value="comment">Comment</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
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
                <TableHead>Loại</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Anchor Text</TableHead>
                <TableHead>Vị trí</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBacklinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBacklinks.map((link, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(link.type)}
                        {getTypeBadge(link.type)}
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
                      {link.traffic >= 1000000
                        ? `${(link.traffic / 1000000).toFixed(1)}M`
                        : link.traffic >= 1000
                        ? `${(link.traffic / 1000).toFixed(1)}K`
                        : link.traffic.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {link.anchorText}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{link.placement}</Badge>
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

