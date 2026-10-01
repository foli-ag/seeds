import { RadioGroupItem } from "./radio-group-item"
import { RadioGroupItemContext } from "./radio-group-item-context"
import { RadioGroupItemControl } from "./radio-group-item-control"
import { RadioGroupItemHiddenInput } from "./radio-group-item-hidden-input"
import { RadioGroupItemText } from "./radio-group-item-text"

export { RadioGroupContext as Context, type RadioGroupContextProps as ContextProps } from "./radio-group-context"
export {
  RadioGroupIndicator as Indicator,
  type RadioGroupIndicatorProps as IndicatorProps,
} from "./radio-group-indicator"
export type { RadioGroupItemProps as ItemProps } from "./radio-group-item"
export type { RadioGroupItemContextProps as ItemContextProps } from "./radio-group-item-context"
export type { RadioGroupItemControlProps as ItemControlProps } from "./radio-group-item-control"
export type { RadioGroupItemHiddenInputProps as ItemHiddenInputProps } from "./radio-group-item-hidden-input"
export type { RadioGroupItemTextProps as ItemTextProps } from "./radio-group-item-text"
export { RadioGroupLabel as Label, type RadioGroupLabelProps as LabelProps } from "./radio-group-label"
export { RadioGroupRoot as Root, type RadioGroupRootProps as RootProps } from "./radio-group-root"
export {
  RadioGroupRootProvider as RootProvider,
  type RadioGroupRootProviderProps as RootProviderProps,
} from "./radio-group-root-provider"
export type { ItemState, ValueChangeDetails } from "@zag-js/radio-group"

export const Item = /* @__PURE__ */ Object.assign(RadioGroupItem, {
  Control: RadioGroupItemControl,
  Text: RadioGroupItemText,
  HiddenInput: RadioGroupItemHiddenInput,
  Context: RadioGroupItemContext,
})
