import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Loader2 } from "lucide-react";

interface SourceStatus {
  name: string;
  status: 'online' | 'warning' | 'offline';
}

interface DashboardHeaderProps {
  isAnalyzing?: boolean;
  sources?: SourceStatus[];
}

export function DashboardHeader({ 
  isAnalyzing = false, 
  sources = [
    { name: 'Ahrefs', status: 'online' },
    { name: 'Moz', status: 'warning' },
    { name: 'Semrush', status: 'online' },
    { name: 'Majestic', status: 'offline' },
  ]
}: DashboardHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'offline': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-surface backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  SEO Analyzer
                </h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">MVP</Badge>
                  <Badge variant="secondary" className="text-xs">Beta</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Source Status & Controls */}
          <div className="flex items-center gap-6">
            {/* Data Sources Status */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground font-medium">Nguồn dữ liệu:</span>
              <div className="flex gap-2">
                {sources.map((source) => (
                  <div key={source.name} className="flex items-center gap-1">
                    <div 
                      className={`w-2 h-2 rounded-full ${getStatusColor(source.status)}`}
                      title={`${source.name} - ${source.status}`}
                    />
                    <span className="text-xs text-muted-foreground">{source.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Status */}
            {isAnalyzing && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-muted rounded-full">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-primary font-medium">Đang phân tích...</span>
              </div>
            )}

            {/* Quick Config Button */}
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Cấu hình
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}