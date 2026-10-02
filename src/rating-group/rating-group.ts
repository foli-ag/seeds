import { RatingGroupItem } from "./rating-group-item.js"
import { RatingGroupItemContext } from "./rating-group-item-context.js"

export { RatingGroupContext as Context, type RatingGroupContextProps as ContextProps } from "./rating-group-context.js"
export { RatingGroupControl as Control, type RatingGroupControlProps as ControlProps } from "./rating-group-control.js"
export {
  RatingGroupHiddenInput as HiddenInput,
  type RatingGroupHiddenInputProps as HiddenInputProps,
} from "./rating-group-hidden-input.js"
export type { RatingGroupItemProps as ItemProps } from "./rating-group-item.js"
export type { RatingGroupItemContextProps as ItemContextProps } from "./rating-group-item-context.js"
export { RatingGroupLabel as Label, type RatingGroupLabelProps as LabelProps } from "./rating-group-label.js"
export { RatingGroupRoot as Root, type RatingGroupRootProps as RootProps } from "./rating-group-root.js"
export {
  RatingGroupRootProvider as RootProvider,
  type RatingGroupRootProviderProps as RootProviderProps,
} from "./rating-group-root-provider.js"
export type { HoverChangeDetails, ItemState, ValueChangeDetails } from "@zag-js/rating-group"

export const Item = /* @__PURE__ */ Object.assign(RatingGroupItem, { Context: RatingGroupItemContext })
