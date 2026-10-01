import type * as slider from "@zag-js/slider"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSliderContext } from "./use-slider-context.js"
import { SliderThumbPropsProvider } from "./use-slider-thumb-context.js"

export interface SliderThumbProps extends PartProps<"div", slider.ThumbProps> {}

/** The handle for the value at `index` */
export function SliderThumb(props: SliderThumbProps): Element {
  const [thumbProps, localProps] = splitProps(props, ["index", "name"])
  const api = useSliderContext()
  return provide(SliderThumbPropsProvider, thumbProps, () =>
    render(
      "div",
      mergeProps(() => api().getThumbProps(thumbProps), localProps),
    ),
  )
}
