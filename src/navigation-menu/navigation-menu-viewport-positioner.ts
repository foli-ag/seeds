import type * as navigationMenu from "@zag-js/navigation-menu"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { NavigationMenuViewportPropsProvider, useNavigationMenuContext } from "./use-navigation-menu-context.js"

export type NavigationMenuViewportPositionerProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  navigationMenu.ViewportProps
>

/** Places the viewport under the open item, aligned as `align` says */
export function NavigationMenuViewportPositioner<As extends ValidComponent = "div">(
  props: NavigationMenuViewportPositionerProps<As>,
): Element {
  const [viewportProps, localProps] = splitProps(props, ["align"])
  const api = useNavigationMenuContext()
  return provide(NavigationMenuViewportPropsProvider, viewportProps, () =>
    render(
      "div",
      mergeProps(() => api().getViewportPositionerProps(viewportProps), localProps),
    ),
  )
}
