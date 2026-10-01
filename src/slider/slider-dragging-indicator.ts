import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"
import { useSliderThumbPropsContext } from "./use-slider-thumb-context.js"

export interface SliderDraggingIndicatorProps extends PartProps<"span"> {}

/** Shown while the thumb around it is dragged, with `children` or the thumb's value */
export function SliderDraggingIndicator(props: SliderDraggingIndicatorProps): Element {
  const api = useSliderContext()
  const thumbProps = useSliderThumbPropsContext()
  return render(
    "span",
    mergeProps(() => api().getDraggingIndicatorProps(thumbProps), props, {
      get children() {
        return props.children || api().getThumbValue(thumbProps.index)
      },
    }),
  )
}
