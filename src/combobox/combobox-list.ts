import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"

export interface ComboboxListProps extends PartProps<"div"> {}

/** Holds the items inside the content */
export function ComboboxList(props: ComboboxListProps): Element {
  const api = useComboboxContext()
  return render(
    "div",
    mergeProps(() => api().getListProps(), props),
  )
}
