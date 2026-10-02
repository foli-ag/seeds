import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { IndicatorProps } from "./use-swap.js"
import { useSwapContext } from "./use-swap-context.js"

export type SwapIndicatorProps<As extends ValidComponent = "span"> = PolymorphicProps<As, IndicatorProps>

/** Shows while the swap is in its `type` state, and stays mounted as the root's render strategy says */
export function SwapIndicator<As extends ValidComponent = "span">(props: SwapIndicatorProps<As>): Element {
  const [indicatorProps, localProps] = splitProps(props, ["type"])
  const api = useSwapContext()
  const presence = () => (indicatorProps.type === "on" ? api().onPresence : api().offPresence)()
  const merged = mergeProps(() => api().getIndicatorProps(indicatorProps), localProps)
  return show(
    () => !presence().unmounted,
    () => render("span", merged),
  )
}
