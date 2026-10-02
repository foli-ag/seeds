import type * as tabs from "@zag-js/tabs"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useTabsContext } from "./use-tabs-context.js"

export type TabsTriggerProps<As extends ValidComponent = "button"> = PolymorphicProps<As, tabs.TriggerProps>

/** The tab that selects the content with the same `value` */
export function TabsTrigger<As extends ValidComponent = "button">(props: TabsTriggerProps<As>): Element {
  const [triggerProps, localProps] = splitProps(props, ["value", "disabled"])
  const api = useTabsContext()
  return render(
    "button",
    mergeProps(() => api().getTriggerProps(triggerProps), localProps),
  )
}
