import { PopoverArrow } from "./popover-arrow.js"
import { PopoverArrowTip } from "./popover-arrow-tip.js"
import { PopoverTrigger } from "./popover-trigger.js"
import { PopoverTriggerClose } from "./popover-trigger-close.js"

export { PopoverAnchor as Anchor, type PopoverAnchorProps as AnchorProps } from "./popover-anchor.js"
export type { PopoverArrowProps as ArrowProps } from "./popover-arrow.js"
export type { PopoverArrowTipProps as ArrowTipProps } from "./popover-arrow-tip.js"
export { PopoverContent as Content, type PopoverContentProps as ContentProps } from "./popover-content.js"
export { PopoverContext as Context, type PopoverContextProps as ContextProps } from "./popover-context.js"
export {
  PopoverDescription as Description,
  type PopoverDescriptionProps as DescriptionProps,
} from "./popover-description.js"
export { PopoverIndicator as Indicator, type PopoverIndicatorProps as IndicatorProps } from "./popover-indicator.js"
export {
  PopoverPositioner as Positioner,
  type PopoverPositionerProps as PositionerProps,
} from "./popover-positioner.js"
export { PopoverRoot as Root, type PopoverRootProps as RootProps } from "./popover-root.js"
export {
  PopoverRootProvider as RootProvider,
  type PopoverRootProviderProps as RootProviderProps,
} from "./popover-root-provider.js"
export { PopoverTitle as Title, type PopoverTitleProps as TitleProps } from "./popover-title.js"
export type { PopoverTriggerProps as TriggerProps } from "./popover-trigger.js"
export type { PopoverTriggerCloseProps as TriggerCloseProps } from "./popover-trigger-close.js"
export type { OpenChangeDetails, PositioningOptions, TriggerValueChangeDetails } from "@zag-js/popover"

export const Trigger = /* @__PURE__ */ Object.assign(PopoverTrigger, {
  Open: PopoverTrigger,
  Close: PopoverTriggerClose,
})

export const Arrow = /* @__PURE__ */ Object.assign(PopoverArrow, { Tip: PopoverArrowTip })
