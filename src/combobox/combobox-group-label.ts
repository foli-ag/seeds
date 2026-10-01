import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"
import { useComboboxGroupPropsContext } from "./use-combobox-item-context.js"

export interface ComboboxGroupLabelProps extends PartProps<"div"> {}

/** Names the group around it */
export function ComboboxGroupLabel(props: ComboboxGroupLabelProps): Element {
  const api = useComboboxContext()
  const group = useComboboxGroupPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemGroupLabelProps({ htmlFor: group.id }), props),
  )
}
