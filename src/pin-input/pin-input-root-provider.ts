import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UsePinInputReturn } from "./use-pin-input.js"
import { PinInputProvider } from "./use-pin-input-context.js"

export type PinInputRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  { value: UsePinInputReturn }
>

/** A root for a pin input created with `usePinInput` */
export function PinInputRootProvider<As extends ValidComponent = "div">(props: PinInputRootProviderProps<As>): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(PinInputProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
