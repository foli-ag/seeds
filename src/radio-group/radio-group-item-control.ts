import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useRadioGroupContext } from "./use-radio-group-context.js"
import { useRadioGroupItemPropsContext } from "./use-radio-group-item-context.js"

export interface RadioGroupItemControlProps extends PartProps<"div"> {}

/** The radio circle */
export function RadioGroupItemControl(props: RadioGroupItemControlProps): Element {
  const api = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemControlProps(itemProps), props),
  )
}
