import { FilterBar } from "@/components/FilterBar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function Benchmark() {
  const radarData = [
    { subject: "RD", you: 65, competitor: 85, topAvg: 90 },
    { subject: "Quality", you: 42, competitor: 68, topAvg: 75 },
    { subject: "Anchor Safety", you: 68, competitor: 88, topAvg: 85 },
    { subject: "Relevance", you: 58, competitor: 75, topAvg: 80 },
    { subject: "Low Toxic", you: 82, competitor: 92, topAvg: 88 },
    { subject: "Brand Signals", you: 55, competitor: 70, topAvg: 72 },
  ];

  const comparisonSummary = [
    { metric: "RD", you: "145", top3Avg: "232", gap: "-87", priority: "Cao", action: "Tăng 80-100 RD trong 6 tháng" },
    { metric: "% DR>30", you: "18%", top3Avg: "45%", gap: "-27%", priority: "Cao", action: "Build link từ authority sites" },
    { metric: "% Exact Anchor", you: "9.5%", top3Avg: "4%", gap: "+5.5%", priority: "Cao", action: "Giảm exact anchor về <5%" },
    { metric: "Velocity (RD/tháng)", you: "15", top3Avg: "22", gap: "-7", priority: "Vừa", action: "Tăng tốc link building" },
    { metric: "% Contextual", you: "72%", top3Avg: "68%", gap: "+4%", priority: "Thấp", action: "Duy trì hiện tại" },
    { metric: "% Toxic", you: "8%", top3Avg: "3%", gap: "+5%", priority: "Cao", action: "Disavow toxic links" },
  ];

  const detailedGaps = [
    { criteria: "Tổng RD", you: 145, top3: 232, gap: -87, priority: "Cao" },
    { criteria: "RD có DR>30", you: 26, top3: 105, gap: -79, priority: "Cao" },
    { criteria: "% Nofollow", you: 22, top3: 25, gap: -3, priority: "Thấp" },
    { criteria: "Brand Mentions", you: 124, top3: 180, gap: -56, priority: "Vừa" },
    { criteria: "E-E-A-T Links", you: 8, top3: 22, gap: -14, priority: "Cao" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">SERP Benchmark – So sánh Đối thủ</h1>
        <p className="text-muted-foreground">Xem mình đang đứng ở đâu so với top đối thủ</p>
      </div>

      <FilterBar onExport={() => console.log("Export")} />

      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">Biểu đồ Radar – So sánh Toàn diện</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" />
            <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
            <Radar name="Bạn" dataKey="you" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
            <Radar name="Đối thủ Top" dataKey="competitor" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.3} />
            <Radar name="Trung bình Top 3" dataKey="topAvg" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.2} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">Tổng quan So sánh</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Chỉ số</TableHead>
              <TableHead>Bạn</TableHead>
              <TableHead>Top 3 Avg</TableHead>
              <TableHead>Gap</TableHead>
              <TableHead>Ưu tiên</TableHead>
              <TableHead>Hành động gợi ý</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonSummary.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{item.metric}</TableCell>
                <TableCell>{item.you}</TableCell>
                <TableCell>{item.top3Avg}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      item.gap.startsWith("+") && !item.gap.includes("Contextual") 
                        ? "bg-destructive/10 text-destructive border-destructive/20" 
                        : item.gap.startsWith("-")
                        ? "bg-warning/10 text-warning border-warning/20"
                        : "bg-success/10 text-success border-success/20"
                    }
                  >
                    {item.gap.startsWith("+") ? <TrendingUp className="h-3 w-3 mr-1" /> : 
                     item.gap.startsWith("-") ? <TrendingDown className="h-3 w-3 mr-1" /> : 
                     <Minus className="h-3 w-3 mr-1" />}
                    {item.gap}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      item.priority === "Cao" ? "destructive" :
                      item.priority === "Vừa" ? "default" :
                      "secondary"
                    }
                  >
                    {item.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{item.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">Gap Chi tiết theo Tiêu chí</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu chí</TableHead>
              <TableHead>Giá trị của bạn</TableHead>
              <TableHead>Trung bình Top 3</TableHead>
              <TableHead>Gap</TableHead>
              <TableHead>Độ ưu tiên</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detailedGaps.map((gap, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{gap.criteria}</TableCell>
                <TableCell>{gap.you}</TableCell>
                <TableCell>{gap.top3}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    {gap.gap}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      gap.priority === "Cao" ? "destructive" :
                      gap.priority === "Vừa" ? "default" :
                      "secondary"
                    }
                  >
                    {gap.priority}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-3">Tóm tắt Chiến lược</h3>
        <ul className="text-sm opacity-90 space-y-2 list-disc list-inside">
          <li>Đang thiếu ~87 RD so với trung bình top 3 → Cần build thêm 80-100 RD chất lượng trong 6 tháng</li>
          <li>Anchor profile đang tối ưu quá đà so với benchmark (Exact 9.5% vs 4% ngành) → Giảm exact anchor về dưới 5%</li>
          <li>Không có đủ link từ báo/PR trong khi 2/3 đối thủ đều có nhiều → Tăng PR outreach và guest posting</li>
          <li>8% toxic links cao hơn ngành (3%) → Thực hiện disavow ngay để tránh bị Google phạt</li>
          <li>Link velocity chậm hơn 30% so với đối thủ → Tăng tốc link building lên 20-25 RD/tháng</li>
        </ul>
      </Card>
    </div>
  );
}
