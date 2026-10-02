import { untrack, type Element } from "solid-js"
import type { UseTabsReturn } from "./use-tabs.js"
import { useTabsContext } from "./use-tabs-context.js"

export interface TabsContextProps {
  children: (api: UseTabsReturn) => Element
}

/** Renders `children` with the tabs' API */
export function TabsContext(props: TabsContextProps): Element {
  return untrack(() => props.children(useTabsContext()))
}
