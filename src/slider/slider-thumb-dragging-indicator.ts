import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"
import { useSliderThumbPropsContext } from "./use-slider-thumb-context.js"

export interface SliderThumbDraggingIndicatorProps extends PartProps<"span"> {}

/** Shown while its thumb is dragged, with `children` or the thumb's value */
export function SliderThumbDraggingIndicator(props: SliderThumbDraggingIndicatorProps): Element {
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
