import { untrack, type Element } from "solid-js"
import type { UseToggleReturn } from "./use-toggle.js"
import { useToggleContext } from "./use-toggle-context.js"

export interface ToggleContextProps {
  children: (api: UseToggleReturn) => Element
}

/** Renders `children` with the toggle's API */
export function ToggleContext(props: ToggleContextProps): Element {
  return untrack(() => props.children(useToggleContext()))
}
