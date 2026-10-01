import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSwitchContext } from "./use-switch-context.js"

export type SwitchHiddenInputProps<As extends ValidComponent = "input"> = PartProps<As>

/** The native checkbox that carries the value into forms and the state to assistive technology */
export function SwitchHiddenInput<As extends ValidComponent = "input">(props: SwitchHiddenInputProps<As>): Element {
  const api = useSwitchContext()
  return render(
    "input",
    mergeProps(() => api().getHiddenInputProps(), props),
  )
}
