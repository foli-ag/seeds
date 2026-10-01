import type * as accordion from "@zag-js/accordion"
import { createComponent, createMemo, untrack, type Element } from "solid-js"
import { CollapsibleRoot, type CollapsibleRootProps } from "../collapsible/collapsible-root"
import type { PartProps } from "../utils/factory"
import { provide } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { useRenderStrategyContext } from "../utils/presence"
import { splitProps } from "../utils/split-props"
import { useAccordionContext } from "./use-accordion-context"
import { AccordionItemPropsProvider, AccordionItemProvider } from "./use-accordion-item-context"

export interface AccordionItemProps extends PartProps<"div", accordion.ItemProps> {}

/** A collapsible that the accordion opens and closes */
export function AccordionItem(props: AccordionItemProps): Element {
  const [itemProps, localProps] = splitProps(props, ["value", "disabled"])
  const api = useAccordionContext()
  const strategy = useRenderStrategyContext()
  const itemState = createMemo(() => api().getItemState(itemProps))
  // The collapsible's content takes the id the accordion's trigger points at
  const contentId = untrack(() => api().getItemContentProps(itemProps).id)
  const merged = mergeProps(
    () => ({ ...strategy(), open: itemState().expanded, ids: { content: contentId } }),
    () => api().getItemProps(itemProps),
    localProps,
  )
  return provide(AccordionItemPropsProvider, itemProps, () =>
    // The item props are typed for the DOM, where `dir` may be false to remove the attribute
    provide(AccordionItemProvider, itemState, () => createComponent(CollapsibleRoot, merged as CollapsibleRootProps)),
  )
}
