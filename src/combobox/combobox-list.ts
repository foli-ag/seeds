import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"

export type ComboboxListProps<As extends ValidComponent = "div"> = PartProps<As>

/** Holds the items inside the content */
export function ComboboxList<As extends ValidComponent = "div">(props: ComboboxListProps<As>): Element {
  const api = useComboboxContext()
  return render(
    "div",
    mergeProps(() => api().getListProps(), props),
  )
}
