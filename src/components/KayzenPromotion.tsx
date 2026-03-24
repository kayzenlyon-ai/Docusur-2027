import { motion } from "framer-motion";
import { ArrowRight, Globe, Code2, Rocket, Heart, ShieldCheck } from "lucide-react";
import { DocuSur } from "./DocuSur";

export function KayzenPromotion() {
  return (
    <section id="kayzen-web" className="mt-24 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] bg-[hsl(var(--kayzen-eco))] p-8 md:p-16 text-white"
      >
        {/* Background decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              <Heart className="h-3 w-3 fill-white" /> Offert par Kayzen Web
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl mb-6 leading-[1.1] text-white">
              Un outil gratuit, <br />
              <span className="text-white/90">propulsé par l'expertise.</span>
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
              <DocuSur className="text-white" /> est gracieusement mis à disposition par l'agence <strong>Kayzen Web</strong>. 
              Nous croyons en un web plus sûr, plus rapide et respectueux de votre vie privée.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href="https://internet.kayzen-lyon.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-primary shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Découvrir l'agence <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@kayzen.fr"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/20 active:scale-95"
              >
                Parlons de votre projet
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-[450px]">
            {[
              {
                icon: Globe,
                title: "Sites Web",
                desc: "Performants & Éco-conçus"
              },
              {
                icon: Code2,
                title: "Applications",
                desc: "Sur-mesure & Sécurisées"
              },
              {
                icon: ShieldCheck,
                title: "Confidentialité",
                desc: "Privacy-by-Design"
              },
              {
                icon: Rocket,
                title: "SEO & Vitesse",
                desc: "Optimisation maximale"
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-3xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors"
              >
                <item.icon className="h-6 w-6 text-white mb-3" />
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
