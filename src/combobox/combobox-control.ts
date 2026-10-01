import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"

export type ComboboxControlProps<As extends ValidComponent = "div"> = PartProps<As>

/** Holds the input and the triggers */
export function ComboboxControl<As extends ValidComponent = "div">(props: ComboboxControlProps<As>): Element {
  const api = useComboboxContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
