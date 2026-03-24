import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/lib/use-theme";
import { 
  Moon, Sun, ShieldCheck, ChevronDown, Menu, X, ArrowRight, 
  FileText, PenTool, Shield, ArrowRightLeft, ScanText, 
  Video, Image as ImageIcon, Music, FileCode, Sparkles, LayoutGrid
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_TOOLS, Tool, ToolCategory } from "@/components/ToolGrid";
import { AccessibilityToggle } from "@/components/AccessibilityToggle";
import { DocuSur } from "./DocuSur";
import type { LucideIcon } from "lucide-react";
import docusurLogo from "@/assets/docusur-logo.webp";

interface HeaderProps {
  onSelectTool?: (tool: Tool) => void;
}

export function Header({ onSelectTool }: HeaderProps) {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Tous les outils", href: "/outils", icon: LayoutGrid },
    { name: "Sécurité", href: "/securite", icon: Shield },
  ];

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass sticky top-0 z-50 border-b border-white/10"
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img 
              src={docusurLogo} 
              alt="DocuSûr — Sécurité PDF Française" 
              title="DocuSûr — Sécurité PDF Française"
              className="h-11 w-auto transition-transform group-hover:scale-105 logo-auto-bg" 
            />
          </Link>
          <a
            href="https://internet.kayzen-lyon.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary/20"
          >
            by Kayzen
          </a>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition-all active:scale-95 ${
                location.pathname === link.href
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-1.5 rounded-full border border-kayzen-green/20 bg-kayzen-green/8 px-3 py-1.5 ml-2">
            <ShieldCheck className="h-3.5 w-3.5 text-kayzen-green" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-kayzen-green">Zero-Server</span>
          </div>

          <AccessibilityToggle />

          <button
            onClick={toggle}
            className="ml-2 rounded-xl p-2.5 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-primary active:scale-95"
            aria-label="Changer de thème"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-background md:hidden"
          >
            <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-4 text-left transition-colors border border-transparent hover:border-primary/10 ${
                    location.pathname === link.href ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="text-sm font-bold">{link.name}</span>
                  <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
                </Link>
              ))}
              
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-4 py-2">
                  <ShieldCheck className="h-5 w-5 text-kayzen-green" />
                  <span className="text-xs font-bold uppercase tracking-widest text-kayzen-green">Zero-Server</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}
