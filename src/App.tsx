import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TechjaysOverview from "./pages/TechjaysOverview";
import InvestmentPortfolio from "./pages/InvestmentPortfolio";
import MediaMentions from "./pages/MediaMentions";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import GrowWithMe from "./pages/GrowWithMe";
import KnowAboutMe from "./pages/KnowAboutMe";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/techjays-overview" element={<TechjaysOverview />} />
          <Route path="/investment-portfolio" element={<InvestmentPortfolio />} />
          <Route path="/media-mentions" element={<MediaMentions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/grow-with-me" element={<GrowWithMe />} />
          <Route path="/know-about-me" element={<KnowAboutMe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
