import type * as pagination from "@zag-js/pagination"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { Optional } from "../utils/types.js"
import { usePaginationContext } from "./use-pagination-context.js"

// zag only reads `value`. `type` stays accepted so a page from the API's `pages` spreads onto the item as it is.
export type PaginationItemProps<As extends ValidComponent = "button"> = PolymorphicProps<
  As,
  Optional<pagination.ItemProps, "type">
>

/** Goes to page `value`, and is marked as the current page while it is shown */
export function PaginationItem<As extends ValidComponent = "button">(props: PaginationItemProps<As>): Element {
  // `type` is the kind of entry in `pages`, not the button's type, so it never reaches the element
  const [itemProps, localProps] = splitProps(props, ["value", "type"])
  const api = usePaginationContext()
  return render(
    "button",
    mergeProps(() => api().getItemProps({ type: "page", value: itemProps.value }), localProps),
  )
}
