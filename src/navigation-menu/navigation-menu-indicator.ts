import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresence, useRenderStrategyContext } from "../utils/presence.js"
import { useNavigationMenuContext } from "./use-navigation-menu-context.js"

export interface NavigationMenuIndicatorProps extends PartProps<"div"> {}

/** Follows the open item's trigger, through CSS variables, while an item is open */
export function NavigationMenuIndicator(props: NavigationMenuIndicatorProps): Element {
  const api = useNavigationMenuContext()
  const strategy = useRenderStrategyContext()
  const presence = usePresence(() => ({ ...strategy(), present: api().open }))
  const merged = mergeProps(
    () => api().getIndicatorProps(),
    () => presence().presenceProps,
    props,
  )
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
