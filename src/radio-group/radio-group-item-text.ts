import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useRadioGroupContext } from "./use-radio-group-context.js"
import { useRadioGroupItemPropsContext } from "./use-radio-group-item-context.js"

export type RadioGroupItemTextProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

export function RadioGroupItemText<As extends ValidComponent = "span">(props: RadioGroupItemTextProps<As>): Element {
  const api = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  return render(
    "span",
    mergeProps(() => api().getItemTextProps(itemProps), props),
  )
}
