import * as numberInput from "@zag-js/number-input"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useNumberInput, type UseNumberInputProps } from "./use-number-input.js"
import { NumberInputProvider } from "./use-number-input-context.js"

export type NumberInputRootProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UseNumberInputProps>

export function NumberInputRoot<As extends ValidComponent = "div">(props: NumberInputRootProps<As>): Element {
  const [numberInputProps, localProps] = splitProps(props, numberInput.props)
  const api = useNumberInput(numberInputProps)
  return provide(NumberInputProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
