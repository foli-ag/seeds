import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"
import { useComboboxItemPropsContext } from "./use-combobox-item-context.js"

export interface ComboboxItemIndicatorProps extends PartProps<"div"> {}

/** Shown while the item around it is selected */
export function ComboboxItemIndicator(props: ComboboxItemIndicatorProps): Element {
  const api = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemIndicatorProps(itemProps), props),
  )
}
