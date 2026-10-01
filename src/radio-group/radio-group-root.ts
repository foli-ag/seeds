import * as radioGroup from "@zag-js/radio-group"
import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useRadioGroup, type UseRadioGroupProps } from "./use-radio-group.js"
import { RadioGroupProvider } from "./use-radio-group-context.js"

export type RadioGroupRootProps<As extends ValidComponent = "div"> = PartProps<As, UseRadioGroupProps>

export function RadioGroupRoot<As extends ValidComponent = "div">(props: RadioGroupRootProps<As>): Element {
  const [radioGroupProps, localProps] = splitProps(props, radioGroup.props)
  const api = useRadioGroup(radioGroupProps)
  return provide(RadioGroupProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
