import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"
import { useComboboxGroupPropsContext } from "./use-combobox-item-context.js"

export type ComboboxGroupLabelProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Names the group around it */
export function ComboboxGroupLabel<As extends ValidComponent = "div">(props: ComboboxGroupLabelProps<As>): Element {
  const api = useComboboxContext()
  const group = useComboboxGroupPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemGroupLabelProps({ htmlFor: group.id }), props),
  )
}
