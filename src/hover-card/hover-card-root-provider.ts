import { untrack, type Element } from "solid-js"
import { provide } from "../utils/flow.js"
import { PresenceContext, splitPresenceProps, usePresence, type UsePresenceProps } from "../utils/presence.js"
import type { UseHoverCardReturn } from "./use-hover-card.js"
import { HoverCardProvider } from "./use-hover-card-context.js"

export interface HoverCardRootProviderProps extends Omit<UsePresenceProps, "present"> {
  /** What `useHoverCard` returned */
  value: UseHoverCardReturn
  children?: Element
}

/** A root for a hover card created with `useHoverCard`, whose API is then available outside the hover card */
export function HoverCardRootProvider(props: HoverCardRootProviderProps): Element {
  const [presenceProps] = splitPresenceProps(props)
  return provideHoverCard(
    untrack(() => props.value),
    presenceProps,
    () => props.children,
  )
}

export function provideHoverCard(api: UseHoverCardReturn, presenceProps: UsePresenceProps, children: () => Element) {
  const presence = usePresence(() => ({ ...presenceProps, present: api().open }))
  return provide(HoverCardProvider, api, () => provide(PresenceContext, presence, children))
}
