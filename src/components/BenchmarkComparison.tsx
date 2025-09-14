import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { TrendingUp, BarChart3, Target } from "lucide-react";

interface BenchmarkData {
  metric: string;
  current: number | string;
  median: number | string;
  gap: number;
  priority: 'P1' | 'P2' | 'P3';
  suggestion: string;
  unit?: string;
}

interface BenchmarkComparisonProps {
  data?: BenchmarkData[];
  isLoading?: boolean;
}

const mockBenchmarkData: BenchmarkData[] = [
  {
    metric: 'Referring Domains (RD)',
    current: 145,
    median: 285,
    gap: -49,
    priority: 'P1',
    suggestion: 'Guest post/PR từ domain DR>30',
    unit: '',
  },
  {
    metric: 'Backlinks (BL)',
    current: '2.4K',
    median: '4.8K',
    gap: -50,
    priority: 'P1',
    suggestion: 'Link Intersect ≥3 đối thủ',
    unit: '',
  },
  {
    metric: 'Domain Rating (DR)',
    current: 42,
    median: 58,
    gap: -28,
    priority: 'P1',
    suggestion: 'Xây dựng backlink chất lượng cao',
    unit: '',
  },
  {
    metric: 'URL Rating (UR)',
    current: 28,
    median: 38,
    gap: -26,
    priority: 'P2',
    suggestion: 'Tối ưu internal link + content',
    unit: '',
  },
  {
    metric: '% Dofollow',
    current: 78,
    median: 75,
    gap: 4,
    priority: 'P3',
    suggestion: 'Duy trì tỷ lệ hiện tại',
    unit: '%',
  },
  {
    metric: '% Indexed (mẫu)',
    current: 85,
    median: 82,
    gap: 4,
    priority: 'P3',
    suggestion: 'Theo dõi và duy trì',
    unit: '%',
  },
];

export function BenchmarkComparison({ data = mockBenchmarkData, isLoading = false }: BenchmarkComparisonProps) {
  const getGapColor = (gap: number) => {
    if (gap > 15) return 'bg-success/10 text-success border-success/20';
    if (gap >= -15) return 'bg-warning/10 text-warning border-warning/20';
    if (gap >= -40) return 'bg-destructive/20 text-destructive border-destructive/30';
    return 'bg-destructive/30 text-destructive border-destructive/40';
  };

  const getGapIcon = (gap: number) => {
    if (gap > 15) return '🔵';
    if (gap >= -15) return '🟢';  
    if (gap >= -40) return '🟠';
    return '🔴';
  };


  const formatValue = (value: number | string, unit?: string) => {
    if (typeof value === 'string') return value;
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return `${value}${unit || ''}`;
  };

  return (
    <Card className="p-6 bg-card shadow-soft">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">So sánh Benchmark (Snapshot)</h3>
        </div>

        {/* Gap Legend */}
        <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
          <span className="text-sm font-medium">Thang đo Gap:</span>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <span>🔴</span> &gt;40% thiếu
            </span>
            <span className="flex items-center gap-1">
              <span>🟠</span> 15-40% thiếu
            </span>
            <span className="flex items-center gap-1">
              <span>🟢</span> ±15% cân bằng
            </span>
            <span className="flex items-center gap-1">
              <span>🔵</span> &gt;+15% vượt trội
            </span>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="min-w-[180px]">Chỉ số</TableHead>
                <TableHead className="text-center">Bạn</TableHead>
                <TableHead className="text-center">Median Top 10</TableHead>
                <TableHead className="text-center">Gap</TableHead>
                <TableHead>Gợi ý hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index} className="hover:bg-muted/20">
                  <TableCell className="font-medium">{item.metric}</TableCell>
                  
                  <TableCell className="text-center">
                    <span className="font-semibold">
                      {formatValue(item.current, item.unit)}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className="font-semibold text-muted-foreground">
                      {formatValue(item.median, item.unit)}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg">{getGapIcon(item.gap)}</span>
                      <Badge 
                        variant="outline" 
                        className={`font-semibold ${getGapColor(item.gap)}`}
                      >
                        {item.gap > 0 ? '+' : ''}{item.gap}%
                      </Badge>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{item.suggestion}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Stats */}
        
      </div>
    </Card>
  );
}