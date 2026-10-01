import { untrack, type Element } from "solid-js"
import type { UseSwitchReturn } from "./use-switch.js"
import { useSwitchContext } from "./use-switch-context.js"

export interface SwitchContextProps {
  children: (api: UseSwitchReturn) => Element
}

/** Renders `children` with the switch's API */
export function SwitchContext(props: SwitchContextProps): Element {
  return untrack(() => props.children(useSwitchContext()))
}
