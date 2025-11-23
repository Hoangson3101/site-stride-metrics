import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface CompetitorRatio {
  name: string;
  dofollow: number;
  nofollow: number;
  ugc: number;
  sponsored: number;
}

export function CompetitorDofollowComparison() {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([
    "competitor1",
    "competitor2",
    "competitor3",
  ]);

  // Your website data
  const yourWebsite: CompetitorRatio = {
    name: "Website của bạn",
    dofollow: 75,
    nofollow: 22,
    ugc: 2,
    sponsored: 1,
  };

  // Competitors data
  const competitors: CompetitorRatio[] = [
    {
      name: "Đối thủ 1",
      dofollow: 78,
      nofollow: 18,
      ugc: 3,
      sponsored: 1,
    },
    {
      name: "Đối thủ 2",
      dofollow: 72,
      nofollow: 22,
      ugc: 4,
      sponsored: 2,
    },
    {
      name: "Đối thủ 3",
      dofollow: 70,
      nofollow: 25,
      ugc: 3,
      sponsored: 2,
    },
  ];

  // Prepare data for charts
  const comparisonData = [
    {
      name: "Website của bạn",
      dofollow: yourWebsite.dofollow,
      nofollow: yourWebsite.nofollow,
    },
    {
      name: "Đối thủ 1",
      dofollow: competitors[0].dofollow,
      nofollow: competitors[0].nofollow,
    },
    {
      name: "Đối thủ 2",
      dofollow: competitors[1].dofollow,
      nofollow: competitors[1].nofollow,
    },
    {
      name: "Đối thủ 3",
      dofollow: competitors[2].dofollow,
      nofollow: competitors[2].nofollow,
    },
  ];

  const avgCompetitorDofollow =
    competitors.reduce((sum, c) => sum + c.dofollow, 0) / competitors.length;
  const avgCompetitorNofollow =
    competitors.reduce((sum, c) => sum + c.nofollow, 0) / competitors.length;
  const dofollowGap = avgCompetitorDofollow - yourWebsite.dofollow;
  const nofollowGap = avgCompetitorNofollow - yourWebsite.nofollow;
  const isWarning = Math.abs(dofollowGap) > 10 || Math.abs(nofollowGap) > 10;

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))"];

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tỷ lệ dofollow/nofollow của website khác biệt quá lớn so với
            đối thủ. Dofollow: {yourWebsite.dofollow}% (trung bình đối thủ: {avgCompetitorDofollow.toFixed(1)}%),{" "}
            Nofollow: {yourWebsite.nofollow}% (trung bình đối thủ: {avgCompetitorNofollow.toFixed(1)}%).{" "}
            Khuyến nghị: Điều chỉnh tỷ lệ dofollow/nofollow để phù hợp với chuẩn ngành và tự nhiên hơn.
          </AlertDescription>
        </Alert>
      )}

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Tỷ Lệ Dofollow/Nofollow
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
                formatter={(value: number) => [`${value}%`, "Tỷ lệ"]}
              />
              <Legend />
              <Bar dataKey="dofollow" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Dofollow" />
              <Bar dataKey="nofollow" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} name="Nofollow" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân Bổ Website của bạn
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={[
                  { name: "Dofollow", value: yourWebsite.dofollow },
                  { name: "Nofollow", value: yourWebsite.nofollow },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="hsl(var(--primary))" />
                <Cell fill="hsl(var(--secondary))" />
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) => [`${value}%`, "Tỷ lệ"]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Dofollow của bạn</p>
            <p className="text-2xl font-bold">{yourWebsite.dofollow}%</p>
            <p className="text-xs text-muted-foreground">
              Avg đối thủ: {avgCompetitorDofollow.toFixed(1)}%
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Nofollow của bạn</p>
            <p className="text-2xl font-bold">{yourWebsite.nofollow}%</p>
            <p className="text-xs text-muted-foreground">
              Avg đối thủ: {avgCompetitorNofollow.toFixed(1)}%
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Dofollow Gap</p>
            <p className={`text-2xl font-bold ${dofollowGap > 0 ? "text-red-500" : "text-green-500"}`}>
              {dofollowGap > 0 ? "+" : ""}
              {dofollowGap.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">vs trung bình đối thủ</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Nofollow Gap</p>
            <p className={`text-2xl font-bold ${nofollowGap > 0 ? "text-green-500" : "text-red-500"}`}>
              {nofollowGap > 0 ? "+" : ""}
              {nofollowGap.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">vs trung bình đối thủ</p>
          </div>
        </Card>
      </div>

      {/* Competitors Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Danh Sách Đối Thủ và Tỷ Lệ Dofollow/Nofollow
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 text-left font-semibold">Website</th>
                <th className="p-4 text-left font-semibold">Dofollow</th>
                <th className="p-4 text-left font-semibold">Nofollow</th>
                <th className="p-4 text-left font-semibold">UGC</th>
                <th className="p-4 text-left font-semibold">Sponsored</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/50 bg-primary/5">
                <td className="p-4 font-medium">Website của bạn</td>
                <td className="p-4">
                  <Badge className="bg-green-500">{yourWebsite.dofollow}%</Badge>
                </td>
                <td className="p-4">
                  <Badge className="bg-blue-500">{yourWebsite.nofollow}%</Badge>
                </td>
                <td className="p-4">
                  <Badge variant="outline">{yourWebsite.ugc}%</Badge>
                </td>
                <td className="p-4">
                  <Badge variant="outline">{yourWebsite.sponsored}%</Badge>
                </td>
              </tr>
              {competitors.map((competitor, idx) => (
                <tr key={idx} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{competitor.name}</td>
                  <td className="p-4">
                    <Badge className="bg-green-500">{competitor.dofollow}%</Badge>
                  </td>
                  <td className="p-4">
                    <Badge className="bg-blue-500">{competitor.nofollow}%</Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{competitor.ugc}%</Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{competitor.sponsored}%</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Competitor Selection */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium">Chọn đối thủ để so sánh:</p>
          <div className="flex gap-2">
            {competitors.map((comp, idx) => (
              <Button
                key={idx}
                variant={selectedCompetitors.includes(`competitor${idx + 1}`) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const newSelection = selectedCompetitors.includes(`competitor${idx + 1}`)
                    ? selectedCompetitors.filter((c) => c !== `competitor${idx + 1}`)
                    : [...selectedCompetitors, `competitor${idx + 1}`];
                  setSelectedCompetitors(newSelection);
                }}
              >
                {comp.name}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

