import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Minus, Link, Globe, Shield, Eye, Target } from "lucide-react";

interface KPIData {
  label: string;
  value: number | string;
  unit?: string;
  change?: number; // % change vs median
  changeLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  loading?: boolean;
}

interface KPICardsProps {
  data?: KPIData[];
  isLoading?: boolean;
}

const defaultKPIData: KPIData[] = [
  {
    label: 'Referring Domains',
    value: 145,
    unit: '',
    change: -25,
    changeLabel: 'vs Median Top 10',
    icon: Globe,
  },
  {
    label: 'Backlinks',
    value: '2.4K',
    unit: '',
    change: -18,
    changeLabel: 'vs Median Top 10',
    icon: Link,
  },
  {
    label: 'Domain Rating',
    value: 42,
    unit: '',
    change: 8,
    changeLabel: 'vs Median Top 10',
    icon: Shield,
  },
  {
    label: 'URL Rating',
    value: 28,
    unit: '',
    change: -5,
    changeLabel: 'vs Median Top 10',
    icon: Target,
  },
  {
    label: '% Dofollow',
    value: 78,
    unit: '%',
    change: 12,
    changeLabel: 'vs Median Top 10',
    icon: TrendingUp,
  },
  {
    label: '% Indexed',
    value: 85,
    unit: '%',
    change: -2,
    changeLabel: 'vs Median Top 10 (mẫu)',
    icon: Eye,
  },
];

export function KPICards({ data = defaultKPIData, isLoading = false }: KPICardsProps) {
  const getChangeColor = (change: number) => {
    if (change > 15) return 'bg-success/10 text-success border-success/20';
    if (change > 0) return 'bg-primary/10 text-primary border-primary/20';
    if (change > -15) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-destructive/10 text-destructive border-destructive/20';
  };

  const getChangeIcon = (change: number) => {
    if (change > 5) return <TrendingUp className="h-3 w-3" />;
    if (change < -5) return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  const formatValue = (value: number | string, unit?: string) => {
    if (typeof value === 'string') return value;
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {data.map((kpi, index) => (
        <Card key={index} className="p-4 bg-gradient-surface shadow-soft border-0 hover:shadow-medium transition-all">
          <div className="space-y-3">
            {/* Header with Icon */}
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-primary/10">
                <kpi.icon className="h-4 w-4 text-primary" />
              </div>
              {kpi.change !== undefined && (
                <Badge 
                  variant="outline" 
                  className={`text-xs px-2 py-0.5 ${getChangeColor(kpi.change)}`}
                >
                  <div className="flex items-center gap-1">
                    {getChangeIcon(kpi.change)}
                    {Math.abs(kpi.change)}%
                  </div>
                </Badge>
              )}
            </div>

            {/* Value */}
            <div className="space-y-1">
              {isLoading || kpi.loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-foreground">
                  {formatValue(kpi.value, kpi.unit)}
                  {kpi.unit && <span className="text-sm text-muted-foreground ml-1">{kpi.unit}</span>}
                </div>
              )}
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">{kpi.label}</p>
                {kpi.changeLabel && (
                  <p className="text-xs text-muted-foreground">{kpi.changeLabel}</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}