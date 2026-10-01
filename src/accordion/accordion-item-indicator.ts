import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useAccordionContext } from "./use-accordion-context.js"
import { useAccordionItemPropsContext } from "./use-accordion-item-context.js"

export type AccordionItemIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Marks its item's state with `data-state`, for a chevron that turns */
export function AccordionItemIndicator<As extends ValidComponent = "div">(
  props: AccordionItemIndicatorProps<As>,
): Element {
  const api = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemIndicatorProps(itemProps), props),
  )
}
