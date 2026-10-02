import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useAngleSliderContext } from "./use-angle-slider-context.js"

export type AngleSliderThumbProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The handle, rotated by `--angle`. The arrow keys turn it by `step`. */
export function AngleSliderThumb<As extends ValidComponent = "div">(props: AngleSliderThumbProps<As>): Element {
  const api = useAngleSliderContext()
  return render(
    "div",
    mergeProps(() => api().getThumbProps(), props),
  )
}
