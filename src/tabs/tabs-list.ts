import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTabsContext } from "./use-tabs-context.js"

export type TabsListProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The tablist around the triggers, which moves focus between them with the arrow keys, Home and End */
export function TabsList<As extends ValidComponent = "div">(props: TabsListProps<As>): Element {
  const api = useTabsContext()
  return render(
    "div",
    mergeProps(() => api().getListProps(), props),
  )
}
