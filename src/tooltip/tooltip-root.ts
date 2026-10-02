import { omit, type Element } from "solid-js"
import { splitPresenceProps, type UsePresenceProps } from "../utils/presence.js"
import { provideTooltip } from "./tooltip-root-provider.js"
import { useTooltip, type UseTooltipProps } from "./use-tooltip.js"

export interface TooltipRootProps extends UseTooltipProps, Omit<UsePresenceProps, "present"> {
  children?: Element
}

export function TooltipRoot(props: TooltipRootProps): Element {
  const [presenceProps, tooltipProps] = splitPresenceProps(props)
  const api = useTooltip(omit(tooltipProps, "children"))
  return provideTooltip(api, presenceProps, () => props.children)
}
