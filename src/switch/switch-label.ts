import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSwitchContext } from "./use-switch-context.js"

export type SwitchLabelProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

export function SwitchLabel<As extends ValidComponent = "span">(props: SwitchLabelProps<As>): Element {
  const api = useSwitchContext()
  return render(
    "span",
    mergeProps(() => api().getLabelProps(), props),
  )
}
