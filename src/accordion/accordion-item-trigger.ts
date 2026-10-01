import type { Element } from "solid-js"
import { useCollapsibleContext } from "../collapsible/use-collapsible-context"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useAccordionContext } from "./use-accordion-context"
import { useAccordionItemPropsContext } from "./use-accordion-item-context"

export interface AccordionItemTriggerProps extends PartProps<"button"> {}

/** Opens and closes its item */
export function AccordionItemTrigger(props: AccordionItemTriggerProps): Element {
  const api = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  const collapsible = useCollapsibleContext()
  return render(
    "button",
    mergeProps(
      () => api().getItemTriggerProps(itemProps),
      // Points at nothing while the content is unmounted
      () => ({ "aria-controls": collapsible().unmounted ? null : undefined }),
      props,
    ),
  )
}
