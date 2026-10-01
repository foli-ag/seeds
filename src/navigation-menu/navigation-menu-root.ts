import * as navigationMenu from "@zag-js/navigation-menu"
import type { Element } from "solid-js"
import type { PartProps } from "../utils/factory.js"
import { renderStrategyKeys, type RenderStrategyProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { provideNavigationMenu } from "./navigation-menu-root-provider.js"
import { useNavigationMenu, type UseNavigationMenuProps } from "./use-navigation-menu.js"

export interface NavigationMenuRootProps extends PartProps<"nav", UseNavigationMenuProps & RenderStrategyProps> {}

export function NavigationMenuRoot(props: NavigationMenuRootProps): Element {
  const [strategy, rest] = splitProps(props, renderStrategyKeys)
  const [navigationMenuProps, localProps] = splitProps(rest, navigationMenu.props)
  const api = useNavigationMenu(navigationMenuProps)
  return provideNavigationMenu(api, strategy, localProps)
}
