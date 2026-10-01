import * as navigationMenu from "@zag-js/navigation-menu"
import type { Element } from "solid-js"
import type { PolymorphicProps, ValidComponent } from "../utils/factory.js"
import { renderStrategyKeys, type RenderStrategyProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { provideNavigationMenu } from "./navigation-menu-root-provider.js"
import { useNavigationMenu, type UseNavigationMenuProps } from "./use-navigation-menu.js"

export type NavigationMenuRootProps<As extends ValidComponent = "nav"> = PolymorphicProps<
  As,
  UseNavigationMenuProps & RenderStrategyProps
>

export function NavigationMenuRoot<As extends ValidComponent = "nav">(props: NavigationMenuRootProps<As>): Element {
  const [strategy, rest] = splitProps(props, renderStrategyKeys)
  const [navigationMenuProps, localProps] = splitProps(rest, navigationMenu.props)
  const api = useNavigationMenu(navigationMenuProps)
  return provideNavigationMenu(api, strategy, localProps)
}
