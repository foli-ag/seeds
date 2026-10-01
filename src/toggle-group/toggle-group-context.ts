import { untrack, type Element } from "solid-js"
import type { UseToggleGroupReturn } from "./use-toggle-group.js"
import { useToggleGroupContext } from "./use-toggle-group-context.js"

export interface ToggleGroupContextProps {
  children: (api: UseToggleGroupReturn) => Element
}

/** Renders `children` with the toggle group's API */
export function ToggleGroupContext(props: ToggleGroupContextProps): Element {
  return untrack(() => props.children(useToggleGroupContext()))
}
