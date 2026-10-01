import { untrack, type Element } from "solid-js"
import { provide } from "../utils/flow.js"
import { PresenceContext, splitPresenceProps, usePresence, type UsePresenceProps } from "../utils/presence.js"
import type { UsePopoverReturn } from "./use-popover.js"
import { PopoverProvider } from "./use-popover-context.js"

export interface PopoverRootProviderProps extends Omit<UsePresenceProps, "present"> {
  /** What `usePopover` returned */
  value: UsePopoverReturn
  children?: Element
}

/** A root for a popover created with `usePopover`, whose API is then available outside the popover */
export function PopoverRootProvider(props: PopoverRootProviderProps): Element {
  const [presenceProps] = splitPresenceProps(props)
  return providePopover(
    untrack(() => props.value),
    presenceProps,
    () => props.children,
  )
}

export function providePopover(api: UsePopoverReturn, presenceProps: UsePresenceProps, children: () => Element) {
  const presence = usePresence(() => ({ ...presenceProps, present: api().open }))
  return provide(PopoverProvider, api, () => provide(PresenceContext, presence, children))
}
