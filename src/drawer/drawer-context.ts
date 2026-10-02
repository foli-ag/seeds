import { untrack, type Element } from "solid-js"
import type { UseDrawerReturn } from "./use-drawer.js"
import { useDrawerContext } from "./use-drawer-context.js"

export interface DrawerContextProps {
  children: (api: UseDrawerReturn) => Element
}

/** Renders `children` with the drawer's API */
export function DrawerContext(props: DrawerContextProps): Element {
  return untrack(() => props.children(useDrawerContext()))
}
