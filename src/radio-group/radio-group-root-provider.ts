import { untrack, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { provide } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { splitProps } from "../utils/split-props"
import type { UseRadioGroupReturn } from "./use-radio-group"
import { RadioGroupProvider } from "./use-radio-group-context"

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
