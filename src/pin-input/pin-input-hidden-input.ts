import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePinInputContext } from "./use-pin-input-context.js"

export type PinInputHiddenInputProps<As extends ValidComponent = "input"> = PolymorphicProps<As>

/** Carries the value into forms, as one string */
export function PinInputHiddenInput<As extends ValidComponent = "input">(props: PinInputHiddenInputProps<As>): Element {
  const api = usePinInputContext()
  return render(
    "input",
    mergeProps(() => api().getHiddenInputProps(), props),
  )
}
