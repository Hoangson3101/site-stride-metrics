import { FilterBar } from "@/components/FilterBar";
import { KPICards } from "@/components/KPICards";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CalendarCheck, TrendingDown, Clock, AlertCircle } from "lucide-react";

export default function IndexDurability() {
  const kpiData = [
    { label: "Đã Index", value: 85, unit: "%", icon: CalendarCheck, change: -2, changeLabel: "vs Median" },
    { label: "Lost Backlinks", value: 24, icon: TrendingDown, change: 8, changeLabel: "3 tháng gần" },
    { label: "Tồn tại > 6 tháng", value: 68, unit: "%", icon: Clock, change: 12, changeLabel: "vs Median" },
    { label: "Chưa Index", value: 22, icon: AlertCircle, change: 5, changeLabel: "Cần Tier 2" },
  ];

  const indexTimeline = [
    { month: "2024-05", indexed: 95 },
    { month: "2024-06", indexed: 102 },
    { month: "2024-07", indexed: 118 },
    { month: "2024-08", indexed: 124 },
    { month: "2024-09", indexed: 131 },
    { month: "2024-10", indexed: 138 },
    { month: "2024-11", indexed: 145 },
  ];

  const ageDistribution = [
    { range: "< 1 tháng", count: 18 },
    { range: "1-6 tháng", count: 42 },
    { range: "6-12 tháng", count: 58 },
    { range: "> 12 tháng", count: 27 },
  ];

  const unindexedLinks = [
    { url: "quality-blog1.com/article-new", dr: 45, content: "Good", created: "2024-10-15", tier2: "Recommended" },
    { url: "news-portal2.com/press", dr: 52, content: "Good", created: "2024-10-20", tier2: "Recommended" },
    { url: "forum-thread3.com/topic", dr: 28, content: "Medium", created: "2024-11-01", tier2: "Optional" },
  ];

  const lostLinks = [
    { domain: "old-blog1.com", url: "/article-removed", date: "2024-09-15", reason: "404 Error" },
    { domain: "partner-site2.com", url: "/partnership-page", date: "2024-10-03", reason: "Gỡ link" },
    { domain: "news-archive3.com", url: "/old-news", date: "2024-10-28", reason: "Noindex" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Index & Durability</h1>
        <p className="text-muted-foreground">Theo dõi link được Google ghi nhận và tồn tại lâu dài</p>
      </div>

      <FilterBar onExport={() => console.log("Export")} />

      <KPICards data={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Backlink Index Theo Tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={indexTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="indexed" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Phân bố theo Tuổi Link</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
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
        <Tabs defaultValue="unindexed">
          <TabsList>
            <TabsTrigger value="unindexed">Backlink Chưa Index</TabsTrigger>
            <TabsTrigger value="lost">Lost Backlinks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="unindexed" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL Nguồn</TableHead>
                  <TableHead>DR</TableHead>
                  <TableHead>Chất lượng</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Gợi ý</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unindexedLinks.map((link, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium max-w-xs truncate">{link.url}</TableCell>
                    <TableCell><Badge>{link.dr}</Badge></TableCell>
                    <TableCell>
                      <Badge variant={link.content === "Good" ? "default" : "secondary"}>
                        {link.content}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{link.created}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          link.tier2 === "Recommended" 
                            ? "bg-primary/10 text-primary border-primary/20" 
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {link.tier2}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="lost" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>URL cũ</TableHead>
                  <TableHead>Ngày mất</TableHead>
                  <TableHead>Lý do</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lostLinks.map((link, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{link.domain}</TableCell>
                    <TableCell className="text-muted-foreground max-w-xs truncate">{link.url}</TableCell>
                    <TableCell className="text-muted-foreground">{link.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        {link.reason}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2">Gợi ý Tier 2 Link Building</h3>
        <p className="text-sm opacity-90">
          Có 22 backlink chất lượng cao (DR &gt; 40) chưa được index sau 30+ ngày. 
          Gợi ý: Xuất danh sách này để làm chiến dịch Tier 2 link building - tạo backlink trỏ đến các backlink tier 1 này 
          từ social bookmarks, web 2.0, social signals để tăng khả năng được Google crawl và index.
        </p>
      </Card>
    </div>
  );
}
