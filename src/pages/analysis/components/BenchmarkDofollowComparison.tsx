import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
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
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Target, Lightbulb } from "lucide-react";

interface BenchmarkData {
  type: string;
  current: number;
  benchmark: number;
  gap: number;
  status: "ok" | "warning" | "danger";
}

export function BenchmarkDofollowComparison() {
  // Current vs Benchmark data
  const benchmarkData: BenchmarkData[] = [
    { type: "Dofollow", current: 85, benchmark: 75, gap: 10, status: "warning" },
    { type: "Nofollow", current: 15, benchmark: 25, gap: -10, status: "warning" },
    { type: "UGC", current: 2, benchmark: 2, gap: 0, status: "ok" },
    { type: "Sponsored", current: 1, benchmark: 1, gap: 0, status: "ok" },
  ];

  // History data (3-6 months)
  const historyData = [
    { month: "2024-06", dofollow: 88, nofollow: 12, benchmarkDofollow: 75, benchmarkNofollow: 25 },
    { month: "2024-07", dofollow: 86, nofollow: 14, benchmarkDofollow: 75, benchmarkNofollow: 25 },
    { month: "2024-08", dofollow: 85, nofollow: 15, benchmarkDofollow: 75, benchmarkNofollow: 25 },
    { month: "2024-09", dofollow: 85, nofollow: 15, benchmarkDofollow: 75, benchmarkNofollow: 25 },
    { month: "2024-10", dofollow: 85, nofollow: 15, benchmarkDofollow: 75, benchmarkNofollow: 25 },
    { month: "2024-11", dofollow: 85, nofollow: 15, benchmarkDofollow: 75, benchmarkNofollow: 25 },
  ];

  // Calculate gaps and warnings
  const dofollowGap = benchmarkData[0].gap;
  const nofollowGap = benchmarkData[1].gap;
  const maxGap = Math.max(Math.abs(dofollowGap), Math.abs(nofollowGap));
  const gapStatus = maxGap > 15 ? "danger" : maxGap > 5 ? "warning" : "ok";

  // Calculate needed links
  const totalBacklinks = 1850; // Mock total
  const currentNofollow = Math.round((totalBacklinks * 15) / 100);
  const targetNofollow = Math.round((totalBacklinks * 25) / 100);
  const neededNofollow = targetNofollow - currentNofollow;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-500">✅ OK</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500">⚠️ Cần điều chỉnh</Badge>;
      case "danger":
        return <Badge variant="destructive">🔴 Bất thường</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Radar chart data
  const radarData = [
    { subject: "Dofollow", current: 85, benchmark: 75 },
    { subject: "Nofollow", current: 15, benchmark: 25 },
    { subject: "UGC", current: 2, benchmark: 2 },
    { subject: "Sponsored", current: 1, benchmark: 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Warning Alerts */}
      {gapStatus === "danger" && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo nghiêm trọng:</strong> Gap quá lớn so với benchmark ({maxGap.toFixed(1)}%), cần điều
            chỉnh ngay. Tỷ lệ dofollow/nofollow hiện tại không phù hợp với chuẩn Top 10 SERP.
          </AlertDescription>
        </Alert>
      )}

      {gapStatus === "warning" && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Gap vừa phải ({maxGap.toFixed(1)}%), nên điều chỉnh trong 1-2 tháng để đạt
            benchmark Top 10 SERP.
          </AlertDescription>
        </Alert>
      )}

      {gapStatus === "ok" && (
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            <strong>Thông báo:</strong> Gần đạt benchmark (gap &lt; 5%), tiếp tục duy trì tỷ lệ hiện tại.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Dofollow Gap</p>
            <div className="flex items-center gap-2">
              {dofollowGap > 0 ? (
                <TrendingUp className="h-4 w-4 text-yellow-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-500" />
              )}
              <p className={`text-2xl font-bold ${dofollowGap > 0 ? "text-yellow-500" : "text-green-500"}`}>
                {dofollowGap > 0 ? "+" : ""}
                {dofollowGap}%
              </p>
            </div>
            <p className="text-xs text-muted-foreground">Cao hơn benchmark {dofollowGap}%</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Nofollow Gap</p>
            <div className="flex items-center gap-2">
              {nofollowGap < 0 ? (
                <TrendingDown className="h-4 w-4 text-yellow-500" />
              ) : (
                <TrendingUp className="h-4 w-4 text-green-500" />
              )}
              <p className={`text-2xl font-bold ${nofollowGap < 0 ? "text-yellow-500" : "text-green-500"}`}>
                {nofollowGap}%
              </p>
            </div>
            <p className="text-xs text-muted-foreground">Thấp hơn benchmark {Math.abs(nofollowGap)}%</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Cần bổ sung</p>
            <p className="text-2xl font-bold">{neededNofollow}-{neededNofollow + 5}</p>
            <p className="text-xs text-muted-foreground">nofollow links</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Trạng thái</p>
            <div className="mt-1">
              {getStatusBadge(gapStatus)}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {gapStatus === "ok" ? "Gần đạt benchmark" : gapStatus === "warning" ? "Cần điều chỉnh" : "Bất thường"}
            </p>
          </div>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          So Sánh Hiện Tại vs Benchmark Top 10 SERP
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 text-left font-semibold">Loại</th>
                <th className="p-4 text-left font-semibold">Hiện tại</th>
                <th className="p-4 text-left font-semibold">Benchmark Top 10</th>
                <th className="p-4 text-left font-semibold">Gap</th>
                <th className="p-4 text-left font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {benchmarkData.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{item.type}</td>
                  <td className="p-4">
                    <Badge variant="outline">{item.current}%</Badge>
                  </td>
                  <td className="p-4">
                    <Badge className="bg-primary">{item.benchmark}%</Badge>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={item.gap === 0 ? "default" : item.gap > 0 ? "destructive" : "outline"}
                      className={item.gap < 0 ? "bg-yellow-500" : ""}
                    >
                      {item.gap > 0 ? "+" : ""}
                      {item.gap}%
                    </Badge>
                  </td>
                  <td className="p-4">{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Bar Chart (Grouped)
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={benchmarkData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="type"
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
              <Bar dataKey="current" fill="hsl(var(--primary))" name="Hiện tại" radius={[8, 8, 0, 0]} />
              <Bar dataKey="benchmark" fill="hsl(var(--secondary))" name="Benchmark Top 10" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Radar Chart
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="subject"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Radar
                name="Hiện tại"
                dataKey="current"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
              <Radar
                name="Benchmark Top 10"
                dataKey="benchmark"
                stroke="hsl(var(--secondary))"
                fill="hsl(var(--secondary))"
                fillOpacity={0.3}
              />
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* History Chart */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Lịch Sử Thay Đổi (3-6 Tháng)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
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
              dataKey="dofollow"
              name="Dofollow (Hiện tại)"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="nofollow"
              name="Nofollow (Hiện tại)"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="benchmarkDofollow"
              name="Dofollow (Benchmark)"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
            <Line
              type="monotone"
              dataKey="benchmarkNofollow"
              name="Nofollow (Benchmark)"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Gap Analysis */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="h-5 w-5" />
          Phân Tích Gap
        </h3>
        <div className="space-y-4">
          {benchmarkData[0].current > 90 && (
            <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                <strong>Dofollow quá cao:</strong> Tỷ lệ dofollow {benchmarkData[0].current}% (&gt;90%), có thể bị Google
                coi là không tự nhiên. Cần bổ sung nofollow.
              </AlertDescription>
            </Alert>
          )}

          {benchmarkData[0].current < 50 && (
            <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                <strong>Dofollow quá thấp:</strong> Tỷ lệ dofollow {benchmarkData[0].current}% (&lt;50%), có thể ảnh
                hưởng đến SEO. Cần tăng dofollow.
              </AlertDescription>
            </Alert>
          )}

          {benchmarkData[1].current < 10 && (
            <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                <strong>Nofollow quá thấp:</strong> Tỷ lệ nofollow {benchmarkData[1].current}% (&lt;10%), thiếu tự nhiên.
                Cần bổ sung nofollow từ social, forum, báo.
              </AlertDescription>
            </Alert>
          )}

          {benchmarkData[1].current > 40 && (
            <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                <strong>Nofollow quá cao:</strong> Tỷ lệ nofollow {benchmarkData[1].current}% (&gt;40%), có thể ảnh hưởng
                đến SEO. Cần tăng dofollow.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Card>

      {/* Action Recommendations */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Hành Động Đề Xuất Cụ Thể
        </h3>
        <div className="space-y-4 text-sm opacity-90">
          <div>
            <p className="font-semibold mb-2">Tình trạng hiện tại:</p>
            <p>
              Hiện tại: {benchmarkData[0].current}% dofollow / {benchmarkData[1].current}% nofollow
            </p>
            <p>
              Benchmark Top 10: {benchmarkData[0].benchmark}% dofollow / {benchmarkData[1].benchmark}% nofollow
            </p>
            <p>
              Gap: {dofollowGap > 0 ? "+" : ""}
              {dofollowGap}% dofollow, {nofollowGap}% nofollow
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">Cần thêm:</p>
            <p>
              ~{neededNofollow}-{neededNofollow + 5} nofollow links để đạt ~{benchmarkData[1].benchmark}% nofollow
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">Nguồn đề xuất:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Social media (Facebook, Twitter, LinkedIn): ~3-5 links</li>
              <li>Forum/Discussion: ~2-3 links</li>
              <li>Blog comments (nofollow): ~2-3 links</li>
              <li>Báo chí (một số có nofollow): ~1-2 links</li>
              <li>Directory listings: ~1-2 links</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Explanation Card */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">Giải Thích Ý Nghĩa</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong>Dofollow:</strong> Truyền trực tiếp PageRank, là backbone của SEO. Backlink dofollow giúp website
            nhận được sức mạnh từ domain nguồn.
          </p>
          <p>
            <strong>Nofollow/UGC/Sponsored:</strong> Không truyền nhiều sức mạnh, nhưng giúp profile tự nhiên hơn.
            Google đánh giá cao hồ sơ backlink có sự đa dạng về loại link.
          </p>
          <p>
            <strong>Một hồ sơ backlink 100% dofollow hoặc 100% nofollow → đều bất thường.</strong> Google có thể nghi
            ngờ thao túng nếu tỷ lệ quá cực đoan.
          </p>
          <p>
            <strong>Tỷ lệ lý tưởng:</strong> Thường dao động 70-80% dofollow / 20-30% nofollow (còn tùy niche và đối
            thủ). Benchmark Top 10 SERP cho thấy tỷ lệ trung bình là 75% dofollow / 25% nofollow.
          </p>
        </div>
      </Card>
    </div>
  );
}

