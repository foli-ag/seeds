import * as angleSlider from "@zag-js/angle-slider"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useAngleSlider, type UseAngleSliderProps } from "./use-angle-slider.js"
import { AngleSliderProvider } from "./use-angle-slider-context.js"

export type AngleSliderRootProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UseAngleSliderProps>

/** Sets the `--angle` CSS variable its thumb rotates by, mirrored when `dir` is "rtl" */
export function AngleSliderRoot<As extends ValidComponent = "div">(props: AngleSliderRootProps<As>): Element {
  const [angleSliderProps, localProps] = splitProps(props, angleSlider.props)
  const api = useAngleSlider(angleSliderProps)
  return provide(AngleSliderProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
