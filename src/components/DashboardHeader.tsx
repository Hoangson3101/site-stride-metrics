import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface DashboardHeaderProps {
  isAnalyzing?: boolean;
}

export function DashboardHeader({ 
  isAnalyzing = false
}: DashboardHeaderProps) {

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
          {/* Analysis Status */}
          {isAnalyzing && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-muted rounded-full">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm text-primary font-medium">Đang phân tích...</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}