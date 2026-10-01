import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseSliderReturn } from "./use-slider.js"
import { SliderProvider } from "./use-slider-context.js"

export type SliderRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  { value: UseSliderReturn }
>

/** A root for a slider created with `useSlider` */
export function SliderRootProvider<As extends ValidComponent = "div">(props: SliderRootProviderProps<As>): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(SliderProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
