import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useCollapsibleContext } from "./use-collapsible-context"

export interface CollapsibleTriggerProps extends PartProps<"button"> {}

export function CollapsibleTrigger(props: CollapsibleTriggerProps): Element {
  const api = useCollapsibleContext()
  return render(
    "button",
    mergeProps(
      () => api().getTriggerProps(),
      // Points at nothing while the content is unmounted
      () => ({ "aria-controls": api().unmounted ? null : undefined }),
      props,
    ),
  )
}
