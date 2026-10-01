import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSwitchContext } from "./use-switch-context.js"

export type SwitchThumbProps<As extends ValidComponent = "span"> = PartProps<As>

/** The knob that slides along the control */
export function SwitchThumb<As extends ValidComponent = "span">(props: SwitchThumbProps<As>): Element {
  const api = useSwitchContext()
  return render(
    "span",
    mergeProps(() => api().getThumbProps(), props),
  )
}
