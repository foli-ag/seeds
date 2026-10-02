import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseNumberInputReturn } from "./use-number-input.js"
import { NumberInputProvider } from "./use-number-input-context.js"

export type NumberInputRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  {
    /** What `useNumberInput` returned */
    value: UseNumberInputReturn
  }
>

/** A root for a number input created with `useNumberInput`, whose API is then available outside it */
export function NumberInputRootProvider<As extends ValidComponent = "div">(
  props: NumberInputRootProviderProps<As>,
): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(NumberInputProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
