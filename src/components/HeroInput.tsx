import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Search, Link as LinkIcon, AlertCircle } from "lucide-react";

interface HeroInputProps {
  onAnalyze?: (data: AnalysisFormData) => void;
  isLoading?: boolean;
}

interface AnalysisFormData {
  url: string;
  keyword: string;
}

export function HeroInput({ onAnalyze, isLoading = false }: HeroInputProps) {
  const [formData, setFormData] = useState<AnalysisFormData>({
    url: '',
    keyword: '',
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

  const handleInputChange = (field: keyof AnalysisFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 mb-6 shadow-lg">
          <LinkIcon className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          Phân tích Off-page SEO
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Nhập URL bài viết và từ khóa để bắt đầu phân tích SEO Off-page và so sánh với đối thủ
        </p>
      </div>

      {/* Main Input Section */}
      <Card className="p-8 md:p-12 bg-white dark:bg-surface shadow-xl border border-purple-100 dark:border-purple-900/30">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* URL Input */}
          <div className="space-y-3">
            <Label htmlFor="url" className="text-base font-semibold text-foreground flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-purple-600" />
              URL bài viết
              <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="url"
                placeholder="https://example.com/bai-viet"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className={`h-14 text-base pl-12 border-2 transition-all ${
                  errors.url 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-purple-200 dark:border-purple-800 focus:border-purple-500 focus:ring-purple-500'
                }`}
                disabled={isLoading}
              />
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
            </div>
            {errors.url && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.url}
              </div>
            )}
          </div>

          {/* Keyword Input */}
          <div className="space-y-3">
            <Label htmlFor="keyword" className="text-base font-semibold text-foreground flex items-center gap-2">
              <Search className="h-4 w-4 text-purple-600" />
              Từ khóa tìm kiếm
              <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="keyword"
                placeholder="Nhập từ khóa bạn muốn phân tích"
                value={formData.keyword}
                onChange={(e) => handleInputChange('keyword', e.target.value)}
                className={`h-14 text-base pl-12 border-2 transition-all ${
                  errors.keyword 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-purple-200 dark:border-purple-800 focus:border-purple-500 focus:ring-purple-500'
                }`}
                disabled={isLoading}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
            </div>
            {errors.keyword && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.keyword}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              size="lg" 
              disabled={isLoading}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Đang phân tích...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Phân tích ngay
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}