import type * as pagination from "@zag-js/pagination"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { usePaginationContext } from "./use-pagination-context.js"

export type PaginationEllipsisProps<As extends ValidComponent = "div"> = PolymorphicProps<As, pagination.EllipsisProps>

/** Stands for the pages left out at `index` in the API's `pages` */
export function PaginationEllipsis<As extends ValidComponent = "div">(props: PaginationEllipsisProps<As>): Element {
  const [ellipsisProps, localProps] = splitProps(props, ["index"])
  const api = usePaginationContext()
  return render(
    "div",
    mergeProps(() => api().getEllipsisProps(ellipsisProps), localProps),
  )
}
