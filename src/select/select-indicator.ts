import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export type SelectIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Marks the open state with `data-state`, for a chevron that turns */
export function SelectIndicator<As extends ValidComponent = "div">(props: SelectIndicatorProps<As>): Element {
  const api = useSelectContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), props),
  )
}
