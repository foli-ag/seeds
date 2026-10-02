import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNumberInputContext } from "./use-number-input-context.js"

export type NumberInputControlProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Groups the input with the triggers that step it */
export function NumberInputControl<As extends ValidComponent = "div">(props: NumberInputControlProps<As>): Element {
  const api = useNumberInputContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
