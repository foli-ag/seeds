import { untrack, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseRadioGroupReturn } from "./use-radio-group.js"
import { RadioGroupProvider } from "./use-radio-group-context.js"

export interface RadioGroupRootProviderProps extends PartProps<"div", { value: UseRadioGroupReturn }> {}

/** A root for a radio group created with `useRadioGroup` */
export function RadioGroupRootProvider(props: RadioGroupRootProviderProps): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(RadioGroupProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
