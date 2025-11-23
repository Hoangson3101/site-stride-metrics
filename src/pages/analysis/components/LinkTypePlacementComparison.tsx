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

interface LinkTypeDistribution {
  type: string;
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

interface PlacementDistribution {
  placement: string;
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

export function LinkTypePlacementComparison() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [placementFilter, setPlacementFilter] = useState<string>("all");

  // Link Type Distribution
  const linkTypeDistribution: LinkTypeDistribution[] = [
    { type: "Dofollow", yourWebsite: 75, competitor1: 78, competitor2: 72, competitor3: 70, competitor4: 74, competitor5: 76, competitor6: 73, competitor7: 71, competitor8: 75, competitor9: 72, competitor10: 74 },
    { type: "Nofollow", yourWebsite: 20, competitor1: 18, competitor2: 22, competitor3: 25, competitor4: 21, competitor5: 19, competitor6: 23, competitor7: 24, competitor8: 20, competitor9: 23, competitor10: 21 },
    { type: "UGC", yourWebsite: 3, competitor1: 2, competitor2: 4, competitor3: 3, competitor4: 3, competitor5: 3, competitor6: 2, competitor7: 3, competitor8: 3, competitor9: 3, competitor10: 3 },
    { type: "Sponsored", yourWebsite: 2, competitor1: 2, competitor2: 2, competitor3: 2, competitor4: 2, competitor5: 2, competitor6: 2, competitor7: 2, competitor8: 2, competitor9: 2, competitor10: 2 },
  ];

  // Placement Distribution
  const placementDistribution: PlacementDistribution[] = [
    { placement: "Content", yourWebsite: 65, competitor1: 70, competitor2: 68, competitor3: 72, competitor4: 69, competitor5: 71, competitor6: 68, competitor7: 70, competitor8: 69, competitor9: 71, competitor10: 67 },
    { placement: "Sidebar", yourWebsite: 20, competitor1: 15, competitor2: 18, competitor3: 16, competitor4: 17, competitor5: 16, competitor6: 19, competitor7: 17, competitor8: 18, competitor9: 16, competitor10: 19 },
    { placement: "Footer", yourWebsite: 12, competitor1: 12, competitor2: 11, competitor3: 10, competitor4: 11, competitor5: 10, competitor6: 10, competitor7: 10, competitor8: 10, competitor9: 10, competitor10: 11 },
    { placement: "Header", yourWebsite: 3, competitor1: 3, competitor2: 3, competitor3: 2, competitor4: 3, competitor5: 3, competitor6: 3, competitor7: 3, competitor8: 3, competitor9: 3, competitor10: 3 },
  ];

  const yourDofollow = linkTypeDistribution.find((l) => l.type === "Dofollow")?.yourWebsite || 0;
  const dofollowData = linkTypeDistribution.find((l) => l.type === "Dofollow");
  const avgCompetitorDofollow = dofollowData
    ? (dofollowData.competitor1 + dofollowData.competitor2 + dofollowData.competitor3 + dofollowData.competitor4 + dofollowData.competitor5 + dofollowData.competitor6 + dofollowData.competitor7 + dofollowData.competitor8 + dofollowData.competitor9 + dofollowData.competitor10) / 10
    : 0;
  const isDofollowWarning = yourDofollow > 90 || yourDofollow < 50;

  const yourContentRatio = placementDistribution.find((p) => p.placement === "Content")?.yourWebsite || 0;
  const yourSidebarFooterRatio =
    (placementDistribution.find((p) => p.placement === "Sidebar")?.yourWebsite || 0) +
    (placementDistribution.find((p) => p.placement === "Footer")?.yourWebsite || 0);
  const isPlacementWarning = yourSidebarFooterRatio > 40 || yourContentRatio < 50;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
  ];

  return (
    <div className="space-y-6">
      {/* Warning Alerts */}
      {isDofollowWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tỷ lệ dofollow của website ({yourDofollow}%) quá cao hoặc quá
            thấp so với chuẩn ngành (trung bình đối thủ: {avgCompetitorDofollow.toFixed(1)}%). Điều
            này có thể bị Google coi là không tự nhiên. Khuyến nghị: Cân bằng tỷ lệ dofollow/nofollow
            để phù hợp với chuẩn ngành.
          </AlertDescription>
        </Alert>
      )}

      {isPlacementWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong> Tỷ lệ backlink từ sidebar/footer ({yourSidebarFooterRatio}%)
            quá cao hoặc tỷ lệ backlink từ content ({yourContentRatio}%) quá thấp. Điều này có thể
            cho thấy hồ sơ backlink thiếu tính tự nhiên. Khuyến nghị: Tăng tỷ lệ backlink từ nội
            dung bài viết và giảm tỷ lệ backlink từ sidebar/footer.
          </AlertDescription>
        </Alert>
      )}

      {/* Link Type Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Tỷ Lệ Loại Link
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={linkTypeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="type"
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
              <Bar dataKey="yourWebsite" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Website của bạn" />
              <Bar dataKey="competitor1" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} name="Đối thủ 1" />
              <Bar dataKey="competitor2" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} name="Đối thủ 2" />
              <Bar dataKey="competitor3" fill="hsl(var(--warning))" radius={[8, 8, 0, 0]} name="Đối thủ 3" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân Bổ Loại Link - Website của bạn
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={linkTypeDistribution.map((l) => ({ name: l.type, value: l.yourWebsite }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {linkTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
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

      {/* Placement Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So Sánh Vị Trí Backlink
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={placementDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="placement"
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
              <Bar dataKey="yourWebsite" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Website của bạn" />
              <Bar dataKey="competitor1" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} name="Đối thủ 1" />
              <Bar dataKey="competitor2" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} name="Đối thủ 2" />
              <Bar dataKey="competitor3" fill="hsl(var(--warning))" radius={[8, 8, 0, 0]} name="Đối thủ 3" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân Bổ Vị Trí - Website của bạn
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={placementDistribution.map((p) => ({ name: p.placement, value: p.yourWebsite }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {placementDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
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
            <p className="text-sm text-muted-foreground">Dofollow Ratio</p>
            <p className="text-2xl font-bold">{yourDofollow}%</p>
            <p className="text-xs text-muted-foreground">
              Avg đối thủ: {avgCompetitorDofollow.toFixed(1)}%
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Content Ratio</p>
            <p className="text-2xl font-bold">{yourContentRatio}%</p>
            <p className="text-xs text-muted-foreground">Backlink từ content</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Sidebar/Footer</p>
            <p className="text-2xl font-bold">{yourSidebarFooterRatio}%</p>
            <p className="text-xs text-muted-foreground">Tỷ lệ sidebar + footer</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">UGC/Sponsored</p>
            <p className="text-2xl font-bold">
              {(linkTypeDistribution.find((l) => l.type === "UGC")?.yourWebsite || 0) +
                (linkTypeDistribution.find((l) => l.type === "Sponsored")?.yourWebsite || 0)}
              %
            </p>
            <p className="text-xs text-muted-foreground">Tỷ lệ UGC + Sponsored</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại link" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="dofollow">Dofollow</SelectItem>
                <SelectItem value="nofollow">Nofollow</SelectItem>
                <SelectItem value="ugc">UGC</SelectItem>
                <SelectItem value="sponsored">Sponsored</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 min-w-[150px]">
            <Select value={placementFilter} onValueChange={setPlacementFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Vị trí" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vị trí</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="sidebar">Sidebar</SelectItem>
                <SelectItem value="footer">Footer</SelectItem>
                <SelectItem value="header">Header</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );
}

