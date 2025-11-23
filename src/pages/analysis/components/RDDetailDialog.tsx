import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
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
} from "recharts";
import {
  ExternalLink,
  AlertTriangle,
  Star,
  Download,
  X,
  Link as LinkIcon,
  Calendar,
  MapPin,
  Target,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RDDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  domain: string | null;
}

export function RDDetailDialog({ open, onOpenChange, domain }: RDDetailDialogProps) {
  if (!domain) return null;

  // Mock data for domain detail
  const domainInfo = {
    domain: domain,
    dr: 68,
    traffic: 125000,
    category: "Technology",
    backlinks: 85,
    backlinksChange: 5,
    firstSeen: "2024-02-10",
    lastSeen: "2025-10-15",
    relevanceScore: 85,
    linkPlacement: {
      content: 70,
      sidebar: 20,
      footer: 10,
    },
  };

  // Timeline data
  const timelineData = [
    { month: "02/2024", backlinks: 10 },
    { month: "05/2024", backlinks: 25 },
    { month: "08/2024", backlinks: 45 },
    { month: "11/2024", backlinks: 60 },
    { month: "02/2025", backlinks: 75 },
    { month: "05/2025", backlinks: 80 },
    { month: "08/2025", backlinks: 82 },
    { month: "10/2025", backlinks: 85 },
  ];

  // Anchor distribution
  const anchorData = [
    { name: "Brand", value: 35 },
    { name: "Naked", value: 25 },
    { name: "Generic", value: 20 },
    { name: "Partial", value: 15 },
    { name: "Exact", value: 5 },
  ];

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "#8884d8",
    "#82ca9d",
  ];

  // Backlinks list
  const backlinks = [
    {
      sourceUrl: "https://authority-site1.com/article-1",
      targetUrl: "https://mysite.com/page-1",
      anchorText: "best product",
      rel: "dofollow",
      placement: "Content",
      indexStatus: "Indexed",
      firstSeen: "2024-02-10",
      lastSeen: "2025-10-15",
      status: "Active",
      risk: "Low",
    },
    {
      sourceUrl: "https://authority-site1.com/article-2",
      targetUrl: "https://mysite.com/page-2",
      anchorText: "mysite.com",
      rel: "dofollow",
      placement: "Content",
      indexStatus: "Indexed",
      firstSeen: "2024-03-15",
      lastSeen: "2025-10-14",
      status: "Active",
      risk: "Low",
    },
    {
      sourceUrl: "https://authority-site1.com/review",
      targetUrl: "https://mysite.com/product",
      anchorText: "click here",
      rel: "nofollow",
      placement: "Sidebar",
      indexStatus: "Indexed",
      firstSeen: "2024-05-20",
      lastSeen: "2025-09-10",
      status: "Active",
      risk: "Medium",
    },
  ];

  const getRelevanceBadge = (score: number) => {
    if (score >= 70) return <Badge className="bg-green-500">High</Badge>;
    if (score >= 40) return <Badge className="bg-yellow-500">Medium</Badge>;
    return <Badge variant="destructive">Low</Badge>;
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "Low":
        return <Badge variant="default">Low</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "High":
        return <Badge variant="destructive">High</Badge>;
      default:
        return <Badge>{risk}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">
                Chi tiết Referring Domain: {domainInfo.domain}
              </DialogTitle>
              <DialogDescription className="mt-2 flex items-center gap-4">
                <Badge variant="outline">DR {domainInfo.dr}</Badge>
                <span className="text-muted-foreground">
                  Organic traffic: {domainInfo.traffic.toLocaleString()} / tháng
                </span>
                <Badge variant="outline">{domainInfo.category}</Badge>
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Thêm vào Outreach
              </Button>
              <Button variant="outline" size="sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Đánh dấu Toxic/Ignore
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-surface shadow-soft">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Số backlink từ domain này</p>
                  <p className="text-2xl font-bold">
                    {domainInfo.backlinks} backlinks
                  </p>
                  <p className="text-xs text-green-600">
                    +{domainInfo.backlinksChange} trong 30 ngày
                  </p>
                </div>
              </Card>

              <Card className="p-4 bg-surface shadow-soft">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    First seen / Last seen
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">First:</span> {domainInfo.firstSeen}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Last:</span> {domainInfo.lastSeen}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-surface shadow-soft">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Vị trí chủ yếu
                  </p>
                  <div className="space-y-1 text-sm">
                    <p>Content: {domainInfo.linkPlacement.content}%</p>
                    <p>Sidebar: {domainInfo.linkPlacement.sidebar}%</p>
                    <p>Footer: {domainInfo.linkPlacement.footer}%</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-surface shadow-soft">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Relevance score
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{domainInfo.relevanceScore}</p>
                    {getRelevanceBadge(domainInfo.relevanceScore)}
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Timeline */}
              <Card className="p-6 bg-surface shadow-medium">
                <h3 className="text-lg font-semibold mb-4">Timeline - Số backlink theo thời gian</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--popover))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="backlinks" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Anchor Distribution */}
              <Card className="p-6 bg-surface shadow-medium">
                <h3 className="text-lg font-semibold mb-4">Anchor distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={anchorData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} (${value}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {anchorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--popover))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Backlinks Table */}
            <Card className="p-6 bg-surface shadow-medium">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Danh sách backlink từ domain này</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="dofollow-only" />
                    <Label htmlFor="dofollow-only" className="text-xs cursor-pointer">
                      Chỉ dofollow
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="exact-match" />
                    <Label htmlFor="exact-match" className="text-xs cursor-pointer">
                      Chỉ exact-match
                    </Label>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL nguồn</TableHead>
                      <TableHead>URL đích</TableHead>
                      <TableHead>Anchor text</TableHead>
                      <TableHead>Rel</TableHead>
                      <TableHead>Vị trí</TableHead>
                      <TableHead>Index status</TableHead>
                      <TableHead>First seen</TableHead>
                      <TableHead>Last seen</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backlinks.map((link, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <a
                            href={link.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            {link.sourceUrl}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            href={link.targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {link.targetUrl}
                          </a>
                        </TableCell>
                        <TableCell>
                          <span className={link.anchorText === "best product" ? "font-bold text-primary" : ""}>
                            {link.anchorText}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={link.rel === "dofollow" ? "default" : "secondary"}>
                            {link.rel}
                          </Badge>
                        </TableCell>
                        <TableCell>{link.placement}</TableCell>
                        <TableCell>
                          <Badge variant={link.indexStatus === "Indexed" ? "default" : "secondary"}>
                            {link.indexStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{link.firstSeen}</TableCell>
                        <TableCell className="text-muted-foreground">{link.lastSeen}</TableCell>
                        <TableCell>
                          <Badge variant={link.status === "Active" ? "default" : "destructive"}>
                            {link.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{getRiskBadge(link.risk)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

