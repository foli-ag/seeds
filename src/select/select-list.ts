import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export type SelectListProps<As extends ValidComponent = "div"> = PartProps<As>

/** Holds the items inside the content */
export function SelectList<As extends ValidComponent = "div">(props: SelectListProps<As>): Element {
  const api = useSelectContext()
  return render(
    "div",
    mergeProps(() => api().getListProps(), props),
  )
}
