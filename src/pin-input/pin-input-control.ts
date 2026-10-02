import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePinInputContext } from "./use-pin-input-context.js"

export type PinInputControlProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Holds the inputs */
export function PinInputControl<As extends ValidComponent = "div">(props: PinInputControlProps<As>): Element {
  const api = usePinInputContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
