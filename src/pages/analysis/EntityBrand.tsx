import { FilterBar } from "@/components/FilterBar";
import { KPICards } from "@/components/KPICards";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Award, TrendingUp, CheckCircle, XCircle } from "lucide-react";

export default function EntityBrand() {
  const kpiData = [
    { label: "Brand Mentions", value: 124, icon: Award, change: 18, changeLabel: "vs 6 tháng trước" },
    { label: "Social Profiles", value: 6, icon: CheckCircle, change: 0, changeLabel: "Đã phát hiện" },
    { label: "E-E-A-T Links", value: 8, icon: TrendingUp, change: 3, changeLabel: ".gov, .edu, báo lớn" },
    { label: "Mentions không link", value: 42, icon: XCircle, change: 0, changeLabel: "Cơ hội outreach" },
  ];

  const mentionTimeline = [
    { month: "2024-05", mentions: 15 },
    { month: "2024-06", mentions: 18 },
    { month: "2024-07", mentions: 22 },
    { month: "2024-08", mentions: 28 },
    { month: "2024-09", mentions: 35 },
    { month: "2024-10", mentions: 32 },
    { month: "2024-11", mentions: 38 },
  ];

  const mentionSources = [
    { name: "Báo chí", value: 45, color: "hsl(var(--primary))" },
    { name: "Blog", value: 38, color: "hsl(var(--secondary))" },
    { name: "Forum", value: 22, color: "hsl(var(--accent))" },
    { name: "Social", value: 19, color: "hsl(var(--warning))" },
  ];

  const brandMentions = [
    { source: "tech-news-portal.com", type: "Article", hasLink: "Yes", authority: 68, eeat: "High" },
    { source: "industry-blog-xyz.com", type: "Blog", hasLink: "Yes", authority: 45, eeat: "Medium" },
    { source: "digital-forum.com", type: "Forum", hasLink: "No", authority: 38, eeat: "Medium" },
    { source: "social-media-post", type: "Social", hasLink: "No", authority: 15, eeat: "Low" },
    { source: "university-edu.edu", type: "Article", hasLink: "Yes", authority: 92, eeat: "High" },
  ];

  const socialProfiles = [
    { platform: "Website", url: "mywebsite.com", status: "Detected", nap: "Consistent" },
    { platform: "Facebook", url: "facebook.com/mybrand", status: "Detected", nap: "Consistent" },
    { platform: "Google My Business", url: "GMB Profile", status: "Detected", nap: "Inconsistent" },
    { platform: "LinkedIn", url: "", status: "Not Found", nap: "N/A" },
    { platform: "Twitter/X", url: "x.com/mybrand", status: "Detected", nap: "Consistent" },
    { platform: "YouTube", url: "youtube.com/@mybrand", status: "Detected", nap: "Consistent" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Entity & Brand Signals</h1>
        <p className="text-muted-foreground">Đo sức mạnh thương hiệu và tín hiệu E-E-A-T</p>
      </div>

      <FilterBar onExport={() => console.log("Export")} />

      <KPICards data={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Brand Mentions Theo Tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mentionTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="mentions" name="Mentions" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">Phân bổ Mentions theo Nguồn</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mentionSources}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                dataKey="value"
              >
                {mentionSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">Brand Mentions & E-E-A-T Links</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nguồn</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Có link?</TableHead>
              <TableHead>Authority</TableHead>
              <TableHead>E-E-A-T</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brandMentions.map((mention, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{mention.source}</TableCell>
                <TableCell>{mention.type}</TableCell>
                <TableCell>
                  {mention.hasLink === "Yes" ? (
                    <Badge variant="default" className="bg-success">Yes</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-warning/10 text-warning">No</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={mention.authority > 60 ? "default" : "secondary"}>
                    {mention.authority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      mention.eeat === "High" ? "default" :
                      mention.eeat === "Medium" ? "secondary" :
                      "outline"
                    }
                  >
                    {mention.eeat}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">Social & NAP Consistency</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>URL/Profile</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>NAP nhất quán?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {socialProfiles.map((profile, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{profile.platform}</TableCell>
                <TableCell className="text-muted-foreground">{profile.url || "—"}</TableCell>
                <TableCell>
                  <Badge variant={profile.status === "Detected" ? "default" : "destructive"}>
                    {profile.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {profile.nap === "Consistent" ? (
                    <Badge variant="default" className="bg-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Consistent
                    </Badge>
                  ) : profile.nap === "Inconsistent" ? (
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                      <XCircle className="h-3 w-3 mr-1" />
                      Inconsistent
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">N/A</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-strong">
        <h3 className="text-lg font-semibold mb-2">Gợi ý cải thiện Brand Signals</h3>
        <div className="text-sm opacity-90 space-y-2">
          <p>• <strong>42 brand mentions không có link:</strong> Thực hiện chiến dịch outreach để xin thêm backlink từ các mentions này.</p>
          <p>• <strong>Thiếu LinkedIn profile:</strong> Tạo trang LinkedIn chính thức để tăng trust và brand authority.</p>
          <p>• <strong>NAP không nhất quán trên GMB:</strong> Cập nhật địa chỉ và SĐT trên Google My Business để khớp với website.</p>
          <p>• <strong>E-E-A-T links còn thấp:</strong> Tiếp tục build link từ .edu, .gov, và các báo chí uy tín để tăng E-E-A-T score.</p>
        </div>
      </Card>
    </div>
  );
}
