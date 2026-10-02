import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNumberInputContext } from "./use-number-input-context.js"

export type NumberInputTriggerIncrementProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Adds a step to the value, and keeps adding while held */
export function NumberInputTriggerIncrement<As extends ValidComponent = "button">(
  props: NumberInputTriggerIncrementProps<As>,
): Element {
  const api = useNumberInputContext()
  return render(
    "button",
    mergeProps(() => api().getIncrementTriggerProps(), props),
  )
}
