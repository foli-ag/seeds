import type * as splitter from "@zag-js/splitter"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSplitterContext } from "./use-splitter-context.js"
import { SplitterResizeTriggerPropsProvider } from "./use-splitter-resize-trigger-context.js"

export type SplitterResizeTriggerProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  splitter.ResizeTriggerProps
>

/**
 * The separator between the two panels its `id` names (`"a:b"`), dragged with the pointer or moved with the arrow
 * keys. Enter collapses or expands the panel before it when that panel is collapsible.
 */
export function SplitterResizeTrigger<As extends ValidComponent = "div">(
  props: SplitterResizeTriggerProps<As>,
): Element {
  const [resizeTriggerProps, localProps] = splitProps(props, ["id", "disabled"])
  const api = useSplitterContext()
  return provide(SplitterResizeTriggerPropsProvider, resizeTriggerProps, () =>
    render(
      // Not Ark's button. zag leaves out tabIndex to take a disabled trigger out of the tab order, which a button
      // ignores, and handles no Space key, on which a button submits the form around it.
      "div",
      mergeProps(() => api().getResizeTriggerProps(resizeTriggerProps), localProps),
    ),
  )
}
