import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseCheckboxReturn } from "./use-checkbox.js"
import { CheckboxProvider } from "./use-checkbox-context.js"

export type CheckboxRootProviderProps<As extends ValidComponent = "label"> = PolymorphicProps<
  As,
  { value: UseCheckboxReturn }
>

/** A root for a checkbox created with `useCheckbox` */
export function CheckboxRootProvider<As extends ValidComponent = "label">(
  props: CheckboxRootProviderProps<As>,
): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(CheckboxProvider, api, () =>
    render(
      "label",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
