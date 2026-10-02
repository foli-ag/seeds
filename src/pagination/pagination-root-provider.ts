import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UsePaginationReturn } from "./use-pagination.js"
import { PaginationProvider } from "./use-pagination-context.js"

export type PaginationRootProviderProps<As extends ValidComponent = "nav"> = PolymorphicProps<
  As,
  {
    /** What `usePagination` returned */
    value: UsePaginationReturn
  }
>

/** A root for a pagination created with `usePagination`, whose API is then available outside it */
export function PaginationRootProvider<As extends ValidComponent = "nav">(
  props: PaginationRootProviderProps<As>,
): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(PaginationProvider, api, () =>
    render(
      "nav",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
