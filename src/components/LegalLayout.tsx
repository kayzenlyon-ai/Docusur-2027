import { Link, useLocation } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FileText, Shield, Gavel, Scale } from "lucide-react";

const legalLinks = [
  { name: "Mentions Légales", path: "/mentions-legales", icon: FileText },
  { name: "CGU", path: "/cgu", icon: Gavel },
  { name: "Confidentialité", path: "/politique-confidentialite", icon: Shield },
];

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated?: string;
}

export function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
  const location = useLocation();

  return (
    <PageLayout>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
          {/* Sidebar Navigation - Cleaner & More Spaced */}
          <aside className="w-full lg:w-72 lg:sticky lg:top-28 flex-shrink-0">
            <div className="space-y-8">
              <div>
                <p className="mb-6 px-1 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/60">
                  Navigation Juridique
                </p>
                <nav className="flex flex-col gap-2">
                  {legalLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={cn(
                          "group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300",
                          isActive
                            ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        )}
                      >
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-xl transition-colors",
                          isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-primary group-hover:bg-primary/20"
                        )}>
                          <link.icon className="h-4 w-4" />
                        </div>
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              
              <div className="rounded-3xl bg-gradient-to-br from-primary/5 to-transparent p-6 border border-primary/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">Besoin d'assistance ?</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Nos équipes sont à votre disposition pour toute question relative à nos conditions.
                </p>
                <a 
                  href="mailto:contact@kayzen.fr" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                >
                  Nous contacter <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content Area - Enhanced Readability */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <header className="mb-16">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary mb-6">
                  <Shield className="h-3 w-3" /> Document Officiel
                </div>
                <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-6 leading-[1.1]">
                  {title}
                </h1>
                {lastUpdated && (
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    Dernière révision : {lastUpdated}
                  </div>
                )}
              </header>

              <div className="prose prose-base md:prose-lg max-w-none dark:prose-invert 
                prose-headings:font-display prose-headings:tracking-tight prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:font-bold
                prose-p:text-muted-foreground/90 prose-p:leading-[1.8] prose-p:mb-8
                prose-li:text-muted-foreground/90 prose-li:mb-3
                prose-strong:text-foreground prose-strong:font-bold
                prose-ul:my-8 prose-ul:list-disc prose-ul:pl-6
                border-t border-border/40 pt-16">
                {children}
              </div>

              <footer className="mt-20 border-t border-border/40 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-xs text-muted-foreground">
                  © 2026 KAYZEN SAS — Tous droits réservés.
                </p>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => window.print()}
                    className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                  >
                    Imprimer le document
                  </button>
                </div>
              </footer>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

import { ArrowRight } from "lucide-react";
