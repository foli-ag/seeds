import type * as tabs from "@zag-js/tabs"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide, show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { PresenceContext, usePresence, useRenderStrategyContext } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { useTabsContext } from "./use-tabs-context.js"

export type TabsContentProps<As extends ValidComponent = "div"> = PolymorphicProps<As, tabs.ContentProps>

/** The tabpanel shown while the trigger with the same `value` is selected. Its children read its presence. */
export function TabsContent<As extends ValidComponent = "div">(props: TabsContentProps<As>): Element {
  const [contentProps, localProps] = splitProps(props, ["value"])
  const api = useTabsContext()
  // Each content animates on its own, and mounts as the root's render strategy says
  const strategy = useRenderStrategyContext()
  const presence = usePresence(() => ({ ...strategy(), present: api().value === contentProps.value }))
  const merged = mergeProps(
    () => api().getContentProps(contentProps),
    () => presence().presenceProps,
    localProps,
  )
  return provide(PresenceContext, presence, () =>
    show(
      () => !presence().unmounted,
      () => render("div", merged),
    ),
  )
}
