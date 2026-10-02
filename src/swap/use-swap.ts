import type { PropTypes } from "@foliag/zag"
import { createMemo, type Accessor } from "solid-js"
import { usePresence, type RenderStrategyProps, type UsePresenceReturn } from "../utils/presence.js"
import { access, type MaybeAccessor } from "../utils/types.js"

export interface UseSwapProps extends RenderStrategyProps {
  /** Shows the "on" indicator instead of the "off" one */
  swap?: boolean | undefined
}

export interface IndicatorProps {
  /** Whether the indicator shows while the swap is on or while it is off */
  type: "on" | "off"
}

export interface SwapApi {
  /** Whether the "on" indicator shows */
  swap: boolean
  /** The presence of the "on" indicator */
  onPresence: UsePresenceReturn
  /** The presence of the "off" indicator */
  offPresence: UsePresenceReturn
  getRootProps(): PropTypes["element"]
  getIndicatorProps(props: IndicatorProps): PropTypes["element"]
}

export type UseSwapReturn = Accessor<SwapApi>

export function useSwap(props: MaybeAccessor<UseSwapProps> = {}): UseSwapReturn {
  // Each indicator enters and exits on its own, and neither animates on the first render
  const indicatorPresence = (shows: (swap: boolean) => boolean) =>
    usePresence(() => {
      const { swap = false, lazyMount, unmountOnExit } = access(props)
      return { present: shows(swap), lazyMount, unmountOnExit, skipAnimationOnMount: true }
    })
  const onPresence = indicatorPresence((swap) => swap)
  const offPresence = indicatorPresence((swap) => !swap)

  return createMemo(() => {
    const swap = access(props).swap ?? false
    return {
      swap,
      onPresence,
      offPresence,
      // Swap has no zag machine. Its parts are named the way zag names the others, with Ark's names.
      getRootProps: () => ({
        "data-scope": "swap",
        "data-part": "root",
        "data-swap": swap ? "on" : "off",
        // Stacks the indicators in one cell, so the one leaving and the one entering overlap while they animate
        style: { display: "inline-grid" },
      }),
      getIndicatorProps: ({ type }) => ({
        "data-scope": "swap",
        "data-part": "indicator",
        "data-type": type,
        ...(type === "on" ? onPresence : offPresence)().presenceProps,
        style: { "grid-area": "1 / 1" },
      }),
    }
  })
}
