import { FilterBar } from "@/components/FilterBar";
import { KPICards } from "@/components/KPICards";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Activity, AlertTriangle } from "lucide-react";

export default function LinkVelocity() {
  const kpiData = [
    { label: "RD/tháng (Bạn)", value: 15, icon: Activity, change: -30, changeLabel: "vs Top 3 (22/tháng)" },
    { label: "Tháng cao nhất", value: 38, icon: TrendingUp, change: 0, changeLabel: "Tháng 9/2024" },
    { label: "Tháng thấp nhất", value: 8, icon: TrendingDown, change: 0, changeLabel: "Tháng 6/2024" },
    { label: "Spike cảnh báo", value: 1, icon: AlertTriangle, change: 0, changeLabel: "Kiểm tra tháng 9" },
  ];

  const velocityData = [
    { month: "2024-05", you: 12, comp1: 18, comp2: 22, comp3: 25 },
    { month: "2024-06", you: 8, comp1: 20, comp2: 19, comp3: 23 },
    { month: "2024-07", you: 14, comp1: 22, comp2: 24, comp3: 21 },
    { month: "2024-08", you: 18, comp1: 21, comp2: 23, comp3: 22 },
    { month: "2024-09", you: 38, comp1: 19, comp2: 22, comp3: 24 },
    { month: "2024-10", you: 16, comp1: 23, comp2: 21, comp3: 23 },
    { month: "2024-11", you: 12, comp1: 24, comp2: 25, comp3: 22 },
  ];

  const historyData = [
    { month: "2024-05", new: 12, lost: 3, net: 9, note: "Ổn định" },
    { month: "2024-06", new: 8, lost: 5, net: 3, note: "Giảm nhẹ" },
    { month: "2024-07", new: 14, lost: 4, net: 10, note: "Ổn định" },
    { month: "2024-08", new: 18, lost: 2, net: 16, note: "Tốt" },
    { month: "2024-09", new: 38, lost: 1, net: 37, note: "Spike" },
    { month: "2024-10", new: 16, lost: 6, net: 10, note: "Ổn định" },
    { month: "2024-11", new: 12, lost: 4, net: 8, note: "Ổn định" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Link Velocity & Growth</h1>
        <p className="text-muted-foreground">Tốc độ tăng trưởng RD/backlink theo thời gian</p>
      </div>

      <FilterBar onExport={() => console.log("Export")} />

      <KPICards data={kpiData} />

      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">RD Mới Theo Tháng - So sánh với Đối thủ</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={velocityData}>
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
            <Line type="monotone" dataKey="you" name="Bạn" stroke="hsl(var(--primary))" strokeWidth={3} />
            <Line type="monotone" dataKey="comp1" name="Đối thủ #1" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="comp2" name="Đối thủ #2" stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="comp3" name="Đối thủ #3" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">Lịch sử Tăng/Giảm RD</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tháng</TableHead>
              <TableHead>RD mới</TableHead>
              <TableHead>RD mất</TableHead>
              <TableHead>Net Change</TableHead>
              <TableHead>Ghi chú</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{row.month}</TableCell>
                <TableCell>
                  <Badge variant="default" className="bg-success">+{row.new}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="destructive">-{row.lost}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={row.net > 15 ? "default" : "secondary"}>
                    {row.net > 0 ? "+" : ""}{row.net}
                  </Badge>
                </TableCell>
                <TableCell>
                  {row.note === "Spike" ? (
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {row.note}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">{row.note}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Benchmark:</strong> Trung bình RD/tháng của Top 10 SERP: <Badge variant="outline">22 RD</Badge>
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-warning/10 border border-warning/20">
        <h3 className="text-lg font-semibold text-warning mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Phân tích Spike tháng 9/2024
        </h3>
        <p className="text-sm text-foreground">
          Tăng 38 RD trong tháng 9, gấp 2.5 lần trung bình 3 tháng trước (15 RD). 
          Cần kiểm tra xem spike này có đến từ chiến dịch PR hợp lệ hay từ nguồn spam/negative SEO. 
          Nếu phát hiện nhiều domain spam, cần disavow ngay để tránh bị Google phạt.
        </p>
      </Card>

      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2">Tổng kết & Gợi ý</h3>
        <p className="text-sm opacity-90">
          12 tháng gần đây, bạn tăng trung bình 15 RD/tháng. Đối thủ trung bình 22 RD/tháng. 
          Bạn đang chậm hơn ~30%. Gợi ý: Tăng tốc link building lên 20-25 RD/tháng để đuổi kịp và vượt qua đối thủ. 
          Đảm bảo tốc độ tăng trưởng ổn định và tự nhiên, tránh spike đột ngột.
        </p>
      </Card>
    </div>
  );
}
