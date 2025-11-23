import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

export function BacklinkTimelineAnalysis() {
  const [timeRange, setTimeRange] = useState<string>("6months");

  // Timeline Data
  const timelineData = [
    { month: "2024-05", total: 1800, gained: 45, lost: 2, net: 43 },
    { month: "2024-06", total: 1843, gained: 52, lost: 3, net: 49 },
    { month: "2024-07", total: 1892, gained: 68, lost: 5, net: 63 },
    { month: "2024-08", total: 1955, gained: 75, lost: 4, net: 71 },
    { month: "2024-09", total: 2026, gained: 82, lost: 6, net: 76 },
    { month: "2024-10", total: 2102, gained: 95, lost: 8, net: 87 },
    { month: "2024-11", total: 2189, gained: 105, lost: 3, net: 102 },
  ];

  const recentLoss = timelineData[timelineData.length - 1].lost;
  const recentGain = timelineData[timelineData.length - 1].gained;
  const isWarning = recentLoss > recentGain * 0.2;

  return (
    <div className="space-y-6">
      {/* Timeline Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Biến Động Backlink Theo Thời Gian
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timelineData}>
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
              <Area
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                name="Tổng Backlinks"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Gained vs Lost Backlinks
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
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
                dataKey="gained"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Gained"
              />
              <Line
                type="monotone"
                dataKey="lost"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                name="Lost"
              />
              <Line
                type="monotone"
                dataKey="net"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Net Change"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Cảnh báo:</strong> Có sự biến động bất thường trong hồ sơ backlink. Số lượng
            backlink bị mất ({recentLoss}) gần bằng hoặc vượt quá 20% số lượng backlink mới ({recentGain}).
            Khuyến nghị: Kiểm tra lý do mất backlink (chiến dịch PR, đối thủ tấn công SEO, hoặc vấn
            đề kỹ thuật).
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng Backlinks</p>
            <p className="text-2xl font-bold">
              {timelineData[timelineData.length - 1].total}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +{timelineData[timelineData.length - 1].net} tháng này
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-green-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Gained (tháng này)</p>
            <p className="text-2xl font-bold text-green-500">
              {timelineData[timelineData.length - 1].gained}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Lost (tháng này)</p>
            <p className="text-2xl font-bold text-red-500">
              {timelineData[timelineData.length - 1].lost}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Net Change</p>
            <p className="text-2xl font-bold">
              {timelineData[timelineData.length - 1].net > 0 ? "+" : ""}
              {timelineData[timelineData.length - 1].net}
            </p>
          </div>
        </Card>
      </div>

      {/* Time Range Filter */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="space-y-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 tháng gần đây</SelectItem>
              <SelectItem value="6months">6 tháng gần đây</SelectItem>
              <SelectItem value="12months">12 tháng gần đây</SelectItem>
              <SelectItem value="all">Tất cả thời gian</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  );
}

