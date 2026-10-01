import { createContext, useContext } from "solid-js"
import type { UseAccordionReturn } from "./use-accordion.js"

export const AccordionProvider = /* @__PURE__ */ createContext<UseAccordionReturn>()

export const useAccordionContext = (): UseAccordionReturn => useContext(AccordionProvider)
