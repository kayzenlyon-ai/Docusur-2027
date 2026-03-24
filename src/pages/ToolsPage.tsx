import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { ToolGrid, Tool } from "@/components/ToolGrid";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

const ToolsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectTool = (tool: Tool) => {
    // Navigate to home and pass the tool ID to activate it
    navigate("/", { state: { activeToolId: tool.id } });
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="gradient-blob gradient-blob--1" />
      <div className="gradient-blob gradient-blob--2" />
      <div className="relative z-10">
        <Header onSelectTool={handleSelectTool} />
        <main className="mx-auto max-w-5xl px-4 pb-8 pt-6 md:px-8 md:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Exploration complète
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground md:text-5xl title-alternating mb-6">
              <span>Tous nos</span> <span>outils</span>
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground text-sm md:text-base leading-relaxed">
              Découvrez l'intégralité de notre suite d'outils souverains. 
              Chaque outil fonctionne 100% localement dans votre navigateur pour une sécurité absolue.
            </p>

            {/* Search Bar */}
            <div className="mt-10 relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un outil (ex: fusionner, compresser...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background/50 py-3 pl-11 pr-4 text-sm backdrop-blur-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </motion.div>

          <ToolGrid onSelectTool={handleSelectTool} searchQuery={searchQuery} />
          
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default ToolsPage;
