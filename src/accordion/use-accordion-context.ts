import { createContext, useContext } from "solid-js"
import type { UseAccordionReturn } from "./use-accordion"

export const AccordionProvider = createContext<UseAccordionReturn>()

export const useAccordionContext = (): UseAccordionReturn => useContext(AccordionProvider)
