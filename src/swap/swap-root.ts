import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { renderStrategyKeys } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { useSwap, type UseSwapProps } from "./use-swap.js"
import { SwapProvider } from "./use-swap-context.js"

export type SwapRootProps<As extends ValidComponent = "span"> = PolymorphicProps<As, UseSwapProps>

/** Shows its "on" indicator while `swap` is set and its "off" indicator otherwise, animating each in and out */
export function SwapRoot<As extends ValidComponent = "span">(props: SwapRootProps<As>): Element {
  const [swapProps, localProps] = splitProps(props, ["swap", ...renderStrategyKeys])
  const api = useSwap(swapProps)
  return provide(SwapProvider, api, () =>
    render(
      "span",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
