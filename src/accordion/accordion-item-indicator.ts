import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useAccordionContext } from "./use-accordion-context"
import { useAccordionItemPropsContext } from "./use-accordion-item-context"

export interface AccordionItemIndicatorProps extends PartProps<"div"> {}

/** Marks its item's state with `data-state`, for a chevron that turns */
export function AccordionItemIndicator(props: AccordionItemIndicatorProps): Element {
  const api = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemIndicatorProps(itemProps), props),
  )
}
