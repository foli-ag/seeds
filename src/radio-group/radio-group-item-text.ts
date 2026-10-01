import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useRadioGroupContext } from "./use-radio-group-context"
import { useRadioGroupItemPropsContext } from "./use-radio-group-item-context"

export interface RadioGroupItemTextProps extends PartProps<"span"> {}

export function RadioGroupItemText(props: RadioGroupItemTextProps): Element {
  const api = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  return render(
    "span",
    mergeProps(() => api().getItemTextProps(itemProps), props),
  )
}
