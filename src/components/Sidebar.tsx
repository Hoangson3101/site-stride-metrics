import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Link as LinkIcon, 
  Globe, 
  Shield, 
  Hash, 
  FileText, 
  Target, 
  CalendarCheck, 
  TrendingUp, 
  AlertTriangle, 
  Award, 
  BarChart3,
  GitCompare
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const navigation = [
  { name: "Dashboard Tổng Quan", href: "/", icon: LayoutDashboard },
  { 
    name: "Phân Tích Off-page",
    items: [
      { name: "Referring Domains", href: "/analysis/referring-domains", icon: Globe },
      { name: "Chất Lượng Backlink", href: "/analysis/link-quality", icon: Shield },
      { name: "Anchor Text", href: "/analysis/anchor-text", icon: Hash },
      { name: "Link Types & Placement", href: "/analysis/link-types", icon: FileText },
      { name: "Relevance", href: "/analysis/relevance", icon: Target },
      { name: "Index & Durability", href: "/analysis/index-durability", icon: CalendarCheck },
      { name: "Link Velocity", href: "/analysis/link-velocity", icon: TrendingUp },
      { name: "Toxic & Risk", href: "/analysis/toxic-risk", icon: AlertTriangle },
      { name: "Entity & Brand", href: "/analysis/entity-brand", icon: Award },
      { name: "SERP Benchmark", href: "/analysis/benchmark", icon: BarChart3 },
      { name: "Dofollow/Nofollow", href: "/analysis/dofollow-nofollow", icon: GitCompare },
    ]
  }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-border bg-surface flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <LinkIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">SEO Offpage</h1>
            <p className="text-xs text-muted-foreground">Analysis Tool</p>
          </div>
        </Link>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((section) => (
            <div key={section.name} className="space-y-1">
              {section.href ? (
                <Link
                  to={section.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === section.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {section.icon && <section.icon className="h-4 w-4" />}
                  {section.name}
                </Link>
              ) : (
                <>
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.name}
                  </div>
                  {section.items?.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        location.pathname === item.href
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
