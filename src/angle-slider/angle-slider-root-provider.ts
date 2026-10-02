import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseAngleSliderReturn } from "./use-angle-slider.js"
import { AngleSliderProvider } from "./use-angle-slider-context.js"

export type AngleSliderRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  { value: UseAngleSliderReturn }
>

/** A root for an angle slider created with `useAngleSlider` */
export function AngleSliderRootProvider<As extends ValidComponent = "div">(
  props: AngleSliderRootProviderProps<As>,
): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(AngleSliderProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
