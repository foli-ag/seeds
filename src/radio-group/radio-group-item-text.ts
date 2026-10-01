import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useRadioGroupContext } from "./use-radio-group-context.js"
import { useRadioGroupItemPropsContext } from "./use-radio-group-item-context.js"

export interface RadioGroupItemTextProps extends PartProps<"span"> {}

export function RadioGroupItemText(props: RadioGroupItemTextProps): Element {
  const api = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  return render(
    "span",
    mergeProps(() => api().getItemTextProps(itemProps), props),
  )
}
