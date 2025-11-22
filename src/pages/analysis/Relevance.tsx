import { FilterBar } from "@/components/FilterBar";
import { KPICards } from "@/components/KPICards";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { Target, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export default function Relevance() {
  const kpiData = [
    { label: "Cùng ngành", value: 58, unit: "%", icon: CheckCircle, change: 8, changeLabel: "vs Median" },
    { label: "Low Relevance", value: 22, unit: "%", icon: AlertTriangle, change: -5, changeLabel: "Cần cải thiện" },
    { label: "Semantic Score", value: 67, unit: "/100", icon: Target, change: 12, changeLabel: "Trung bình" },
    { label: "Outbound Spam", value: 8, unit: "%", icon: TrendingUp, change: 3, changeLabel: "Cần kiểm tra" },
  ];

  const relevanceDistribution = [
    { name: "High", value: 84, color: "hsl(var(--success))" },
    { name: "Medium", value: 29, color: "hsl(var(--warning))" },
    { name: "Low", value: 32, color: "hsl(var(--destructive))" },
  ];

  const scatterData = [
    { dr: 68, relevance: 85, name: "tech-blog1.com" },
    { dr: 55, relevance: 78, name: "industry-news.com" },
    { dr: 42, relevance: 72, name: "related-forum.com" },
    { dr: 38, relevance: 45, name: "general-directory.com" },
    { dr: 25, relevance: 28, name: "unrelated-site1.com" },
    { dr: 15, relevance: 22, name: "unrelated-site2.com" },
  ];

  const backlinksByRelevance = [
    { domain: "seo-industry-blog.com", category: "Marketing/SEO", sourceUrl: "/article/backlink-guide", targetUrl: "/product", score: 85, status: "High" },
    { domain: "tech-news-portal.com", category: "Technology", sourceUrl: "/tools-review", targetUrl: "/features", score: 78, status: "High" },
    { domain: "digital-marketing-forum.com", category: "Marketing", sourceUrl: "/discussion/123", targetUrl: "/blog", score: 72, status: "Medium" },
    { domain: "general-business-directory.com", category: "Business", sourceUrl: "/listings/seo", targetUrl: "/", score: 45, status: "Medium" },
    { domain: "cooking-recipes-blog.com", category: "Food", sourceUrl: "/sidebar-sponsors", targetUrl: "/", score: 22, status: "Low" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Relevance – Tính liên quan</h1>
        <p className="text-muted-foreground">Đánh giá mức độ liên quan chủ đề giữa nguồn và đích</p>
      </div>

      <FilterBar onExport={() => console.log("Export")} />

      <KPICards data={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Phân bố Relevance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={relevanceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                dataKey="value"
              >
                {relevanceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">DR vs Relevance Score</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" dataKey="dr" name="DR" stroke="hsl(var(--muted-foreground))" label={{ value: 'DR', position: 'insideBottom', offset: -5 }} />
              <YAxis type="number" dataKey="relevance" name="Relevance" stroke="hsl(var(--muted-foreground))" label={{ value: 'Relevance', angle: -90, position: 'insideLeft' }} />
              <ZAxis range={[50, 200]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Scatter data={scatterData} fill="hsl(var(--primary))" />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">Backlink theo mức độ liên quan</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Domain nguồn</TableHead>
              <TableHead>Chủ đề</TableHead>
              <TableHead>URL nguồn</TableHead>
              <TableHead>URL đích</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {backlinksByRelevance.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{item.domain}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-muted-foreground max-w-xs truncate">{item.sourceUrl}</TableCell>
                <TableCell className="text-muted-foreground">{item.targetUrl}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      item.score >= 70 ? "bg-success/10 text-success border-success/20" :
                      item.score >= 50 ? "bg-warning/10 text-warning border-warning/20" :
                      "bg-destructive/10 text-destructive border-destructive/20"
                    }
                  >
                    {item.score}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      item.status === "High" ? "default" :
                      item.status === "Medium" ? "secondary" :
                      "outline"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2">Chiến lược cải thiện Topical Authority</h3>
        <p className="text-sm opacity-90">
          22% backlink hiện tại có relevance thấp (Low), chủ yếu từ các domain ngoài ngành như directory tổng hợp, 
          cooking blogs, lifestyle sites. Gợi ý: Tăng tỷ lệ backlink từ các domain cùng chủ đề Marketing/SEO, Technology, 
          Digital Tools để cải thiện topical authority. Mục tiêu đạt 75% backlink có relevance High trong 6 tháng tới.
        </p>
      </Card>
    </div>
  );
}
