import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNumberInputContext } from "./use-number-input-context.js"

export type NumberInputTriggerDecrementProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Takes a step off the value, and keeps taking while held */
export function NumberInputTriggerDecrement<As extends ValidComponent = "button">(
  props: NumberInputTriggerDecrementProps<As>,
): Element {
  const api = useNumberInputContext()
  return render(
    "button",
    mergeProps(() => api().getDecrementTriggerProps(), props),
  )
}
