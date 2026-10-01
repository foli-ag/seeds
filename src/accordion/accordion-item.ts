import type * as accordion from "@zag-js/accordion"
import { createComponent, createMemo, untrack, type Element } from "solid-js"
import { CollapsibleRoot, type CollapsibleRootProps } from "../collapsible/collapsible-root.js"
import type { PartProps, ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { useRenderStrategyContext } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { useAccordionContext } from "./use-accordion-context.js"
import { AccordionItemPropsProvider, AccordionItemProvider } from "./use-accordion-item-context.js"

export type AccordionItemProps<As extends ValidComponent = "div"> = PartProps<As, accordion.ItemProps>

/** A collapsible that the accordion opens and closes */
export function AccordionItem<As extends ValidComponent = "div">(props: AccordionItemProps<As>): Element {
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
