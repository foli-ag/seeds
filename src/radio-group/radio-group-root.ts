import * as radioGroup from "@zag-js/radio-group"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useRadioGroup, type UseRadioGroupProps } from "./use-radio-group.js"
import { RadioGroupProvider } from "./use-radio-group-context.js"

export interface RadioGroupRootProps extends PartProps<"div", UseRadioGroupProps> {}

export function RadioGroupRoot(props: RadioGroupRootProps): Element {
  const [radioGroupProps, localProps] = splitProps(props, radioGroup.props)
  const api = useRadioGroup(radioGroupProps)
  return provide(RadioGroupProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
