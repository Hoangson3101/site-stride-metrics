import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutWithoutSidebar } from "@/components/LayoutWithoutSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Download,
  Share2,
  ArrowRight,
  FileText,
  Calendar,
  CreditCard,
} from "lucide-react";

export default function PaymentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, paymentMethod, amount } = location.state || {
    plan: { name: "Gói Nâng Cao", price: 699000 },
    paymentMethod: "card",
    amount: 699000,
  };

  useEffect(() => {
    // Auto redirect to dashboard after 10 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getPaymentMethodName = (method: string) => {
    const methods: Record<string, string> = {
      card: "Thẻ tín dụng/Ghi nợ",
      paypal: "PayPal",
      stripe: "Stripe",
      momo: "Ví MoMo",
      zalopay: "ZaloPay",
    };
    return methods[method] || method;
  };

  const handleGoToDashboard = () => {
    navigate("/");
  };

  const handleDownloadReceipt = () => {
    // Simulate download
    alert("Đang tải hóa đơn...");
  };

  const handleShare = () => {
    // Simulate share
    if (navigator.share) {
      navigator.share({
        title: "Xác nhận thanh toán thành công",
        text: `Tôi đã thanh toán thành công gói ${plan.name} với số tiền ${formatPrice(amount)}`,
      });
    } else {
      alert("Chia sẻ xác nhận thanh toán");
    }
  };

  return (
    <LayoutWithoutSidebar>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 mb-6 shadow-lg">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Chúc mừng!
            </h1>
            <p className="text-xl text-muted-foreground">
              Bạn đã thanh toán thành công
            </p>
          </div>

          {/* Confirmation Card */}
          <Card className="p-8 bg-white dark:bg-surface shadow-xl border-2 border-green-100 dark:border-green-900/30">
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex justify-center">
                <Badge className="bg-green-600 text-white px-4 py-2 text-base">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Gói dịch vụ đã được kích hoạt
                </Badge>
              </div>

              {/* Payment Details */}
              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium text-foreground">Gói dịch vụ:</span>
                  </div>
                  <span className="font-semibold text-foreground">{plan.name}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium text-foreground">Phương thức thanh toán:</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {getPaymentMethodName(paymentMethod)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium text-foreground">Ngày thanh toán:</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {new Date().toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white">
                  <span className="text-lg font-semibold">Tổng số tiền:</span>
                  <span className="text-2xl font-bold">{formatPrice(amount)}</span>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground text-center">
                  Mã giao dịch: <span className="font-mono font-medium text-foreground">TXN-{Date.now().toString().slice(-8)}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={handleDownloadReceipt}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Tải hóa đơn
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="w-full"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ
                </Button>
                <Button
                  onClick={handleGoToDashboard}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                >
                  Đến Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Helpful Links */}
              <div className="pt-6 border-t">
                <h3 className="font-semibold text-foreground mb-3">
                  Bắt đầu sử dụng
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Gói dịch vụ của bạn đã được kích hoạt và sẵn sàng sử dụng
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Bạn có thể bắt đầu phân tích SEO Off-Page ngay bây giờ
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Xem{" "}
                      <a
                        href="#"
                        className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                      >
                        hướng dẫn sử dụng
                      </a>{" "}
                      để tận dụng tối đa công cụ
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Auto Redirect Notice */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Bạn sẽ được chuyển hướng đến Dashboard sau 10 giây...
          </p>
        </div>
      </div>
    </LayoutWithoutSidebar>
  );
}

