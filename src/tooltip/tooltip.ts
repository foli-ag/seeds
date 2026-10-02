import { TooltipArrow } from "./tooltip-arrow.js"
import { TooltipArrowTip } from "./tooltip-arrow-tip.js"

export type { TooltipArrowProps as ArrowProps } from "./tooltip-arrow.js"
export type { TooltipArrowTipProps as ArrowTipProps } from "./tooltip-arrow-tip.js"
export { TooltipContent as Content, type TooltipContentProps as ContentProps } from "./tooltip-content.js"
export { TooltipContext as Context, type TooltipContextProps as ContextProps } from "./tooltip-context.js"
export {
  TooltipPositioner as Positioner,
  type TooltipPositionerProps as PositionerProps,
} from "./tooltip-positioner.js"
export { TooltipRoot as Root, type TooltipRootProps as RootProps } from "./tooltip-root.js"
export {
  TooltipRootProvider as RootProvider,
  type TooltipRootProviderProps as RootProviderProps,
} from "./tooltip-root-provider.js"
export { TooltipTrigger as Trigger, type TooltipTriggerProps as TriggerProps } from "./tooltip-trigger.js"
export type { OpenChangeDetails, PositioningOptions, TriggerValueChangeDetails } from "@zag-js/tooltip"

export const Arrow = /* @__PURE__ */ Object.assign(TooltipArrow, { Tip: TooltipArrowTip })
