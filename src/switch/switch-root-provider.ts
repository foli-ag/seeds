import { untrack, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseSwitchReturn } from "./use-switch.js"
import { SwitchProvider } from "./use-switch-context.js"

export interface SwitchRootProviderProps extends PartProps<"label", { value: UseSwitchReturn }> {}

/** A root for a switch created with `useSwitch` */
export function SwitchRootProvider(props: SwitchRootProviderProps): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(SwitchProvider, api, () =>
    render(
      "label",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
