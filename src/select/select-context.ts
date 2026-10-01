import { untrack, type Element } from "solid-js"
import type { UseSelectReturn } from "./use-select.js"
import { useSelectContext } from "./use-select-context.js"

export interface SelectContextProps {
  children: (api: UseSelectReturn) => Element
}

/** Renders `children` with the select's API */
export function SelectContext(props: SelectContextProps): Element {
  return untrack(() => props.children(useSelectContext()))
}
