import { NavigationMenuItem } from "./navigation-menu-item.js"
import { NavigationMenuItemIndicator } from "./navigation-menu-item-indicator.js"
import { NavigationMenuItemTrigger } from "./navigation-menu-item-trigger.js"
import { NavigationMenuViewport } from "./navigation-menu-viewport.js"
import { NavigationMenuViewportPositioner } from "./navigation-menu-viewport-positioner.js"

export { NavigationMenuArrow as Arrow, type NavigationMenuArrowProps as ArrowProps } from "./navigation-menu-arrow.js"
export {
  NavigationMenuContent as Content,
  type NavigationMenuContentProps as ContentProps,
} from "./navigation-menu-content.js"
export {
  NavigationMenuContext as Context,
  type NavigationMenuContextProps as ContextProps,
} from "./navigation-menu-context.js"
export {
  NavigationMenuIndicator as Indicator,
  type NavigationMenuIndicatorProps as IndicatorProps,
} from "./navigation-menu-indicator.js"
export type { NavigationMenuItemProps as ItemProps } from "./navigation-menu-item.js"
export type { NavigationMenuItemIndicatorProps as ItemIndicatorProps } from "./navigation-menu-item-indicator.js"
export type { NavigationMenuItemTriggerProps as ItemTriggerProps } from "./navigation-menu-item-trigger.js"
export { NavigationMenuLink as Link, type NavigationMenuLinkProps as LinkProps } from "./navigation-menu-link.js"
export { NavigationMenuList as List, type NavigationMenuListProps as ListProps } from "./navigation-menu-list.js"
export { NavigationMenuRoot as Root, type NavigationMenuRootProps as RootProps } from "./navigation-menu-root.js"
export {
  NavigationMenuRootProvider as RootProvider,
  type NavigationMenuRootProviderProps as RootProviderProps,
} from "./navigation-menu-root-provider.js"
export type { NavigationMenuViewportProps as ViewportProps } from "./navigation-menu-viewport.js"
export type { NavigationMenuViewportPositionerProps as ViewportPositionerProps } from "./navigation-menu-viewport-positioner.js"
export type { ValueChangeDetails } from "@zag-js/navigation-menu"

export const Item = /* @__PURE__ */ Object.assign(NavigationMenuItem, {
  Trigger: NavigationMenuItemTrigger,
  Indicator: NavigationMenuItemIndicator,
})

export const Viewport = /* @__PURE__ */ Object.assign(NavigationMenuViewport, {
  Positioner: NavigationMenuViewportPositioner,
})
