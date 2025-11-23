import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
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
import { AlertTriangle, TrendingUp, TrendingDown, Activity } from "lucide-react";

export function LinkVelocityOverview() {
  const [timeRange, setTimeRange] = useState<string>("monthly");

  // Monthly velocity data
  const monthlyVelocity = [
    { period: "2024-05", you: 12, top10Avg: 22 },
    { period: "2024-06", you: 8, top10Avg: 21 },
    { period: "2024-07", you: 14, top10Avg: 23 },
    { period: "2024-08", you: 18, top10Avg: 22 },
    { period: "2024-09", you: 38, top10Avg: 22 },
    { period: "2024-10", you: 16, top10Avg: 23 },
    { period: "2024-11", you: 12, top10Avg: 24 },
  ];

  // Weekly velocity data
  const weeklyVelocity = [
    { period: "W1", you: 3, top10Avg: 6 },
    { period: "W2", you: 4, top10Avg: 5 },
    { period: "W3", you: 3, top10Avg: 6 },
    { period: "W4", you: 5, top10Avg: 6 },
  ];

  const velocityData = timeRange === "monthly" ? monthlyVelocity : weeklyVelocity;

  // Calculate averages
  const yourAvgVelocity = velocityData.reduce((sum, d) => sum + d.you, 0) / velocityData.length;
  const avgCompetitor = velocityData.reduce((sum, d) => sum + d.top10Avg, 0) / velocityData.length;

  // Detect if velocity is too fast or too slow
  const velocityGap = avgCompetitor - yourAvgVelocity;
  const isTooSlow = velocityGap > 30;
  const isTooFast = yourAvgVelocity > avgCompetitor * 1.5;

  // Detect spikes
  const recentData = velocityData.slice(-3);
  const avgRecent = recentData.reduce((sum, d) => sum + d.you, 0) / recentData.length;
  const previousAvg = velocityData.slice(0, -3).reduce((sum, d) => sum + d.you, 0) / (velocityData.length - 3);
  const spikePercentage = ((avgRecent - previousAvg) / previousAvg) * 100;
  const hasSpike = Math.abs(spikePercentage) > 50;

  return (
    <div className="space-y-6">
      {/* Warning Alerts */}
      {isTooSlow && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tốc độ tăng trưởng backlink quá chậm. Bạn đang tăng trưởng{" "}
            {yourAvgVelocity.toFixed(1)} backlinks/{timeRange === "monthly" ? "tháng" : "tuần"} trong khi đối thủ
            trung bình {avgCompetitor.toFixed(1)} backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}. Khuyến
            nghị: Tăng cường tốc độ xây dựng backlink để bắt kịp đối thủ.
          </AlertDescription>
        </Alert>
      )}

      {isTooFast && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Tốc độ tăng trưởng backlink quá nhanh. Bạn đang tăng trưởng{" "}
            {yourAvgVelocity.toFixed(1)} backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}, gấp{" "}
            {(yourAvgVelocity / avgCompetitor).toFixed(1)} lần so với đối thủ. Điều này có thể bị Google coi là
            thao túng. Khuyến nghị: Giảm tốc độ xây dựng backlink để đảm bảo tính tự nhiên.
          </AlertDescription>
        </Alert>
      )}

      {hasSpike && (
        <Alert variant="destructive" className="border-orange-500 bg-orange-50 dark:bg-orange-950">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            <strong>Phát hiện Spike:</strong> Tốc độ tăng trưởng có sự thay đổi đột ngột (
            {spikePercentage > 0 ? "+" : ""}
            {spikePercentage.toFixed(1)}%) trong thời gian gần đây. Cần kiểm tra lý do và đảm bảo các backlink mới
            có chất lượng tốt.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tốc độ của bạn</p>
            <p className="text-2xl font-bold">{yourAvgVelocity.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">
              backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Trung bình đối thủ</p>
            <p className="text-2xl font-bold">{avgCompetitor.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">
              backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}
            </p>
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
            <p className="text-sm text-muted-foreground">Tháng cao nhất</p>
            <p className="text-2xl font-bold">
              {Math.max(...velocityData.map((d) => d.you))}
            </p>
            <p className="text-xs text-muted-foreground">
              {velocityData.find((d) => d.you === Math.max(...velocityData.map((d) => d.you)))?.period}
            </p>
          </div>
        </Card>
      </div>

      {/* Time Range Filter */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Khoảng thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Theo tháng</SelectItem>
                <SelectItem value="weekly">Theo tuần</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Velocity Chart */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Biểu Đồ Tăng Trưởng Backlink Theo Thời Gian
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
              formatter={(value: number) => [
                `${value} backlinks/${timeRange === "monthly" ? "tháng" : "tuần"}`,
                "Tốc độ",
              ]}
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

      {/* Velocity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Thống Kê Tốc Độ</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tốc độ trung bình của bạn</span>
              <Badge variant={velocityGap > 0 ? "destructive" : "default"}>
                {yourAvgVelocity.toFixed(1)} backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tốc độ trung bình đối thủ</span>
              <Badge variant="outline">
                {avgCompetitor.toFixed(1)} backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Khoảng cách</span>
              <Badge variant={velocityGap > 0 ? "destructive" : "default"}>
                {velocityGap > 0 ? "-" : "+"}
                {Math.abs(velocityGap).toFixed(1)} backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tháng cao nhất</span>
              <Badge>
                {Math.max(...velocityData.map((d) => d.you))} backlinks
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tháng thấp nhất</span>
              <Badge variant="secondary">
                {Math.min(...velocityData.map((d) => d.you))} backlinks
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">So Sánh với Top 10</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Trung bình Top 10</span>
              <Badge className="bg-primary">{avgCompetitor.toFixed(1)} backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Khoảng cách</span>
              <Badge variant={velocityGap > 0 ? "destructive" : "default"}>
                {velocityGap > 0 ? "-" : "+"}
                {Math.abs(velocityGap).toFixed(1)} backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}
              </Badge>
            </div>
            <div className="pt-3 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tỷ lệ so với Top 10</span>
                <Badge className={velocityGap > 0 ? "bg-yellow-500" : "bg-green-500"}>
                  {((yourAvgVelocity / avgCompetitor) * 100).toFixed(0)}%
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Đánh Giá</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tốc độ</span>
              <Badge variant={isTooSlow ? "destructive" : isTooFast ? "destructive" : "default"}>
                {isTooSlow ? "Quá chậm" : isTooFast ? "Quá nhanh" : "Ổn định"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Spike</span>
              <Badge variant={hasSpike ? "destructive" : "default"}>
                {hasSpike ? "Có spike" : "Không có"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">So với đối thủ</span>
              <Badge variant={velocityGap > 0 ? "destructive" : "default"}>
                {velocityGap > 0 ? "Chậm hơn" : "Nhanh hơn"}
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
