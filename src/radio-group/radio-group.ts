import { RadioGroupItem } from "./radio-group-item.js"
import { RadioGroupItemContext } from "./radio-group-item-context.js"
import { RadioGroupItemControl } from "./radio-group-item-control.js"
import { RadioGroupItemHiddenInput } from "./radio-group-item-hidden-input.js"
import { RadioGroupItemText } from "./radio-group-item-text.js"

export { RadioGroupContext as Context, type RadioGroupContextProps as ContextProps } from "./radio-group-context.js"
export {
  RadioGroupIndicator as Indicator,
  type RadioGroupIndicatorProps as IndicatorProps,
} from "./radio-group-indicator.js"
export type { RadioGroupItemProps as ItemProps } from "./radio-group-item.js"
export type { RadioGroupItemContextProps as ItemContextProps } from "./radio-group-item-context.js"
export type { RadioGroupItemControlProps as ItemControlProps } from "./radio-group-item-control.js"
export type { RadioGroupItemHiddenInputProps as ItemHiddenInputProps } from "./radio-group-item-hidden-input.js"
export type { RadioGroupItemTextProps as ItemTextProps } from "./radio-group-item-text.js"
export { RadioGroupLabel as Label, type RadioGroupLabelProps as LabelProps } from "./radio-group-label.js"
export { RadioGroupRoot as Root, type RadioGroupRootProps as RootProps } from "./radio-group-root.js"
export {
  RadioGroupRootProvider as RootProvider,
  type RadioGroupRootProviderProps as RootProviderProps,
} from "./radio-group-root-provider.js"
export type { ItemState, ValueChangeDetails } from "@zag-js/radio-group"

export const Item = /* @__PURE__ */ Object.assign(RadioGroupItem, {
  Control: RadioGroupItemControl,
  Text: RadioGroupItemText,
  HiddenInput: RadioGroupItemHiddenInput,
  Context: RadioGroupItemContext,
})
