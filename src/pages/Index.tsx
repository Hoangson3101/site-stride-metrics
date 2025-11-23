import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { LayoutWithoutSidebar } from "@/components/LayoutWithoutSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { HeroInput } from "@/components/HeroInput";
import { AnalysisProgress } from "@/components/AnalysisProgress";
import { KPICards } from "@/components/KPICards";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Globe,
  Shield,
  Hash,
  FileText,
  Target,
  CalendarCheck,
  Activity,
  Award,
  BarChart3,
  GitCompare,
  ArrowRight,
} from "lucide-react";

interface HeroInputFormData {
  url: string;
  keyword: string;
}

const Index = () => {
  const navigate = useNavigate();
  const { analysisData, setAnalysisData, hasAnalysis } = useAnalysis();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState<1 | 2>(hasAnalysis ? 2 : 1); // Step 1: Input, Step 2: Results
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  // Redirect to login if not authenticated - Disabled
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  const handleAnalyze = (data: HeroInputFormData) => {
    // Extend the data with default values for missing fields required by AnalysisContext
    setAnalysisData({
      ...data,
      location: "vn", // Default location
      topN: 10, // Default top N results
      blLimit: 1000, // Default backlink limit
    });
    setIsAnalyzing(true);
    setShowProgress(true);
    setCurrentStep(2); // Move to Step 2
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowProgress(false);
    }, 5000);
  };

  const handleNewAnalysis = () => {
    setCurrentStep(1);
    setAnalysisData(null);
    setShowProgress(false);
    setIsAnalyzing(false);
  };

  const mockAnalysisSteps = [
    { id: 'serp', name: 'SERP Fetcher (Top 10)', vietnameseName: 'Thu thập kết quả tìm kiếm', status: 'completed' as const },
    { id: 'target', name: 'Target Backlink Collector', vietnameseName: 'Thu thập backlink mục tiêu', status: 'completed' as const },
    { id: 'competitor', name: 'Competitor Backlink Collector', vietnameseName: 'Thu thập backlink đối thủ', status: 'running' as const, progress: 65 },
    { id: 'normalizer', name: 'Normalizer & Merger', vietnameseName: 'Chuẩn hóa và gộp dữ liệu', status: 'pending' as const },
    { id: 'index', name: 'Index Checker (mẫu)', vietnameseName: 'Kiểm tra chỉ mục', status: 'pending' as const },
    { id: 'metrics', name: 'Metrics Calculator', vietnameseName: 'Tính toán chỉ số', status: 'pending' as const },
    { id: 'analyzer', name: 'Gap Analyzer & Report', vietnameseName: 'Phân tích khoảng cách', status: 'pending' as const },
  ];

  // Dashboard Data
  const kpiData = [
    { label: "Referring Domains", value: 250, icon: Globe, change: 35, changeLabel: "+35 so với 30 ngày trước" },
    { label: "Backlinks", value: 1850, icon: Shield, change: 120, changeLabel: "Tỷ lệ Backlink/RD: 7.4 : 1" },
    { label: "RD/Backlink", value: 13.5, unit: "%", icon: Target, change: 0, changeLabel: "Tự nhiên" },
    { label: "RD Gap vs Top 10", value: -120, icon: TrendingDown, change: 0, changeLabel: "Thiếu 120 RD" },
  ];

  const rdComparison = [
    { name: "Bạn", rd: 250, backlinks: 1850 },
    { name: "Đối thủ 1", rd: 450, backlinks: 3500 },
    { name: "Đối thủ 2", rd: 420, backlinks: 3200 },
    { name: "Đối thủ 3", rd: 400, backlinks: 3000 },
    { name: "Đối thủ 4", rd: 380, backlinks: 2800 },
    { name: "Đối thủ 5", rd: 360, backlinks: 2600 },
    { name: "Đối thủ 6", rd: 340, backlinks: 2400 },
    { name: "Đối thủ 7", rd: 320, backlinks: 2200 },
    { name: "Đối thủ 8", rd: 300, backlinks: 2000 },
    { name: "Đối thủ 9", rd: 280, backlinks: 1900 },
    { name: "Đối thủ 10", rd: 270, backlinks: 1800 },
  ];

  const anchorDistribution = [
    { name: "Branded", value: 45, color: "hsl(var(--primary))" },
    { name: "Generic", value: 25, color: "hsl(var(--secondary))" },
    { name: "Exact-match", value: 8, color: "hsl(var(--accent))" },
    { name: "Partial-match", value: 15, color: "hsl(var(--warning))" },
    { name: "Naked URL", value: 7, color: "#8b5cf6" },
  ];

  const linkTypeDistribution = [
    { name: "Dofollow", value: 75, color: "hsl(var(--primary))" },
    { name: "Nofollow", value: 22, color: "hsl(var(--secondary))" },
    { name: "UGC", value: 2, color: "hsl(var(--accent))" },
    { name: "Sponsored", value: 1, color: "hsl(var(--warning))" },
  ];

  const velocityData = [
    { month: "2024-05", you: 12, competitor: 18 },
    { month: "2024-06", you: 8, competitor: 20 },
    { month: "2024-07", you: 14, competitor: 22 },
    { month: "2024-08", you: 18, competitor: 21 },
    { month: "2024-09", you: 38, competitor: 19 },
    { month: "2024-10", you: 16, competitor: 23 },
    { month: "2024-11", you: 12, competitor: 24 },
  ];

  const serpData = [
    { position: 1, domain: "competitor1.com", rd: 450, backlinks: 3500, dr: 70, dofollow: 78 },
    { position: 2, domain: "competitor2.com", rd: 420, backlinks: 3200, dr: 68, dofollow: 75 },
    { position: 3, domain: "competitor3.com", rd: 400, backlinks: 3000, dr: 65, dofollow: 73 },
    { position: 4, domain: "competitor4.com", rd: 380, backlinks: 2800, dr: 63, dofollow: 72 },
    { position: 5, domain: "competitor5.com", rd: 360, backlinks: 2600, dr: 62, dofollow: 71 },
    { position: 6, domain: "competitor6.com", rd: 340, backlinks: 2400, dr: 60, dofollow: 70 },
    { position: 7, domain: "competitor7.com", rd: 320, backlinks: 2200, dr: 59, dofollow: 69 },
    { position: 8, domain: "yoursite.com", rd: 250, backlinks: 1850, dr: 58, dofollow: 75 },
    { position: 9, domain: "competitor8.com", rd: 280, backlinks: 2000, dr: 57, dofollow: 68 },
    { position: 10, domain: "competitor9.com", rd: 270, backlinks: 1900, dr: 56, dofollow: 67 },
  ];

  const radarData = [
    { subject: "RD", you: 65, competitor: 85, topAvg: 90 },
    { subject: "Quality", you: 42, competitor: 68, topAvg: 75 },
    { subject: "Anchor Safety", you: 68, competitor: 88, topAvg: 85 },
    { subject: "Relevance", you: 58, competitor: 75, topAvg: 80 },
    { subject: "Low Toxic", you: 82, competitor: 92, topAvg: 88 },
    { subject: "Brand Signals", you: 55, competitor: 70, topAvg: 72 },
  ];

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
    "hsl(var(--muted))",
  ];

  const analysisFeatures = [
    { name: "Referring Domains", href: "/analysis/referring-domains", icon: Globe, description: "Tổng quan domain đang trỏ link về website" },
    { name: "Chất Lượng Backlink", href: "/analysis/link-quality", icon: Shield, description: "Phân tích chất lượng backlink và domain uy tín" },
    { name: "Anchor Text", href: "/analysis/anchor-text", icon: Hash, description: "Phân phối anchor text và tối ưu hóa" },
    { name: "Link Types & Placement", href: "/analysis/link-types", icon: FileText, description: "Phân tích loại link và vị trí backlink" },
    { name: "Relevance", href: "/analysis/relevance", icon: Target, description: "Mức độ liên quan giữa nguồn và trang đích" },
    { name: "Index & Durability", href: "/analysis/index-durability", icon: CalendarCheck, description: "Tình trạng index và độ bền của backlink" },
    { name: "Link Velocity", href: "/analysis/link-velocity", icon: Activity, description: "Tốc độ tăng trưởng backlink theo thời gian" },
    { name: "Toxic & Risk", href: "/analysis/toxic-risk", icon: AlertTriangle, description: "Phát hiện backlink độc hại và rủi ro" },
    { name: "Entity & Brand", href: "/analysis/entity-brand", icon: Award, description: "Tín hiệu thương hiệu và E-A-T" },
    { name: "SERP Benchmark", href: "/analysis/benchmark", icon: BarChart3, description: "So sánh với đối thủ trên SERP" },
    { name: "Dofollow/Nofollow", href: "/analysis/dofollow-nofollow", icon: GitCompare, description: "Tỷ lệ dofollow/nofollow và tối ưu hóa" },
  ];

  // Step 1: No sidebar, just input form
  if (currentStep === 1) {
    return (
      <LayoutWithoutSidebar>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950">
          <DashboardHeader isAnalyzing={isAnalyzing} />
          <main className="container mx-auto px-4 py-12 md:py-16 space-y-16">
            {/* Hero Input Section */}
            <HeroInput onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
            
            {/* Features Section */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1: Thu thập dữ liệu */}
                <Card className="p-8 bg-white dark:bg-surface border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700 transition-all shadow-lg hover:shadow-xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                    <BarChart3 className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Thu thập dữ liệu</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Công cụ sử dụng các nguồn dữ liệu phổ biến như <strong>Ahrefs, Data for SEO, Semrush</strong> để thu thập backlink từ nhiều nguồn uy tín, giúp phân tích chất lượng và mức độ cạnh tranh của bài viết.
                  </p>
                </Card>
                
                {/* Feature 2: So sánh đối thủ */}
                <Card className="p-8 bg-white dark:bg-surface border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700 transition-all shadow-lg hover:shadow-xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                    <Target className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">So sánh đối thủ</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Công cụ sẽ so sánh bài viết với các đối thủ hàng đầu trên SERP, giúp người dùng biết điểm mạnh và điểm yếu trong chiến lược SEO Off-Page của họ.
                  </p>
                </Card>
                
                {/* Feature 3: Gợi ý hành động */}
                <Card className="p-8 bg-white dark:bg-surface border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700 transition-all shadow-lg hover:shadow-xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                    <TrendingUp className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Gợi ý hành động</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cung cấp các chiến lược và hành động cụ thể để cải thiện SEO Off-Page dựa trên kết quả phân tích, giúp người dùng tối ưu hóa chiến lược xây dựng liên kết và tăng thứ hạng tìm kiếm.
                  </p>
                </Card>
              </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-purple-200 dark:border-purple-900/30 pt-12 pb-8">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Về chúng tôi</h4>
                    <p className="text-sm text-muted-foreground">
                      Công cụ phân tích SEO Off-Page chuyên nghiệp, giúp bạn tối ưu hóa chiến lược xây dựng liên kết và cải thiện thứ hạng tìm kiếm.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Liên kết</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                          Chính sách bảo mật
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                          Điều khoản sử dụng
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                          Hỗ trợ khách hàng
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Kết nối</h4>
                    <div className="flex gap-4">
                      <a href="#" className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                        <span className="text-purple-600 dark:text-purple-400">f</span>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                        <span className="text-purple-600 dark:text-purple-400">in</span>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                        <span className="text-purple-600 dark:text-purple-400">t</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground pt-8 border-t border-purple-200 dark:border-purple-900/30">
                  <p>© 2024 SEO Off-Page Analysis Tool. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </LayoutWithoutSidebar>
    );
  }

  // Step 2: With sidebar, show results
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-soft p-6 space-y-8">

        {/* Analysis Progress */}
        {showProgress && (
          <AnalysisProgress 
            steps={mockAnalysisSteps}
            currentStep={2}
            isVisible={showProgress}
          />
        )}

        {/* Dashboard Results */}
        {!showProgress && (
          <div className="space-y-8">
            {/* Section 1: Tổng Quan Hồ Sơ Backlink */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Tổng Quan Hồ Sơ Backlink</h2>
                <Link to="/analysis/referring-domains">
                  <Button variant="outline" size="sm">
                    Xem chi tiết <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <KPICards data={kpiData} />

              {/* RD/Backlink Ratio Warning */}
              <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  <strong>Cảnh báo:</strong> Bạn đang thiếu khoảng 120 RD so với trung bình Top 10. Cần xây thêm domain mới nếu muốn cạnh tranh top.
                </AlertDescription>
              </Alert>

              {/* RD Comparison Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-surface shadow-medium">
                  <h3 className="text-lg font-semibold text-foreground mb-4">So Sánh RD & Backlinks</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={rdComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="rd" fill="hsl(var(--primary))" name="Referring Domains" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="backlinks" fill="hsl(var(--secondary))" name="Backlinks" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 bg-surface shadow-medium">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Phân Bổ Anchor Text</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={anchorDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {anchorDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </section>

            {/* Section 2: SERP Analysis */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">SERP Analysis - Top 10 Kết Quả</h2>
                <Link to="/analysis/benchmark">
                  <Button variant="outline" size="sm">
                    Xem chi tiết <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <Card className="p-6 bg-surface shadow-medium">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-4 text-left font-semibold">Vị trí</th>
                        <th className="p-4 text-left font-semibold">Domain</th>
                        <th className="p-4 text-left font-semibold">RD</th>
                        <th className="p-4 text-left font-semibold">Backlinks</th>
                        <th className="p-4 text-left font-semibold">DR</th>
                        <th className="p-4 text-left font-semibold">Dofollow %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serpData.map((item, idx) => (
                        <tr key={idx} className={`border-b hover:bg-muted/50 ${item.domain === "yoursite.com" ? "bg-primary/5" : ""}`}>
                          <td className="p-4">
                            <Badge variant={item.position <= 3 ? "default" : "secondary"}>
                              #{item.position}
                            </Badge>
                          </td>
                          <td className="p-4 font-medium">{item.domain}</td>
                          <td className="p-4">{item.rd.toLocaleString()}</td>
                          <td className="p-4">{item.backlinks.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge variant={item.dr > 60 ? "default" : "secondary"}>{item.dr}</Badge>
                          </td>
                          <td className="p-4">{item.dofollow}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>

            {/* Section 3: Link Types & Dofollow Analysis */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Phân Tích Loại Link & Dofollow/Nofollow</h2>
                <Link to="/analysis/dofollow-nofollow">
                  <Button variant="outline" size="sm">
                    Xem chi tiết <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-surface shadow-medium">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Phân Bổ Loại Link</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={linkTypeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {linkTypeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 bg-surface shadow-medium">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Tốc Độ Tăng Trưởng Backlink</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={velocityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="you" name="Bạn" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="competitor" name="Đối thủ" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                  <Alert variant="destructive" className="mt-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800 dark:text-yellow-200 text-sm">
                      Phát hiện spike bất thường vào tháng 9/2024 (38 RD). Cần kiểm tra nguồn gốc.
                    </AlertDescription>
                  </Alert>
                </Card>
              </div>
            </section>

            {/* Section 4: Radar Chart - So Sánh Toàn Diện */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">So Sánh Toàn Diện với Đối Thủ</h2>
                <Link to="/analysis/benchmark">
                  <Button variant="outline" size="sm">
                    Xem chi tiết <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <Card className="p-6 bg-surface shadow-medium">
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
            </section>

            {/* Section 5: Quick Access to All Analysis Functions */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Truy Cập Nhanh Các Chức Năng Phân Tích</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisFeatures.map((feature, idx) => (
                  <Link key={idx} to={feature.href}>
                    <Card className="p-6 bg-surface shadow-medium hover:shadow-strong transition-shadow cursor-pointer h-full">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">{feature.name}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* Section 6: Tối Ưu Hóa SEO - Recommendations */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Khuyến Nghị Tối Ưu Hóa SEO Offpage</h2>
              <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
                <h3 className="text-lg font-semibold mb-4">Chiến Lược Ưu Tiên Cao</h3>
                <ul className="space-y-3 text-sm opacity-90">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Tăng cường Referring Domains:</strong> Bạn đang thiếu 120 RD so với trung bình Top 3. 
                      Cần build thêm 80-100 RD chất lượng trong 6 tháng.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Giảm tỷ lệ Exact-match Anchor:</strong> Hiện tại 8% cao hơn chuẩn ngành (4%). 
                      Cần giảm về dưới 5% để tránh tối ưu hóa quá mức.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Tăng cường backlink từ domain uy tín:</strong> Chỉ có 18% backlink từ domain DR≥30, 
                      trong khi đối thủ có 45%. Cần build link từ authority sites.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Activity className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Tăng tốc link building:</strong> Tốc độ hiện tại 15 RD/tháng chậm hơn 30% so với đối thủ (22 RD/tháng). 
                      Cần tăng lên 20-25 RD/tháng.
                    </div>
                  </li>
                </ul>
              </Card>
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
