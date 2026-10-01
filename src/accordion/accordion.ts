import { AccordionItem } from "./accordion-item.js"
import { AccordionItemContent } from "./accordion-item-content.js"
import { AccordionItemContext } from "./accordion-item-context.js"
import { AccordionItemIndicator } from "./accordion-item-indicator.js"
import { AccordionItemTrigger } from "./accordion-item-trigger.js"

export { AccordionContext as Context, type AccordionContextProps as ContextProps } from "./accordion-context.js"
export type { AccordionItemProps as ItemProps } from "./accordion-item.js"
export type { AccordionItemContentProps as ItemContentProps } from "./accordion-item-content.js"
export type { AccordionItemContextProps as ItemContextProps } from "./accordion-item-context.js"
export type { AccordionItemIndicatorProps as ItemIndicatorProps } from "./accordion-item-indicator.js"
export type { AccordionItemTriggerProps as ItemTriggerProps } from "./accordion-item-trigger.js"
export { AccordionRoot as Root, type AccordionRootProps as RootProps } from "./accordion-root.js"
export {
  AccordionRootProvider as RootProvider,
  type AccordionRootProviderProps as RootProviderProps,
} from "./accordion-root-provider.js"
export type { FocusChangeDetails, ItemState, ValueChangeDetails } from "@zag-js/accordion"

export const Item = /* @__PURE__ */ Object.assign(AccordionItem, {
  Trigger: AccordionItemTrigger,
  Content: AccordionItemContent,
  Indicator: AccordionItemIndicator,
  Context: AccordionItemContext,
})
