import { atom } from "nanostores";

export type monthType = "all" | "enero" |"febrero" | "marzo" | "abril" | "mayo" | "junio" | "julio" | "agosto" | "septiembre" | "octubre" | "noviembre" | "diciembre"
export const $monthStore = atom<monthType>("all")
export type yearType = "all" | "default" | "2025" | "2026"
export const $yearStore = atom<yearType>("default")


