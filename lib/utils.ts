import { createElement, type ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Render `**marked**` runs in `text` as `<strong>`, everything else as plain text. */
export function withBoldMarkers(text: string): ReactNode {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, index) => (index % 2 === 1 ? createElement("strong", { key: index }, part) : part));
}
