import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePaginationContext } from "./use-pagination-context.js"

export type PaginationTriggerPrevProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Goes to the previous page */
export function PaginationTriggerPrev<As extends ValidComponent = "button">(
  props: PaginationTriggerPrevProps<As>,
): Element {
  const api = usePaginationContext()
  return render(
    "button",
    mergeProps(() => api().getPrevTriggerProps(), props),
  )
}
