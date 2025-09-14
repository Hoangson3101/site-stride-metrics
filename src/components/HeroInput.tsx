import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Zap, AlertCircle } from "lucide-react";

interface HeroInputProps {
  onAnalyze?: (data: AnalysisFormData) => void;
  isLoading?: boolean;
}

interface AnalysisFormData {
  url: string;
  keyword: string;
  location: string;
  device: string;
  topN: number;
  blLimit: number;
}

export function HeroInput({ onAnalyze, isLoading = false }: HeroInputProps) {
  const [formData, setFormData] = useState<AnalysisFormData>({
    url: '',
    keyword: '',
    location: 'VN/vi',
    device: 'Desktop',
    topN: 10,
    blLimit: 5000,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.url) {
      newErrors.url = 'URL bài viết là bắt buộc';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'URL không hợp lệ';
    }
    
    if (!formData.keyword) {
      newErrors.keyword = 'Từ khóa là bắt buộc';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAnalyze?.(formData);
    }
  };

  const handleInputChange = (field: keyof AnalysisFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="p-8 bg-gradient-surface shadow-medium border-0">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
            Phân tích Off-page SEO
          </h2>
          <p className="text-muted-foreground text-lg">
            Nhập URL bài viết và từ khóa để bắt đầu phân tích so sánh với đối thủ
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Required Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-base font-medium">
                URL bài viết <span className="text-destructive">*</span>
              </Label>
              <Input
                id="url"
                placeholder="https://example.com/bai-viet"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className={`h-12 ${errors.url ? 'border-destructive' : ''}`}
              />
              {errors.url && (
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.url}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyword" className="text-base font-medium">
                Từ khóa <span className="text-destructive">*</span>
              </Label>
              <Input
                id="keyword"
                placeholder="từ khóa cần phân tích"
                value={formData.keyword}
                onChange={(e) => handleInputChange('keyword', e.target.value)}
                className={`h-12 ${errors.keyword ? 'border-destructive' : ''}`}
              />
              {errors.keyword && (
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.keyword}
                </div>
              )}
            </div>
          </div>

          {/* Optional Settings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Vùng/Ngôn ngữ</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VN/vi">VN/vi</SelectItem>
                  <SelectItem value="US/en">US/en</SelectItem>
                  <SelectItem value="UK/en">UK/en</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Thiết bị</Label>
              <Select value={formData.device} onValueChange={(value) => handleInputChange('device', value)}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Desktop">Desktop</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Top N</Label>
              <Select value={formData.topN.toString()} onValueChange={(value) => handleInputChange('topN', parseInt(value))}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Top 5</SelectItem>
                  <SelectItem value="10">Top 10</SelectItem>
                  <SelectItem value="20">Top 20</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Giới hạn BL</Label>
              <Select value={formData.blLimit.toString()} onValueChange={(value) => handleInputChange('blLimit', parseInt(value))}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000">1.000</SelectItem>
                  <SelectItem value="5000">5.000</SelectItem>
                  <SelectItem value="10000">10.000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button 
              type="submit" 
              size="lg" 
              disabled={isLoading}
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-3 text-lg font-semibold shadow-medium"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Đang phân tích...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Phân tích ngay
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}