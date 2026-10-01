import * as slider from "@zag-js/slider"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSlider, type UseSliderProps } from "./use-slider.js"
import { SliderProvider } from "./use-slider-context.js"

export interface SliderRootProps extends PartProps<"div", UseSliderProps> {}

export function SliderRoot(props: SliderRootProps): Element {
  const [sliderProps, localProps] = splitProps(props, slider.props)
  const api = useSlider(sliderProps)
  return provide(SliderProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
