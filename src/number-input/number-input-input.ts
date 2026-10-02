import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNumberInputContext } from "./use-number-input-context.js"

export type NumberInputInputProps<As extends ValidComponent = "input"> = PolymorphicProps<As>

/** The spin button the number is typed into, which the arrow keys step */
export function NumberInputInput<As extends ValidComponent = "input">(props: NumberInputInputProps<As>): Element {
  const api = useNumberInputContext()
  return render(
    "input",
    mergeProps(() => api().getInputProps(), props),
  )
}
