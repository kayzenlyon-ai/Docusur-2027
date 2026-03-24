import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { DocuSur } from "./DocuSur";
import docusurLogo from "@/assets/docusur-logo.webp";

export function Footer() {
  return (
    <footer className="mt-24 pb-12">
      {/* CTA Agence */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong rounded-3xl p-8 md:p-10 text-center"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Shield className="h-7 w-7 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground md:text-2xl title-alternating" style={{ lineHeight: "1.15" }}>
          <span>Votre entreprise mérite un site</span>
          <br />
          <span className="text-primary">aussi performant et sécurisé</span> <span>que cet outil.</span>
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground text-pretty leading-relaxed">
          Besoin d'une solution sur-mesure pour automatiser vos processus documentaires ? Nous concevons des applications web pour les entreprises qui ne transigent pas sur la performance et la sécurité des données.
        </p>
        <a
          href="https://internet.kayzen-lyon.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-95"
        >
          <Zap className="h-4 w-4" fill="currentColor" />
          Contactez l'agence Kayzen
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>

      {/* Links */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
      >
        <Link to="/a-propos" className="hover:text-foreground transition-colors">À propos</Link>
        <Link to="/documentation" className="hover:text-foreground transition-colors">Documentation</Link>
        <Link to="/securite" className="hover:text-foreground transition-colors">Sécurité</Link>
        <Link to="/cgu" className="hover:text-foreground transition-colors">CGU</Link>
        <Link to="/mentions-legales" className="hover:text-foreground transition-colors">Mentions légales</Link>
        <Link to="/politique-confidentialite" className="hover:text-foreground transition-colors">Confidentialité</Link>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-5 flex flex-col items-center gap-3 text-center"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} <DocuSur /></span>
          <span className="text-border">·</span>
          <span>Un outil</span>
          <a
            href="https://internet.kayzen-lyon.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Kayzen Web
          </a>
        </div>
        <p className="text-[11px] text-muted-foreground/60">
          Aucune donnée collectée · Aucun cookie · Sécurité PDF Française · 100% local
        </p>
      </motion.div>
    </footer>
  );
}
