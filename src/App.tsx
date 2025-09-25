import { Toaster } from "@/components/ui/feedback/toaster";
import { Toaster as Sonner } from "@/components/ui/feedback/sonner";
import { TooltipProvider } from "@/components/ui/overlay/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/home/Index";
import TechjaysOverview from "./pages/business/TechjaysOverview";
import InvestmentPortfolio from "./pages/business/InvestmentPortfolio";
import MediaMentions from "./pages/media/MediaMentions";
import Contact from "./pages/contact/Contact";
import NotFound from "./pages/system/NotFound";
import GrowWithMe from "./pages/about/GrowWithMe";
import KnowAboutMe from "./pages/about/KnowAboutMe";
import KnowAboutMeNew from "./pages/about/KnowAboutMeNew";

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
          <Route path="/know-about-me" element={<KnowAboutMeNew />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
