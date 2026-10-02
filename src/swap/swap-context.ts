import { untrack, type Element } from "solid-js"
import type { UseSwapReturn } from "./use-swap.js"
import { useSwapContext } from "./use-swap-context.js"

export interface SwapContextProps {
  children: (api: UseSwapReturn) => Element
}

/** Renders `children` with the swap's API */
export function SwapContext(props: SwapContextProps): Element {
  return untrack(() => props.children(useSwapContext()))
}
