import React from "react";
import { cn } from "@/lib/utils";

interface DocuSurProps {
  className?: string;
}

export function DocuSur({ className }: DocuSurProps) {
  return (
    <span className={cn("inline-flex font-display", className)}>
      <span className={cn("text-primary", className && className.includes("text-white") && "text-white")}>Docu</span>
      <span className={cn("text-destructive", className && className.includes("text-white") && "text-white/90")}>Sûr</span>
    </span>
  );
}
