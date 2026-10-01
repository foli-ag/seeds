import { omit, type Element } from "solid-js"
import { splitPresenceProps, type UsePresenceProps } from "../utils/presence.js"
import { providePopover } from "./popover-root-provider.js"
import { usePopover, type UsePopoverProps } from "./use-popover.js"

export interface PopoverRootProps extends UsePopoverProps, Omit<UsePresenceProps, "present"> {
  children?: Element
}

export function PopoverRoot(props: PopoverRootProps): Element {
  const [presenceProps, popoverProps] = splitPresenceProps(props)
  const api = usePopover(omit(popoverProps, "children"))
  return providePopover(api, presenceProps, () => props.children)
}
