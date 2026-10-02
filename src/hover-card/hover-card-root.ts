import { omit, type Element } from "solid-js"
import { splitPresenceProps, type UsePresenceProps } from "../utils/presence.js"
import { provideHoverCard } from "./hover-card-root-provider.js"
import { useHoverCard, type UseHoverCardProps } from "./use-hover-card.js"

export interface HoverCardRootProps extends UseHoverCardProps, Omit<UsePresenceProps, "present"> {
  children?: Element
}

export function HoverCardRoot(props: HoverCardRootProps): Element {
  const [presenceProps, hoverCardProps] = splitPresenceProps(props)
  const api = useHoverCard(omit(hoverCardProps, "children"))
  return provideHoverCard(api, presenceProps, () => props.children)
}
