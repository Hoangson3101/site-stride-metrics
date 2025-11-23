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
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface LinkVelocityData {
  period: string;
  yourWebsite: number;
  competitor1: number;
  competitor2: number;
  competitor3: number;
  competitor4: number;
  competitor5: number;
  competitor6: number;
  competitor7: number;
  competitor8: number;
  competitor9: number;
  competitor10: number;
}

export function LinkVelocityComparison() {
  const [timeRange, setTimeRange] = useState<string>("monthly");

  // Monthly link velocity data
  const monthlyVelocity: LinkVelocityData[] = [
    { period: "2024-05", yourWebsite: 50, competitor1: 80, competitor2: 70, competitor3: 60, competitor4: 65, competitor5: 75, competitor6: 68, competitor7: 72, competitor8: 66, competitor9: 64, competitor10: 62 },
    { period: "2024-06", yourWebsite: 65, competitor1: 95, competitor2: 85, competitor3: 75, competitor4: 80, competitor5: 90, competitor6: 83, competitor7: 88, competitor8: 78, competitor9: 76, competitor10: 74 },
    { period: "2024-07", yourWebsite: 55, competitor1: 90, competitor2: 80, competitor3: 70, competitor4: 75, competitor5: 85, competitor6: 78, competitor7: 82, competitor8: 73, competitor9: 71, competitor10: 69 },
    { period: "2024-08", yourWebsite: 70, competitor1: 100, competitor2: 90, competitor3: 80, competitor4: 85, competitor5: 95, competitor6: 88, competitor7: 92, competitor8: 83, competitor9: 81, competitor10: 79 },
    { period: "2024-09", yourWebsite: 85, competitor1: 110, competitor2: 95, competitor3: 85, competitor4: 90, competitor5: 100, competitor6: 93, competitor7: 97, competitor8: 88, competitor9: 86, competitor10: 84 },
    { period: "2024-10", yourWebsite: 75, competitor1: 105, competitor2: 100, competitor3: 90, competitor4: 95, competitor5: 98, competitor6: 92, competitor7: 96, competitor8: 87, competitor9: 85, competitor10: 83 },
    { period: "2024-11", yourWebsite: 90, competitor1: 120, competitor2: 110, competitor3: 95, competitor4: 100, competitor5: 105, competitor6: 98, competitor7: 102, competitor8: 93, competitor9: 91, competitor10: 89 },
  ];

  // Weekly link velocity data
  const weeklyVelocity: LinkVelocityData[] = [
    { period: "W1", yourWebsite: 12, competitor1: 20, competitor2: 18, competitor3: 15, competitor4: 16, competitor5: 19, competitor6: 17, competitor7: 18, competitor8: 16, competitor9: 15, competitor10: 14 },
    { period: "W2", yourWebsite: 15, competitor1: 22, competitor2: 20, competitor3: 18, competitor4: 19, competitor5: 21, competitor6: 20, competitor7: 21, competitor8: 19, competitor9: 18, competitor10: 17 },
    { period: "W3", yourWebsite: 18, competitor1: 25, competitor2: 22, competitor3: 20, competitor4: 21, competitor5: 24, competitor6: 22, competitor7: 23, competitor8: 21, competitor9: 20, competitor10: 19 },
    { period: "W4", yourWebsite: 20, competitor1: 28, competitor2: 25, competitor3: 22, competitor4: 23, competitor5: 26, competitor6: 24, competitor7: 25, competitor8: 23, competitor9: 22, competitor10: 21 },
  ];

  const velocityData = timeRange === "monthly" ? monthlyVelocity : weeklyVelocity;

  // Calculate average velocity
  const yourAvgVelocity =
    velocityData.reduce((sum, d) => sum + d.yourWebsite, 0) / velocityData.length;
  const competitor1AvgVelocity =
    velocityData.reduce((sum, d) => sum + d.competitor1, 0) / velocityData.length;
  const competitor2AvgVelocity =
    velocityData.reduce((sum, d) => sum + d.competitor2, 0) / velocityData.length;
  const competitor3AvgVelocity =
    velocityData.reduce((sum, d) => sum + d.competitor3, 0) / velocityData.length;
  const competitor4AvgVelocity =
    velocityData.reduce((sum, d) => sum + d.competitor4, 0) / velocityData.length;
  const competitor5AvgVelocity =
    velocityData.reduce((sum, d) => sum + d.competitor5, 0) / velocityData.length;
  const competitor6AvgVelocity =
    velocityData.reduce((sum, d) => sum + d.competitor6, 0) / velocityData.length;
  const competitor7AvgVelocity =
    velocityData.reduce((sum, d) => sum + d.competitor7, 0) / velocityData.length;
  const competitor8AvgVelocity =
    velocityData.reduce((sum, d) => sum + d.competitor8, 0) / velocityData.length;
  const competitor9AvgVelocity =
    velocityData.reduce((sum, d) => sum + d.competitor9, 0) / velocityData.length;
  const competitor10AvgVelocity =
    velocityData.reduce((sum, d) => sum + d.competitor10, 0) / velocityData.length;
  const avgCompetitorVelocity = (competitor1AvgVelocity + competitor2AvgVelocity + competitor3AvgVelocity + competitor4AvgVelocity + competitor5AvgVelocity + competitor6AvgVelocity + competitor7AvgVelocity + competitor8AvgVelocity + competitor9AvgVelocity + competitor10AvgVelocity) / 10;

  // Detect spikes
  const recentData = velocityData.slice(-3);
  const avgRecent = recentData.reduce((sum, d) => sum + d.yourWebsite, 0) / recentData.length;
  const previousAvg = velocityData.slice(0, -3).reduce((sum, d) => sum + d.yourWebsite, 0) / (velocityData.length - 3);
  const spikePercentage = ((avgRecent - previousAvg) / previousAvg) * 100;
  const isSpikeWarning = Math.abs(spikePercentage) > 50;

  // Check if velocity is too slow or too fast
  const velocityGap = avgCompetitorVelocity - yourAvgVelocity;
  const isVelocityWarning = velocityGap > 30 || yourAvgVelocity < 20;

  return (
    <div className="space-y-6">
      {/* Warning Alerts */}
      {isVelocityWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tốc độ tăng trưởng backlink của website ({yourAvgVelocity.toFixed(1)}{" "}
            backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}) quá chậm so với đối thủ (trung bình:{" "}
            {avgCompetitorVelocity.toFixed(1)} backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}).
            Khuyến nghị: Tăng cường tốc độ xây dựng backlink để bắt kịp đối thủ.
          </AlertDescription>
        </Alert>
      )}

      {isSpikeWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo Spike bất thường:</strong> Tốc độ tăng trưởng backlink có sự đột biến (
            {spikePercentage > 0 ? "+" : ""}
            {spikePercentage.toFixed(1)}%) trong thời gian gần đây. Điều này có thể do chiến dịch PR
            hoặc tấn công negative SEO. Khuyến nghị: Kiểm tra lý do và đảm bảo các backlink mới có
            chất lượng tốt.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tốc độ của bạn</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{yourAvgVelocity.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">
                /{timeRange === "monthly" ? "tháng" : "tuần"}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs">
              {velocityGap > 0 ? (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">-{velocityGap.toFixed(1)} vs đối thủ</span>
                </>
              ) : (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{Math.abs(velocityGap).toFixed(1)} vs đối thủ</span>
                </>
              )}
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Đối thủ 1</p>
            <p className="text-2xl font-bold">{competitor1AvgVelocity.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">
              /{timeRange === "monthly" ? "tháng" : "tuần"}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Đối thủ 2</p>
            <p className="text-2xl font-bold">{competitor2AvgVelocity.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">
              /{timeRange === "monthly" ? "tháng" : "tuần"}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Đối thủ 3</p>
            <p className="text-2xl font-bold">{competitor3AvgVelocity.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">
              /{timeRange === "monthly" ? "tháng" : "tuần"}
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

      {/* Link Velocity Chart */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          So Sánh Tốc Độ Tăng Trưởng Backlink
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
              dataKey="yourWebsite"
              name="Website của bạn"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="competitor1"
              name="Đối thủ 1"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="competitor2"
              name="Đối thủ 2"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="competitor3"
              name="Đối thủ 3"
              stroke="hsl(var(--warning))"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Velocity Trend Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân Tích Xu Hướng
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tốc độ trung bình của bạn</span>
              <Badge variant={velocityGap > 0 ? "destructive" : "default"}>
                {yourAvgVelocity.toFixed(1)} backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tốc độ trung bình đối thủ</span>
              <Badge variant="outline">
                {avgCompetitorVelocity.toFixed(1)} backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Khoảng cách</span>
              <Badge variant={velocityGap > 0 ? "destructive" : "default"}>
                {velocityGap > 0 ? "-" : "+"}
                {Math.abs(velocityGap).toFixed(1)} backlinks/{timeRange === "monthly" ? "tháng" : "tuần"}
              </Badge>
            </div>
            {isSpikeWarning && (
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">Spike gần đây</span>
                <Badge variant="destructive">
                  {spikePercentage > 0 ? "+" : ""}
                  {spikePercentage.toFixed(1)}%
                </Badge>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Khuyến Nghị
          </h3>
          <div className="space-y-3 text-sm">
            {velocityGap > 0 ? (
              <>
                <p className="text-muted-foreground">
                  Website của bạn đang tăng trưởng chậm hơn đối thủ. Để bắt kịp, bạn cần:
                </p>
                <ul className="space-y-1 ml-4 list-disc text-muted-foreground">
                  <li>Tăng cường tốc độ xây dựng backlink</li>
                  <li>Tối ưu hóa chiến lược outreach</li>
                  <li>Đa dạng hóa nguồn backlink</li>
                  <li>Theo dõi và điều chỉnh chiến lược định kỳ</li>
                </ul>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">
                  Website của bạn đang tăng trưởng tốt. Tiếp tục duy trì tốc độ này và đảm bảo chất
                  lượng backlink.
                </p>
              </>
            )}
            {isSpikeWarning && (
              <div className="pt-2 border-t">
                <p className="text-yellow-600 dark:text-yellow-400 font-medium">
                  ⚠️ Cảnh báo: Phát hiện spike bất thường. Vui lòng kiểm tra các backlink mới để
                  đảm bảo chất lượng.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

