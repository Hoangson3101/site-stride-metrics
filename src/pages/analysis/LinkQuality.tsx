import { FilterBar } from "@/components/FilterBar";
import { KPICards } from "@/components/KPICards";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Shield, TrendingUp, FileText, Target } from "lucide-react";

export default function LinkQuality() {
  const kpiData = [
    { label: "RD với DR > 30", value: 18, unit: "%", icon: Shield, change: -22, changeLabel: "vs Median Top 3" },
    { label: "RD có Traffic > 1K", value: 42, unit: "%", icon: TrendingUp, change: 5, changeLabel: "vs Median Top 3" },
    { label: "Contextual", value: 68, unit: "%", icon: FileText, change: 12, changeLabel: "vs Profile/Comment" },
    { label: "Site chết/Unindex", value: 8, unit: "%", icon: Target, change: 8, changeLabel: "Cần kiểm tra" },
  ];

  const drDistribution = [
    { range: "0-10", count: 45 },
    { range: "10-30", count: 72 },
    { range: "30-50", count: 22 },
    { range: "50+", count: 6 },
  ];

  const typeDistribution = [
    { name: "Contextual", value: 98, color: "hsl(var(--success))" },
    { name: "Profile/Comment", value: 47, color: "hsl(var(--warning))" },
  ];

  const highQualityDomains = [
    { domain: "techcrunch.com", dr: 92, traffic: "45M", type: "Báo/Media", backlinks: 3, quality: "High" },
    { domain: "forbes.com", dr: 94, traffic: "150M", type: "Báo/Media", backlinks: 2, quality: "High" },
    { domain: "medium.com", dr: 96, traffic: "180M", type: "Blog Platform", backlinks: 12, quality: "High" },
  ];

  const lowQualityDomains = [
    { domain: "spammy-site1.xyz", dr: 5, traffic: "0", type: "Profile", backlinks: 8, quality: "Low" },
    { domain: "dead-forum2.net", dr: 12, traffic: "50", type: "Forum", backlinks: 15, quality: "Low" },
    { domain: "link-farm3.info", dr: 8, traffic: "0", type: "Directory", backlinks: 22, quality: "Low" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Chất lượng Backlink</h1>
        <p className="text-muted-foreground">Đánh giá sức mạnh backlink dựa trên DR, traffic, loại nguồn</p>
      </div>

      <FilterBar onExport={() => console.log("Export")} />

      <KPICards data={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Phân bố theo DR</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={drDistribution}>
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

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Contextual vs Profile/Comment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                dataKey="value"
              >
                {typeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-surface shadow-medium">
        <Tabs defaultValue="high">
          <TabsList>
            <TabsTrigger value="high">High-Authority Domains</TabsTrigger>
            <TabsTrigger value="low">Low-Quality Domains</TabsTrigger>
          </TabsList>
          
          <TabsContent value="high" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>DR</TableHead>
                  <TableHead>Traffic</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>BLs</TableHead>
                  <TableHead>Đánh giá</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {highQualityDomains.map((domain, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{domain.domain}</TableCell>
                    <TableCell><Badge className="bg-success">{domain.dr}</Badge></TableCell>
                    <TableCell>{domain.traffic}</TableCell>
                    <TableCell>{domain.type}</TableCell>
                    <TableCell>{domain.backlinks}</TableCell>
                    <TableCell><Badge variant="default">{domain.quality}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="low" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>DR</TableHead>
                  <TableHead>Traffic</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>BLs</TableHead>
                  <TableHead>Đánh giá</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowQualityDomains.map((domain, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{domain.domain}</TableCell>
                    <TableCell><Badge variant="destructive">{domain.dr}</Badge></TableCell>
                    <TableCell>{domain.traffic}</TableCell>
                    <TableCell>{domain.type}</TableCell>
                    <TableCell>{domain.backlinks}</TableCell>
                    <TableCell><Badge variant="outline">{domain.quality}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2">Nhận xét & Gợi ý</h3>
        <p className="text-sm opacity-90">
          Chỉ 18% RD hiện tại có DR &gt; 30, thấp hơn đáng kể so với trung bình ngành (40-50%). 
          Gợi ý: Tăng tỷ lệ link từ báo chí và authority sites, giảm phụ thuộc vào forum profiles. 
          Ưu tiên outreach đến các domain có DR 30-70 và traffic thực tế &gt; 5K/tháng.
        </p>
      </Card>
    </div>
  );
}
