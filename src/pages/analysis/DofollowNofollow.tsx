import { FilterBar } from "@/components/FilterBar";
import { KPICards } from "@/components/KPICards";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CheckCircle, XCircle, Tag, AlertCircle } from "lucide-react";

export default function DofollowNofollow() {
  const kpiData = [
    { label: "Dofollow", value: 78, unit: "%", icon: CheckCircle, change: 3, changeLabel: "vs Median" },
    { label: "Nofollow", value: 22, unit: "%", icon: XCircle, change: -3, changeLabel: "vs Median" },
    { label: "UGC", value: 3, unit: "%", icon: Tag, change: 0, changeLabel: "Forum/Comments" },
    { label: "Sponsored", value: 5, unit: "%", icon: AlertCircle, change: 0, changeLabel: "Quảng cáo" },
  ];

  const relDistribution = [
    { name: "Dofollow", value: 113, color: "hsl(var(--success))" },
    { name: "Nofollow", value: 32, color: "hsl(var(--warning))" },
    { name: "UGC", value: 4, color: "hsl(var(--secondary))" },
    { name: "Sponsored", value: 6, color: "hsl(var(--accent))" },
  ];

  const comparisonData = [
    { category: "Bạn", dofollow: 78, nofollow: 22 },
    { category: "Top 10 Avg", dofollow: 75, nofollow: 25 },
  ];

  const backlinksByRel = [
    { domain: "authority-blog1.com", sourceUrl: "/article-123", rel: "dofollow", sourceType: "Article", dr: 58, traffic: "12K" },
    { domain: "news-portal2.com", sourceUrl: "/press-release", rel: "dofollow", sourceType: "Article", dr: 72, traffic: "85K" },
    { domain: "forum-discussion3.com", sourceUrl: "/thread-456", rel: "nofollow", sourceType: "Forum", dr: 38, traffic: "5K" },
    { domain: "social-media4.com", sourceUrl: "/post-789", rel: "nofollow", sourceType: "Social", dr: 92, traffic: "2M" },
    { domain: "partner-site5.com", sourceUrl: "/sponsored-post", rel: "sponsored", sourceType: "Article", dr: 45, traffic: "8K" },
    { domain: "community-forum6.com", sourceUrl: "/user-comment", rel: "ugc", sourceType: "Forum", dr: 28, traffic: "3K" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Tỷ lệ Dofollow / Nofollow</h1>
        <p className="text-muted-foreground">Phân tích chi tiết rel attributes và cân bằng profile</p>
      </div>

      <FilterBar onExport={() => console.log("Export")} />

      <KPICards data={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Phân bố Rel Attributes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={relDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                dataKey="value"
              >
                {relDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">So sánh với Top 10 SERP</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Legend />
              <Bar dataKey="dofollow" name="Dofollow %" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="nofollow" name="Nofollow %" fill="hsl(var(--warning))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">Backlink theo Rel Attribute</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Domain</TableHead>
              <TableHead>URL Nguồn</TableHead>
              <TableHead>Rel</TableHead>
              <TableHead>Loại nguồn</TableHead>
              <TableHead>DR</TableHead>
              <TableHead>Traffic</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {backlinksByRel.map((link, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{link.domain}</TableCell>
                <TableCell className="text-muted-foreground max-w-xs truncate">{link.sourceUrl}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      link.rel === "dofollow" ? "default" :
                      link.rel === "nofollow" ? "secondary" :
                      link.rel === "ugc" ? "outline" :
                      "outline"
                    }
                    className={
                      link.rel === "sponsored" ? "bg-accent/10 text-accent border-accent/20" : ""
                    }
                  >
                    {link.rel}
                  </Badge>
                </TableCell>
                <TableCell>{link.sourceType}</TableCell>
                <TableCell>
                  <Badge variant={link.dr > 50 ? "default" : "secondary"}>{link.dr}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{link.traffic}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2">Đánh giá & Gợi ý Hành động</h3>
        <div className="text-sm opacity-90 space-y-2">
          <p>
            <strong>Hiện trạng:</strong> Hồ sơ đang 78% dofollow / 22% nofollow, cao hơn một chút so với chuẩn ngành (75/25). 
            Tỷ lệ này vẫn nằm trong vùng an toàn và khá tự nhiên.
          </p>
          <p>
            <strong>Gợi ý:</strong> Duy trì tỷ lệ hiện tại. Nếu muốn profile thêm tự nhiên, có thể build thêm 5-10 backlink nofollow 
            từ social media, forum discussions, hoặc các comment có giá trị trên blogs chất lượng.
          </p>
          <p>
            <strong>Lưu ý:</strong> 5% sponsored links là hợp lý nếu đến từ các partnerships thực tế. Đảm bảo các link này 
            được đánh dấu rel="sponsored" đúng cách để tuân thủ Google guidelines.
          </p>
        </div>
      </Card>
    </div>
  );
}
