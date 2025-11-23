import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Hash, MapPin, BarChart3, Link2, Edit2 } from "lucide-react";
import { useAnalysis } from "@/contexts/AnalysisContext";

interface AnalysisInfoBarProps {
  onEdit?: () => void;
}

export function AnalysisInfoBar({ onEdit }: AnalysisInfoBarProps) {
  const navigate = useNavigate();
  const { analysisData } = useAnalysis();

  if (!analysisData) {
    return null;
  }

  const handleNewAnalysis = () => {
    if (onEdit) {
      onEdit();
    } else {
      navigate("/");
    }
  };

  return (
    <Card className="p-4 bg-surface-soft border-0 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">URL:</span>
            <Badge variant="outline" className="font-mono text-xs max-w-xs truncate">
              {analysisData.url}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Từ khóa:</span>
            <Badge variant="outline" className="font-medium">
              {analysisData.keyword}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Vùng:</span>
            <Badge variant="outline">
              {analysisData.location}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Top N:</span>
            <Badge variant="outline">
              Top {analysisData.topN}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Giới hạn BL:</span>
            <Badge variant="outline">
              {analysisData.blLimit.toLocaleString()}
            </Badge>
          </div>
        </div>
        
        <Button variant="outline" size="sm" onClick={handleNewAnalysis}>
          <Edit2 className="h-4 w-4 mr-2" />
          Phân tích mới
        </Button>
      </div>
    </Card>
  );
}

