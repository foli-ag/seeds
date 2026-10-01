import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSwitchContext } from "./use-switch-context.js"

export type SwitchControlProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

/** The track */
export function SwitchControl<As extends ValidComponent = "span">(props: SwitchControlProps<As>): Element {
  const api = useSwitchContext()
  return render(
    "span",
    mergeProps(() => api().getControlProps(), props),
  )
}
