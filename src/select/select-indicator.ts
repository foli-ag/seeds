import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export interface SelectIndicatorProps extends PartProps<"div"> {}

/** Marks the open state with `data-state`, for a chevron that turns */
export function SelectIndicator(props: SelectIndicatorProps): Element {
  const api = useSelectContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), props),
  )
}
