import { ProgressCircle } from "./progress-circle.js"
import { ProgressCircleRange } from "./progress-circle-range.js"
import { ProgressCircleTrack } from "./progress-circle-track.js"

export type { ProgressCircleProps as CircleProps } from "./progress-circle.js"
export type { ProgressCircleRangeProps as CircleRangeProps } from "./progress-circle-range.js"
export type { ProgressCircleTrackProps as CircleTrackProps } from "./progress-circle-track.js"
export { ProgressContext as Context, type ProgressContextProps as ContextProps } from "./progress-context.js"
export { ProgressLabel as Label, type ProgressLabelProps as LabelProps } from "./progress-label.js"
export { ProgressRange as Range, type ProgressRangeProps as RangeProps } from "./progress-range.js"
export { ProgressRoot as Root, type ProgressRootProps as RootProps } from "./progress-root.js"
export {
  ProgressRootProvider as RootProvider,
  type ProgressRootProviderProps as RootProviderProps,
} from "./progress-root-provider.js"
export { ProgressTrack as Track, type ProgressTrackProps as TrackProps } from "./progress-track.js"
export {
  ProgressValueText as ValueText,
  type ProgressValueTextProps as ValueTextProps,
} from "./progress-value-text.js"
export { ProgressView as View, type ProgressViewProps as ViewProps } from "./progress-view.js"
export type { ProgressState, ValueChangeDetails, ValueTranslationDetails } from "@zag-js/progress"

export const Circle = /* @__PURE__ */ Object.assign(ProgressCircle, {
  Track: ProgressCircleTrack,
  Range: ProgressCircleRange,
})
