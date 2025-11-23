import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";

export function IndustryAverageComparison() {
  const [industryFilter, setIndustryFilter] = useState<string>("all");

  // Industry average data
  const industryData = [
    { industry: "Technology", avg: 22, you: 15, gap: -7 },
    { industry: "E-commerce", avg: 25, you: 15, gap: -10 },
    { industry: "Healthcare", avg: 18, you: 15, gap: -3 },
    { industry: "Finance", avg: 20, you: 15, gap: -5 },
    { industry: "Education", avg: 16, you: 15, gap: -1 },
  ];

  // Velocity comparison over time
  const velocityComparison = [
    { period: "2024-05", you: 12, industryAvg: 20 },
    { period: "2024-06", you: 8, industryAvg: 19 },
    { period: "2024-07", you: 14, industryAvg: 21 },
    { period: "2024-08", you: 18, industryAvg: 22 },
    { period: "2024-09", you: 38, industryAvg: 20 },
    { period: "2024-10", you: 16, industryAvg: 21 },
    { period: "2024-11", you: 12, industryAvg: 22 },
  ];

  const yourAvg = velocityComparison.reduce((sum, d) => sum + d.you, 0) / velocityComparison.length;
  const industryAvg = velocityComparison.reduce((sum, d) => sum + d.industryAvg, 0) / velocityComparison.length;
  const gap = industryAvg - yourAvg;
  const isWarning = gap > 5;

  // Filter industries
  const filteredIndustries = industryData.filter((ind) => {
    if (industryFilter === "all") return true;
    return ind.industry.toLowerCase() === industryFilter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tốc độ tăng trưởng backlink của website ({yourAvg.toFixed(1)}{" "}
            backlinks/tháng) thấp hơn tốc độ trung bình của ngành ({industryAvg.toFixed(1)}{" "}
            backlinks/tháng). Bạn đang tụt hậu {gap.toFixed(1)} backlinks/tháng so với chuẩn ngành. Khuyến nghị:
            Cải thiện chiến lược xây dựng liên kết để không bị tụt hậu.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tốc độ của bạn</p>
            <p className="text-2xl font-bold">{yourAvg.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">backlinks/tháng</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Trung bình ngành</p>
            <p className="text-2xl font-bold">{industryAvg.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">backlinks/tháng</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Khoảng cách</p>
            <div className="flex items-center gap-2">
              {gap > 0 ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : (
                <TrendingUp className="h-4 w-4 text-green-500" />
              )}
              <p className={`text-2xl font-bold ${gap > 0 ? "text-red-500" : "text-green-500"}`}>
                {gap > 0 ? "-" : "+"}
                {Math.abs(gap).toFixed(1)}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">vs trung bình ngành</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tỷ lệ</p>
            <p className="text-2xl font-bold">
              {((yourAvg / industryAvg) * 100).toFixed(0)}%
            </p>
            <p className="text-xs text-muted-foreground">so với ngành</p>
          </div>
        </Card>
      </div>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Tốc Độ Theo Thời Gian
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={velocityComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="period"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
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
              <Legend />
              <Line
                type="monotone"
                dataKey="you"
                name="Website của bạn"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="industryAvg"
                name="Trung bình ngành"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Theo Ngành
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredIndustries}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="industry"
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
              <Legend />
              <Bar dataKey="you" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Website của bạn" />
              <Bar dataKey="avg" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} name="Trung bình ngành" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Industry Filter */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Ngành" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả ngành</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="e-commerce">E-commerce</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Industry Comparison Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          So Sánh Tốc Độ Theo Ngành
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 text-left font-semibold">Ngành</th>
                <th className="p-4 text-left font-semibold">Website của bạn</th>
                <th className="p-4 text-left font-semibold">Trung bình ngành</th>
                <th className="p-4 text-left font-semibold">Khoảng cách</th>
                <th className="p-4 text-left font-semibold">Tỷ lệ</th>
              </tr>
            </thead>
            <tbody>
              {filteredIndustries.map((industry, idx) => (
                <tr key={idx} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{industry.industry}</td>
                  <td className="p-4">
                    <Badge variant={industry.gap > 0 ? "destructive" : "default"}>
                      {industry.you} backlinks/tháng
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{industry.avg} backlinks/tháng</Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant={industry.gap > 0 ? "destructive" : "default"}>
                      {industry.gap > 0 ? "-" : "+"}
                      {Math.abs(industry.gap)} backlinks/tháng
                    </Badge>
                  </td>
                  <td className="p-4">
                    {((industry.you / industry.avg) * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Strategy Recommendations */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-4">Gợi ý Chiến Lược Xây Dựng Liên Kết</h3>
        <div className="space-y-3 text-sm opacity-90">
          {gap > 0 ? (
            <>
              <p>
                Website của bạn đang tăng trưởng chậm hơn {gap.toFixed(1)} backlinks/tháng so với trung bình
                ngành. Để cải thiện:
              </p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Tăng cường outreach và liên kết từ các blog uy tín trong ngành</li>
                <li>Tạo thêm các bài viết PR để thu hút liên kết tự nhiên</li>
                <li>Tham gia các sự kiện và hội thảo trong ngành để xây dựng quan hệ</li>
                <li>Tối ưu hóa nội dung để tăng khả năng được đề cập và liên kết</li>
                <li>Xây dựng quan hệ với các influencer và chuyên gia trong ngành</li>
              </ul>
            </>
          ) : (
            <p>
              Website của bạn đang tăng trưởng tốt so với trung bình ngành. Tiếp tục duy trì tốc độ này và đảm
              bảo chất lượng backlink.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

