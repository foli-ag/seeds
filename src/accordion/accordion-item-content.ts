import { createComponent, type Element } from "solid-js"
import { CollapsibleContent } from "../collapsible/collapsible-content.js"
import type { PolymorphicProps, ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useAccordionContext } from "./use-accordion-context.js"
import { useAccordionItemPropsContext } from "./use-accordion-item-context.js"

export type AccordionItemContentProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

export function AccordionItemContent<As extends ValidComponent = "div">(props: AccordionItemContentProps<As>): Element {
  const api = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  // The collapsible shows and hides the content, which the accordion only labels
  const contentProps = () => {
    const rest: Record<string, unknown> = { ...api().getItemContentProps(itemProps) }
    delete rest.hidden
    delete rest["data-state"]
    return rest
  }
  return createComponent(CollapsibleContent, mergeProps(contentProps, props))
}
