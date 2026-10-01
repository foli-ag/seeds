import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"
import { useComboboxItemPropsContext } from "./use-combobox-item-context.js"

export interface ComboboxItemTextProps extends PartProps<"span"> {}

export function ComboboxItemText(props: ComboboxItemTextProps): Element {
  const api = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  return render(
    "span",
    mergeProps(() => api().getItemTextProps(itemProps), props),
  )
}
