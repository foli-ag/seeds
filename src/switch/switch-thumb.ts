import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSwitchContext } from "./use-switch-context.js"

export interface SwitchThumbProps extends PartProps<"span"> {}

/** The knob that slides along the control */
export function SwitchThumb(props: SwitchThumbProps): Element {
  const api = useSwitchContext()
  return render(
    "span",
    mergeProps(() => api().getThumbProps(), props),
  )
}
