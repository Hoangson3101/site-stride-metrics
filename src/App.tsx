import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
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
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/analysis/referring-domains" element={<ReferringDomains />} />
            <Route path="/analysis/link-quality" element={<LinkQuality />} />
            <Route path="/analysis/anchor-text" element={<AnchorText />} />
            <Route path="/analysis/link-types" element={<LinkTypes />} />
            <Route path="/analysis/relevance" element={<Relevance />} />
            <Route path="/analysis/index-durability" element={<IndexDurability />} />
            <Route path="/analysis/link-velocity" element={<LinkVelocity />} />
            <Route path="/analysis/toxic-risk" element={<ToxicRisk />} />
            <Route path="/analysis/entity-brand" element={<EntityBrand />} />
            <Route path="/analysis/benchmark" element={<Benchmark />} />
            <Route path="/analysis/dofollow-nofollow" element={<DofollowNofollow />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
