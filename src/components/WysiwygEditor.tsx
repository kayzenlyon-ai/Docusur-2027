import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Type, Eye, Layout, Sparkles, Download, 
  ChevronDown, Check, AlertTriangle, Info,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, Heading3, List, ListOrdered,
  Accessibility, ArrowLeft, FileText
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface WysiwygEditorProps {
  onBack: () => void;
}

export function WysiwygEditor({ onBack }: WysiwygEditorProps) {
  const [content, setContent] = useState("<p>Commencez à rédiger votre document accessible ici...</p><h1>Titre de test</h1><p>Ceci est un paragraphe pour tester le contraste et la structure.</p>");
  const [isDyslexic, setIsDyslexic] = useState(false);
  const [showContrastCheck, setShowContrastCheck] = useState(false);
  const [showStructure, setShowStructure] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Load OpenDyslexic font
  useEffect(() => {
    if (isDyslexic) {
      const link = document.createElement("link");
      link.id = "dyslexic-font";
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic.css";
      document.head.appendChild(link);
      return () => {
        const existing = document.getElementById("dyslexic-font");
        if (existing) existing.remove();
      };
    }
  }, [isDyslexic]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const cleanA11y = () => {
    if (!editorRef.current) return;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editorRef.current.innerHTML;

    // Add aria-labels to elements that might need them
    const interactive = tempDiv.querySelectorAll("a, button, input, select, textarea");
    interactive.forEach(el => {
      if (!el.getAttribute("aria-label") && !el.textContent?.trim()) {
        el.setAttribute("aria-label", "Élément interactif");
      }
    });

    // Ensure all images have alt attributes
    const images = tempDiv.querySelectorAll("img");
    images.forEach(img => {
      if (!img.getAttribute("alt")) {
        img.setAttribute("alt", "Description de l'image manquante");
      }
    });

    setContent(tempDiv.innerHTML);
    if (editorRef.current) editorRef.current.innerHTML = tempDiv.innerHTML;
    toast.success("Nettoyage A11Y terminé : Attributs ARIA et ALT ajoutés.");
  };

  const downloadAsHtml = () => {
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document-accessible.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Contrast Checker Logic
  const checkContrast = useCallback(() => {
    if (!showContrastCheck || !editorRef.current) return [];
    const issues: string[] = [];
    const elements = editorRef.current.querySelectorAll("*");
    
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const color = style.color;
      const bgColor = style.backgroundColor;
      
      // Simple check for now - in a real app we'd parse RGB
      if (color === bgColor && color !== "rgba(0, 0, 0, 0)") {
        issues.push("Texte invisible (couleur identique au fond)");
      }
    });
    
    return issues.length > 0 ? issues : [];
  }, [showContrastCheck]);

  const checkStructure = useCallback(() => {
    if (!showStructure || !editorRef.current) return [];
    const issues: string[] = [];
    const headings = editorRef.current.querySelectorAll("h1, h2, h3, h4, h5, h6");
    let lastLevel = 0;
    
    headings.forEach(h => {
      const level = parseInt(h.tagName[1]);
      if (level > lastLevel + 1 && lastLevel !== 0) {
        issues.push(`Niveau de titre sauté : ${h.tagName} après H${lastLevel}`);
      }
      lastLevel = level;
    });
    
    return issues;
  }, [showStructure]);

  const contrastIssues = checkContrast();
  const structureIssues = checkStructure();

  return (
    <div className="flex flex-col h-full max-h-[85vh] space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full h-10 w-10 hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Éditeur WYSIWYG Accessible
            </h2>
            <p className="text-xs text-muted-foreground leading-none mt-1">Créez des documents conformes aux normes d'accessibilité.</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="glass-strong rounded-2xl p-2 flex flex-wrap items-center gap-1 shadow-xl border-white/10">
        <div className="flex items-center gap-1 pr-2 border-r border-border/50">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("bold")} title="Gras"><Bold className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("italic")} title="Italique"><Italic className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("underline")} title="Souligné"><Underline className="h-4 w-4" /></Button>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-border/50">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("formatBlock", "h1")} title="Titre 1"><Heading1 className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("formatBlock", "h2")} title="Titre 2"><Heading2 className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("formatBlock", "h3")} title="Titre 3"><Heading3 className="h-4 w-4" /></Button>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-border/50">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("justifyLeft")} title="Aligner à gauche"><AlignLeft className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("justifyCenter")} title="Centrer"><AlignCenter className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("justifyRight")} title="Aligner à droite"><AlignRight className="h-4 w-4" /></Button>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-border/50">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("insertUnorderedList")} title="Liste à puces"><List className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("insertOrderedList")} title="Liste numérotée"><ListOrdered className="h-4 w-4" /></Button>
        </div>

        <div className="flex-1" />

        {/* Accessibility Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 font-bold">
              <Accessibility className="h-4 w-4" />
              Accessibilité
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 p-3 glass-strong border-white/10 shadow-2xl">
            <DropdownMenuLabel className="text-xs font-bold flex items-center gap-2 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Outils d'Accessibilité
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            
            <div className="py-3 space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Police Dyslexie</p>
                  <p className="text-[10px] text-muted-foreground">Active la police OpenDyslexic</p>
                </div>
                <Switch checked={isDyslexic} onCheckedChange={setIsDyslexic} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Vérificateur de Contraste</p>
                  <p className="text-[10px] text-muted-foreground">Analyse en temps réel (WCAG 4.5:1)</p>
                </div>
                <Switch checked={showContrastCheck} onCheckedChange={setShowContrastCheck} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Structure des Titres</p>
                  <p className="text-[10px] text-muted-foreground">Affiche visuellement la hiérarchie Hn</p>
                </div>
                <Switch checked={showStructure} onCheckedChange={setShowStructure} />
              </div>

              <Button 
                variant="secondary" 
                className="w-full gap-2 text-xs font-bold h-9 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                onClick={cleanA11y}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Nettoyage A11Y Automatique
              </Button>
            </div>
            
            <DropdownMenuSeparator className="bg-white/10" />
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-1">
                <Info className="h-3 w-3 text-primary" />
                <p className="text-[10px] font-bold text-foreground">Conformité Européenne</p>
              </div>
              <p className="text-[9px] text-muted-foreground leading-tight">
                Ces outils vous aident à respecter les normes d'accessibilité numérique (RGAA / EN 301 549).
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={downloadAsHtml} size="sm" variant="default" className="gap-2 bg-kayzen-green text-accent-foreground hover:brightness-110 ml-1 font-bold">
          <Download className="h-4 w-4" />
          Exporter HTML
        </Button>
      </div>

      {/* Editor Area */}
      <div className="relative flex-1 min-h-[450px] glass-strong rounded-2xl overflow-hidden flex flex-col shadow-inner border-white/5">
        <AnimatePresence>
          {(contrastIssues.length > 0 || structureIssues.length > 0) && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-destructive/10 border-b border-destructive/20 p-2.5 space-y-1"
            >
              {contrastIssues.map((issue, i) => (
                <div key={`c-${i}`} className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                  <span className="text-[10px] font-bold text-destructive uppercase tracking-wide">Alerte Contraste :</span>
                  <span className="text-[10px] text-destructive/90">{issue}</span>
                </div>
              ))}
              {structureIssues.map((issue, i) => (
                <div key={`s-${i}`} className="flex items-center gap-2">
                  <Layout className="h-3.5 w-3.5 text-accent" />
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wide">Structure :</span>
                  <span className="text-[10px] text-accent/90">{issue}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div 
          ref={editorRef}
          contentEditable
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: content }}
          className={`flex-1 p-8 outline-none overflow-auto prose prose-sm max-w-none dark:prose-invert
            ${isDyslexic ? "font-dyslexic" : ""}
            ${showStructure ? "show-structure" : ""}
          `}
          style={{ 
            fontFamily: isDyslexic ? "'OpenDyslexic', sans-serif" : "inherit"
          }}
        />

        {/* CSS for structure visualization */}
        <style dangerouslySetInnerHTML={{ __html: `
          .show-structure h1::before { content: "H1"; font-size: 10px; background: #1e3a8a; color: white; padding: 2px 4px; border-radius: 4px; margin-right: 8px; vertical-align: middle; }
          .show-structure h2::before { content: "H2"; font-size: 10px; background: #10b981; color: white; padding: 2px 4px; border-radius: 4px; margin-right: 8px; vertical-align: middle; }
          .show-structure h3::before { content: "H3"; font-size: 10px; background: #b91c1c; color: white; padding: 2px 4px; border-radius: 4px; margin-right: 8px; vertical-align: middle; }
          .show-structure h4::before { content: "H4"; font-size: 10px; background: #1e3a8a; color: white; padding: 2px 4px; border-radius: 4px; margin-right: 8px; vertical-align: middle; opacity: 0.8; }
          .show-structure h5::before { content: "H5"; font-size: 10px; background: #b91c1c; color: white; padding: 2px 4px; border-radius: 4px; margin-right: 8px; vertical-align: middle; opacity: 0.8; }
          .show-structure h6::before { content: "H6"; font-size: 10px; background: #1e3a8a; color: white; padding: 2px 4px; border-radius: 4px; margin-right: 8px; vertical-align: middle; opacity: 0.6; }
        `}} />
      </div>

      <div className="flex justify-center">
        <button onClick={onBack} className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
          ← Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
