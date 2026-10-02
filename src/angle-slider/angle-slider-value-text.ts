import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useAngleSliderContext } from "./use-angle-slider-context.js"

export type AngleSliderValueTextProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Shows `children`, or the value in degrees, such as "90deg" */
export function AngleSliderValueText<As extends ValidComponent = "div">(props: AngleSliderValueTextProps<As>): Element {
  const api = useAngleSliderContext()
  return render(
    "div",
    mergeProps(() => api().getValueTextProps(), props, {
      get children() {
        return props.children || api().valueAsDegree
      },
    }),
  )
}
