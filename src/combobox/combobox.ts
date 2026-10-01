import { ComboboxGroup } from "./combobox-group.js"
import { ComboboxGroupLabel } from "./combobox-group-label.js"
import { ComboboxItem } from "./combobox-item.js"
import { ComboboxItemContext } from "./combobox-item-context.js"
import { ComboboxItemIndicator } from "./combobox-item-indicator.js"
import { ComboboxItemText } from "./combobox-item-text.js"
import { ComboboxTrigger } from "./combobox-trigger.js"
import { ComboboxTriggerClear } from "./combobox-trigger-clear.js"

export { ComboboxContent as Content, type ComboboxContentProps as ContentProps } from "./combobox-content.js"
export { ComboboxContext as Context, type ComboboxContextProps as ContextProps } from "./combobox-context.js"
export { ComboboxControl as Control, type ComboboxControlProps as ControlProps } from "./combobox-control.js"
export { ComboboxEmpty as Empty, type ComboboxEmptyProps as EmptyProps } from "./combobox-empty.js"
export type { ComboboxGroupProps as GroupProps } from "./combobox-group.js"
export type { ComboboxGroupLabelProps as GroupLabelProps } from "./combobox-group-label.js"
export { ComboboxInput as Input, type ComboboxInputProps as InputProps } from "./combobox-input.js"
export type { ComboboxItemProps as ItemProps } from "./combobox-item.js"
export type { ComboboxItemContextProps as ItemContextProps } from "./combobox-item-context.js"
export type { ComboboxItemIndicatorProps as ItemIndicatorProps } from "./combobox-item-indicator.js"
export type { ComboboxItemTextProps as ItemTextProps } from "./combobox-item-text.js"
export { ComboboxLabel as Label, type ComboboxLabelProps as LabelProps } from "./combobox-label.js"
export { ComboboxList as List, type ComboboxListProps as ListProps } from "./combobox-list.js"
export {
  ComboboxPositioner as Positioner,
  type ComboboxPositionerProps as PositionerProps,
} from "./combobox-positioner.js"
export { ComboboxRoot as Root, type ComboboxRootProps as RootProps } from "./combobox-root.js"
export {
  ComboboxRootProvider as RootProvider,
  type ComboboxRootProviderProps as RootProviderProps,
} from "./combobox-root-provider.js"
export type { ComboboxTriggerProps as TriggerProps } from "./combobox-trigger.js"
export type { ComboboxTriggerClearProps as TriggerClearProps } from "./combobox-trigger-clear.js"
export type {
  HighlightChangeDetails,
  InputValueChangeDetails,
  ItemState,
  NavigateDetails,
  OpenChangeDetails,
  ScrollToIndexDetails,
  SelectionDetails,
  ValueChangeDetails,
} from "@zag-js/combobox"

export const Trigger = /* @__PURE__ */ Object.assign(ComboboxTrigger, {
  Open: ComboboxTrigger,
  Clear: ComboboxTriggerClear,
})

export const Item = /* @__PURE__ */ Object.assign(ComboboxItem, {
  Text: ComboboxItemText,
  Indicator: ComboboxItemIndicator,
  Context: ComboboxItemContext,
})

export const Group = /* @__PURE__ */ Object.assign(ComboboxGroup, { Label: ComboboxGroupLabel })
