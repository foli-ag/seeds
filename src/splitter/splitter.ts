import { SplitterResizeTrigger } from "./splitter-resize-trigger.js"
import { SplitterResizeTriggerIndicator } from "./splitter-resize-trigger-indicator.js"

export { SplitterContext as Context, type SplitterContextProps as ContextProps } from "./splitter-context.js"
export { SplitterPanel as Panel, type SplitterPanelProps as PanelProps } from "./splitter-panel.js"
export type { SplitterResizeTriggerProps as ResizeTriggerProps } from "./splitter-resize-trigger.js"
export type { SplitterResizeTriggerIndicatorProps as ResizeTriggerIndicatorProps } from "./splitter-resize-trigger-indicator.js"
export { SplitterRoot as Root, type SplitterRootProps as RootProps } from "./splitter-root.js"
export {
  SplitterRootProvider as RootProvider,
  type SplitterRootProviderProps as RootProviderProps,
} from "./splitter-root-provider.js"
export type {
  ExpandCollapseDetails,
  PanelData,
  PanelSize,
  ResizeDetails,
  ResizeEndDetails,
  ResizeTriggerId,
} from "@zag-js/splitter"

export const ResizeTrigger = /* @__PURE__ */ Object.assign(SplitterResizeTrigger, {
  Indicator: SplitterResizeTriggerIndicator,
})
