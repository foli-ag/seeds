import type * as navigationMenu from "@zag-js/navigation-menu"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { NavigationMenuViewportPropsProvider, useNavigationMenuContext } from "./use-navigation-menu-context.js"

export interface NavigationMenuViewportPositionerProps extends PartProps<"div", navigationMenu.ViewportProps> {}

/** Places the viewport under the open item, aligned as `align` says */
export function NavigationMenuViewportPositioner(props: NavigationMenuViewportPositionerProps): Element {
  const [viewportProps, localProps] = splitProps(props, ["align"])
  const api = useNavigationMenuContext()
  return provide(NavigationMenuViewportPropsProvider, viewportProps, () =>
    render(
      "div",
      mergeProps(() => api().getViewportPositionerProps(viewportProps), localProps),
    ),
  )
}
