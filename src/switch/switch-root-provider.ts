import { untrack, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { provide } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { splitProps } from "../utils/split-props"
import type { UseSwitchReturn } from "./use-switch"
import { SwitchProvider } from "./use-switch-context"

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
