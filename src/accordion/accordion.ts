import { AccordionItem } from "./accordion-item"
import { AccordionItemContent } from "./accordion-item-content"
import { AccordionItemContext } from "./accordion-item-context"
import { AccordionItemIndicator } from "./accordion-item-indicator"
import { AccordionItemTrigger } from "./accordion-item-trigger"

export { AccordionContext as Context, type AccordionContextProps as ContextProps } from "./accordion-context"
export type { AccordionItemProps as ItemProps } from "./accordion-item"
export type { AccordionItemContentProps as ItemContentProps } from "./accordion-item-content"
export type { AccordionItemContextProps as ItemContextProps } from "./accordion-item-context"
export type { AccordionItemIndicatorProps as ItemIndicatorProps } from "./accordion-item-indicator"
export type { AccordionItemTriggerProps as ItemTriggerProps } from "./accordion-item-trigger"
export { AccordionRoot as Root, type AccordionRootProps as RootProps } from "./accordion-root"
export {
  AccordionRootProvider as RootProvider,
  type AccordionRootProviderProps as RootProviderProps,
} from "./accordion-root-provider"
export type { FocusChangeDetails, ItemState, ValueChangeDetails } from "@zag-js/accordion"

export const Item = /* @__PURE__ */ Object.assign(AccordionItem, {
  Trigger: AccordionItemTrigger,
  Content: AccordionItemContent,
  Indicator: AccordionItemIndicator,
  Context: AccordionItemContext,
})
