import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingUp, TrendingDown, CheckCircle } from "lucide-react";

interface BenchmarkData {
  name: string;
  dofollow: number;
  nofollow: number;
}

export function IndustryStandard() {
  const [comparisonType, setComparisonType] = useState<string>("industry");

  // Your website data
  const yourData = {
    dofollow: 78,
    nofollow: 22,
  };

  // Industry benchmark data
  const industryBenchmark: BenchmarkData[] = [
    { name: "Bạn", dofollow: 78, nofollow: 22 },
    { name: "Chuẩn ngành", dofollow: 75, nofollow: 25 },
    { name: "Top 10 trung bình", dofollow: 72, nofollow: 28 },
    { name: "Top 10 trung bình", dofollow: 70, nofollow: 30 },
  ];

  // Competitor data
  const competitorData: BenchmarkData[] = [
    { name: "Bạn", dofollow: 78, nofollow: 22 },
    { name: "Đối thủ 1", dofollow: 80, nofollow: 20 },
    { name: "Đối thủ 2", dofollow: 75, nofollow: 25 },
    { name: "Đối thủ 3", dofollow: 72, nofollow: 28 },
  ];

  const chartData = comparisonType === "industry" ? industryBenchmark : competitorData;

  const industryAvg = industryBenchmark[1].dofollow;
  const yourDofollow = yourData.dofollow;
  const difference = yourDofollow - industryAvg;
  const isWarning = Math.abs(difference) > 10;

  const getStatusIcon = () => {
    if (difference > 5) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (difference < -5) return <TrendingDown className="h-4 w-4 text-yellow-500" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Comparison Type Selector */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="space-y-2">
          <Select value={comparisonType} onValueChange={setComparisonType}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="industry">So sánh với Chuẩn ngành</SelectItem>
              <SelectItem value="competitors">So sánh với Đối thủ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Chú ý:</strong> Tỷ lệ dofollow của bạn ({yourDofollow}%){" "}
            {difference > 0 ? "cao hơn" : "thấp hơn"} chuẩn ngành ({industryAvg}%) khoảng{" "}
            {Math.abs(difference)} điểm phần trăm.{" "}
            {difference > 10
              ? "Tỷ lệ dofollow quá cao có thể bị Google coi là không tự nhiên."
              : "Cần điều chỉnh để phù hợp hơn với chuẩn ngành."}
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-surface shadow-soft border-green-500/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <p className="text-sm font-medium">Dofollow của bạn</p>
            </div>
            <p className="text-2xl font-bold text-green-500">{yourData.dofollow}%</p>
            <p className="text-xs text-muted-foreground">
              {difference > 0 ? `+${difference}` : difference}% so với chuẩn ngành
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-blue-500/20">
          <div className="space-y-2">
            <p className="text-sm font-medium">Nofollow của bạn</p>
            <p className="text-2xl font-bold text-blue-500">{yourData.nofollow}%</p>
            <p className="text-xs text-muted-foreground">
              {difference > 0 ? `-${difference}` : `+${Math.abs(difference)}`}% so với chuẩn ngành
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm font-medium">Chuẩn ngành</p>
            <p className="text-2xl font-bold">
              {industryAvg}% / {100 - industryAvg}%
            </p>
            <p className="text-xs text-muted-foreground">Dofollow / Nofollow</p>
          </div>
        </Card>
      </div>

      {/* Comparison Chart */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          So sánh Tỷ lệ Dofollow/Nofollow
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
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
            />
            <Legend />
            <Bar dataKey="dofollow" stackId="a" fill="hsl(var(--primary))" name="Dofollow (%)" />
            <Bar dataKey="nofollow" stackId="a" fill="hsl(var(--secondary))" name="Nofollow (%)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Comparison Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Bảng So sánh Chi tiết
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 text-sm font-medium">Website</th>
                <th className="text-right p-3 text-sm font-medium">Dofollow</th>
                <th className="text-right p-3 text-sm font-medium">Nofollow</th>
                <th className="text-right p-3 text-sm font-medium">Chênh lệch</th>
                <th className="text-center p-3 text-sm font-medium">Đánh giá</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((item, idx) => {
                const isYou = item.name === "Bạn";
                const diff = item.dofollow - industryAvg;
                return (
                  <tr
                    key={idx}
                    className={`border-b ${isYou ? "bg-primary/5 font-medium" : ""}`}
                  >
                    <td className="p-3">{item.name}</td>
                    <td className="text-right p-3">
                      <Badge variant={isYou ? "default" : "outline"}>{item.dofollow}%</Badge>
                    </td>
                    <td className="text-right p-3">
                      <Badge variant={isYou ? "secondary" : "outline"}>{item.nofollow}%</Badge>
                    </td>
                    <td className="text-right p-3">
                      {isYou ? (
                        <span className={diff > 0 ? "text-green-500" : diff < 0 ? "text-yellow-500" : "text-muted-foreground"}>
                          {diff > 0 ? "+" : ""}
                          {diff}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="text-center p-3">
                      {isYou ? (
                        Math.abs(diff) <= 5 ? (
                          <Badge className="bg-green-500">Tốt</Badge>
                        ) : Math.abs(diff) <= 10 ? (
                          <Badge className="bg-yellow-500">Cần cải thiện</Badge>
                        ) : (
                          <Badge variant="destructive">Cần điều chỉnh</Badge>
                        )
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-4 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Khuyến nghị Điều chỉnh
        </h3>
        <ul className="space-y-2 text-sm opacity-90">
          {difference > 10 ? (
            <>
              <li>• Tỷ lệ dofollow của bạn quá cao, cần bổ sung thêm backlink nofollow từ các nguồn tự nhiên</li>
              <li>• Tăng tỷ lệ nofollow lên khoảng 25-30% để phù hợp với chuẩn ngành</li>
              <li>• Tập trung vào các backlink nofollow từ bình luận, forum, social media</li>
            </>
          ) : difference < -10 ? (
            <>
              <li>• Tỷ lệ dofollow của bạn quá thấp, cần tăng tỷ lệ dofollow từ các nguồn uy tín</li>
              <li>• Giảm tỷ lệ nofollow xuống khoảng 20-25% để phù hợp với chuẩn ngành</li>
              <li>• Tập trung vào các backlink dofollow từ nội dung bài viết chất lượng</li>
            </>
          ) : (
            <>
              <li>• Tỷ lệ dofollow/nofollow của bạn đang phù hợp với chuẩn ngành</li>
              <li>• Tiếp tục duy trì tỷ lệ này và đảm bảo tính tự nhiên của hồ sơ backlink</li>
              <li>• Theo dõi định kỳ để đảm bảo tỷ lệ không thay đổi đột ngột</li>
            </>
          )}
        </ul>
      </Card>
    </div>
  );
}

