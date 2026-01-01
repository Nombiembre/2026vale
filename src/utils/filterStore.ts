import { atom } from "nanostores";

export type monthType = "all" | "default" | "febrero" | "marzo" | "abril" | "mayo" | "junio" | "julio" | "agosto" | "septiembre" | "octubre" | "noviembre" | "diciembre"
export const $monthStore = atom<monthType>("default")
export type yearType = "all" | "default" | "2025" | "2026"
export const $yearStore = atom<yearType>("default")


