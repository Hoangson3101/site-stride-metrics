import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { AlertTriangle, Hash, ExternalLink, Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface KeywordAnchor {
  keyword: string;
  exactMatch: number;
  partialMatch: number;
  branded: number;
  generic: number;
  naked: number;
  total: number;
  exactMatchPercentage: number;
}

export function KeywordAnchorRatio() {
  const [selectedKeyword, setSelectedKeyword] = useState<string>("seo tool");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Keyword Anchor Data
  const keywordAnchors: KeywordAnchor[] = [
    {
      keyword: "seo tool",
      exactMatch: 85,
      partialMatch: 45,
      branded: 120,
      generic: 98,
      naked: 129,
      total: 477,
      exactMatchPercentage: 17.8,
    },
    {
      keyword: "backlink checker",
      exactMatch: 34,
      partialMatch: 28,
      branded: 65,
      generic: 42,
      naked: 38,
      total: 207,
      exactMatchPercentage: 16.4,
    },
    {
      keyword: "seo analyzer",
      exactMatch: 23,
      partialMatch: 18,
      branded: 45,
      generic: 35,
      naked: 28,
      total: 149,
      exactMatchPercentage: 15.4,
    },
  ];

  const selectedKeywordData = keywordAnchors.find((k) => k.keyword === selectedKeyword) || keywordAnchors[0];

  // Distribution for selected keyword
  const keywordDistribution = [
    { name: "Exact-match", value: selectedKeywordData.exactMatchPercentage, count: selectedKeywordData.exactMatch },
    { name: "Partial-match", value: Number((selectedKeywordData.partialMatch / selectedKeywordData.total * 100).toFixed(1)), count: selectedKeywordData.partialMatch },
    { name: "Branded", value: Number((selectedKeywordData.branded / selectedKeywordData.total * 100).toFixed(1)), count: selectedKeywordData.branded },
    { name: "Generic", value: Number((selectedKeywordData.generic / selectedKeywordData.total * 100).toFixed(1)), count: selectedKeywordData.generic },
    { name: "Naked URL", value: Number((selectedKeywordData.naked / selectedKeywordData.total * 100).toFixed(1)), count: selectedKeywordData.naked },
  ];

  const isWarning = selectedKeywordData.exactMatchPercentage > 5;

  const COLORS = [
    "hsl(var(--destructive))",
    "hsl(var(--warning))",
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "hsl(var(--secondary))",
  ];

  // Pagination
  const totalPages = Math.ceil(keywordAnchors.length / pageSize);
  const paginatedKeywords = keywordAnchors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      {/* Keyword Selector */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="space-y-2">
          <Label className="text-sm">Chọn từ khóa SEO để phân tích</Label>
          <Select value={selectedKeyword} onValueChange={setSelectedKeyword}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {keywordAnchors.map((keyword) => (
                <SelectItem key={keyword.keyword} value={keyword.keyword}>
                  {keyword.keyword} ({keyword.total} backlinks)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Tỷ lệ anchor exact-match cho từ khóa "{selectedKeyword}" là{" "}
            {selectedKeywordData.exactMatchPercentage.toFixed(1)}%, quá cao so với ngưỡng an toàn
            (5%). Điều này có thể khiến Google nghi ngờ thao túng backlink. Khuyến nghị: Giảm tỷ
            lệ exact-match xuống dưới 5% bằng cách tăng tỷ lệ branded và generic anchor để duy trì
            sự tự nhiên.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Exact-match</p>
            <p className="text-2xl font-bold text-red-500">
              {selectedKeywordData.exactMatchPercentage.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedKeywordData.exactMatch} backlinks
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Partial-match</p>
            <p className="text-2xl font-bold">
              {((selectedKeywordData.partialMatch / selectedKeywordData.total) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedKeywordData.partialMatch} backlinks
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Branded</p>
            <p className="text-2xl font-bold">
              {((selectedKeywordData.branded / selectedKeywordData.total) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedKeywordData.branded} backlinks
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Generic</p>
            <p className="text-2xl font-bold">
              {((selectedKeywordData.generic / selectedKeywordData.total) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedKeywordData.generic} backlinks
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Naked URL</p>
            <p className="text-2xl font-bold">
              {((selectedKeywordData.naked / selectedKeywordData.total) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedKeywordData.naked} backlinks
            </p>
          </div>
        </Card>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân phối Anchor Text cho "{selectedKeyword}"
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={keywordDistribution}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, value }) => `${name}\n${value}%`}
                outerRadius={140}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {keywordDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                  fontSize: "14px",
                  padding: "12px",
                }}
                formatter={(value: any, name: string, props: any) => [
                  `${value}% (${props.payload.count} backlinks)`,
                  props.payload.name,
                ]}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "14px", paddingTop: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So sánh Tỷ lệ Anchor Text
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={keywordDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                label={{ value: "Tỷ lệ (%)", angle: -90, position: "insideLeft", style: { textAnchor: "middle", fontSize: 12 } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                  fontSize: "14px",
                  padding: "12px",
                }}
                formatter={(value: any, name: string, props: any) => [
                  `${value}% (${props.payload.count} backlinks)`,
                  props.payload.name,
                ]}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--primary))" 
                radius={[8, 8, 0, 0]}
                label={{ position: "top", fill: "hsl(var(--foreground))", fontSize: 12 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-4 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Search className="h-5 w-5" />
          Khuyến nghị Điều chỉnh Tỷ lệ Anchor Text
        </h3>
        <ul className="space-y-2 text-sm opacity-90">
          <li>
            • Giảm tỷ lệ exact-match từ {selectedKeywordData.exactMatchPercentage.toFixed(1)}% xuống
            dưới 5%
          </li>
          <li>
            • Tăng tỷ lệ branded anchor từ{" "}
            {((selectedKeywordData.branded / selectedKeywordData.total) * 100).toFixed(1)}% lên
            khoảng 40-50%
          </li>
          <li>
            • Tăng tỷ lệ generic anchor từ{" "}
            {((selectedKeywordData.generic / selectedKeywordData.total) * 100).toFixed(1)}% lên
            khoảng 25-30%
          </li>
          <li>• Duy trì tỷ lệ naked URL ở mức 20-30%</li>
          <li>
            • Sử dụng partial-match thay vì exact-match khi có thể để tránh over-optimization
          </li>
        </ul>
      </Card>

      {/* Keywords Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Tỷ lệ Anchor Text cho các Từ khóa SEO
          </h3>
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

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Từ khóa</TableHead>
                <TableHead>Exact-match</TableHead>
                <TableHead>Partial-match</TableHead>
                <TableHead>Branded</TableHead>
                <TableHead>Generic</TableHead>
                <TableHead>Naked URL</TableHead>
                <TableHead>Tổng</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedKeywords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy từ khóa nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedKeywords.map((keyword, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      keyword.exactMatchPercentage > 5 ? "bg-red-50/50 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span>{keyword.keyword}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={keyword.exactMatchPercentage > 5 ? "destructive" : "outline"}>
                        {keyword.exactMatchPercentage.toFixed(1)}% ({keyword.exactMatch})
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {((keyword.partialMatch / keyword.total) * 100).toFixed(1)}% ({keyword.partialMatch})
                    </TableCell>
                    <TableCell>
                      {((keyword.branded / keyword.total) * 100).toFixed(1)}% ({keyword.branded})
                    </TableCell>
                    <TableCell>
                      {((keyword.generic / keyword.total) * 100).toFixed(1)}% ({keyword.generic})
                    </TableCell>
                    <TableCell>
                      {((keyword.naked / keyword.total) * 100).toFixed(1)}% ({keyword.naked})
                    </TableCell>
                    <TableCell className="font-medium">{keyword.total}</TableCell>
                    <TableCell>
                      {keyword.exactMatchPercentage > 5 ? (
                        <Badge variant="destructive">Cảnh báo</Badge>
                      ) : (
                        <Badge className="bg-green-500">An toàn</Badge>
                      )}
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

