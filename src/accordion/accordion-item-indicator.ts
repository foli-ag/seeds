import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useAccordionContext } from "./use-accordion-context.js"
import { useAccordionItemPropsContext } from "./use-accordion-item-context.js"

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
