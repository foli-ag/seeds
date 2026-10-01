import { untrack, type Element } from "solid-js"
import { useAccordionItemContext, type UseAccordionItemContext } from "./use-accordion-item-context"

export interface AccordionItemContextProps {
  children: (item: UseAccordionItemContext) => Element
}

/** Renders `children` with the state of the item around it */
export function AccordionItemContext(props: AccordionItemContextProps): Element {
  return untrack(() => props.children(useAccordionItemContext()))
}
