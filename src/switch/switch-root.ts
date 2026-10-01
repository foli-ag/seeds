import * as zagSwitch from "@zag-js/switch"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSwitch, type UseSwitchProps } from "./use-switch.js"
import { SwitchProvider } from "./use-switch-context.js"

export type SwitchRootProps<As extends ValidComponent = "label"> = PolymorphicProps<As, UseSwitchProps>

export function SwitchRoot<As extends ValidComponent = "label">(props: SwitchRootProps<As>): Element {
  const [switchProps, localProps] = splitProps(props, zagSwitch.props)
  const api = useSwitch(switchProps)
  return provide(SwitchProvider, api, () =>
    render(
      "label",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
