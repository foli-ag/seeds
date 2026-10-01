import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"
import { useComboboxItemPropsContext } from "./use-combobox-item-context.js"

export type ComboboxItemTextProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

export function ComboboxItemText<As extends ValidComponent = "span">(props: ComboboxItemTextProps<As>): Element {
  const api = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  return render(
    "span",
    mergeProps(() => api().getItemTextProps(itemProps), props),
  )
}
