import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"
import { useSelectItemPropsContext } from "./use-select-item-context.js"

export interface SelectItemTextProps extends PartProps<"span"> {}

export function SelectItemText(props: SelectItemTextProps): Element {
  const api = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  return render(
    "span",
    mergeProps(() => api().getItemTextProps(itemProps), props),
  )
}
