import { motion } from "framer-motion";
import { 
  Cpu, Shield, Zap, Code, 
  FileText, Video, Image, 
  ArrowLeft, Terminal, ServerOff, 
  Lock, Globe, Database, Layers,
  Search, CpuIcon, HardDrive, 
  Activity, Fingerprint, RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header.tsx";
import { Footer } from "@/components/Footer.tsx";

export default function Documentation() {
  const fadeIn = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  };

  const techStack = [
    { name: "React 18", desc: "Framework UI réactif utilisant le Concurrent Mode pour une interface fluide même lors de calculs intensifs." },
    { name: "Vite", desc: "Build tool utilisant l'ESM natif pour un développement instantané et un bundling optimisé." },
    { name: "Tailwind CSS", desc: "Moteur CSS JIT (Just-In-Time) permettant un design système cohérent et ultra-léger." },
    { name: "Framer Motion", desc: "Moteur d'animation déclaratif pour des transitions fluides basées sur la physique." },
    { name: "Lucide Icons", desc: "Ensemble d'icônes vectorielles optimisées pour le tree-shaking." },
  ];

  const coreEngines = [
    { 
      title: "FFmpeg.wasm (WebAssembly)", 
      icon: Video, 
      desc: "Portage de FFmpeg en WebAssembly. Permet le transcodage vidéo et audio directement dans le navigateur sans aucun serveur distant.",
      tech: "Wasm, C/C++ port, SharedArrayBuffer"
    },
    { 
      title: "Tesseract.js (OCR)", 
      icon: FileText, 
      desc: "Moteur de reconnaissance optique de caractères (OCR) porté en Javascript. Analyse les images pour en extraire le texte localement.",
      tech: "LSTM, Neural Networks, Web Workers"
    },
    { 
      title: "pdf-lib & pdf.js", 
      icon: FileText, 
      desc: "Manipulation de la structure binaire des PDF (fusion, division, modification) et rendu haute fidélité dans le canvas.",
      tech: "Binary parsing, PDF Spec 2.0"
    },
    { 
      title: "Mammoth & XLSX", 
      icon: Database, 
      desc: "Conversion de documents Office (Word, Excel) vers des formats web standards (HTML, JSON) sans perte de structure.",
      tech: "XML parsing, OOXML standards"
    },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="gradient-blob gradient-blob--1" />
      <div className="gradient-blob gradient-blob--2" />
      
      <div className="relative z-10">
        <Header onSelectTool={() => {}} />
        
        <main className="mx-auto max-w-5xl px-4 pb-16 pt-12 md:px-8 md:pt-20">
          <motion.div {...fadeIn} className="mb-12">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2 mb-6 -ml-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl mb-4">
              Documentation <span className="text-primary">Technique</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-3xl leading-relaxed text-pretty">
              DocuSûr est une plateforme de traitement documentaire "Zero-Server". Cette documentation détaille l'architecture logicielle, les moteurs de calcul utilisés et le fonctionnement interne de nos outils souverains.
            </p>
          </motion.div>

          {/* Core Principles */}
          <section className="mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-4 md:grid-cols-3"
            >
              <div className="glass-strong rounded-2xl p-6 border-primary/10">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <ServerOff className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-bold mb-2">Architecture Edge</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Le traitement s'effectue exclusivement sur la machine de l'utilisateur. Aucun backend de traitement n'existe, éliminant les risques de fuite de données côté serveur.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 border-primary/10">
                <div className="h-10 w-10 rounded-xl bg-kayzen-green/10 flex items-center justify-center mb-4">
                  <Shield className="h-5 w-5 text-kayzen-green" />
                </div>
                <h3 className="text-base font-bold mb-2">Isolation Mémoire</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Les fichiers sont chargés dans des <code>ArrayBuffer</code> isolés. Une fois le traitement terminé et le fichier téléchargé, la mémoire est libérée par le Garbage Collector.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 border-primary/10">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Zap className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-base font-bold mb-2">WebAssembly (Wasm)</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Utilisation de binaires compilés (C/C++, Rust) exécutés via l'interface <code>WebAssembly</code> pour des performances quasi-natives sur des tâches lourdes.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Tool Categories Deep Dive */}
          <section className="mb-16 space-y-12">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-3">
              <Layers className="h-5 w-5 text-primary" />
              Détails Techniques des Outils
            </h2>

            <div className="space-y-8">
              {/* Media Processing */}
              <div className="glass rounded-3xl p-8 border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <Video className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-bold">Traitement Média (Vidéo, Audio, Image)</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Fonctionnement</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Nous utilisons <strong>FFmpeg.wasm</strong>, une version de FFmpeg compilée en WebAssembly. Le moteur crée un système de fichiers virtuel (MEMFS) dans la RAM du navigateur pour manipuler les flux binaires.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                      <li><strong>Transcodage :</strong> Conversion de codecs (H.264, VP9, MP3, AAC) sans perte de qualité perceptible.</li>
                      <li><strong>Multi-threading :</strong> Utilisation des <code>SharedArrayBuffer</code> et des <code>Web Workers</code> pour paralléliser les calculs.</li>
                      <li><strong>Optimisation :</strong> Détection automatique des capacités matérielles pour ajuster la vitesse de traitement.</li>
                    </ul>
                  </div>
                  <div className="bg-foreground/5 rounded-2xl p-5 border border-white/5">
                    <h4 className="text-xs font-bold mb-3 text-primary uppercase">Spécifications Techniques</h4>
                    <div className="space-y-2 font-mono text-[10px]">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Moteur</span>
                        <span className="text-foreground">FFmpeg v6.0 (Wasm)</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Formats Image</span>
                        <span className="text-foreground">WebP, PNG, JPG, AVIF, SVG</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Formats Vidéo</span>
                        <span className="text-foreground">MP4, WebM, MOV, AVI</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accélération</span>
                        <span className="text-foreground">SIMD / Multi-Threads</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF Management */}
              <div className="glass rounded-3xl p-8 border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-6 w-6 text-destructive" />
                  <h3 className="text-lg font-bold">Gestion & Édition PDF</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Ingénierie Documentaire</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      La manipulation des PDF repose sur l'analyse de la structure <code>Cross-Reference Table (XREF)</code>. Nous reconstruisons l'arbre des objets PDF pour chaque opération.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                      <li><strong>Fusion/Division :</strong> Extraction et injection de dictionnaires de pages sans re-compression pour préserver l'intégrité.</li>
                      <li><strong>Compression :</strong> Optimisation des flux d'objets et suppression des ressources dupliquées (polices, images).</li>
                      <li><strong>Signature :</strong> Application de signatures numériques conformes aux standards cryptographiques via <code>node-forge</code>.</li>
                    </ul>
                  </div>
                  <div className="bg-foreground/5 rounded-2xl p-5 border border-white/5">
                    <h4 className="text-xs font-bold mb-3 text-destructive uppercase">Bibliothèques Core</h4>
                    <div className="space-y-2 font-mono text-[10px]">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Manipulation</span>
                        <span className="text-foreground">pdf-lib / hummus.js</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Rendu</span>
                        <span className="text-foreground">PDF.js (Mozilla)</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Cryptographie</span>
                        <span className="text-foreground">Forge / WebCrypto API</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Standard</span>
                        <span className="text-foreground">PDF 1.7 / 2.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & IA */}
              <div className="glass rounded-3xl p-8 border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-6 w-6 text-kayzen-green" />
                  <h3 className="text-lg font-bold">Sécurité & IA Avancée</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Intelligence Locale</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      L'OCR et l'analyse de contenu utilisent des réseaux de neurones légers (LSTM) s'exécutant via <strong>Tesseract.js</strong>.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                      <li><strong>OCR :</strong> Reconnaissance de plus de 100 langues avec un moteur entraîné localement.</li>
                      <li><strong>Purge ADN :</strong> Analyse récursive des métadonnées XMP et suppression des informations sensibles (GPS, auteur, logiciel).</li>
                      <li><strong>Chiffrement :</strong> Utilisation de l'algorithme AES-256-GCM via la <code>SubtleCrypto</code> native du navigateur.</li>
                    </ul>
                  </div>
                  <div className="bg-foreground/5 rounded-2xl p-5 border border-white/5">
                    <h4 className="text-xs font-bold mb-3 text-kayzen-green uppercase">Sécurité & IA</h4>
                    <div className="space-y-2 font-mono text-[10px]">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>OCR Engine</span>
                        <span className="text-foreground">Tesseract v4.0 (Wasm)</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Chiffrement</span>
                        <span className="text-foreground">AES-256-GCM</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Metadata Purge</span>
                        <span className="text-foreground">XMP / Exif Analysis</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Privacy</span>
                        <span className="text-foreground">GDPR / RGPD Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Technical Insights */}
          <section className="mb-16">
            <h2 className="font-display text-xl font-bold mb-8 flex items-center gap-3">
              <CpuIcon className="h-5 w-5 text-primary" />
              Insights Techniques Avancés
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="glass rounded-2xl p-6 border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <HardDrive className="h-5 w-5 text-primary" />
                  <h4 className="font-bold text-sm">Gestion de la RAM (MEMFS)</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Pour traiter des fichiers volumineux (ex: vidéo 4K), DocuSûr utilise un système de fichiers virtuel en mémoire. Les données sont segmentées en <code>TypedArrays</code> pour minimiser l'empreinte mémoire et éviter les plantages du navigateur par dépassement de quota.
                </p>
              </div>
              <div className="glass rounded-2xl p-6 border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="h-5 w-5 text-accent" />
                  <h4 className="font-bold text-sm">Parallélisation Web Workers</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Chaque tâche lourde (OCR, Transcodage) est déportée dans un <code>Web Worker</code> dédié. Cela permet de garder l'interface utilisateur (Main Thread) réactive à 60 FPS, même pendant une compression PDF complexe.
                </p>
              </div>
              <div className="glass rounded-2xl p-6 border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <Fingerprint className="h-5 w-5 text-kayzen-green" />
                  <h4 className="font-bold text-sm">Intégrité Cryptographique</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Les signatures numériques utilisent des paires de clés RSA/ECDSA générées localement. La clé privée ne quitte jamais la mémoire volatile de l'onglet, garantissant une souveraineté totale sur l'identité numérique.
                </p>
              </div>
              <div className="glass rounded-2xl p-6 border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  <h4 className="font-bold text-sm">Cycle de vie des Données</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  DocuSûr implémente une politique de "Zero-Persistence". Dès que l'onglet est fermé ou que l'outil est réinitialisé, tous les buffers mémoires sont marqués pour suppression, ne laissant aucune trace sur le disque dur.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Deep Dive (Existing Engines) */}
          <section className="mb-16">
            <h2 className="font-display text-xl font-bold mb-8 flex items-center gap-3">
              <Terminal className="h-5 w-5 text-primary" />
              Moteurs de Traitement Core
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {coreEngines.map((engine, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5 border-white/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-xl bg-foreground/5 flex items-center justify-center flex-shrink-0">
                      <engine.icon className="h-4 w-4 text-foreground/70" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{engine.title}</h4>
                      <p className="text-[10px] text-primary font-mono mb-2 uppercase tracking-wider">{engine.tech}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {engine.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Architecture */}
          <section className="mb-16">
            <div className="glass-strong rounded-3xl p-8 md:p-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Layers className="h-48 w-48" />
              </div>
              <div className="relative z-10">
                <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-3">
                  <Cpu className="h-5 w-5 text-primary" />
                  Architecture & Stack
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      DocuSûr est conçu comme une application web progressive (PWA) hautement optimisée. La stack technologique a été sélectionnée pour sa robustesse et sa capacité à gérer des flux de données binaires importants sans saturer le thread principal du navigateur.
                    </p>
                    <div className="space-y-3">
                      {techStack.map((tech, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="h-1 w-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-foreground">{tech.name} : </span>
                            <span className="text-xs text-muted-foreground">{tech.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-foreground/5 rounded-2xl p-5 font-mono text-[10px] leading-relaxed border border-white/5 overflow-x-auto">
                    <div className="text-primary mb-2">// Manifeste de souveraineté numérique</div>
                    <div className="text-muted-foreground">
                      {`{
  "project": "DocuSûr",
  "author": "Kayzen Web",
  "privacy": "100% Client-Side",
  "security": {
    "data_storage": "None (In-memory only)",
    "tracking": "Disabled",
    "external_apis": "None (Core logic self-contained)"
  },
  "performance": {
    "engine": "WebAssembly / Wasm",
    "ui": "React 18 Concurrent Mode",
    "styling": "Tailwind JIT"
  }
}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Kayzen Expertise */}
          <section>
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center bg-primary/5 rounded-3xl p-10 border border-primary/10"
            >
              <h2 className="font-display text-2xl font-bold mb-4">L'expertise Kayzen au service de votre projet</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Cette application est la preuve que le web n'a plus de limites. Nous maîtrisons les technologies les plus pointues pour transformer vos besoins métiers en outils performants, sécurisés et agréables à utiliser.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://internet.kayzen-lyon.fr" target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 font-bold px-8">
                    Découvrir nos réalisations
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
