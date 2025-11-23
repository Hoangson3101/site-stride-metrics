import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
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
import { AlertTriangle, Target, TrendingDown, TrendingUp } from "lucide-react";

interface FactorComparison {
  factor: string;
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
  unit?: string;
}

export function OverallFactorsComparison() {
  // Overall factors comparison data
  const factorsComparison: FactorComparison[] = [
    { factor: "Dofollow Ratio", yourWebsite: 75, competitor1: 78, competitor2: 72, competitor3: 70, competitor4: 74, competitor5: 76, competitor6: 73, competitor7: 71, competitor8: 75, competitor9: 72, competitor10: 74, unit: "%" },
    { factor: "Nofollow Ratio", yourWebsite: 20, competitor1: 18, competitor2: 22, competitor3: 25, competitor4: 21, competitor5: 19, competitor6: 23, competitor7: 24, competitor8: 20, competitor9: 23, competitor10: 21, unit: "%" },
    { factor: "Branded Anchor", yourWebsite: 45, competitor1: 50, competitor2: 48, competitor3: 52, competitor4: 49, competitor5: 51, competitor6: 47, competitor7: 53, competitor8: 48, competitor9: 50, competitor10: 46, unit: "%" },
    { factor: "Exact-match Anchor", yourWebsite: 8, competitor1: 5, competitor2: 6, competitor3: 4, competitor4: 5, competitor5: 6, competitor6: 4, competitor7: 5, competitor8: 6, competitor9: 4, competitor10: 5, unit: "%" },
    { factor: "Referring Domains", yourWebsite: 250, competitor1: 420, competitor2: 380, competitor3: 320, competitor4: 340, competitor5: 400, competitor6: 365, competitor7: 335, competitor8: 390, competitor9: 355, competitor10: 330, unit: "" },
    { factor: "High DR Backlinks", yourWebsite: 680, competitor1: 1280, competitor2: 1120, competitor3: 960, competitor4: 1040, competitor5: 1200, competitor6: 1100, competitor7: 1020, competitor8: 1160, competitor9: 1060, competitor10: 1000, unit: "" },
  ];

  // Calculate gaps and warnings
  const dofollowGap =
    (factorsComparison.find((f) => f.factor === "Dofollow Ratio")?.competitor1 || 0) -
    (factorsComparison.find((f) => f.factor === "Dofollow Ratio")?.yourWebsite || 0);
  const rdGap =
    (factorsComparison.find((f) => f.factor === "Referring Domains")?.competitor1 || 0) -
    (factorsComparison.find((f) => f.factor === "Referring Domains")?.yourWebsite || 0);
  const exactMatchGap =
    (factorsComparison.find((f) => f.factor === "Exact-match Anchor")?.yourWebsite || 0) -
    (factorsComparison.find((f) => f.factor === "Exact-match Anchor")?.competitor1 || 0);

  const isDofollowWarning = Math.abs(dofollowGap) > 10;
  const isRDWarning = rdGap > 100;
  const isExactMatchWarning = exactMatchGap > 5;

  // Prepare data for percentage factors
  const percentageFactors = factorsComparison.filter((f) => f.unit === "%");
  const countFactors = factorsComparison.filter((f) => f.unit === "");

  return (
    <div className="space-y-6">
      {/* Warning Alerts */}
      {isRDWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Sự thiếu hụt trong số lượng referring domains. Website của bạn
            thiếu khoảng {rdGap} referring domains so với đối thủ hàng đầu. Khuyến nghị: Tăng cường
            xây dựng referring domains mới để cải thiện hồ sơ backlink.
          </AlertDescription>
        </Alert>
      )}

      {isDofollowWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tỷ lệ dofollow/nofollow không hợp lý. Có sự khác biệt đáng kể
            ({Math.abs(dofollowGap).toFixed(1)}%) so với đối thủ. Khuyến nghị: Điều chỉnh tỷ lệ
            dofollow/nofollow để phù hợp với chuẩn ngành.
          </AlertDescription>
        </Alert>
      )}

      {isExactMatchWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tỷ lệ anchor exact-match quá cao so với đối thủ. Điều này có
            thể bị Google đánh giá là tối ưu hóa quá mức. Khuyến nghị: Giảm tỷ lệ exact-match và
            tăng tỷ lệ branded/generic anchor.
          </AlertDescription>
        </Alert>
      )}

      {/* Percentage Factors Comparison */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          So Sánh Các Yếu Tố Tỷ Lệ (%)
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={percentageFactors}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="factor"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              angle={-45}
              textAnchor="end"
              height={120}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
              formatter={(value: number) => [`${value}%`, "Giá trị"]}
            />
            <Legend />
            <Bar dataKey="yourWebsite" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Website của bạn" />
            <Bar dataKey="competitor1" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} name="Đối thủ 1" />
            <Bar dataKey="competitor2" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} name="Đối thủ 2" />
            <Bar dataKey="competitor3" fill="hsl(var(--warning))" radius={[8, 8, 0, 0]} name="Đối thủ 3" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Count Factors Comparison */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          So Sánh Các Yếu Tố Số Lượng
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={countFactors}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="factor"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              angle={-45}
              textAnchor="end"
              height={120}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
              formatter={(value: number) => [value.toLocaleString(), "Giá trị"]}
            />
            <Legend />
            <Bar dataKey="yourWebsite" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Website của bạn" />
            <Bar dataKey="competitor1" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} name="Đối thủ 1" />
            <Bar dataKey="competitor2" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} name="Đối thủ 2" />
            <Bar dataKey="competitor3" fill="hsl(var(--warning))" radius={[8, 8, 0, 0]} name="Đối thủ 3" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {factorsComparison.slice(0, 3).map((factor, idx) => {
          const avgCompetitor =
            (factor.competitor1 + factor.competitor2 + factor.competitor3 + factor.competitor4 + factor.competitor5 + factor.competitor6 + factor.competitor7 + factor.competitor8 + factor.competitor9 + factor.competitor10) / 10;
          const gap = avgCompetitor - factor.yourWebsite;
          return (
            <Card key={idx} className="p-4 bg-surface shadow-soft">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{factor.factor}</p>
                <p className="text-2xl font-bold">
                  {factor.yourWebsite}
                  {factor.unit}
                </p>
                <div className="flex items-center gap-1 text-xs">
                  {gap > 0 ? (
                    <>
                      <TrendingDown className="h-3 w-3 text-red-500" />
                      <span className="text-red-500">
                        -{gap.toFixed(1)}
                        {factor.unit} vs đối thủ
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">
                        +{Math.abs(gap).toFixed(1)}
                        {factor.unit} vs đối thủ
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detailed Comparison Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Bảng So Sánh Tổng Hợp
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 text-left font-semibold">Yếu tố</th>
                <th className="p-4 text-left font-semibold">Website của bạn</th>
                <th className="p-4 text-left font-semibold">Đối thủ 1</th>
                <th className="p-4 text-left font-semibold">Đối thủ 2</th>
                <th className="p-4 text-left font-semibold">Đối thủ 3</th>
                <th className="p-4 text-left font-semibold">Đối thủ 4</th>
                <th className="p-4 text-left font-semibold">Đối thủ 5</th>
                <th className="p-4 text-left font-semibold">Đối thủ 6</th>
                <th className="p-4 text-left font-semibold">Đối thủ 7</th>
                <th className="p-4 text-left font-semibold">Đối thủ 8</th>
                <th className="p-4 text-left font-semibold">Đối thủ 9</th>
                <th className="p-4 text-left font-semibold">Đối thủ 10</th>
                <th className="p-4 text-left font-semibold">Trung bình Top 10</th>
                <th className="p-4 text-left font-semibold">Khoảng cách</th>
              </tr>
            </thead>
            <tbody>
              {factorsComparison.map((factor, idx) => {
                const avgCompetitor =
                  (factor.competitor1 + factor.competitor2 + factor.competitor3 + factor.competitor4 + factor.competitor5 + factor.competitor6 + factor.competitor7 + factor.competitor8 + factor.competitor9 + factor.competitor10) / 10;
                const gap = avgCompetitor - factor.yourWebsite;
                return (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">{factor.factor}</td>
                    <td className="p-4">
                      {factor.yourWebsite.toLocaleString()}
                      {factor.unit}
                    </td>
                    <td className="p-4">
                      {factor.competitor1.toLocaleString()}
                      {factor.unit}
                    </td>
                    <td className="p-4">
                      {factor.competitor2.toLocaleString()}
                      {factor.unit}
                    </td>
                    <td className="p-4">
                      {factor.competitor3.toLocaleString()}
                      {factor.unit}
                    </td>
                    <td className="p-4">
                      {factor.competitor4.toLocaleString()}
                      {factor.unit}
                    </td>
                    <td className="p-4">
                      {factor.competitor5.toLocaleString()}
                      {factor.unit}
                    </td>
                    <td className="p-4">
                      {factor.competitor6.toLocaleString()}
                      {factor.unit}
                    </td>
                    <td className="p-4">
                      {factor.competitor7.toLocaleString()}
                      {factor.unit}
                    </td>
                    <td className="p-4">
                      {factor.competitor8.toLocaleString()}
                      {factor.unit}
                    </td>
                    <td className="p-4">
                      {factor.competitor9.toLocaleString()}
                      {factor.unit}
                    </td>
                    <td className="p-4">
                      {factor.competitor10.toLocaleString()}
                      {factor.unit}
                    </td>
                    <td className="p-4 font-semibold">
                      {avgCompetitor.toFixed(1)}
                      {factor.unit}
                    </td>
                    <td className="p-4">
                      <Badge variant={gap > 0 ? "destructive" : "default"}>
                        {gap > 0 ? "-" : "+"}
                        {Math.abs(gap).toFixed(1)}
                        {factor.unit}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Strategy Recommendations */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="h-5 w-5" />
          Khuyến Nghị Điều Chỉnh Chiến Lược
        </h3>
        <div className="space-y-3 text-sm opacity-90">
          {isRDWarning && (
            <div>
              <p className="font-semibold mb-1">1. Tăng cường Referring Domains:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Xây dựng quan hệ với các domain mới</li>
                <li>Đa dạng hóa nguồn backlink</li>
                <li>Tăng cường outreach campaigns</li>
              </ul>
            </div>
          )}
          {isDofollowWarning && (
            <div>
              <p className="font-semibold mb-1">2. Cân bằng Dofollow/Nofollow:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Điều chỉnh tỷ lệ dofollow/nofollow phù hợp với chuẩn ngành</li>
                <li>Tăng cường backlink nofollow từ các nguồn tự nhiên</li>
              </ul>
            </div>
          )}
          {isExactMatchWarning && (
            <div>
              <p className="font-semibold mb-1">3. Tối ưu Anchor Text:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Giảm tỷ lệ exact-match anchor</li>
                <li>Tăng tỷ lệ branded và generic anchor</li>
                <li>Đảm bảo sự tự nhiên trong phân phối anchor</li>
              </ul>
            </div>
          )}
          {!isRDWarning && !isDofollowWarning && !isExactMatchWarning && (
            <p>Chiến lược backlink của website đang phù hợp với đối thủ. Tiếp tục duy trì và cải thiện.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

