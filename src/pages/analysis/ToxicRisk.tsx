import { FilterBar } from "@/components/FilterBar";
import { KPICards } from "@/components/KPICards";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle, Shield, Download, Network } from "lucide-react";
import { useState } from "react";

export default function ToxicRisk() {
  const [selectedDomains, setSelectedDomains] = useState<number[]>([]);

  const kpiData = [
    { label: "Domain nguy cơ cao", value: 12, icon: AlertTriangle, change: 0, changeLabel: "Cần disavow" },
    { label: "Backlink Toxic", value: 45, icon: Shield, change: 8, changeLabel: "Cần xử lý" },
    { label: "Nghi PBN", value: 3, icon: Network, change: 0, changeLabel: "Clusters phát hiện" },
    { label: "Spam Score Avg", value: 28, unit: "/100", icon: AlertTriangle, change: 5, changeLabel: "Cao" },
  ];

  const toxicDistribution = [
    { level: "High", count: 45, color: "hsl(var(--destructive))" },
    { level: "Medium", count: 28, color: "hsl(var(--warning))" },
    { level: "Low", count: 72, color: "hsl(var(--success))" },
  ];

  const toxicBacklinks = [
    { id: 1, domain: "spam-casino-xyz.com", ip: "185.xxx.xxx.1", country: "RU", category: "Gambling", outbound: 5000, toxic: "High", action: "Disavow" },
    { id: 2, domain: "adult-content-site.net", ip: "185.xxx.xxx.2", country: "NL", category: "Adult", outbound: 8000, toxic: "High", action: "Disavow" },
    { id: 3, domain: "pharma-spam-tk.tk", ip: "185.xxx.xxx.3", country: "TK", category: "Drugs", outbound: 12000, toxic: "High", action: "Disavow" },
    { id: 4, domain: "link-farm-network.info", ip: "192.xxx.xxx.5", country: "CN", category: "Link Farm", outbound: 15000, toxic: "High", action: "Disavow" },
    { id: 5, domain: "suspicious-blog-23.xyz", ip: "185.xxx.xxx.1", country: "RU", category: "Spam", outbound: 3000, toxic: "Medium", action: "Monitor" },
  ];

  const pbnClusters = [
    { cluster: "Cluster #1", domains: 8, sharedIP: "185.xxx.xxx.1", sharedGA: "UA-12345-*", risk: "High" },
    { cluster: "Cluster #2", domains: 5, sharedIP: "192.xxx.xxx.5", sharedGA: "UA-67890-*", risk: "High" },
    { cluster: "Cluster #3", domains: 3, sharedIP: "Various", sharedGA: "UA-11111-*", risk: "Medium" },
  ];

  const negativeSpikes = [
    { month: "2024-09", newDomains: 38, badDomains: 12, badPercent: 32, tld: "xyz, tk, ru" },
    { month: "2024-11", newDomains: 12, badDomains: 3, badPercent: 25, tld: "info, cn" },
  ];

  const toggleDomain = (id: number) => {
    setSelectedDomains(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const exportDisavow = () => {
    const selected = toxicBacklinks.filter(d => selectedDomains.includes(d.id));
    const disavowText = selected.map(d => `domain:${d.domain}`).join('\n');
    console.log("Export Disavow List:\n", disavowText);
    alert(`Exported ${selected.length} domains to disavow file`);
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Toxic & Risk Check</h1>
        <p className="text-muted-foreground">Phát hiện backlink độc hại và negative SEO</p>
      </div>

      <FilterBar onExport={() => console.log("Export")} />

      <KPICards data={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Phân bố Toxic Level</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={toxicDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="level" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="count" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">PBN Clusters Phát hiện</h3>
          <div className="space-y-3">
            {pbnClusters.map((cluster, idx) => (
              <div key={idx} className="p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">{cluster.cluster}</span>
                  <Badge variant="destructive">{cluster.risk}</Badge>
                </div>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>• {cluster.domains} domains trong cluster</p>
                  <p>• Shared IP: {cluster.sharedIP}</p>
                  <p>• Shared GA ID: {cluster.sharedGA}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-surface shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Toxic Backlinks</h3>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={exportDisavow}
            disabled={selectedDomains.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Disavow ({selectedDomains.length})
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Outbound</TableHead>
              <TableHead>Toxic</TableHead>
              <TableHead>Đề xuất</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {toxicBacklinks.map((link) => (
              <TableRow key={link.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedDomains.includes(link.id)}
                    onCheckedChange={() => toggleDomain(link.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{link.domain}</TableCell>
                <TableCell className="text-muted-foreground">{link.ip}</TableCell>
                <TableCell>{link.country}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-destructive/10 text-destructive">
                    {link.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-destructive">{link.outbound}</TableCell>
                <TableCell>
                  <Badge variant={link.toxic === "High" ? "destructive" : "outline"}>
                    {link.toxic}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={link.action === "Disavow" ? "destructive" : "secondary"}>
                    {link.action}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6 bg-destructive/10 border border-destructive/20">
        <h3 className="text-lg font-semibold text-destructive mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Negative SEO Monitor
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tháng</TableHead>
              <TableHead>Domain mới</TableHead>
              <TableHead>Domain xấu</TableHead>
              <TableHead>% xấu</TableHead>
              <TableHead>TLD phổ biến</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {negativeSpikes.map((spike, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{spike.month}</TableCell>
                <TableCell>{spike.newDomains}</TableCell>
                <TableCell>
                  <Badge variant="destructive">{spike.badDomains}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-destructive/10 text-destructive">
                    {spike.badPercent}%
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{spike.tld}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-sm text-foreground">
          <strong>Gợi ý:</strong> Xem xét disavow hoặc báo cáo Negative SEO cho tháng 9/2024 (32% domain mới là spam/toxic).
        </div>
      </Card>
    </div>
  );
}
