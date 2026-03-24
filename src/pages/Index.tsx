import { useState, useCallback, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { ToolGrid, Tool, ALL_TOOLS } from "@/components/ToolGrid";
import { HeroToolGrid } from "@/components/HeroToolGrid";
import { DropZone } from "@/components/DropZone";
import { FileList, ConvertibleFile } from "@/components/FileList";
import { UniversalProcessor } from "@/components/UniversalProcessor";
import { WysiwygEditor } from "@/components/WysiwygEditor";
import { SecurityStatus } from "@/components/SecurityStatus";
import { ContextualCTA } from "@/components/ContextualCTA";
import { WhySection } from "@/components/WhySection";
import { KayzenPromotion } from "@/components/KayzenPromotion";
import { Footer } from "@/components/Footer";
import { DocuSur } from "@/components/DocuSur";
import { ConversionFormat, convertFile } from "@/lib/ffmpeg";
import { detectFilesMode, type FileMode } from "@/lib/file-detect";
import { Zap, ShieldCheck, Cpu, FileText } from "lucide-react";
import docusurLogo from "@/assets/docusur-logo.webp";

let fileIdCounter = 0;
const isPdfCategory = (cat: string) => cat.startsWith("pdf-");

const Index = () => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [files, setFiles] = useState<ConvertibleFile[]>([]);
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [processingSpeed, setProcessingSpeed] = useState<number | null>(null);
  const [detectedMode, setDetectedMode] = useState<FileMode>(null);
  const [pdfOpsCount, setPdfOpsCount] = useState(0);
  const [mediaOpsCount, setMediaOpsCount] = useState(0);
  const location = useLocation();
  const conversionStartRef = useRef<number>(0);
  const fileSizeRef = useRef<number>(0);

  const isConverting = files.some((f) => f.status === "converting");
  const hasFiles = files.length > 0 || pdfFiles.length > 0;

  const handleSelectTool = useCallback((tool: Tool) => {
    setActiveTool(tool);
    setFiles([]);
    setPdfFiles([]);
    setProcessingSpeed(null);
    setDetectedMode(isPdfCategory(tool.category) ? "pdf" : "image");
  }, []);

  useEffect(() => {
    const state = location.state as { activeToolId?: string };
    if (state?.activeToolId) {
      const tool = ALL_TOOLS.find(t => t.id === state.activeToolId);
      if (tool) {
        handleSelectTool(tool);
        // Clear state to avoid re-triggering on refresh
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, handleSelectTool]);

  const handleBack = useCallback(() => {
    setActiveTool(null);
    setFiles([]);
    setPdfFiles([]);
    setProcessingSpeed(null);
    setDetectedMode(null);
  }, []);

  const handleClearAll = useCallback(() => {
    setFiles([]);
    setPdfFiles([]);
    setProcessingSpeed(null);
    setDetectedMode(null);
  }, []);

  const handleFilesAdded = useCallback(
    (newFiles: File[]) => {
      const mode = detectFilesMode(newFiles);
      setDetectedMode(mode);
      const isPdf = activeTool ? isPdfCategory(activeTool.category) : mode === "pdf";
      if (isPdf) {
        setPdfFiles((prev) => [...prev, ...newFiles]);
      } else {
        const items: ConvertibleFile[] = newFiles.map((file) => ({
          id: `file-${++fileIdCounter}`,
          file,
          status: "idle" as const,
          progress: 0,
          targetFormat: null,
          result: null,
          error: null,
        }));
        setFiles((prev) => [...prev, ...items]);
      }
    },
    [activeTool]
  );

  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => {
      const next = prev.filter((f) => f.id !== id);
      if (next.length === 0) setDetectedMode(null);
      return next;
    });
  }, []);

  const handleFormatChange = useCallback((id: string, format: ConversionFormat) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, targetFormat: format } : f)));
  }, []);

  const handleConvert = useCallback(
    async (id: string) => {
      setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: "converting" as const, progress: 0 } : f)));
      const item = files.find((f) => f.id === id);
      if (!item || !item.targetFormat) return;
      conversionStartRef.current = performance.now();
      fileSizeRef.current = item.file.size;
      setProcessingSpeed(null);
      setMediaOpsCount((c) => c + 1);
      try {
        const result = await convertFile(item.file, item.targetFormat, (progress) => {
          setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress } : f)));
          if (progress > 5 && progress < 100) {
            const elapsed = (performance.now() - conversionStartRef.current) / 1000;
            if (elapsed > 0.1) setProcessingSpeed((fileSizeRef.current * progress) / 100 / elapsed);
          }
        });
        const elapsed = (performance.now() - conversionStartRef.current) / 1000;
        if (elapsed > 0) setProcessingSpeed(fileSizeRef.current / elapsed);
        setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: "done" as const, progress: 100, result } : f)));
      } catch (err) {
        setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: "error" as const, error: (err as Error).message } : f)));
      }
    },
    [files]
  );

  const handleConvertAll = useCallback(() => {
    files.filter((f) => f.status === "idle" && f.targetFormat).forEach((f) => handleConvert(f.id));
  }, [files, handleConvert]);

  const showToolGrid = !activeTool && !hasFiles;
  const showWysiwyg = activeTool?.id === "wysiwyg";
  const showWorkspace = (activeTool || hasFiles) && !showWysiwyg;
  const showPdfProcessor = (activeTool && isPdfCategory(activeTool.category) && !showWysiwyg) || (!activeTool && detectedMode === "pdf");
  const showMediaList = !showPdfProcessor && files.length > 0 && !showWysiwyg;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="gradient-blob gradient-blob--1" />
      <div className="gradient-blob gradient-blob--2" />
      <div className="relative z-10">
        <Header onSelectTool={handleSelectTool} />
        <main className="mx-auto max-w-5xl px-4 pb-8 pt-6 md:px-8 md:pt-12">
          {/* Hero */}
          {!showWysiwyg && (
            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 text-center"
            >
              <div className="mb-6 flex justify-center">
                <motion.img 
                  src={docusurLogo} 
                  alt="DocuSûr — Sécurité PDF Française" 
                  title="DocuSûr — Sécurité PDF Française"
                  className="h-24 w-auto md:h-32 logo-auto-bg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
              </div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <ShieldCheck className="h-3 w-3" />
                {ALL_TOOLS.length} outils · 100% Gratuit & Illimité · Zero-Server
              </div>
              <p className="mx-auto mb-6 max-w-2xl text-pretty text-sm text-muted-foreground leading-relaxed">
                À propos de <DocuSur /> regroupe le meilleur de nos technologies pour offrir aux entreprises un outil de productivité souverain. Conversion média, manipulation PDF, OCR intelligent, signature électronique — tout fonctionne sans serveur distant, directement dans votre navigateur.
              </p>
              <h1
                className="text-balance font-display text-3xl font-bold text-foreground md:text-5xl title-alternating"
                style={{ lineHeight: "1.08" }}
              >
                <span>Tous vos documents,</span>
                <br />
                <span className="text-primary">traités en toute sécurité.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-pretty text-sm text-muted-foreground leading-relaxed md:text-base">
                PDF, images, audio, vidéo — {ALL_TOOLS.length} outils professionnels qui fonctionnent directement dans votre navigateur. Aucun fichier ne quitte votre ordinateur.
              </p>

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                {[
                  { icon: ShieldCheck, label: "Zero-Server", sub: "Aucun transfert" },
                  { icon: Cpu, label: "WebAssembly", sub: "Vitesse native" },
                  { icon: FileText, label: `${ALL_TOOLS.length} outils`, sub: "PDF & Média" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-3 py-1.5">
                    <b.icon className="h-3.5 w-3.5 text-primary" />
                    <div className="text-left">
                      <p className="text-[11px] font-bold text-foreground leading-tight">{b.label}</p>
                      <p className="text-[9px] text-muted-foreground">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Drop Zone */}
          {!showWysiwyg && (
            <DropZone
              onFilesAdded={handleFilesAdded}
              activeTool={activeTool}
              onBack={showWorkspace && !showToolGrid ? handleBack : undefined}
              onClearAll={hasFiles ? handleClearAll : undefined}
              compact={hasFiles}
              detectedMode={detectedMode}
              hasFiles={hasFiles}
            />
          )}

          <AnimatePresence mode="wait">
            {showWysiwyg ? (
              <motion.div
                key="wysiwyg-editor"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <WysiwygEditor onBack={handleBack} />
              </motion.div>
            ) : (
              hasFiles && (
                <motion.div key="security" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <SecurityStatus hasFiles={hasFiles} isConverting={isConverting} processingSpeed={processingSpeed} />
                </motion.div>
              )
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {showPdfProcessor && pdfFiles.length > 0 && (
              <motion.div key="pdf-proc" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="mt-4">
                <UniversalProcessor toolId={activeTool?.id || "fusionner"} files={pdfFiles} onClear={handleBack} onProcessed={() => setPdfOpsCount((c) => c + 1)} />
              </motion.div>
            )}
            {showMediaList && (
              <motion.div key="media-tools" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="mt-4">
                <FileList files={files} onRemove={handleRemove} onFormatChange={handleFormatChange} onConvert={handleConvert} onConvertAll={handleConvertAll} />
              </motion.div>
            )}
          </AnimatePresence>

          {!showWysiwyg && (
            <>
              <ContextualCTA pdfCount={pdfOpsCount} mediaCount={mediaOpsCount} />
              
              {/* Tool display section */}
              <AnimatePresence mode="wait">
                {showToolGrid && (
                  <motion.div key="hero-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mt-10">
                    <HeroToolGrid onSelectTool={handleSelectTool} />
                  </motion.div>
                )}
              </AnimatePresence>

              <WhySection />
              <KayzenPromotion />
            </>
          )}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Index;
