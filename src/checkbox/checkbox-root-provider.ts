import { untrack, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseCheckboxReturn } from "./use-checkbox.js"
import { CheckboxProvider } from "./use-checkbox-context.js"

export interface CheckboxRootProviderProps extends PartProps<"label", { value: UseCheckboxReturn }> {}

/** A root for a checkbox created with `useCheckbox` */
export function CheckboxRootProvider(props: CheckboxRootProviderProps): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(CheckboxProvider, api, () =>
    render(
      "label",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
