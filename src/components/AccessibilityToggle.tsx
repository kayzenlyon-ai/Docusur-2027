import { useState, useEffect } from "react";
import { Accessibility, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AccessibilityToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [dyslexic, setDyslexic] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if (dyslexic) {
      document.documentElement.classList.add("dyslexic-font");
    } else {
      document.documentElement.classList.remove("dyslexic-font");
    }
  }, [dyslexic]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-xl p-2.5 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-primary active:scale-95"
        aria-label="Options d'accessibilité"
      >
        <Accessibility className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 z-50 rounded-2xl border border-border bg-popover p-4 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-sm font-bold text-foreground">Accessibilité</h3>
                  <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setDyslexic(!dyslexic)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-secondary border border-transparent"
                  >
                    <span className="font-medium">Police Dyslexie</span>
                    {dyslexic && <Check className="h-4 w-4 text-primary" />}
                  </button>

                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-secondary border border-transparent"
                  >
                    <span className="font-medium">Contraste Élevé</span>
                    {highContrast && <Check className="h-4 w-4 text-primary" />}
                  </button>
                </div>

                <p className="mt-4 text-[10px] text-muted-foreground leading-relaxed">
                  Ces options sont appliquées localement sur votre navigateur pour améliorer votre confort de lecture.
                </p>
              </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
