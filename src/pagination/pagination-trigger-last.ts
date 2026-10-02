import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePaginationContext } from "./use-pagination-context.js"

export type PaginationTriggerLastProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Goes to the last page */
export function PaginationTriggerLast<As extends ValidComponent = "button">(
  props: PaginationTriggerLastProps<As>,
): Element {
  const api = usePaginationContext()
  return render(
    "button",
    mergeProps(() => api().getLastTriggerProps(), props),
  )
}
