import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export interface SelectListProps extends PartProps<"div"> {}

/** Holds the items inside the content */
export function SelectList(props: SelectListProps): Element {
  const api = useSelectContext()
  return render(
    "div",
    mergeProps(() => api().getListProps(), props),
  )
}
