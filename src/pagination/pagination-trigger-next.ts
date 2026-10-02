import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePaginationContext } from "./use-pagination-context.js"

export type PaginationTriggerNextProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Goes to the next page */
export function PaginationTriggerNext<As extends ValidComponent = "button">(
  props: PaginationTriggerNextProps<As>,
): Element {
  const api = usePaginationContext()
  return render(
    "button",
    mergeProps(() => api().getNextTriggerProps(), props),
  )
}
