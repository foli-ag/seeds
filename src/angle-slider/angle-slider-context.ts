import { untrack, type Element } from "solid-js"
import type { UseAngleSliderReturn } from "./use-angle-slider.js"
import { useAngleSliderContext } from "./use-angle-slider-context.js"

export interface AngleSliderContextProps {
  children: (api: UseAngleSliderReturn) => Element
}

/** Renders `children` with the angle slider's API */
export function AngleSliderContext(props: AngleSliderContextProps): Element {
  return untrack(() => props.children(useAngleSliderContext()))
}
