import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ArrowUpDown, 
  Search, 
  Filter, 
  ExternalLink, 
  Info,
  Trophy,
  Globe
} from "lucide-react";

interface CompetitorData {
  rank: number;
  url: string;
  domain: string;
  title?: string;
  snippet?: string;
  rd: number; // referring domains
  bl: number; // backlinks  
  dr: number; // domain rating
  ur: number; // url rating
  dofollow: number; // % dofollow
  nofollow: number; // % nofollow
}

interface CompetitorTableProps {
  data?: CompetitorData[];
  isLoading?: boolean;
  hasPartialResults?: boolean;
}

const mockData: CompetitorData[] = [
  {
    rank: 1,
    url: 'https://example1.com/article',
    domain: 'example1.com',
    title: 'Hướng dẫn SEO chi tiết cho người mới bắt đầu',
    snippet: 'Bài viết hướng dẫn SEO từ A-Z với các kỹ thuật hiệu quả...',
    rd: 450,
    bl: 1250,
    dr: 65,
    ur: 42,
    dofollow: 82,
    nofollow: 18,
  },
  {
    rank: 2,
    url: 'https://example2.com/seo-guide',
    domain: 'example2.com',
    title: 'SEO 2024: Chiến lược tối ưu hóa website hiệu quả',
    snippet: 'Khám phá những xu hướng SEO mới nhất và cách áp dụng...',
    rd: 320,
    bl: 890,
    dr: 58,
    ur: 38,
    dofollow: 75,
    nofollow: 25,
  },
  {
    rank: 3,
    url: 'https://example3.com/marketing',
    domain: 'example3.com',
    title: 'Digital Marketing và SEO: Kết hợp hiệu quả',
    snippet: 'Tích hợp SEO vào chiến lược marketing tổng thể...',
    rd: 285,
    bl: 720,
    dr: 52,
    ur: 35,
    dofollow: 68,
    nofollow: 32,
  },
  // Add more mock data...
];

export function CompetitorTable({ 
  data = mockData, 
  isLoading = false,
  hasPartialResults = false 
}: CompetitorTableProps) {
  const [sortConfig, setSortConfig] = useState<{key: keyof CompetitorData, direction: 'asc' | 'desc'} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorData | null>(null);

  const handleSort = (key: keyof CompetitorData) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const filteredData = sortedData.filter(item =>
    item.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getDRColor = (dr: number) => {
    if (dr >= 70) return 'text-success font-semibold';
    if (dr >= 50) return 'text-primary font-semibold';
    if (dr >= 30) return 'text-warning font-semibold';
    return 'text-muted-foreground';
  };

  return (
    <Card className="p-6 bg-card shadow-soft">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Đối thủ SERP (Top 10)</h3>
            {hasPartialResults && (
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                Kết quả một phần
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm domain hoặc title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Lọc
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="min-w-[300px]">URL/Domain</TableHead>
                <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('rd')}>
                  <div className="flex items-center gap-1">
                    RD <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('bl')}>
                  <div className="flex items-center gap-1">
                    BL <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('dr')}>
                  <div className="flex items-center gap-1">
                    DR <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('ur')}>
                  <div className="flex items-center gap-1">
                    UR <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Do/Nofollow</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((competitor, index) => (
                <TableRow 
                  key={index}
                  className="hover:bg-muted/30 cursor-pointer"
                  onClick={() => setSelectedCompetitor(competitor)}
                >
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Badge variant={competitor.rank <= 3 ? "default" : "secondary"} className="w-8 h-8 rounded-full">
                        {competitor.rank}
                      </Badge>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{competitor.domain}</p>
                          <p className="text-xs text-muted-foreground truncate" title={competitor.url}>
                            {competitor.url}
                          </p>
                        </div>
                      </div>
                      {competitor.title && (
                        <p className="text-sm text-foreground line-clamp-1" title={competitor.title}>
                          {competitor.title}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="font-semibold">{formatNumber(competitor.rd)}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className="font-semibold">{formatNumber(competitor.bl)}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className={getDRColor(competitor.dr)}>{competitor.dr}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className="font-medium">{competitor.ur}</span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-xs text-success font-medium">
                        {competitor.dofollow}% Do
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {competitor.nofollow}% No
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Info Footer */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            <span>Click vào domain để xem "Top Ref Domains" của đối thủ</span>
          </div>
          <span>{filteredData.length} kết quả</span>
        </div>
      </div>
    </Card>
  );
}