import { SelectGroup } from "./select-group.js"
import { SelectGroupLabel } from "./select-group-label.js"
import { SelectItem } from "./select-item.js"
import { SelectItemContext } from "./select-item-context.js"
import { SelectItemIndicator } from "./select-item-indicator.js"
import { SelectItemText } from "./select-item-text.js"
import { SelectTrigger } from "./select-trigger.js"
import { SelectTriggerClear } from "./select-trigger-clear.js"

export { SelectContent as Content, type SelectContentProps as ContentProps } from "./select-content.js"
export { SelectContext as Context, type SelectContextProps as ContextProps } from "./select-context.js"
export { SelectControl as Control, type SelectControlProps as ControlProps } from "./select-control.js"
export type { SelectGroupProps as GroupProps } from "./select-group.js"
export type { SelectGroupLabelProps as GroupLabelProps } from "./select-group-label.js"
export {
  SelectHiddenSelect as HiddenSelect,
  type SelectHiddenSelectProps as HiddenSelectProps,
} from "./select-hidden-select.js"
export { SelectIndicator as Indicator, type SelectIndicatorProps as IndicatorProps } from "./select-indicator.js"
export type { SelectItemProps as ItemProps } from "./select-item.js"
export type { SelectItemContextProps as ItemContextProps } from "./select-item-context.js"
export type { SelectItemIndicatorProps as ItemIndicatorProps } from "./select-item-indicator.js"
export type { SelectItemTextProps as ItemTextProps } from "./select-item-text.js"
export { SelectLabel as Label, type SelectLabelProps as LabelProps } from "./select-label.js"
export { SelectList as List, type SelectListProps as ListProps } from "./select-list.js"
export { SelectPositioner as Positioner, type SelectPositionerProps as PositionerProps } from "./select-positioner.js"
export { SelectRoot as Root, type SelectRootProps as RootProps } from "./select-root.js"
export {
  SelectRootProvider as RootProvider,
  type SelectRootProviderProps as RootProviderProps,
} from "./select-root-provider.js"
export type { SelectTriggerProps as TriggerProps } from "./select-trigger.js"
export type { SelectTriggerClearProps as TriggerClearProps } from "./select-trigger-clear.js"
export { SelectValueText as ValueText, type SelectValueTextProps as ValueTextProps } from "./select-value-text.js"
export type {
  HighlightChangeDetails,
  ItemState,
  OpenChangeDetails,
  ScrollToIndexDetails,
  SelectionDetails,
  ValueChangeDetails,
} from "@zag-js/select"

export const Trigger = /* @__PURE__ */ Object.assign(SelectTrigger, { Open: SelectTrigger, Clear: SelectTriggerClear })

export const Item = /* @__PURE__ */ Object.assign(SelectItem, {
  Text: SelectItemText,
  Indicator: SelectItemIndicator,
  Context: SelectItemContext,
})

export const Group = /* @__PURE__ */ Object.assign(SelectGroup, { Label: SelectGroupLabel })
