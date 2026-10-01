import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSwitchContext } from "./use-switch-context.js"

export interface SwitchControlProps extends PartProps<"span"> {}

/** The track */
export function SwitchControl(props: SwitchControlProps): Element {
  const api = useSwitchContext()
  return render(
    "span",
    mergeProps(() => api().getControlProps(), props),
  )
}
