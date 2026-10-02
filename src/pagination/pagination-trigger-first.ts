import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePaginationContext } from "./use-pagination-context.js"

export type PaginationTriggerFirstProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Goes to the first page */
export function PaginationTriggerFirst<As extends ValidComponent = "button">(
  props: PaginationTriggerFirstProps<As>,
): Element {
  const api = usePaginationContext()
  return render(
    "button",
    mergeProps(() => api().getFirstTriggerProps(), props),
  )
}
