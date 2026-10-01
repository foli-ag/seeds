import { untrack, type Element } from "solid-js"
import type { UseAccordionReturn } from "./use-accordion"
import { useAccordionContext } from "./use-accordion-context"

export interface AccordionContextProps {
  children: (api: UseAccordionReturn) => Element
}

/** Renders `children` with the accordion's API */
export function AccordionContext(props: AccordionContextProps): Element {
  return untrack(() => props.children(useAccordionContext()))
}
