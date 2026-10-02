import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePinInputContext } from "./use-pin-input-context.js"

export type PinInputLabelProps<As extends ValidComponent = "label"> = PolymorphicProps<As>

/** Names the pin input, and focuses its first input when clicked */
export function PinInputLabel<As extends ValidComponent = "label">(props: PinInputLabelProps<As>): Element {
  const api = usePinInputContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
