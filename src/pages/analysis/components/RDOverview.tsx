import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KPICards } from "@/components/KPICards";
import { 
  LineChart, 
  Line, 
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
  ResponsiveContainer 
} from "recharts";
import { Globe, Link, TrendingUp, AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function RDOverview() {
  // KPI Data
  const kpiData = [
    {
      label: "Tổng Referring Domains",
      value: 250,
      unit: "RD",
      change: 35,
      changeLabel: "+35 so với 30 ngày trước",
      icon: Globe,
    },
    {
      label: "Tổng Backlinks",
      value: 1850,
      unit: "Backlinks",
      change: undefined,
      changeLabel: "Tỷ lệ Backlink/RD: 7.4 : 1",
      icon: Link,
    },
    {
      label: "Tỷ lệ RD / Backlink",
      value: 13.5,
      unit: "%",
      change: undefined,
      changeLabel: "Tự nhiên",
      icon: TrendingUp,
    },
    {
      label: "RD Gap vs Top 10",
      value: 120,
      unit: "RD",
      change: -40,
      changeLabel: "Bạn: 250 RD – Trung bình top 10: 370 RD",
      icon: AlertCircle,
    },
  ];

  // Growth Timeline Data
  const growthData = [
    { month: "01/2025", you: 180, top10Avg: 320 },
    { month: "02/2025", you: 195, top10Avg: 330 },
    { month: "03/2025", you: 210, top10Avg: 340 },
    { month: "04/2025", you: 220, top10Avg: 350 },
    { month: "05/2025", you: 235, top10Avg: 360 },
    { month: "06/2025", you: 250, top10Avg: 370 },
  ];

  // Comparison Data - Top 10
  const comparisonData = [
    { name: "Bạn", rd: 250, rank: 8 },
    { name: "Đối thủ 1", rd: 450, rank: 1 },
    { name: "Đối thủ 2", rd: 420, rank: 2 },
    { name: "Đối thủ 3", rd: 400, rank: 3 },
    { name: "Đối thủ 4", rd: 380, rank: 4 },
    { name: "Đối thủ 5", rd: 360, rank: 5 },
    { name: "Đối thủ 6", rd: 340, rank: 6 },
    { name: "Đối thủ 7", rd: 320, rank: 7 },
    { name: "Đối thủ 8", rd: 280, rank: 9 },
    { name: "Đối thủ 9", rd: 270, rank: 10 },
    { name: "Đối thủ 10", rd: 260, rank: 11 },
  ];

  // Diversity Data
  const diversityData = [
    { name: "domain1.com", value: 24 },
    { name: "domain2.net", value: 15 },
    { name: "domain3.org", value: 9 },
    { name: "domain4.com", value: 7 },
    { name: "domain5.net", value: 5 },
    { name: "domain6.org", value: 3 },
    { name: "domain7.com", value: 2 },
    { name: "domain8.net", value: 2 },
    { name: "domain9.org", value: 1 },
    { name: "domain10.com", value: 1 },
    { name: "Khác", value: 31 },
  ];

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#00ff00",
    "#0088fe",
    "#ff00ff",
    "#8b5cf6",
  ];

  const topDomainShare = diversityData[0].value;
  const isConcentrated = topDomainShare > 30;

  // Insights
  const insights = [
    "Trong 3 tháng gần nhất, số RD tăng từ 180 lên 250 (+38.8%), tốc độ này tương đương nhóm đối thủ top 10.",
    "Tỷ lệ RD/Backlink hiện tại là 13.5%, nằm trong ngưỡng profile tự nhiên (12–50%).",
    "Bạn đang thiếu khoảng 120 RD so với trung bình top 10. Cần xây thêm domain mới nếu muốn cạnh tranh top.",
    topDomainShare > 30 
      ? `Domain ${diversityData[0].name} đang là nguồn chiếm nhiều backlink nhất (${topDomainShare}% tổng số link), cần cân đối để tránh phụ thuộc.`
      : "Phân bổ backlink khá đa dạng, không có domain nào chiếm quá 30% tổng số link.",
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <KPICards data={kpiData} />

      {/* RD Growth Timeline */}
      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Tăng trưởng Referring Domains theo thời gian
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="cursor-pointer">RD</Badge>
            <Badge variant="ghost" className="cursor-pointer">Backlinks</Badge>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={growthData}>
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
                color: "hsl(var(--foreground))"
              }}
              formatter={(value: number) => [`${value} RD`, ""]}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="you" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              name="Bạn"
              dot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="top10Avg" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Trung bình Top 10"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparison Chart */}
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            So sánh RD hiện tại với đối thủ
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
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
                  color: "hsl(var(--foreground))"
                }}
              />
              <Bar 
                dataKey="rd" 
                fill="hsl(var(--primary))" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          
          {/* Ranking Table */}
          <div className="mt-4 border-t pt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b">
                  <th className="text-left py-2">Website</th>
                  <th className="text-right py-2">RD</th>
                  <th className="text-right py-2">Thứ hạng trong nhóm</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData
                  .sort((a, b) => b.rd - a.rd)
                  .slice(0, 10)
                  .map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2">{item.name}</td>
                      <td className="text-right py-2 font-medium">{item.rd}</td>
                      <td className="text-right py-2">
                        <Badge variant={item.rank <= 3 ? "default" : item.name === "Bạn" ? "default" : "secondary"}>
                          #{item.rank}/10
                        </Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Diversity Chart */}
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Mức độ đa dạng nguồn domain
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={diversityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => value > 3 ? `${name} (${value}%)` : ""}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {diversityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                formatter={(value: number) => [`${value}%`, "Share"]}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {isConcentrated && (
            <Alert className="mt-4 border-warning/20 bg-warning/10">
              <AlertCircle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-warning">
                Domain <strong>{diversityData[0].name}</strong> đang chiếm {topDomainShare}% tổng backlink. 
                Nên đa dạng thêm domain mới để tránh profile bị phụ thuộc 1 nguồn.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Top 10 domain hiện tại tạo ra {diversityData.slice(0, 10).reduce((sum, d) => sum + d.value, 0)}% tổng backlink. 
              {topDomainShare > 30 
                ? " Đây là mức quá tập trung, cần đa dạng hóa."
                : topDomainShare > 20
                ? " Đây là mức hơi tập trung, nên cân nhắc đa dạng hóa."
                : " Đây là mức bình thường của ngành."}
            </p>
          </div>
        </Card>
      </div>

      {/* Insights */}
      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <div className="flex items-start gap-3 mb-4">
          <Info className="h-5 w-5 mt-0.5" />
          <h3 className="text-lg font-semibold">Nhận xét tổng quan về RD</h3>
        </div>
        <ul className="space-y-2 text-sm opacity-90">
          {insights.map((insight, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1.5">•</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

