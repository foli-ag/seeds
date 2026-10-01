import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useRadioGroupContext } from "./use-radio-group-context.js"
import { useRadioGroupItemPropsContext } from "./use-radio-group-item-context.js"

export type RadioGroupItemHiddenInputProps<As extends ValidComponent = "input"> = PolymorphicProps<As>

/** The native radio that carries the value into forms and the state to assistive technology */
export function RadioGroupItemHiddenInput<As extends ValidComponent = "input">(
  props: RadioGroupItemHiddenInputProps<As>,
): Element {
  const api = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  return render(
    "input",
    mergeProps(() => api().getItemHiddenInputProps(itemProps), props),
  )
}
