import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AnalysisProvider } from "./contexts/AnalysisContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import ReferringDomains from "./pages/analysis/ReferringDomains";
import LinkQuality from "./pages/analysis/LinkQuality";
import AnchorText from "./pages/analysis/AnchorText";
import LinkTypes from "./pages/analysis/LinkTypes";
import Relevance from "./pages/analysis/Relevance";
import IndexDurability from "./pages/analysis/IndexDurability";
import LinkVelocity from "./pages/analysis/LinkVelocity";
import ToxicRisk from "./pages/analysis/ToxicRisk";
import EntityBrand from "./pages/analysis/EntityBrand";
import Benchmark from "./pages/analysis/Benchmark";
import DofollowNofollow from "./pages/analysis/DofollowNofollow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AnalysisProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
            <Route path="/" element={<Index />} />
            <Route
              path="/analysis/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="referring-domains" element={<ReferringDomains />} />
                    <Route path="link-quality" element={<LinkQuality />} />
                    <Route path="anchor-text" element={<AnchorText />} />
                    <Route path="link-types" element={<LinkTypes />} />
                    <Route path="relevance" element={<Relevance />} />
                    <Route path="index-durability" element={<IndexDurability />} />
                    <Route path="link-velocity" element={<LinkVelocity />} />
                    <Route path="toxic-risk" element={<ToxicRisk />} />
                    <Route path="entity-brand" element={<EntityBrand />} />
                    <Route path="benchmark" element={<Benchmark />} />
                    <Route path="dofollow-nofollow" element={<DofollowNofollow />} />
                  </Routes>
                </Layout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AnalysisProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
