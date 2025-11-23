import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";

export function CompetitiveVelocityComparison() {
  const [timeRange, setTimeRange] = useState<string>("monthly");

  // Velocity data
  const velocityData = [
    { period: "2024-05", you: 12, top10Avg: 22, competitor1: 20, competitor2: 24, competitor3: 22 },
    { period: "2024-06", you: 8, top10Avg: 21, competitor1: 19, competitor2: 23, competitor3: 21 },
    { period: "2024-07", you: 14, top10Avg: 23, competitor1: 21, competitor2: 25, competitor3: 23 },
    { period: "2024-08", you: 18, top10Avg: 22, competitor1: 20, competitor2: 24, competitor3: 22 },
    { period: "2024-09", you: 38, top10Avg: 22, competitor1: 20, competitor2: 24, competitor3: 22 },
    { period: "2024-10", you: 16, top10Avg: 23, competitor1: 21, competitor2: 25, competitor3: 23 },
    { period: "2024-11", you: 12, top10Avg: 24, competitor1: 22, competitor2: 26, competitor3: 24 },
  ];

  // Calculate averages
  const yourAvg = velocityData.reduce((sum, d) => sum + d.you, 0) / velocityData.length;
  const avgCompetitor = velocityData.reduce((sum, d) => sum + d.top10Avg, 0) / velocityData.length;
  const comp1Avg = velocityData.reduce((sum, d) => sum + d.competitor1, 0) / velocityData.length;
  const comp2Avg = velocityData.reduce((sum, d) => sum + d.competitor2, 0) / velocityData.length;
  const comp3Avg = velocityData.reduce((sum, d) => sum + d.competitor3, 0) / velocityData.length;

  const velocityGap = avgCompetitor - yourAvg;
  const isWarning = Math.abs(velocityGap) > 5;

  // Prepare comparison data
  const comparisonData = [
    { name: "Website của bạn", avg: yourAvg },
    { name: "Trung bình Top 10", avg: avgCompetitor },
  ];

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tốc độ tăng trưởng backlink của website{" "}
            {velocityGap > 0
              ? `quá chậm so với đối thủ. Bạn đang tăng trưởng ${yourAvg.toFixed(1)} backlinks/tháng trong khi đối thủ trung bình ${avgCompetitor.toFixed(1)} backlinks/tháng.`
              : `quá nhanh so với đối thủ. Bạn đang tăng trưởng ${yourAvg.toFixed(1)} backlinks/tháng, gấp ${(yourAvg / avgCompetitor).toFixed(1)} lần so với đối thủ.`}{" "}
            Khuyến nghị:{" "}
            {velocityGap > 0
              ? "Đẩy mạnh xây dựng liên kết để bắt kịp đối thủ."
              : "Giảm tốc độ xây dựng backlink để đảm bảo tính tự nhiên và tránh bị Google coi là thao túng."}
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
            <p className="text-sm text-muted-foreground">Trung bình đối thủ</p>
            <p className="text-2xl font-bold">{avgCompetitor.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">backlinks/tháng</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Khoảng cách</p>
            <div className="flex items-center gap-2">
              {velocityGap > 0 ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : (
                <TrendingUp className="h-4 w-4 text-green-500" />
              )}
              <p className={`text-2xl font-bold ${velocityGap > 0 ? "text-red-500" : "text-green-500"}`}>
                {velocityGap > 0 ? "-" : "+"}
                {Math.abs(velocityGap).toFixed(1)}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">vs trung bình đối thủ</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tỷ lệ</p>
            <p className="text-2xl font-bold">
              {((yourAvg / avgCompetitor) * 100).toFixed(0)}%
            </p>
            <p className="text-xs text-muted-foreground">so với Top 10</p>
          </div>
        </Card>
      </div>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Tốc Độ Tăng Trưởng Theo Thời Gian
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={velocityData}>
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
                dataKey="top10Avg"
                name="Trung bình Top 10"
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Tốc Độ Trung Bình
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
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
                formatter={(value: number) => [`${value.toFixed(1)} backlinks/tháng`, "Tốc độ"]}
              />
              <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>


      {/* Detailed Comparison Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Bảng So Sánh Chi Tiết
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 text-left font-semibold">Website</th>
                <th className="p-4 text-left font-semibold">Tốc độ trung bình</th>
                <th className="p-4 text-left font-semibold">Tháng cao nhất</th>
                <th className="p-4 text-left font-semibold">Tháng thấp nhất</th>
                <th className="p-4 text-left font-semibold">Độ ổn định</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/50 bg-primary/5">
                <td className="p-4 font-medium">Website của bạn</td>
                <td className="p-4">
                  <Badge variant={velocityGap > 0 ? "destructive" : "default"}>
                    {yourAvg.toFixed(1)} backlinks/tháng
                  </Badge>
                </td>
                <td className="p-4">{Math.max(...velocityData.map((d) => d.you))}</td>
                <td className="p-4">{Math.min(...velocityData.map((d) => d.you))}</td>
                <td className="p-4">
                  <Badge variant="outline">Ổn định</Badge>
                </td>
              </tr>
              <tr className="border-b hover:bg-muted/50">
                <td className="p-4 font-medium">Đối thủ 1</td>
                <td className="p-4">
                  <Badge variant="outline">{comp1Avg.toFixed(1)} backlinks/tháng</Badge>
                </td>
                <td className="p-4">{Math.max(...velocityData.map((d) => d.competitor1))}</td>
                <td className="p-4">{Math.min(...velocityData.map((d) => d.competitor1))}</td>
                <td className="p-4">
                  <Badge variant="outline">Ổn định</Badge>
                </td>
              </tr>
              <tr className="border-b hover:bg-muted/50">
                <td className="p-4 font-medium">Đối thủ 2</td>
                <td className="p-4">
                  <Badge variant="outline">{comp2Avg.toFixed(1)} backlinks/tháng</Badge>
                </td>
                <td className="p-4">{Math.max(...velocityData.map((d) => d.competitor2))}</td>
                <td className="p-4">{Math.min(...velocityData.map((d) => d.competitor2))}</td>
                <td className="p-4">
                  <Badge variant="outline">Ổn định</Badge>
                </td>
              </tr>
              <tr className="hover:bg-muted/50">
                <td className="p-4 font-medium">Đối thủ 3</td>
                <td className="p-4">
                  <Badge variant="outline">{comp3Avg.toFixed(1)} backlinks/tháng</Badge>
                </td>
                <td className="p-4">{Math.max(...velocityData.map((d) => d.competitor3))}</td>
                <td className="p-4">{Math.min(...velocityData.map((d) => d.competitor3))}</td>
                <td className="p-4">
                  <Badge variant="outline">Ổn định</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
