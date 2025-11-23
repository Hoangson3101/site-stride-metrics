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
  ReferenceLine,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingUp, TrendingDown, Activity } from "lucide-react";

export function VelocityStabilityAnalysis() {
  const [stabilityFilter, setStabilityFilter] = useState<string>("all");

  // Velocity data
  const velocityData = [
    { period: "2024-05", you: 12, stable: 15 },
    { period: "2024-06", you: 8, stable: 15 },
    { period: "2024-07", you: 14, stable: 15 },
    { period: "2024-08", you: 18, stable: 15 },
    { period: "2024-09", you: 38, stable: 15, isUnstable: true },
    { period: "2024-10", you: 16, stable: 15 },
    { period: "2024-11", you: 12, stable: 15 },
  ];

  // Calculate stability metrics
  const velocities = velocityData.map((d) => d.you);
  const avgVelocity = velocities.reduce((sum, v) => sum + v, 0) / velocities.length;
  const variance = velocities.reduce((sum, v) => sum + Math.pow(v - avgVelocity, 2), 0) / velocities.length;
  const stdDev = Math.sqrt(variance);
  const coefficientOfVariation = (stdDev / avgVelocity) * 100;
  const isUnstable = coefficientOfVariation > 30;

  // Detect unstable periods
  const unstablePeriods = velocityData.filter((d) => {
    const deviation = Math.abs(d.you - avgVelocity);
    return deviation > stdDev * 1.5;
  });

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isUnstable && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tốc độ tăng trưởng backlink không ổn định. Hệ số biến thiên (CV) là{" "}
            {coefficientOfVariation.toFixed(1)}%, vượt quá ngưỡng ổn định (30%). Phát hiện {unstablePeriods.length}{" "}
            giai đoạn có dao động mạnh. Khuyến nghị: Điều chỉnh chiến lược để đảm bảo tốc độ tăng trưởng ổn định và
            tự nhiên.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tốc độ trung bình</p>
            <p className="text-2xl font-bold">{avgVelocity.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">backlinks/tháng</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Độ lệch chuẩn</p>
            <p className="text-2xl font-bold">{stdDev.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">backlinks/tháng</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Hệ số biến thiên</p>
            <p className={`text-2xl font-bold ${isUnstable ? "text-red-500" : "text-green-500"}`}>
              {coefficientOfVariation.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              {isUnstable ? "Không ổn định" : "Ổn định"}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Giai đoạn không ổn định</p>
            <p className="text-2xl font-bold text-red-500">{unstablePeriods.length}</p>
            <p className="text-xs text-muted-foreground">tháng</p>
          </div>
        </Card>
      </div>

      {/* Stability Chart */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Biểu Đồ Độ Ổn Định Tăng Trưởng Backlink
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
            <ReferenceLine
              y={avgVelocity}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              label="Trung bình"
            />
            <ReferenceLine
              y={avgVelocity + stdDev}
              stroke="hsl(var(--warning))"
              strokeDasharray="3 3"
              label="+1 SD"
            />
            <ReferenceLine
              y={avgVelocity - stdDev}
              stroke="hsl(var(--warning))"
              strokeDasharray="3 3"
              label="-1 SD"
            />
            <Line
              type="monotone"
              dataKey="you"
              name="Tốc độ thực tế"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={(props: any) => {
                const isUnstable = velocityData.find((d) => d.period === props.payload.period)?.isUnstable;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={isUnstable ? 8 : 5}
                    fill={isUnstable ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                    stroke={isUnstable ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                    strokeWidth={isUnstable ? 3 : 1}
                  />
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="stable"
              name="Tốc độ ổn định (mục tiêu)"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Stability Bar Chart */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Phân Tích Độ Lệch So Với Trung Bình
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={velocityData.map((d) => ({ ...d, deviation: d.you - avgVelocity }))}>
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
                `${value > 0 ? "+" : ""}${value.toFixed(1)} backlinks`,
                "Độ lệch",
              ]}
            />
            <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" />
            <Bar
              dataKey="deviation"
              fill={(entry: any) => {
                const absDev = Math.abs(entry.deviation);
                return absDev > stdDev * 1.5 ? "hsl(var(--destructive))" : "hsl(var(--primary))";
              }}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Unstable Periods Table */}
      {unstablePeriods.length > 0 && (
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Danh Sách Giai Đoạn Không Ổn Định
          </h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-semibold">Thời gian</th>
                  <th className="p-4 text-left font-semibold">Tốc độ</th>
                  <th className="p-4 text-left font-semibold">Trung bình</th>
                  <th className="p-4 text-left font-semibold">Độ lệch</th>
                  <th className="p-4 text-left font-semibold">Đánh giá</th>
                </tr>
              </thead>
              <tbody>
                {unstablePeriods.map((period, idx) => {
                  const deviation = period.you - avgVelocity;
                  return (
                    <tr key={idx} className="border-b hover:bg-muted/50 bg-red-50/50 dark:bg-red-950/20">
                      <td className="p-4 font-medium">{period.period}</td>
                      <td className="p-4">
                        <Badge variant="destructive">{period.you} backlinks</Badge>
                      </td>
                      <td className="p-4">{avgVelocity.toFixed(1)} backlinks</td>
                      <td className="p-4">
                        <Badge variant={deviation > 0 ? "destructive" : "outline"}>
                          {deviation > 0 ? "+" : ""}
                          {deviation.toFixed(1)} backlinks
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant="destructive">Không ổn định</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Stability Recommendations */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Gợi ý Ổn Định Chiến Lược
        </h3>
        <div className="space-y-3 text-sm opacity-90">
          {isUnstable ? (
            <>
              <p>
                Tốc độ tăng trưởng backlink không ổn định với hệ số biến thiên {coefficientOfVariation.toFixed(1)}%.
                Để duy trì tốc độ tăng trưởng ổn định:
              </p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Xây dựng liên kết từ các nguồn tự nhiên và đều đặn</li>
                <li>Tránh các chiến dịch xây dựng backlink tập trung trong thời gian ngắn</li>
                <li>Phân bổ đều các hoạt động outreach và link building trong suốt tháng</li>
                <li>Theo dõi và điều chỉnh chiến lược để đảm bảo tốc độ tăng trưởng ổn định</li>
                <li>Tạo lịch trình xây dựng liên kết để duy trì nhịp độ đều đặn</li>
              </ul>
            </>
          ) : (
            <p>
              Tốc độ tăng trưởng backlink đang ổn định với hệ số biến thiên {coefficientOfVariation.toFixed(1)}%.
              Tiếp tục duy trì tốc độ này và đảm bảo chất lượng backlink.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

