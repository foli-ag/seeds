import * as radioGroup from "@zag-js/radio-group"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { provide } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { splitProps } from "../utils/split-props"
import { useRadioGroup, type UseRadioGroupProps } from "./use-radio-group"
import { RadioGroupProvider } from "./use-radio-group-context"

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
