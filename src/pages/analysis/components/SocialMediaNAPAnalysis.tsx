import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, XCircle, ExternalLink, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SocialProfile {
  platform: string;
  url: string;
  status: "detected" | "not-found";
  napConsistent: "consistent" | "inconsistent" | "n/a";
  hasLink: boolean;
  followers?: number;
  verificationStatus?: string;
  name?: string;
  address?: string;
  phone?: string;
}

export function SocialMediaNAPAnalysis() {
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [napFilter, setNapFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Social Profiles Distribution
  const socialProfilesDistribution = [
    { name: "Detected", value: 83, count: 5, color: "hsl(var(--primary))" },
    { name: "Not Found", value: 17, count: 1, color: "hsl(var(--destructive))" },
  ];

  // NAP Consistency Distribution
  const napConsistencyDistribution = [
    { name: "Consistent", value: 80, count: 4, color: "hsl(var(--primary))" },
    { name: "Inconsistent", value: 20, count: 1, color: "hsl(var(--warning))" },
  ];

  // Social Profiles Data
  const socialProfiles: SocialProfile[] = [
    {
      platform: "Website",
      url: "mywebsite.com",
      status: "detected",
      napConsistent: "consistent",
      hasLink: true,
      name: "My Brand",
      address: "123 Main St, City",
      phone: "+84 123 456 789",
    },
    {
      platform: "Facebook",
      url: "facebook.com/mybrand",
      status: "detected",
      napConsistent: "consistent",
      hasLink: true,
      followers: 50000,
      verificationStatus: "Verified",
      name: "My Brand",
      address: "123 Main St, City",
      phone: "+84 123 456 789",
    },
    {
      platform: "Google My Business",
      url: "GMB Profile",
      status: "detected",
      napConsistent: "inconsistent",
      hasLink: true,
      name: "My Brand",
      address: "456 Other St, City",
      phone: "+84 123 456 789",
    },
    {
      platform: "LinkedIn",
      url: "",
      status: "not-found",
      napConsistent: "n/a",
      hasLink: false,
    },
    {
      platform: "Twitter/X",
      url: "x.com/mybrand",
      status: "detected",
      napConsistent: "consistent",
      hasLink: true,
      followers: 25000,
      verificationStatus: "Verified",
      name: "My Brand",
      address: "123 Main St, City",
      phone: "+84 123 456 789",
    },
    {
      platform: "YouTube",
      url: "youtube.com/@mybrand",
      status: "detected",
      napConsistent: "consistent",
      hasLink: true,
      followers: 100000,
      verificationStatus: "Verified",
      name: "My Brand",
      address: "123 Main St, City",
      phone: "+84 123 456 789",
    },
  ];

  // Filter profiles
  const filteredProfiles = socialProfiles.filter((profile) => {
    if (platformFilter !== "all" && profile.platform.toLowerCase() !== platformFilter.toLowerCase()) return false;
    if (napFilter === "consistent" && profile.napConsistent !== "consistent") return false;
    if (napFilter === "inconsistent" && profile.napConsistent !== "inconsistent") return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProfiles.length / pageSize);
  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const notFoundCount = socialProfiles.filter((p) => p.status === "not-found").length;
  const inconsistentCount = socialProfiles.filter((p) => p.napConsistent === "inconsistent").length;
  const isWarning = notFoundCount > 0 || inconsistentCount > 0;

  const COLORS = ["hsl(var(--primary))", "hsl(var(--destructive))"];

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-500" />;
      case "twitter":
      case "x":
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-blue-600" />;
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-500" />;
      default:
        return <ExternalLink className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "detected":
        return <Badge className="bg-green-500">Detected</Badge>;
      case "not-found":
        return <Badge variant="destructive">Not Found</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getNAPBadge = (nap: string) => {
    switch (nap) {
      case "consistent":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Consistent
          </Badge>
        );
      case "inconsistent":
        return (
          <Badge className="bg-yellow-500">
            <XCircle className="h-3 w-3 mr-1" />
            Inconsistent
          </Badge>
        );
      case "n/a":
        return <span className="text-muted-foreground">N/A</span>;
      default:
        return <Badge variant="outline">{nap}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Phân bố Social Profiles
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={socialProfilesDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {socialProfilesDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value}% (${props.payload.count} profiles)`,
                  props.payload.name,
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-surface shadow-medium">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            NAP Consistency
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={napConsistencyDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
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
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${props.payload.count} profiles (${value}%)`,
                  props.payload.name,
                ]}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Warning Alert */}
      {isWarning && (
        <Alert variant="destructive" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Cảnh báo:</strong>{" "}
            {notFoundCount > 0 && (
              <>Thiếu {notFoundCount} social profile quan trọng. </>
            )}
            {inconsistentCount > 0 && (
              <>Có {inconsistentCount} profile có thông tin NAP không đồng nhất. </>
            )}
            Khuyến nghị: Bổ sung các social profiles còn thiếu và điều chỉnh thông tin NAP để đảm
            bảo tính nhất quán trên tất cả các nền tảng.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface shadow-soft">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng Profiles</p>
            <p className="text-2xl font-bold">{socialProfiles.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-green-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Detected</p>
            <p className="text-2xl font-bold text-green-500">
              {socialProfiles.filter((p) => p.status === "detected").length}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-red-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Not Found</p>
            <p className="text-2xl font-bold text-red-500">{notFoundCount}</p>
          </div>
        </Card>
        <Card className="p-4 bg-surface shadow-soft border-yellow-500/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">NAP Inconsistent</p>
            <p className="text-2xl font-bold text-yellow-500">{inconsistentCount}</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-surface-soft border-0 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="space-y-2 min-w-[150px]">
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả platforms</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">Twitter/X</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 min-w-[150px]">
            <Select value={napFilter} onValueChange={setNapFilter}>
              <SelectTrigger>
                <SelectValue placeholder="NAP" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="consistent">Consistent</SelectItem>
                <SelectItem value="inconsistent">Inconsistent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="ml-auto">
            <Select value={pageSize.toString()} onValueChange={(v) => setPageSize(Number(v))}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25/trang</SelectItem>
                <SelectItem value="50">50/trang</SelectItem>
                <SelectItem value="100">100/trang</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Social Profiles Table */}
      <Card className="p-6 bg-surface shadow-medium">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Social Media Profiles & NAP Consistency
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>URL/Profile</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>NAP nhất quán</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProfiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy profile nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedProfiles.map((profile, idx) => (
                  <TableRow
                    key={idx}
                    className={`hover:bg-muted/50 ${
                      profile.napConsistent === "inconsistent" ? "bg-yellow-50/50 dark:bg-yellow-950/20" : ""
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(profile.platform)}
                        <span className="font-medium">{profile.platform}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {profile.url ? (
                        <a
                          href={`https://${profile.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1 max-w-xs truncate"
                        >
                          {profile.url}
                          <ExternalLink className="h-3 w-3 flex-shrink-0" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(profile.status)}</TableCell>
                    <TableCell>{getNAPBadge(profile.napConsistent)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {profile.name || "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {profile.address || "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {profile.phone || "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

