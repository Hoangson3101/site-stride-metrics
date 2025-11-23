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
import { AlertTriangle, TrendingDown, TrendingUp, Target } from "lucide-react";

interface Competitor {
  name: string;
  backlinks: number;
  referringDomains: number;
  highDRBacklinks: number;
  dofollowRatio: number;
  nofollowRatio: number;
}

export function BenchmarkingOverview() {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(["top10"]);

  // Your website data
  const yourWebsite: Competitor = {
    name: "Website của bạn",
    backlinks: 1850,
    referringDomains: 250,
    highDRBacklinks: 680,
    dofollowRatio: 75,
    nofollowRatio: 25,
  };

  // Top 10 average data
  const top10Avg: Competitor = {
    name: "Trung bình Top 10",
    backlinks: 2800,
    referringDomains: 370,
    highDRBacklinks: 1120,
    dofollowRatio: 75,
    nofollowRatio: 25,
  };

  // Sample competitor data
  const competitors: Competitor[] = [
    {
      name: "Đối thủ 1",
      backlinks: 3200,
      referringDomains: 420,
      highDRBacklinks: 1280,
      dofollowRatio: 78,
      nofollowRatio: 22,
    },
    {
      name: "Đối thủ 2",
      backlinks: 2900,
      referringDomains: 380,
      highDRBacklinks: 1120,
      dofollowRatio: 72,
      nofollowRatio: 28,
    },
    {
      name: "Đối thủ 3",
      backlinks: 2700,
      referringDomains: 350,
      highDRBacklinks: 980,
      dofollowRatio: 70,
      nofollowRatio: 30,
    },
    {
      name: "Đối thủ 4",
      backlinks: 2600,
      referringDomains: 340,
      highDRBacklinks: 1040,
      dofollowRatio: 74,
      nofollowRatio: 26,
    },
    {
      name: "Đối thủ 5",
      backlinks: 3000,
      referringDomains: 400,
      highDRBacklinks: 1200,
      dofollowRatio: 76,
      nofollowRatio: 24,
    },
    {
      name: "Đối thủ 6",
      backlinks: 2750,
      referringDomains: 365,
      highDRBacklinks: 1100,
      dofollowRatio: 73,
      nofollowRatio: 27,
    },
    {
      name: "Đối thủ 7",
      backlinks: 2550,
      referringDomains: 335,
      highDRBacklinks: 1020,
      dofollowRatio: 71,
      nofollowRatio: 29,
    },
    {
      name: "Đối thủ 8",
      backlinks: 2900,
      referringDomains: 390,
      highDRBacklinks: 1160,
      dofollowRatio: 75,
      nofollowRatio: 25,
    },
    {
      name: "Đối thủ 9",
      backlinks: 2650,
      referringDomains: 355,
      highDRBacklinks: 1060,
      dofollowRatio: 72,
      nofollowRatio: 28,
    },
    {
      name: "Đối thủ 10",
      backlinks: 2500,
      referringDomains: 330,
      highDRBacklinks: 1000,
      dofollowRatio: 74,
      nofollowRatio: 26,
    },
  ];

  // Calculate averages
  const avgCompetitorBacklinks = competitors.reduce((sum, c) => sum + c.backlinks, 0) / competitors.length;
  const avgCompetitorRD = competitors.reduce((sum, c) => sum + c.referringDomains, 0) / competitors.length;

  // Prepare data for charts
  const comparisonData = [
    {
      name: "Backlinks",
      "Website của bạn": yourWebsite.backlinks,
      "Trung bình Top 10": top10Avg.backlinks,
    },
    {
      name: "Referring Domains",
      "Website của bạn": yourWebsite.referringDomains,
      "Trung bình Top 10": top10Avg.referringDomains,
    },
    {
      name: "High DR Backlinks",
      "Website của bạn": yourWebsite.highDRBacklinks,
      "Trung bình Top 10": top10Avg.highDRBacklinks,
    },
  ];

  const dofollowComparison = [
    { name: "Website của bạn", value: yourWebsite.dofollowRatio },
    { name: "Trung bình Top 10", value: top10Avg.dofollowRatio },
  ];

  // Calculate gaps
  const backlinkGap = top10Avg.backlinks - yourWebsite.backlinks;
  const rdGap = top10Avg.referringDomains - yourWebsite.referringDomains;
  const isWarning = backlinkGap > 500 || rdGap > 50;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
  ];

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Có sự chênh lệch lớn giữa website của bạn và đối thủ. Website
            của bạn thiếu khoảng {Math.round(backlinkGap)} backlinks và {Math.round(rdGap)} referring
            domains so với trung bình đối thủ. Khuyến nghị: Tăng cường xây dựng backlink và mở rộng
            referring domains để bắt kịp đối thủ.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Backlinks Gap</p>
            <div className="flex items-center gap-2">
              {backlinkGap > 0 ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : (
                <TrendingUp className="h-4 w-4 text-green-500" />
              )}
              <p className={`text-2xl font-bold ${backlinkGap > 0 ? "text-red-500" : "text-green-500"}`}>
                {backlinkGap > 0 ? "-" : "+"}
                {Math.abs(Math.round(backlinkGap))}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">vs trung bình Top 10</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">RD Gap</p>
            <div className="flex items-center gap-2">
              {rdGap > 0 ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : (
                <TrendingUp className="h-4 w-4 text-green-500" />
              )}
              <p className={`text-2xl font-bold ${rdGap > 0 ? "text-red-500" : "text-green-500"}`}>
                {rdGap > 0 ? "-" : "+"}
                {Math.abs(Math.round(rdGap))}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">vs trung bình Top 10</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">High DR Backlinks</p>
            <p className="text-2xl font-bold">{yourWebsite.highDRBacklinks}</p>
            <p className="text-xs text-muted-foreground">
              {((yourWebsite.highDRBacklinks / yourWebsite.backlinks) * 100).toFixed(1)}% tổng backlinks
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Dofollow Ratio</p>
            <p className="text-2xl font-bold">{yourWebsite.dofollowRatio}%</p>
            <p className="text-xs text-muted-foreground">vs Top 10: {top10Avg.dofollowRatio}%</p>
          </div>
        </Card>
      </div>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Backlinks & Referring Domains
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
              />
              <Legend />
              <Bar dataKey="Website của bạn" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Trung bình Top 10" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Tỷ Lệ Dofollow
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dofollowComparison}>
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
                formatter={(value: number) => [`${value}%`, "Dofollow Ratio"]}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
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
                <th className="p-4 text-left font-semibold">Chỉ số</th>
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
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/50">
                <td className="p-4 font-medium">Backlinks</td>
                <td className="p-4">{yourWebsite.backlinks.toLocaleString()}</td>
                <td className="p-4">{competitors[0].backlinks.toLocaleString()}</td>
                <td className="p-4">{competitors[1].backlinks.toLocaleString()}</td>
                <td className="p-4">{competitors[2].backlinks.toLocaleString()}</td>
                <td className="p-4">{competitors[3].backlinks.toLocaleString()}</td>
                <td className="p-4">{competitors[4].backlinks.toLocaleString()}</td>
                <td className="p-4">{competitors[5].backlinks.toLocaleString()}</td>
                <td className="p-4">{competitors[6].backlinks.toLocaleString()}</td>
                <td className="p-4">{competitors[7].backlinks.toLocaleString()}</td>
                <td className="p-4">{competitors[8].backlinks.toLocaleString()}</td>
                <td className="p-4">{competitors[9].backlinks.toLocaleString()}</td>
                <td className="p-4 font-semibold">{Math.round(avgCompetitorBacklinks).toLocaleString()}</td>
              </tr>
              <tr className="border-b hover:bg-muted/50">
                <td className="p-4 font-medium">Referring Domains</td>
                <td className="p-4">{yourWebsite.referringDomains.toLocaleString()}</td>
                <td className="p-4">{competitors[0].referringDomains.toLocaleString()}</td>
                <td className="p-4">{competitors[1].referringDomains.toLocaleString()}</td>
                <td className="p-4">{competitors[2].referringDomains.toLocaleString()}</td>
                <td className="p-4">{competitors[3].referringDomains.toLocaleString()}</td>
                <td className="p-4">{competitors[4].referringDomains.toLocaleString()}</td>
                <td className="p-4">{competitors[5].referringDomains.toLocaleString()}</td>
                <td className="p-4">{competitors[6].referringDomains.toLocaleString()}</td>
                <td className="p-4">{competitors[7].referringDomains.toLocaleString()}</td>
                <td className="p-4">{competitors[8].referringDomains.toLocaleString()}</td>
                <td className="p-4">{competitors[9].referringDomains.toLocaleString()}</td>
                <td className="p-4 font-semibold">{Math.round(avgCompetitorRD).toLocaleString()}</td>
              </tr>
              <tr className="border-b hover:bg-muted/50">
                <td className="p-4 font-medium">High DR Backlinks (DR≥30)</td>
                <td className="p-4">{yourWebsite.highDRBacklinks.toLocaleString()}</td>
                <td className="p-4">{competitors[0].highDRBacklinks.toLocaleString()}</td>
                <td className="p-4">{competitors[1].highDRBacklinks.toLocaleString()}</td>
                <td className="p-4">{competitors[2].highDRBacklinks.toLocaleString()}</td>
                <td className="p-4">{competitors[3].highDRBacklinks.toLocaleString()}</td>
                <td className="p-4">{competitors[4].highDRBacklinks.toLocaleString()}</td>
                <td className="p-4">{competitors[5].highDRBacklinks.toLocaleString()}</td>
                <td className="p-4">{competitors[6].highDRBacklinks.toLocaleString()}</td>
                <td className="p-4">{competitors[7].highDRBacklinks.toLocaleString()}</td>
                <td className="p-4">{competitors[8].highDRBacklinks.toLocaleString()}</td>
                <td className="p-4">{competitors[9].highDRBacklinks.toLocaleString()}</td>
                <td className="p-4 font-semibold">
                  {Math.round(
                    competitors.reduce((sum, c) => sum + c.highDRBacklinks, 0) / competitors.length
                  ).toLocaleString()}
                </td>
              </tr>
              <tr className="border-b hover:bg-muted/50">
                <td className="p-4 font-medium">Dofollow Ratio</td>
                <td className="p-4">{yourWebsite.dofollowRatio}%</td>
                <td className="p-4">{competitors[0].dofollowRatio}%</td>
                <td className="p-4">{competitors[1].dofollowRatio}%</td>
                <td className="p-4">{competitors[2].dofollowRatio}%</td>
                <td className="p-4">{competitors[3].dofollowRatio}%</td>
                <td className="p-4">{competitors[4].dofollowRatio}%</td>
                <td className="p-4">{competitors[5].dofollowRatio}%</td>
                <td className="p-4">{competitors[6].dofollowRatio}%</td>
                <td className="p-4">{competitors[7].dofollowRatio}%</td>
                <td className="p-4">{competitors[8].dofollowRatio}%</td>
                <td className="p-4">{competitors[9].dofollowRatio}%</td>
                <td className="p-4 font-semibold">
                  {Math.round(
                    competitors.reduce((sum, c) => sum + c.dofollowRatio, 0) / competitors.length
                  )}
                  %
                </td>
              </tr>
              <tr className="hover:bg-muted/50">
                <td className="p-4 font-medium">Nofollow Ratio</td>
                <td className="p-4">{yourWebsite.nofollowRatio}%</td>
                <td className="p-4">{competitors[0].nofollowRatio}%</td>
                <td className="p-4">{competitors[1].nofollowRatio}%</td>
                <td className="p-4">{competitors[2].nofollowRatio}%</td>
                <td className="p-4">{competitors[3].nofollowRatio}%</td>
                <td className="p-4">{competitors[4].nofollowRatio}%</td>
                <td className="p-4">{competitors[5].nofollowRatio}%</td>
                <td className="p-4">{competitors[6].nofollowRatio}%</td>
                <td className="p-4">{competitors[7].nofollowRatio}%</td>
                <td className="p-4">{competitors[8].nofollowRatio}%</td>
                <td className="p-4">{competitors[9].nofollowRatio}%</td>
                <td className="p-4 font-semibold">
                  {Math.round(
                    competitors.reduce((sum, c) => sum + c.nofollowRatio, 0) / competitors.length
                  )}
                  %
                </td>
              </tr>
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

