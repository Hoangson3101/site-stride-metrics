import { FilterBar } from "@/components/FilterBar";
import { KPICards } from "@/components/KPICards";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Globe, Link, TrendingDown, AlertCircle } from "lucide-react";

export default function ReferringDomains() {
  const kpiData = [
    { label: "Tổng RD", value: 145, icon: Globe, change: -25, changeLabel: "vs Median Top 3" },
    { label: "Tổng Backlinks", value: "2.4K", icon: Link, change: -18, changeLabel: "vs Median Top 3" },
    { label: "RD/BL Ratio", value: "1:16", icon: TrendingDown, unit: "", change: -12, changeLabel: "Tự nhiên: 1:12-30" },
    { label: "RD Gap", value: "~120", icon: AlertCircle, unit: "RD", change: -40, changeLabel: "Thiếu so với Top 3" },
  ];

  const comparisonData = [
    { name: "Bạn", rd: 145 },
    { name: "Đối thủ #1", rd: 280 },
    { name: "Đối thủ #2", rd: 220 },
    { name: "Đối thủ #3", rd: 195 },
  ];

  const distributionData = [
    { name: "domain1.com", value: 480, percent: 20 },
    { name: "domain2.com", value: 360, percent: 15 },
    { name: "domain3.com", value: 288, percent: 12 },
    { name: "domain4.com", value: 240, percent: 10 },
    { name: "Khác", value: 1032, percent: 43 },
  ];

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--warning))", "hsl(var(--muted))"];

  const topDomains = [
    { domain: "authority-site1.com", dr: 68, backlinks: 480, firstSeen: "2023-01", lastSeen: "2024-11", share: 20 },
    { domain: "news-portal2.com", dr: 55, backlinks: 360, firstSeen: "2023-03", lastSeen: "2024-10", share: 15 },
    { domain: "blog-platform3.com", dr: 42, backlinks: 288, firstSeen: "2023-06", lastSeen: "2024-11", share: 12 },
    { domain: "forum-site4.com", dr: 38, backlinks: 240, firstSeen: "2023-08", lastSeen: "2024-09", share: 10 },
    { domain: "directory5.com", dr: 32, backlinks: 192, firstSeen: "2023-10", lastSeen: "2024-11", share: 8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Hồ sơ Referring Domains (RD)</h1>
        <p className="text-muted-foreground">Phân tích số lượng & độ đa dạng domain trỏ link vào site</p>
      </div>

      <FilterBar onExport={() => console.log("Export")} />

      <KPICards data={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Comparison */}
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">So sánh RD với đối thủ</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="rd" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart - Distribution */}
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Phân bổ Backlink theo Top Domains</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name.split('.')[0]} (${percent}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          {distributionData[0].percent > 20 && (
            <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm text-warning flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Cảnh báo: Domain top 1 chiếm {distributionData[0].percent}% tổng backlink
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Top Referring Domains Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">Top Referring Domains</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Domain</TableHead>
              <TableHead>DR</TableHead>
              <TableHead>Số Backlinks</TableHead>
              <TableHead>Lần đầu</TableHead>
              <TableHead>Lần cuối</TableHead>
              <TableHead>% Share</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topDomains.map((domain, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{domain.domain}</TableCell>
                <TableCell>
                  <Badge variant={domain.dr > 50 ? "default" : "secondary"}>{domain.dr}</Badge>
                </TableCell>
                <TableCell>{domain.backlinks}</TableCell>
                <TableCell className="text-muted-foreground">{domain.firstSeen}</TableCell>
                <TableCell className="text-muted-foreground">{domain.lastSeen}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${domain.share * 5}%` }}
                      />
                    </div>
                    <span className="text-sm">{domain.share}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Insight Box */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2">Gợi ý chiến lược</h3>
        <p className="text-sm opacity-90">
          RD/backlink của bạn đang là 1:16 (6.2%), thấp hơn profile tự nhiên trong ngành (12–30%). 
          Hệ thống gợi ý đa dạng thêm ~80-100 domain mới thay vì tăng số link trên các domain hiện tại.
          Ưu tiên các domain có DR &gt; 30 và liên quan đến ngành của bạn.
        </p>
      </Card>
    </div>
  );
}
