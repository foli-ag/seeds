import { createComponent, type Element } from "solid-js"
import { CollapsibleContent } from "../collapsible/collapsible-content"
import type { PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useAccordionContext } from "./use-accordion-context"
import { useAccordionItemPropsContext } from "./use-accordion-item-context"

export interface AccordionItemContentProps extends PartProps<"div"> {}

export function AccordionItemContent(props: AccordionItemContentProps): Element {
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
