import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useSwitchContext } from "./use-switch-context"

export interface SwitchHiddenInputProps extends PartProps<"input"> {}

/** The native checkbox that carries the value into forms and the state to assistive technology */
export function SwitchHiddenInput(props: SwitchHiddenInputProps): Element {
  const api = useSwitchContext()
  return render(
    "input",
    mergeProps(() => api().getHiddenInputProps(), props),
  )
}
