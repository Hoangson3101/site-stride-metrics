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
  LineChart,
  Line,
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
import { AlertTriangle, Shield, ExternalLink, TrendingUp } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface NegativeSEOLink {
  sourceUrl: string;
  domain: string;
  tld: string;
  country: string;
  ip: string;
  category: string;
  reason: string;
  dr: number;
  createdDate: string;
  suspicious: boolean;
}

export function NegativeSEODetection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Negative SEO Timeline
  const negativeTimeline = [
    { month: "2024-05", newDomains: 15, badDomains: 2, badPercent: 13 },
    { month: "2024-06", newDomains: 18, badDomains: 3, badPercent: 17 },
    { month: "2024-07", newDomains: 22, badDomains: 4, badPercent: 18 },
    { month: "2024-08", newDomains: 25, badDomains: 5, badPercent: 20 },
    { month: "2024-09", newDomains: 38, badDomains: 12, badPercent: 32 },
    { month: "2024-10", newDomains: 20, badDomains: 4, badPercent: 20 },
    { month: "2024-11", newDomains: 12, badDomains: 3, badPercent: 25 },
  ];

  // Negative SEO Backlinks
  const negativeBacklinks: NegativeSEOLink[] = [
    {
      sourceUrl: "https://casino-spam.xyz/link",
      domain: "casino-spam.xyz",
      tld: "xyz",
      country: "RU",
      ip: "185.xxx.xxx.1",
      category: "Gambling",
      reason: "Backlink từ domain không liên quan (.xyz), có dấu hiệu spam",
      dr: 8,
      createdDate: "2024-09-15",
      suspicious: true,
    },
    {
      sourceUrl: "https://pharma-spam.tk/drug",
      domain: "pharma-spam.tk",
      tld: "tk",
      country: "TK",
      ip: "185.xxx.xxx.2",
      category: "Pharmaceutical",
      reason: "Backlink từ domain không uy tín (.tk), nội dung không liên quan",
      dr: 5,
      createdDate: "2024-09-20",
      suspicious: true,
    },
    {
      sourceUrl: "https://adult-content.ru/adult",
      domain: "adult-content.ru",
      tld: "ru",
      country: "RU",
      ip: "185.xxx.xxx.3",
      category: "Adult",
      reason: "Backlink từ site tiếng Nga, không liên quan đến chủ đề",
      dr: 12,
      createdDate: "2024-09-25",
      suspicious: true,
    },
  ];

  // Pagination
  const totalPages = Math.ceil(negativeBacklinks.length / pageSize);
  const paginatedBacklinks = negativeBacklinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const spikeMonth = negativeTimeline.find((m) => m.badPercent > 30);
  const isWarning = spikeMonth !== undefined;

  return (
    <div className="space-y-6">
      {/* Timeline Chart */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Theo Dõi Negative SEO Theo Thời Gian
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={negativeTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
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
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="newDomains"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Domain mới"
            />
            <Line
              type="monotone"
              dataKey="badDomains"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              name="Domain xấu"
            />
            <Line
              type="monotone"
              dataKey="badPercent"
              stroke="hsl(var(--warning))"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="% Domain xấu"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Warning Alert */}
      {isWarning && spikeMonth && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo Negative SEO:</strong> Phát hiện sự tăng đột biến backlink từ nguồn
            xấu trong tháng {spikeMonth.month} ({spikeMonth.badPercent}% domain mới là spam/toxic).
            Điều này có thể là dấu hiệu của tấn công SEO tiêu cực. Khuyến nghị: Kiểm tra và disavow
            các backlink này, đồng thời báo cáo Negative SEO cho Google nếu cần.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng nghi ngờ</p>
            <p className="text-2xl font-bold">{negativeBacklinks.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tháng có spike</p>
            <p className="text-2xl font-bold text-red-500">
              {spikeMonth ? spikeMonth.month : "-"}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">% Domain xấu (tháng spike)</p>
            <p className="text-2xl font-bold">
              {spikeMonth ? `${spikeMonth.badPercent}%` : "-"}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">TLD phổ biến</p>
            <p className="text-2xl font-bold text-xs">.xyz, .tk, .ru</p>
          </div>
        </Card>
      </div>

      {/* Negative SEO Backlinks Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh sách Backlink Nghi Ngờ Từ Negative SEO
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL nguồn</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>TLD</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Lý do</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBacklinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy backlink nghi ngờ nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBacklinks.map((link, idx) => (
                  <TableRow
                    key={idx}
                    className="hover:bg-muted/50 bg-red-50/50 dark:bg-red-950/20"
                  >
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
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                        .{link.tld}
                      </Badge>
                    </TableCell>
                    <TableCell>{link.country}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{link.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={link.dr > 50 ? "default" : "secondary"}>
                        {link.dr}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {link.createdDate}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {link.reason}
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
          Khuyến Nghị Bảo Vệ Khỏi Negative SEO
        </h3>
        <div className="space-y-3 text-sm opacity-90">
          <p>
            Nếu phát hiện lượng lớn backlink từ các domain không uy tín hoặc từ các trang web có
            dấu hiệu spam, đây có thể là dấu hiệu của tấn công SEO tiêu cực.
          </p>
          <div>
            <p className="font-semibold mb-2">Các bước cần thực hiện:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Tạo file Disavow và upload lên Google Search Console</li>
              <li>Báo cáo Negative SEO cho Google nếu nghi ngờ bị tấn công</li>
              <li>Theo dõi định kỳ để phát hiện các spike bất thường</li>
              <li>Liên hệ với các domain nguồn để yêu cầu gỡ link nếu có thể</li>
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

