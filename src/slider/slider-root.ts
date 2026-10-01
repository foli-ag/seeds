import * as slider from "@zag-js/slider"
import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSlider, type UseSliderProps } from "./use-slider.js"
import { SliderProvider } from "./use-slider-context.js"

export type SliderRootProps<As extends ValidComponent = "div"> = PartProps<As, UseSliderProps>

export function SliderRoot<As extends ValidComponent = "div">(props: SliderRootProps<As>): Element {
  const [sliderProps, localProps] = splitProps(props, slider.props)
  const api = useSlider(sliderProps)
  return provide(SliderProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
