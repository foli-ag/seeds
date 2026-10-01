import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useSwitchContext } from "./use-switch-context"

export interface SwitchControlProps extends PartProps<"span"> {}

/** The track */
export function SwitchControl(props: SwitchControlProps): Element {
  const api = useSwitchContext()
  return render(
    "span",
    mergeProps(() => api().getControlProps(), props),
  )
}
