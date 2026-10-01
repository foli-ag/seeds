import type * as select from "@zag-js/select"
import { createMemo, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSelectContext } from "./use-select-context.js"
import { SelectItemPropsProvider, SelectItemProvider } from "./use-select-item-context.js"

export type SelectItemProps<As extends ValidComponent = "div"> = PolymorphicProps<As, select.ItemProps>

/** The option for `item`, one of the collection's items */
export function SelectItem<As extends ValidComponent = "div">(props: SelectItemProps<As>): Element {
  const [itemProps, localProps] = splitProps(props, ["item", "persistFocus"])
  const api = useSelectContext()
  const itemState = createMemo(() => api().getItemState(itemProps))
  return provide(SelectItemPropsProvider, itemProps, () =>
    provide(SelectItemProvider, itemState, () =>
      render(
        "div",
        mergeProps(() => api().getItemProps(itemProps), localProps),
      ),
    ),
  )
}
