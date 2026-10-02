import { untrack, type Element } from "solid-js"
import { provide } from "../utils/flow.js"
import { PresenceContext, splitPresenceProps, usePresence, type UsePresenceProps } from "../utils/presence.js"
import type { UseTooltipReturn } from "./use-tooltip.js"
import { TooltipProvider } from "./use-tooltip-context.js"

export interface TooltipRootProviderProps extends Omit<UsePresenceProps, "present"> {
  /** What `useTooltip` returned */
  value: UseTooltipReturn
  children?: Element
}

/** A root for a tooltip created with `useTooltip`, whose API is then available outside the tooltip */
export function TooltipRootProvider(props: TooltipRootProviderProps): Element {
  const [presenceProps] = splitPresenceProps(props)
  return provideTooltip(
    untrack(() => props.value),
    presenceProps,
    () => props.children,
  )
}

export function provideTooltip(api: UseTooltipReturn, presenceProps: UsePresenceProps, children: () => Element) {
  const presence = usePresence(() => ({ ...presenceProps, present: api().open }))
  return provide(TooltipProvider, api, () => provide(PresenceContext, presence, children))
}
