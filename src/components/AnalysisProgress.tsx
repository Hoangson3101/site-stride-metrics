import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Loader2, AlertTriangle, FileText } from "lucide-react";

interface AnalysisStep {
  id: string;
  name: string;
  vietnameseName?: string;
  status: 'pending' | 'running' | 'completed' | 'error' | 'warning';
  progress?: number;
  message?: string;
  warnings?: string[];
}

interface AnalysisProgressProps {
  steps?: AnalysisStep[];
  currentStep?: number;
  isVisible?: boolean;
}

const defaultSteps: AnalysisStep[] = [
  { id: 'serp', name: 'SERP Fetcher (Top 10)', vietnameseName: 'Thu thập kết quả tìm kiếm', status: 'pending' },
  { id: 'target', name: 'Target Backlink Collector', vietnameseName: 'Thu thập backlink mục tiêu', status: 'pending' },
  { id: 'competitor', name: 'Competitor Backlink Collector', vietnameseName: 'Thu thập backlink đối thủ', status: 'pending' },
  { id: 'normalizer', name: 'Normalizer & Merger', vietnameseName: 'Chuẩn hóa và gộp dữ liệu', status: 'pending' },
  { id: 'index', name: 'Index Checker (mẫu)', vietnameseName: 'Kiểm tra chỉ mục', status: 'pending' },
  { id: 'metrics', name: 'Metrics Calculator', vietnameseName: 'Tính toán chỉ số', status: 'pending' },
  { id: 'analyzer', name: 'Gap Analyzer & Report', vietnameseName: 'Phân tích khoảng cách', status: 'pending' },
];

export function AnalysisProgress({ 
  steps = defaultSteps, 
  currentStep = 0,
  isVisible = true 
}: AnalysisProgressProps) {
  if (!isVisible) return null;

  const getStepIcon = (step: AnalysisStep, index: number) => {
    switch (step.status) {
      case 'completed':
        return <Check className="h-4 w-4 text-success" />;
      case 'running':
        return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return (
          <div className={`h-4 w-4 rounded-full border-2 ${
            index <= currentStep ? 'border-primary bg-primary/20' : 'border-muted'
          }`} />
        );
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'running': return 'bg-primary/10 text-primary border-primary/20';
      case 'error': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'warning': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted/50 text-muted-foreground border-muted';
    }
  };

  const overallProgress = (steps.filter(s => s.status === 'completed').length / steps.length) * 100;

  return (
    <Card className="p-6 bg-card-soft border shadow-soft">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Orchestrator - Tiến trình Bot
          </h3>
          <Badge variant="outline" className="text-xs">
            {steps.filter(s => s.status === 'completed').length}/{steps.length} hoàn thành
          </Badge>
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tiến trình tổng thể</span>
            <span className="font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${getStepStatusColor(step.status)}`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getStepIcon(step, index)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{step.name}</span>
                    {step.vietnameseName && (
                      <span className="text-xs text-muted-foreground mt-0.5">→ {step.vietnameseName}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {step.status === 'running' && step.progress && (
                      <span className="text-xs font-medium">{step.progress}%</span>
                    )}
                    {step.warnings && step.warnings.length > 0 && (
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        {step.warnings.length} cảnh báo
                      </Badge>
                    )}
                  </div>
                </div>
                
                {step.message && (
                  <p className="text-xs text-muted-foreground mt-1">{step.message}</p>
                )}
                
                {step.status === 'running' && step.progress && (
                  <Progress value={step.progress} className="h-1 mt-2" />
                )}
                
                {step.warnings && step.warnings.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {step.warnings.map((warning, i) => (
                      <p key={i} className="text-xs text-warning flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {warning}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </Card>
  );
}