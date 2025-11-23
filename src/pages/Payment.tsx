import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutWithoutSidebar } from "@/components/LayoutWithoutSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  CheckCircle,
  Zap,
  Shield,
  Award,
  ArrowRight,
  Lock,
} from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Gói Cơ Bản",
    price: 299000,
    period: "tháng",
    description: "Phù hợp cho cá nhân và blog nhỏ",
    icon: Zap,
    features: [
      "Phân tích 10 URL/tháng",
      "So sánh với Top 5 SERP",
      "Báo cáo cơ bản",
      "Hỗ trợ email",
    ],
  },
  {
    id: "advanced",
    name: "Gói Nâng Cao",
    price: 699000,
    period: "tháng",
    description: "Lý tưởng cho doanh nghiệp vừa và nhỏ",
    icon: Shield,
    features: [
      "Phân tích 50 URL/tháng",
      "So sánh với Top 10 SERP",
      "Báo cáo chi tiết",
      "Xuất dữ liệu Excel/PDF",
      "Hỗ trợ ưu tiên",
      "API access",
    ],
    popular: true,
  },
  {
    id: "professional",
    name: "Gói Chuyên Gia",
    price: 1499000,
    period: "tháng",
    description: "Dành cho agency và doanh nghiệp lớn",
    icon: Award,
    features: [
      "Phân tích không giới hạn",
      "So sánh với Top 20 SERP",
      "Báo cáo nâng cao",
      "Xuất dữ liệu đầy đủ",
      "Hỗ trợ 24/7",
      "API access không giới hạn",
      "White-label reports",
      "Tùy chỉnh dashboard",
    ],
  },
];

const paymentMethods = [
  { id: "card", name: "Thẻ tín dụng/Ghi nợ", icon: CreditCard },
  { id: "paypal", name: "PayPal", icon: CreditCard },
  { id: "stripe", name: "Stripe", icon: CreditCard },
  { id: "momo", name: "Ví MoMo", icon: CreditCard },
  { id: "zalopay", name: "ZaloPay", icon: CreditCard },
];

export default function Payment() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>("advanced");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [promoCode, setPromoCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPlanData = pricingPlans.find((p) => p.id === selectedPlan);
  const finalPrice = selectedPlanData?.price || 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      // Update user plan
      if (user && selectedPlanData) {
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        updateUser({
          plan: selectedPlanData.id,
          planExpiry: expiryDate.toISOString().split("T")[0],
        });
      }
      setIsProcessing(false);
      navigate("/payment-confirmation", {
        state: {
          plan: selectedPlanData,
          paymentMethod,
          amount: finalPrice,
        },
      });
    }, 2000);
  };

  return (
    <LayoutWithoutSidebar>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Chọn Gói Dịch Vụ
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chọn gói phù hợp với nhu cầu của bạn và bắt đầu phân tích SEO Off-Page ngay hôm nay
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Pricing Plans */}
            {pricingPlans.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;
              return (
                <Card
                  key={plan.id}
                  className={`p-6 cursor-pointer transition-all ${
                    isSelected
                      ? "border-2 border-purple-500 shadow-xl scale-105"
                      : "border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700"
                  } ${plan.popular ? "lg:scale-105" : ""}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <Badge className="mb-4 bg-purple-600 text-white">
                      Phổ biến nhất
                    </Badge>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">
                        {formatPrice(plan.price).replace("₫", "")}
                      </span>
                      <span className="text-muted-foreground">₫/{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      isSelected
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800"
                    }`}
                  >
                    {isSelected ? "Đã chọn" : "Chọn gói"}
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Payment Section */}
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 bg-white dark:bg-surface shadow-xl border-2 border-purple-100 dark:border-purple-900/30">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Thông Tin Thanh Toán
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <Label htmlFor="promo" className="text-base font-semibold mb-2 block">
                  Mã giảm giá (nếu có)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="promo"
                    placeholder="Nhập mã giảm giá"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">Áp dụng</Button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <Label className="text-base font-semibold mb-4 block">
                  Phương thức thanh toán
                </Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {paymentMethods.map((method) => {
                    const MethodIcon = method.icon;
                    return (
                      <div key={method.id}>
                        <RadioGroupItem
                          value={method.id}
                          id={method.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={method.id}
                          className="flex flex-col items-center justify-center p-4 border-2 border-purple-200 dark:border-purple-800 rounded-lg cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50 dark:peer-data-[state=checked]:bg-purple-900/30 transition-all"
                        >
                          <MethodIcon className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                          <span className="text-sm font-medium text-center">
                            {method.name}
                          </span>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

              {/* Card Details (if card selected) */}
              {paymentMethod === "card" && (
                <div className="space-y-4 mb-6 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div>
                    <Label htmlFor="cardName" className="mb-2 block">
                      Tên chủ thẻ
                    </Label>
                    <Input
                      id="cardName"
                      placeholder="NGUYEN VAN A"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber" className="mb-2 block">
                      Số thẻ
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="mb-2 block">
                        Ngày hết hạn
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="mb-2 block">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={3}
                        type="password"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="border-t pt-6 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Gói dịch vụ:</span>
                    <span className="font-medium text-foreground">
                      {selectedPlanData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Giá:</span>
                    <span className="font-medium text-foreground">
                      {formatPrice(finalPrice)}
                    </span>
                  </div>
                  {promoCode && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span>-{formatPrice(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-foreground pt-3 border-t">
                    <span>Tổng cộng:</span>
                    <span className="text-purple-600">
                      {formatPrice(finalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing || (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv || !cardName))}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Thanh toán {formatPrice(finalPrice)}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                <Lock className="w-3 h-3 inline mr-1" />
                Thanh toán được bảo mật và mã hóa
              </p>
            </Card>
          </div>
        </div>
      </div>
    </LayoutWithoutSidebar>
  );
}

