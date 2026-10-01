import type * as combobox from "@zag-js/combobox"
import { createMemo, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useComboboxContext } from "./use-combobox-context.js"
import { ComboboxItemPropsProvider, ComboboxItemProvider } from "./use-combobox-item-context.js"

export interface ComboboxItemProps extends PartProps<"div", combobox.ItemProps> {}

/** The option for `item`, one of the collection's items */
export function ComboboxItem(props: ComboboxItemProps): Element {
  const [itemProps, localProps] = splitProps(props, ["item", "persistFocus"])
  const api = useComboboxContext()
  const itemState = createMemo(() => api().getItemState(itemProps))
  return provide(ComboboxItemPropsProvider, itemProps, () =>
    provide(ComboboxItemProvider, itemState, () =>
      render(
        "div",
        mergeProps(() => api().getItemProps(itemProps), localProps),
      ),
    ),
  )
}
