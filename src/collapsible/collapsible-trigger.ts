import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCollapsibleContext } from "./use-collapsible-context.js"

export type CollapsibleTriggerProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

export function CollapsibleTrigger<As extends ValidComponent = "button">(props: CollapsibleTriggerProps<As>): Element {
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
