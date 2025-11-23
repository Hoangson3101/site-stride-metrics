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
import { AlertTriangle, GraduationCap, Globe, ExternalLink, Shield } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface EduGovLink {
  sourceUrl: string;
  domain: string;
  tld: ".edu" | ".gov";
  dr: number;
  traffic: number;
  targetUrl: string;
  context: string;
  date: string;
  institution?: string;
}

export function EduGovLinksAnalysis() {
  const [tldFilter, setTldFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Edu/Gov Links Distribution
  const eduGovDistribution = [
    { name: ".edu", value: 67, count: 4, color: "hsl(var(--primary))" },
    { name: ".gov", value: 33, count: 2, color: "hsl(var(--secondary))" },
  ];

  // Edu/Gov Links Data
  const eduGovLinks: EduGovLink[] = [
    {
      sourceUrl: "https://university.edu/research/article",
      domain: "university.edu",
      tld: ".edu",
      dr: 88,
      traffic: 120000,
      targetUrl: "https://yoursite.com/research",
      context: "Bài viết nghiên cứu từ trường đại học",
      date: "2024-10-25",
      institution: "University Name",
    },
    {
      sourceUrl: "https://college.edu/department/resource",
      domain: "college.edu",
      tld: ".edu",
      dr: 75,
      traffic: 45000,
      targetUrl: "https://yoursite.com/resources",
      context: "Tài nguyên từ khoa của trường đại học",
      date: "2024-11-01",
      institution: "College Name",
    },
    {
      sourceUrl: "https://government.gov/official-document",
      domain: "government.gov",
      tld: ".gov",
      dr: 92,
      traffic: 80000,
      targetUrl: "https://yoursite.com",
      context: "Tài liệu chính thức từ cơ quan chính phủ",
      date: "2024-11-01",
      institution: "Government Agency",
    },
    {
      sourceUrl: "https://agency.gov/publication",
      domain: "agency.gov",
      tld: ".gov",
      dr: 85,
      traffic: 60000,
      targetUrl: "https://yoursite.com/publications",
      context: "Ấn phẩm từ cơ quan chính phủ",
      date: "2024-10-30",
      institution: "Government Agency",
    },
  ];

  // Filter links
  const filteredLinks = eduGovLinks.filter((link) => {
    if (tldFilter === "all") return true;
    return link.tld === tldFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLinks.length / pageSize);
  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalLinks = eduGovLinks.length;
  const eduLinks = eduGovLinks.filter((l) => l.tld === ".edu").length;
  const govLinks = eduGovLinks.filter((l) => l.tld === ".gov").length;
  const isWarning = totalLinks < 3;

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))"];

  const getTLDBadge = (tld: string) => {
    switch (tld) {
      case ".edu":
        return <Badge className="bg-purple-500">.edu</Badge>;
      case ".gov":
        return <Badge className="bg-red-500">.gov</Badge>;
      default:
        return <Badge variant="outline">{tld}</Badge>;
    }
  };

  const getTLDIcon = (tld: string) => {
    switch (tld) {
      case ".edu":
        return <GraduationCap className="h-4 w-4 text-purple-500" />;
      case ".gov":
        return <Globe className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân bố .Edu vs .Gov
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eduGovDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {eduGovDistribution.map((entry, index) => (
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
                  `${value}% (${props.payload.count} links)`,
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
            <BarChart data={eduGovDistribution}>
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
                  `${props.payload.count} links (${value}%)`,
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
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tỷ lệ backlink từ các trang .edu hoặc .gov quá thấp. Chỉ có{" "}
            {totalLinks} backlink từ các nguồn này được phát hiện. Điều này có thể ảnh hưởng đến
            E-A-T score. Khuyến nghị: Tăng cường xây dựng các backlink từ các trang .edu và .gov
            để cải thiện hồ sơ backlink và độ tin cậy của website.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng .edu/.gov Links</p>
            <p className="text-2xl font-bold">{totalLinks}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-purple-500/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-purple-500" />
              <p className="text-sm text-muted-foreground">.edu Links</p>
            </div>
            <p className="text-2xl font-bold text-purple-500">{eduLinks}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-red-500" />
              <p className="text-sm text-muted-foreground">.gov Links</p>
            </div>
            <p className="text-2xl font-bold text-red-500">{govLinks}</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={tldFilter} onValueChange={setTldFilter}>
              <SelectTrigger>
                <SelectValue placeholder="TLD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value=".edu">.edu</SelectItem>
                <SelectItem value=".gov">.gov</SelectItem>
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

      {/* Edu/Gov Links Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh sách Backlink Từ Các Trang .Edu và .Gov
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TLD</TableHead>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Ngữ cảnh</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLinks.map((link, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTLDIcon(link.tld)}
                        {getTLDBadge(link.tld)}
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
                    <TableCell className="text-sm text-muted-foreground">
                      {link.institution || "—"}
                    </TableCell>
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
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {link.context}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Khuyến Nghị Xây Dựng .Edu/.Gov Links
        </h3>
        <div className="space-y-3 text-sm opacity-90">
          <p>
            Backlink từ các trang .edu và .gov có độ tin cậy cao, thường được Google đánh giá rất
            tốt và giúp củng cố E-A-T.
          </p>
          <div>
            <p className="font-semibold mb-2">Các cách xây dựng .edu/.gov links:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Liên hệ với các trường đại học để đăng bài nghiên cứu hoặc tài nguyên</li>
              <li>Tham gia các chương trình hợp tác với các cơ quan chính phủ</li>
              <li>Tạo nội dung có giá trị để được các trang .edu/.gov đề cập</li>
              <li>Xây dựng quan hệ với các giáo sư và nhà nghiên cứu</li>
            </ul>
          </div>
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

