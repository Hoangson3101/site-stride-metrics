import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";
// import { LogOut, User, CreditCard, Settings } from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";
// import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  isAnalyzing?: boolean;
}

export function DashboardHeader({ 
  isAnalyzing = false
}: DashboardHeaderProps) {
  // const { user, logout } = useAuth();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };

  // const getPlanName = (plan?: string) => {
  //   if (!plan) return "Chưa có gói";
  //   const plans: Record<string, string> = {
  //     basic: "Cơ Bản",
  //     advanced: "Nâng Cao",
  //     professional: "Chuyên Gia",
  //   };
  //   return plans[plan] || plan;
  // };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-surface backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  SEO Analyzer
                </h1>
                <div className="flex items-center gap-2">             
                  <Badge variant="secondary" className="text-xs">Beta</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Analysis Status */}
            {isAnalyzing && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-muted rounded-full">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-primary font-medium">Đang phân tích...</span>
              </div>
            )}

            {/* User Menu - Hidden */}
            {/* {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 h-auto py-2 px-3 hover:bg-muted">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border-2 border-purple-200 dark:border-purple-800"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium text-foreground">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{getPlanName(user.plan)}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Thông tin tài khoản</span>
                  </DropdownMenuItem>
                  {user.plan && (
                    <DropdownMenuItem onClick={() => navigate("/payment")}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Quản lý gói dịch vụ</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Cài đặt</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate("/login")} variant="outline">
                Đăng nhập
              </Button>
            )} */}
          </div>
        </div>
      </div>
    </header>
  );
}