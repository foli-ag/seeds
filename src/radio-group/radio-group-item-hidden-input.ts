import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useRadioGroupContext } from "./use-radio-group-context"
import { useRadioGroupItemPropsContext } from "./use-radio-group-item-context"

export interface RadioGroupItemHiddenInputProps extends PartProps<"input"> {}

/** The native radio that carries the value into forms and the state to assistive technology */
export function RadioGroupItemHiddenInput(props: RadioGroupItemHiddenInputProps): Element {
  const api = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  return render(
    "input",
    mergeProps(() => api().getItemHiddenInputProps(itemProps), props),
  )
}
