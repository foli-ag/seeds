import type * as slider from "@zag-js/slider"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSliderContext } from "./use-slider-context.js"
import { SliderThumbPropsProvider } from "./use-slider-thumb-context.js"

export type SliderThumbProps<As extends ValidComponent = "div"> = PolymorphicProps<As, slider.ThumbProps>

/** The handle for the value at `index` */
export function SliderThumb<As extends ValidComponent = "div">(props: SliderThumbProps<As>): Element {
  const [thumbProps, localProps] = splitProps(props, ["index", "name"])
  const api = useSliderContext()
  return provide(SliderThumbPropsProvider, thumbProps, () =>
    render(
      "div",
      mergeProps(() => api().getThumbProps(thumbProps), localProps),
    ),
  )
}
