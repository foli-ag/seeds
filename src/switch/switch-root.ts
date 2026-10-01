import * as zagSwitch from "@zag-js/switch"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { provide } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { splitProps } from "../utils/split-props"
import { useSwitch, type UseSwitchProps } from "./use-switch"
import { SwitchProvider } from "./use-switch-context"

export interface SwitchRootProps extends PartProps<"label", UseSwitchProps> {}

export function SwitchRoot(props: SwitchRootProps): Element {
  const [switchProps, localProps] = splitProps(props, zagSwitch.props)
  const api = useSwitch(switchProps)
  return provide(SwitchProvider, api, () =>
    render(
      "label",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
