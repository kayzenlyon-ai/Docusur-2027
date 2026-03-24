import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import SecurityPage from "./pages/SecurityPage.tsx";
import CguPage from "./pages/CguPage.tsx";
import MentionsLegalesPage from "./pages/MentionsLegalesPage.tsx";
import PolitiqueConfidentialitePage from "./pages/PolitiqueConfidentialitePage.tsx";
import Documentation from "./pages/Documentation.tsx";
import ToolsPage from "./pages/ToolsPage.tsx";

import { ScrollToTop } from "./components/ScrollToTop.tsx";
import { ScrollToTopButton } from "./components/ScrollToTopButton.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollToTopButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/outils" element={<ToolsPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/securite" element={<SecurityPage />} />
          <Route path="/cgu" element={<CguPage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
          <Route path="/documentation" element={<Documentation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
