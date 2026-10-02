import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNumberInputContext } from "./use-number-input-context.js"

export type NumberInputValueTextProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

export function NumberInputValueText<As extends ValidComponent = "span">(
  props: NumberInputValueTextProps<As>,
): Element {
  const api = useNumberInputContext()
  return render(
    "span",
    mergeProps(() => api().getValueTextProps(), props),
  )
}
