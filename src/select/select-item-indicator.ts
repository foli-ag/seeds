import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"
import { useSelectItemPropsContext } from "./use-select-item-context.js"

export interface SelectItemIndicatorProps extends PartProps<"div"> {}

/** Shown while the item around it is selected */
export function SelectItemIndicator(props: SelectItemIndicatorProps): Element {
  const api = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemIndicatorProps(itemProps), props),
  )
}
