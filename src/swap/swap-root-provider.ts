import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseSwapReturn } from "./use-swap.js"
import { SwapProvider } from "./use-swap-context.js"

export type SwapRootProviderProps<As extends ValidComponent = "span"> = PolymorphicProps<As, { value: UseSwapReturn }>

/** A root for a swap created with `useSwap` */
export function SwapRootProvider<As extends ValidComponent = "span">(props: SwapRootProviderProps<As>): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(SwapProvider, api, () =>
    render(
      "span",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
