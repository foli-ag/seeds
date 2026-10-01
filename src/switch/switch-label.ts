import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSwitchContext } from "./use-switch-context.js"

export interface SwitchLabelProps extends PartProps<"span"> {}

export function SwitchLabel(props: SwitchLabelProps): Element {
  const api = useSwitchContext()
  return render(
    "span",
    mergeProps(() => api().getLabelProps(), props),
  )
}
