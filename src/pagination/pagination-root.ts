import * as pagination from "@zag-js/pagination"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { usePagination, type UsePaginationProps } from "./use-pagination.js"
import { PaginationProvider } from "./use-pagination-context.js"

export type PaginationRootProps<As extends ValidComponent = "nav"> = PolymorphicProps<As, UsePaginationProps>

export function PaginationRoot<As extends ValidComponent = "nav">(props: PaginationRootProps<As>): Element {
  const [paginationProps, localProps] = splitProps(props, pagination.props)
  const api = usePagination(paginationProps)
  return provide(PaginationProvider, api, () =>
    render(
      "nav",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
