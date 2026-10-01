import { MenuArrow } from "./menu-arrow.js"
import { MenuArrowTip } from "./menu-arrow-tip.js"
import { MenuGroup } from "./menu-group.js"
import { MenuGroupLabel } from "./menu-group-label.js"
import { MenuGroupRadio } from "./menu-group-radio.js"
import { MenuItem } from "./menu-item.js"
import { MenuItemCheckbox } from "./menu-item-checkbox.js"
import { MenuItemContext } from "./menu-item-context.js"
import { MenuItemIndicator } from "./menu-item-indicator.js"
import { MenuItemRadio } from "./menu-item-radio.js"
import { MenuItemSubmenu } from "./menu-item-submenu.js"
import { MenuItemText } from "./menu-item-text.js"
import { MenuTrigger } from "./menu-trigger.js"
import { MenuTriggerContext } from "./menu-trigger-context.js"

export type { MenuArrowProps as ArrowProps } from "./menu-arrow.js"
export type { MenuArrowTipProps as ArrowTipProps } from "./menu-arrow-tip.js"
export { MenuContent as Content, type MenuContentProps as ContentProps } from "./menu-content.js"
export { MenuContext as Context, type MenuContextProps as ContextProps } from "./menu-context.js"
export type { MenuGroupProps as GroupProps } from "./menu-group.js"
export type { MenuGroupLabelProps as GroupLabelProps } from "./menu-group-label.js"
export type { MenuGroupRadioProps as GroupRadioProps } from "./menu-group-radio.js"
export { MenuIndicator as Indicator, type MenuIndicatorProps as IndicatorProps } from "./menu-indicator.js"
export type { MenuItemProps as ItemProps } from "./menu-item.js"
export type { MenuItemCheckboxProps as ItemCheckboxProps } from "./menu-item-checkbox.js"
export type { MenuItemContextProps as ItemContextProps } from "./menu-item-context.js"
export type { MenuItemIndicatorProps as ItemIndicatorProps } from "./menu-item-indicator.js"
export type { MenuItemRadioProps as ItemRadioProps } from "./menu-item-radio.js"
export type { MenuItemSubmenuProps as ItemSubmenuProps } from "./menu-item-submenu.js"
export type { MenuItemTextProps as ItemTextProps } from "./menu-item-text.js"
export { MenuPositioner as Positioner, type MenuPositionerProps as PositionerProps } from "./menu-positioner.js"
export { MenuRoot as Root, type MenuRootProps as RootProps } from "./menu-root.js"
export {
  MenuRootProvider as RootProvider,
  type MenuRootProviderProps as RootProviderProps,
} from "./menu-root-provider.js"
export { MenuSeparator as Separator, type MenuSeparatorProps as SeparatorProps } from "./menu-separator.js"
export type { MenuTriggerProps as TriggerProps } from "./menu-trigger.js"
export type { MenuTriggerContextProps as TriggerContextProps } from "./menu-trigger-context.js"
export type { ValueChangeDetails } from "./use-menu-group-context.js"
export type {
  HighlightChangeDetails,
  ItemState,
  NavigateDetails,
  OpenChangeDetails,
  OptionItemState,
  PositioningOptions,
  SelectionDetails,
  TriggerValueChangeDetails,
} from "@zag-js/menu"

export const Trigger = /* @__PURE__ */ Object.assign(MenuTrigger, { Open: MenuTrigger, Context: MenuTriggerContext })

export const Arrow = /* @__PURE__ */ Object.assign(MenuArrow, { Tip: MenuArrowTip })

export const Item = /* @__PURE__ */ Object.assign(MenuItem, {
  Text: MenuItemText,
  Indicator: MenuItemIndicator,
  Context: MenuItemContext,
  Checkbox: MenuItemCheckbox,
  Radio: MenuItemRadio,
  Submenu: MenuItemSubmenu,
})

export const Group = /* @__PURE__ */ Object.assign(MenuGroup, { Label: MenuGroupLabel, Radio: MenuGroupRadio })
