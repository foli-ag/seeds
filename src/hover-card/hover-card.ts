import { HoverCardArrow } from "./hover-card-arrow.js"
import { HoverCardArrowTip } from "./hover-card-arrow-tip.js"

export type { HoverCardArrowProps as ArrowProps } from "./hover-card-arrow.js"
export type { HoverCardArrowTipProps as ArrowTipProps } from "./hover-card-arrow-tip.js"
export { HoverCardContent as Content, type HoverCardContentProps as ContentProps } from "./hover-card-content.js"
export { HoverCardContext as Context, type HoverCardContextProps as ContextProps } from "./hover-card-context.js"
export {
  HoverCardPositioner as Positioner,
  type HoverCardPositionerProps as PositionerProps,
} from "./hover-card-positioner.js"
export { HoverCardRoot as Root, type HoverCardRootProps as RootProps } from "./hover-card-root.js"
export {
  HoverCardRootProvider as RootProvider,
  type HoverCardRootProviderProps as RootProviderProps,
} from "./hover-card-root-provider.js"
export { HoverCardTrigger as Trigger, type HoverCardTriggerProps as TriggerProps } from "./hover-card-trigger.js"
export type { OpenChangeDetails, PositioningOptions, TriggerValueChangeDetails } from "@zag-js/hover-card"

export const Arrow = /* @__PURE__ */ Object.assign(HoverCardArrow, { Tip: HoverCardArrowTip })
