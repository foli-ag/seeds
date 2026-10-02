import * as pinInput from "@zag-js/pin-input"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { usePinInput, type UsePinInputProps } from "./use-pin-input.js"
import { PinInputProvider } from "./use-pin-input-context.js"

export type PinInputRootProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UsePinInputProps>

export function PinInputRoot<As extends ValidComponent = "div">(props: PinInputRootProps<As>): Element {
  const [pinInputProps, localProps] = splitProps(props, pinInput.props)
  const api = usePinInput(pinInputProps)
  return provide(PinInputProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
