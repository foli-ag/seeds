import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useSwitchContext } from "./use-switch-context"

export interface SwitchLabelProps extends PartProps<"span"> {}

export function SwitchLabel(props: SwitchLabelProps): Element {
  const api = useSwitchContext()
  return render(
    "span",
    mergeProps(() => api().getLabelProps(), props),
  )
}
