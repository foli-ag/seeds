import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useRadioGroupContext } from "./use-radio-group-context.js"
import { useRadioGroupItemPropsContext } from "./use-radio-group-item-context.js"

export type RadioGroupItemControlProps<As extends ValidComponent = "div"> = PartProps<As>

/** The radio circle */
export function RadioGroupItemControl<As extends ValidComponent = "div">(
  props: RadioGroupItemControlProps<As>,
): Element {
  const api = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemControlProps(itemProps), props),
  )
}
