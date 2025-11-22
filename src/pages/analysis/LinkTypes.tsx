import { FilterBar } from "@/components/FilterBar";
import { KPICards } from "@/components/KPICards";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, Layout, AlertCircle, CheckCircle } from "lucide-react";

export default function LinkTypes() {
  const kpiData = [
    { label: "Contextual", value: 72, unit: "%", icon: FileText, change: 15, changeLabel: "Tốt cho SEO" },
    { label: "Sitewide", value: 18, unit: "%", icon: Layout, change: -8, changeLabel: "Cần rà soát" },
    { label: "Dofollow", value: 78, unit: "%", icon: CheckCircle, change: 3, changeLabel: "vs Median" },
    { label: "Nofollow", value: 22, unit: "%", icon: AlertCircle, change: -3, changeLabel: "vs Median" },
  ];

  const positionData = [
    { name: "Content", value: 104, color: "hsl(var(--success))" },
    { name: "Sidebar", value: 28, color: "hsl(var(--warning))" },
    { name: "Footer", value: 12, color: "hsl(var(--destructive))" },
    { name: "Header", value: 4, color: "hsl(var(--secondary))" },
  ];

  const contextualVsSitewide = [
    { type: "Contextual", count: 104 },
    { type: "Sitewide", count: 26 },
  ];

  const linkDetails = [
    { url: "authority-blog.com/article-123", pageType: "Article", position: "Content", rel: "dofollow", contextual: "Yes" },
    { url: "news-portal.com/press-release", pageType: "Article", position: "Content", rel: "dofollow", contextual: "Yes" },
    { url: "forum-site.com/sidebar-widget", pageType: "Homepage", position: "Sidebar", rel: "dofollow", contextual: "No" },
    { url: "directory-site.com/footer-links", pageType: "Homepage", position: "Footer", rel: "dofollow", contextual: "No" },
    { url: "partner-site.com/footer", pageType: "Sitewide", position: "Footer", rel: "nofollow", contextual: "No" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Link Types & Placement</h1>
        <p className="text-muted-foreground">Phân tích loại link và vị trí đặt link trên trang</p>
      </div>

      <FilterBar onExport={() => console.log("Export")} />

      <KPICards data={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Phân bố theo Vị trí</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={positionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                dataKey="value"
              >
                {positionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Contextual vs Sitewide</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contextualVsSitewide}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">Chi tiết Backlink & Vị trí</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL Nguồn</TableHead>
              <TableHead>Loại trang</TableHead>
              <TableHead>Vị trí</TableHead>
              <TableHead>Rel</TableHead>
              <TableHead>Contextual?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {linkDetails.map((link, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium max-w-xs truncate">{link.url}</TableCell>
                <TableCell>{link.pageType}</TableCell>
                <TableCell>
                  <Badge 
                    variant={link.position === "Content" ? "default" : "secondary"}
                    className={
                      link.position === "Footer" ? "bg-destructive/10 text-destructive" : ""
                    }
                  >
                    {link.position}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={link.rel === "dofollow" ? "default" : "outline"}>
                    {link.rel}
                  </Badge>
                </TableCell>
                <TableCell>
                  {link.contextual === "Yes" ? (
                    <Badge variant="default" className="bg-success">Yes</Badge>
                  ) : (
                    <Badge variant="secondary">No</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2">Đánh giá & Khuyến nghị</h3>
        <p className="text-sm opacity-90">
          72% backlink của bạn đang nằm trong nội dung bài viết (contextual), đây là tín hiệu tốt. 
          Tuy nhiên, 18% link dofollow lại đặt sitewide ở footer/sidebar → nên rà soát lại để tránh footprint mua link. 
          Google có thể coi những link này là không tự nhiên nếu chúng xuất hiện trên quá nhiều trang của cùng một domain.
        </p>
      </Card>
    </div>
  );
}
