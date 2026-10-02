import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSplitterContext } from "./use-splitter-context.js"
import { useSplitterResizeTriggerPropsContext } from "./use-splitter-resize-trigger-context.js"

export type SplitterResizeTriggerIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** A grip drawn inside the resize trigger, with the trigger's focus, dragging and disabled state */
export function SplitterResizeTriggerIndicator<As extends ValidComponent = "div">(
  props: SplitterResizeTriggerIndicatorProps<As>,
): Element {
  const api = useSplitterContext()
  const resizeTriggerProps = useSplitterResizeTriggerPropsContext()
  return render(
    "div",
    mergeProps(() => api().getResizeTriggerIndicator(resizeTriggerProps), props),
  )
}
