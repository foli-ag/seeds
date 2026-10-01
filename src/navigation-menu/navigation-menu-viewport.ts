import { useContext, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresence, useRenderStrategyContext } from "../utils/presence.js"
import { NavigationMenuViewportPropsProvider, useNavigationMenuContext } from "./use-navigation-menu-context.js"

export interface NavigationMenuViewportProps extends PartProps<"div"> {}

/** Shows the open item's content in one place, sized to it through CSS variables */
export function NavigationMenuViewport(props: NavigationMenuViewportProps): Element {
  const api = useNavigationMenuContext()
  const viewportProps = useContext(NavigationMenuViewportPropsProvider) ?? {}
  const strategy = useRenderStrategyContext()
  const presence = usePresence(() => ({ ...strategy(), present: api().open }))
  const merged = mergeProps(
    () => api().getViewportProps(viewportProps),
    () => presence().presenceProps,
    props,
  )
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
