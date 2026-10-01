import { SliderThumb } from "./slider-thumb.js"
import { SliderThumbDraggingIndicator } from "./slider-thumb-dragging-indicator.js"
import { SliderThumbHiddenInput } from "./slider-thumb-hidden-input.js"

export { SliderContext as Context, type SliderContextProps as ContextProps } from "./slider-context.js"
export { SliderControl as Control, type SliderControlProps as ControlProps } from "./slider-control.js"
export { SliderLabel as Label, type SliderLabelProps as LabelProps } from "./slider-label.js"
export { SliderMarker as Marker, type SliderMarkerProps as MarkerProps } from "./slider-marker.js"
export {
  SliderMarkerGroup as MarkerGroup,
  type SliderMarkerGroupProps as MarkerGroupProps,
} from "./slider-marker-group.js"
export { SliderRange as Range, type SliderRangeProps as RangeProps } from "./slider-range.js"
export { SliderRoot as Root, type SliderRootProps as RootProps } from "./slider-root.js"
export {
  SliderRootProvider as RootProvider,
  type SliderRootProviderProps as RootProviderProps,
} from "./slider-root-provider.js"
export type { SliderThumbProps as ThumbProps } from "./slider-thumb.js"
export type { SliderThumbDraggingIndicatorProps as ThumbDraggingIndicatorProps } from "./slider-thumb-dragging-indicator.js"
export type { SliderThumbHiddenInputProps as ThumbHiddenInputProps } from "./slider-thumb-hidden-input.js"
export { SliderTrack as Track, type SliderTrackProps as TrackProps } from "./slider-track.js"
export { SliderValueText as ValueText, type SliderValueTextProps as ValueTextProps } from "./slider-value-text.js"
export type { FocusChangeDetails, ValueChangeDetails } from "@zag-js/slider"

export const Thumb = /* @__PURE__ */ Object.assign(SliderThumb, {
  HiddenInput: SliderThumbHiddenInput,
  DraggingIndicator: SliderThumbDraggingIndicator,
})
