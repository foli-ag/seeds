import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useSwitchContext } from "./use-switch-context"

export interface SwitchThumbProps extends PartProps<"span"> {}

/** The knob that slides along the control */
export function SwitchThumb(props: SwitchThumbProps): Element {
  const api = useSwitchContext()
  return render(
    "span",
    mergeProps(() => api().getThumbProps(), props),
  )
}
