import { DrawerGrabber } from "./drawer-grabber.js"
import { DrawerGrabberIndicator } from "./drawer-grabber-indicator.js"
import { DrawerIndent } from "./drawer-indent.js"
import { DrawerIndentBackground } from "./drawer-indent-background.js"
import { DrawerTrigger } from "./drawer-trigger.js"
import { DrawerTriggerClose } from "./drawer-trigger-close.js"

export { DrawerBackdrop as Backdrop, type DrawerBackdropProps as BackdropProps } from "./drawer-backdrop.js"
export { DrawerContent as Content, type DrawerContentProps as ContentProps } from "./drawer-content.js"
export { DrawerContext as Context, type DrawerContextProps as ContextProps } from "./drawer-context.js"
export {
  DrawerDescription as Description,
  type DrawerDescriptionProps as DescriptionProps,
} from "./drawer-description.js"
export type { DrawerGrabberProps as GrabberProps } from "./drawer-grabber.js"
export type { DrawerGrabberIndicatorProps as GrabberIndicatorProps } from "./drawer-grabber-indicator.js"
export type { DrawerIndentProps as IndentProps } from "./drawer-indent.js"
export type { DrawerIndentBackgroundProps as IndentBackgroundProps } from "./drawer-indent-background.js"
export { DrawerPositioner as Positioner, type DrawerPositionerProps as PositionerProps } from "./drawer-positioner.js"
export { DrawerRoot as Root, type DrawerRootProps as RootProps } from "./drawer-root.js"
export {
  DrawerRootProvider as RootProvider,
  type DrawerRootProviderProps as RootProviderProps,
} from "./drawer-root-provider.js"
export { DrawerStack as Stack, type DrawerStackProps as StackProps } from "./drawer-stack.js"
export { DrawerSwipeArea as SwipeArea, type DrawerSwipeAreaProps as SwipeAreaProps } from "./drawer-swipe-area.js"
export { DrawerTitle as Title, type DrawerTitleProps as TitleProps } from "./drawer-title.js"
export type { DrawerTriggerProps as TriggerProps } from "./drawer-trigger.js"
export type { DrawerTriggerCloseProps as TriggerCloseProps } from "./drawer-trigger-close.js"
export type {
  OpenChangeDetails,
  SnapPoint,
  SnapPointChangeDetails,
  SwipeDirection,
  TriggerValueChangeDetails,
} from "@zag-js/drawer"

export const Trigger = /* @__PURE__ */ Object.assign(DrawerTrigger, { Open: DrawerTrigger, Close: DrawerTriggerClose })

export const Grabber = /* @__PURE__ */ Object.assign(DrawerGrabber, { Indicator: DrawerGrabberIndicator })

export const Indent = /* @__PURE__ */ Object.assign(DrawerIndent, { Background: DrawerIndentBackground })
