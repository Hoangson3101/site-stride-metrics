import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutWithoutSidebar } from "@/components/LayoutWithoutSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link as LinkIcon, Shield, User, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth, FAKE_USERS } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }
    
    if (!password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo: create a user from email
      const demoUser = {
        id: Date.now().toString(),
        name: email.split("@")[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
      login(demoUser);
      navigate("/payment");
    }, 1500);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      // For demo: create a user from Google
      const demoUser = {
        id: Date.now().toString(),
        name: "Google User",
        email: "user@gmail.com",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=google`,
      };
      login(demoUser);
      navigate("/payment");
    }, 1500);
  };

  const handleDemoLogin = () => {
    if (!selectedUser) {
      alert("Vui lòng chọn tài khoản demo để đăng nhập");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const user = FAKE_USERS.find((u) => u.id === selectedUser);
      if (user) {
        login(user);
        setIsLoading(false);
        if (!user.plan) {
          navigate("/payment");
        } else {
          navigate("/");
        }
      }
    }, 500);
  };

  return (
    <LayoutWithoutSidebar>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 mb-6 shadow-lg">
              <LinkIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Chào mừng trở lại
            </h1>
            <p className="text-muted-foreground">
              Đăng nhập để tiếp tục sử dụng công cụ SEO Off-Page
            </p>
          </div>

          {/* Login Card */}
          <Card className="p-8 bg-white dark:bg-surface shadow-xl border-2 border-purple-100 dark:border-purple-900/30">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                <TabsTrigger value="demo">Demo</TabsTrigger>
              </TabsList>

              {/* Regular Login Tab */}
              <TabsContent value="login" className="space-y-6 mt-0">
                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                      <Mail className="h-4 w-4 text-purple-600" />
                      Email
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`h-12 pl-11 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-purple-200 dark:border-purple-800 focus:border-purple-500'}`}
                        disabled={isLoading}
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                    </div>
                    {errors.email && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-base font-semibold flex items-center gap-2">
                      <Lock className="h-4 w-4 text-purple-600" />
                      Mật khẩu
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors({ ...errors, password: undefined });
                        }}
                        className={`h-12 pl-11 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-purple-200 dark:border-purple-800 focus:border-purple-500'}`}
                        disabled={isLoading}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                    </div>
                    {errors.password && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Nhớ tài khoản
                      </Label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      Quên mật khẩu?
                    </a>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 text-base font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                        Đang đăng nhập...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Đăng nhập
                      </>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-surface px-2 text-muted-foreground">Hoặc</span>
                  </div>
                </div>

                {/* Google Login Button */}
                <Button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full h-14 text-base font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Đăng nhập với Google
                </Button>
              </TabsContent>

              {/* Demo Tab */}
              <TabsContent value="demo" className="space-y-6 mt-0">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg mb-4">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Chế độ Demo:</strong> Chọn một tài khoản có sẵn để đăng nhập nhanh (không cần mật khẩu)
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-select" className="text-base font-semibold flex items-center gap-2">
                      <User className="h-4 w-4 text-purple-600" />
                      Chọn tài khoản demo
                    </Label>
                    <Select value={selectedUser} onValueChange={setSelectedUser}>
                      <SelectTrigger id="user-select" className="h-12">
                        <SelectValue placeholder="Chọn tài khoản để đăng nhập" />
                      </SelectTrigger>
                      <SelectContent>
                        {FAKE_USERS.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            <div className="flex items-center gap-3">
                              {user.avatar && (
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="w-8 h-8 rounded-full"
                                />
                              )}
                              <div className="flex flex-col">
                                <span className="font-medium">{user.name}</span>
                                <span className="text-xs text-muted-foreground">{user.email}</span>
                                {user.plan && (
                                  <span className="text-xs text-purple-600">
                                    Gói: {user.plan === "basic" ? "Cơ Bản" : user.plan === "advanced" ? "Nâng Cao" : "Chuyên Gia"}
                                  </span>
                                )}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleDemoLogin}
                    disabled={isLoading || !selectedUser}
                    className="w-full h-14 text-base font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                        Đang đăng nhập...
                      </>
                    ) : (
                      <>
                        <User className="w-5 h-5 mr-2" />
                        Đăng nhập với tài khoản demo
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Terms & Privacy */}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>
              Bằng cách đăng nhập, bạn đồng ý với{" "}
              <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                Điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                Chính sách bảo mật
              </a>
            </p>
          </div>
        </div>
      </div>
    </LayoutWithoutSidebar>
  );
}

