import { FilterBar } from "@/components/FilterBar";
import { KPICards } from "@/components/KPICards";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Hash, Type, Link, AlertTriangle } from "lucide-react";

export default function AnchorText() {
  const kpiData = [
    { label: "Brand Anchor", value: 32, unit: "%", icon: Type, change: 8, changeLabel: "vs Median" },
    { label: "Naked URL", value: 28, unit: "%", icon: Link, change: 5, changeLabel: "vs Median" },
    { label: "Generic", value: 22, unit: "%", icon: Hash, change: 0, changeLabel: "vs Median" },
    { label: "Exact Match", value: 9.5, unit: "%", icon: AlertTriangle, change: 5, changeLabel: "Cảnh báo: > 5%" },
  ];

  const anchorDistribution = [
    { name: "Brand", value: 60, color: "hsl(var(--success))" },
    { name: "Naked", value: 53, color: "hsl(var(--primary))" },
    { name: "Generic", value: 42, color: "hsl(var(--secondary))" },
    { name: "Partial", value: 16, color: "hsl(var(--warning))" },
    { name: "Exact", value: 18, color: "hsl(var(--destructive))" },
  ];

  const topAnchors = [
    { text: "YourBrand", count: 45, url: "homepage", type: "Brand" },
    { text: "https://yoursite.com", count: 38, url: "homepage", type: "Naked" },
    { text: "click here", count: 28, url: "various", type: "Generic" },
    { text: "best seo tool", count: 12, url: "/product", type: "Partial" },
    { text: "seo tool", count: 18, url: "/product", type: "Exact", warning: true },
  ];

  const detailedAnchors = [
    { anchor: "seo tool", type: "Exact", count: 18, url: "/product", note: "Over-optimized" },
    { anchor: "best seo software", type: "Exact", count: 6, url: "/product", note: "Over-optimized" },
    { anchor: "backlink analyzer", type: "Partial", count: 12, url: "/features/backlink", note: "OK" },
    { anchor: "YourBrand SEO", type: "Partial", count: 15, url: "homepage", note: "OK" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Anchor Text Distribution</h1>
        <p className="text-muted-foreground">Kiểm soát tỷ lệ anchor và phát hiện over-optimization</p>
      </div>

      <FilterBar onExport={() => console.log("Export")} />

      <KPICards data={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Phân bố Anchor Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={anchorDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                dataKey="value"
              >
                {anchorDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top 10 Anchor Text</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topAnchors} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="text" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">Chi tiết Anchor Text</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Anchor Text</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Số BLs</TableHead>
              <TableHead>URL đích</TableHead>
              <TableHead>Ghi chú</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detailedAnchors.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{item.anchor}</TableCell>
                <TableCell>
                  <Badge variant={item.type === "Exact" ? "destructive" : "secondary"}>
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell className="text-muted-foreground">{item.url}</TableCell>
                <TableCell>
                  {item.note === "Over-optimized" ? (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {item.note}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      {item.note}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6 bg-destructive/10 border border-destructive/20">
        <h3 className="text-lg font-semibold text-destructive mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Cảnh báo Over-optimization
        </h3>
        <p className="text-sm text-foreground">
          Exact-match anchor đang chiếm 9.5% (18/189 backlink), cao hơn ngưỡng an toàn 2–5%. 
          Nên bổ sung thêm anchor thương hiệu (brand) và generic để giảm tỷ lệ này xuống dưới 5%. 
          Tập trung build link với anchor "YourBrand", "website của chúng tôi", "xem thêm tại đây" thay vì từ khóa chính xác.
        </p>
      </Card>
    </div>
  );
}
