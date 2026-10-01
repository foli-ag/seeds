import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"
import { useSelectItemPropsContext } from "./use-select-item-context.js"

export type SelectItemIndicatorProps<As extends ValidComponent = "div"> = PartProps<As>

/** Shown while the item around it is selected */
export function SelectItemIndicator<As extends ValidComponent = "div">(props: SelectItemIndicatorProps<As>): Element {
  const api = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemIndicatorProps(itemProps), props),
  )
}
