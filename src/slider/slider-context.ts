import { untrack, type Element } from "solid-js"
import type { UseSliderReturn } from "./use-slider.js"
import { useSliderContext } from "./use-slider-context.js"

export interface SliderContextProps {
  children: (api: UseSliderReturn) => Element
}

/** Renders `children` with the slider's API */
export function SliderContext(props: SliderContextProps): Element {
  return untrack(() => props.children(useSliderContext()))
}
