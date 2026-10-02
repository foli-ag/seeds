import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNumberInputContext } from "./use-number-input-context.js"

export type NumberInputLabelProps<As extends ValidComponent = "label"> = PolymorphicProps<As>

export function NumberInputLabel<As extends ValidComponent = "label">(props: NumberInputLabelProps<As>): Element {
  const api = useNumberInputContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
